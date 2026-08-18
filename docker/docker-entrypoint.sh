#!/bin/sh
set -e

DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"

echo "[entrypoint] Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."

# Pure Node TCP wait — no postgresql-client required in slim image.
i=0
max_attempts=60
until node -e "
const net = require('net');
const host = process.env.DB_HOST || 'postgres';
const port = Number(process.env.DB_PORT || 5432);
const s = net.connect(port, host, () => { s.end(); process.exit(0); });
s.on('error', () => process.exit(1));
s.setTimeout(2000, () => { s.destroy(); process.exit(1); });
" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge "$max_attempts" ]; then
    echo "[entrypoint] ERROR: PostgreSQL not reachable after ${max_attempts}s"
    exit 1
  fi
  sleep 1
done

echo "[entrypoint] PostgreSQL is up."

if [ -z "${PAYLOAD_SECRET}" ] || [ "${PAYLOAD_SECRET}" = "change-me-to-a-long-random-string" ]; then
  echo "[entrypoint] WARNING: PAYLOAD_SECRET is missing or still the example default. Set a strong secret in .env."
fi

if [ -z "${DATABASE_URI}" ]; then
  echo "[entrypoint] ERROR: DATABASE_URI is not set."
  exit 1
fi

echo "[entrypoint] Running Payload migrations..."
# Fail the container if migrate fails (do not start a half-ready app).
if ! npx payload migrate; then
  echo "[entrypoint] ERROR: payload migrate failed. Check DATABASE_URI / POSTGRES_PASSWORD."
  exit 1
fi

echo "[entrypoint] Starting application: $*"
exec "$@"
