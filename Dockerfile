# syntax=docker/dockerfile:1
# GreenOLI production-like image (Next.js 15 + Payload CMS 3)
# Runner uses prod node_modules + `next start` so `payload migrate` works at boot.

FROM node:20-bookworm-slim AS base
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    libc6 \
    openssl \
  && rm -rf /var/lib/apt/lists/*

# ---- dependencies (full, for build) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- production dependencies only (for runner + payload CLI) ----
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- build ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Next/Payload require these at build time; runtime overrides via compose.
ARG PAYLOAD_SECRET=build-time-secret-change-at-runtime
# Build-time placeholder only — no live DB during image build.
ARG DATABASE_URI=postgresql://build:build@127.0.0.1:5432/build
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Docker image build has no Postgres. Site layout fetches CMS data at
# prerender time — inject force-dynamic for this build only so next build
# skips DB-backed prerender. Source on host is unchanged.
RUN node --input-type=module -e "\
import fs from 'node:fs';\
const f='src/app/(site)/layout.tsx';\
let s=fs.readFileSync(f,'utf8');\
if (!s.includes(\"export const dynamic = 'force-dynamic'\")) {\
  s=s.replace(\
    'export const viewport:',\
    \"// injected by Dockerfile for DB-less image builds\\nexport const dynamic = 'force-dynamic';\\n\\nexport const viewport:\"\
  );\
  fs.writeFileSync(f,s);\
  console.log('Injected force-dynamic into', f);\
} else {\
  console.log('force-dynamic already present in', f);\
}\
"

RUN npm run build

# ---- runner ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && mkdir -p public/media public/documents \
  && chown -R nextjs:nodejs public

# Use COPY --chown instead of chown -R on huge node_modules (export was timing out).
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/payload.config.ts ./payload.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=nextjs:nodejs /app/next-env.d.ts ./next-env.d.ts

COPY --chown=nextjs:nodejs docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
