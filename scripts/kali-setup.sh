#!/usr/bin/env bash
# One-shot setup for GreenOLI on Kali Linux + Cloudflare Tunnel.
# Run as root (or with sudo) on the Kali host.
#
#   bash scripts/kali-setup.sh
#
# Installs Docker (Debian repo works on Kali — it is Debian-based),
# clones the repo, prepares .env. After this script you still need to:
#   1. Create the Cloudflare Tunnel in the Zero Trust dashboard
#      → copy TUNNEL_TOKEN into /opt/greenoli/.env
#   2. docker compose -f docker-compose.kali.yml up -d --build
#   3. Restore DB dump + media (see docs/VPS_DEPLOY.md §5)

set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/truongnm0204/GreenOLI.git}"
APP_DIR="${APP_DIR:-/opt/greenoli}"

echo "==> apt update + prerequisites"
apt-get update
apt-get install -y ca-certificates curl git ufw

# ---- Docker (Debian repo — Kali tracks Debian testing) ----
if ! command -v docker >/dev/null 2>&1; then
  echo "==> Installing Docker"
  install -m 0755 -d /etc/apt/keyrings
  # Kali identifies as 'kali' — use Debian bookworm repo instead.
  curl -fsSL https://download.docker.com/linux/debian/gpg \
    -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/debian bookworm stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin
  systemctl enable --now docker
else
  echo "==> Docker already installed: $(docker --version)"
fi

docker compose version

# ---- Firewall: only SSH inbound — tunnel is outbound-only ----
if command -v ufw >/dev/null 2>&1 && ! ufw status | grep -q "Status: active"; then
  echo "==> Enabling ufw (SSH only)"
  ufw allow OpenSSH
  ufw --force enable
  ufw status
fi

# ---- Clone / update repo ----
if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "==> Cloning $REPO_URL → $APP_DIR"
  mkdir -p "$(dirname "$APP_DIR")"
  git clone "$REPO_URL" "$APP_DIR"
else
  echo "==> Repo exists at $APP_DIR — pulling latest"
  git -C "$APP_DIR" pull --ff-only
fi

cd "$APP_DIR"
if [[ ! -f .env ]]; then
  cp .env.kali.example .env
  echo "==> Created .env — EDIT IT NOW:"
  echo "    nano $APP_DIR/.env"
  echo "    Required: TUNNEL_TOKEN, POSTGRES_PASSWORD, PAYLOAD_SECRET"
else
  echo "==> .env already exists — leaving untouched"
fi

cat <<EOF

============================================================
Next steps:

1) Create Cloudflare Tunnel (on any machine with a browser):
     https://one.dash.cloudflare.com  →  Networks → Tunnels → Add
     Name: greenoli-kali
     Public hostname: greenoli.vn  →  Service: http://web:3000
   Copy the token (starts with eyJ...)

2) Edit $APP_DIR/.env:
     TUNNEL_TOKEN=<that token>
     POSTGRES_PASSWORD=<openssl rand -base64 24 | tr -d '/+=' | cut -c1-32>
     PAYLOAD_SECRET=<openssl rand -hex 32>
     NEXT_PUBLIC_SERVER_URL=https://greenoli.vn

3) Build & start:
     cd $APP_DIR
     docker compose -f docker-compose.kali.yml up -d --build

4) Restore DB + media (from your Windows machine):
     scp C:/Users/Admin/Desktop/greenoli_db_backup.sql root@<kali>:/tmp/
     docker compose -f docker-compose.kali.yml exec -T postgres \\
       psql -U greenoli -d greenoli < /tmp/greenoli_db_backup.sql
     docker compose -f docker-compose.kali.yml restart web

5) Verify:
     docker compose -f docker-compose.kali.yml ps
     docker compose -f docker-compose.kali.yml logs -f cloudflared
     curl -sI https://greenoli.vn | head
============================================================
EOF
