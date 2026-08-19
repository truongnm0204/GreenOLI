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

# Dumps restored from local `payload dev` often contain a synthetic row:
#   payload_migrations.batch = -1  (name usually "dev")
# `payload migrate` then prompts interactively and hangs in Docker (no TTY).
# Strip that marker so migrate stays non-interactive. Real migrations keep their batches.
echo "[entrypoint] Clearing Payload dev-push migration markers (batch = -1) if any..."
node --input-type=module -e "
import pg from 'pg';
const uri = process.env.DATABASE_URI;
if (!uri) process.exit(0);
const client = new pg.Client({ connectionString: uri });
try {
  await client.connect();
  const exists = await client.query(\"SELECT to_regclass('public.payload_migrations') AS t\");
  if (!exists.rows[0]?.t) {
    console.log('[entrypoint] payload_migrations table not present yet — skip cleanup.');
  } else {
    const r = await client.query('DELETE FROM payload_migrations WHERE batch = -1');
    console.log('[entrypoint] Removed dev migration rows:', r.rowCount ?? 0);
  }
} catch (e) {
  console.warn('[entrypoint] WARN: could not clear dev migration markers:', e?.message || e);
} finally {
  try { await client.end(); } catch {}
}
"

echo "[entrypoint] Running Payload migrations..."
# Fail the container if migrate fails (do not start a half-ready app).
# Force non-interactive even if a future Payload version prompts again.
if ! sh -c 'yes n 2>/dev/null | npx payload migrate'; then
  echo "[entrypoint] ERROR: payload migrate failed. Check DATABASE_URI / POSTGRES_PASSWORD."
  exit 1
fi

echo "[entrypoint] Starting application: $*"
exec "$@"
