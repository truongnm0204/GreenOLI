# Deploy GreenOLI lên VPS (Docker + Caddy HTTPS)

Mục tiêu: chạy site + Payload CMS + Postgres trên **một VPS**, domain HTTPS.

| | |
|---|---|
| Domain mẫu | `truongnm-dev.id.vn` |
| IP VPS mẫu | `162.4.177.116` |
| Stack | `docker-compose.vps.yml` = Postgres + web + Caddy |
| Media | Volume Docker `greenoli_media` / `greenoli_documents` |

---

## 0. Chuẩn bị trên máy local (Windows)

### 0.1. Dump DB mới (nếu chưa có)

Đã có thể dùng file:

`greenoli_local_dump_YYYYMMDD_HHMMSS.sql`

Hoặc tạo lại:

```powershell
$env:PGPASSWORD='123'
& "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -h localhost -U greenoli -d greenoli --no-owner --no-acl --clean --if-exists -f greenoli_local_dump.sql
```

### 0.2. Code + secret

- Commit / push code (gồm `prodMigrations`, compose VPS, Caddyfile).
- **Không** commit `.env` hay dump nếu repo public (dump có user/hash).

### 0.3. File cần mang lên VPS

```
repo code (git clone)
greenoli_local_dump_....sql
(public/media/* và public/documents/* nếu muốn giữ ảnh/file local)
```

Cách dễ: `git push` rồi trên VPS `git clone`, sau đó `scp` dump + media.

---

## 1. DNS (làm trước khi bật Caddy HTTPS)

Tại nhà cung cấp domain `id.vn`:

| Type | Name | Value | TTL |
|---|---|---|---|
| **A** | `@` (hoặc `truongnm-dev`) | `162.4.177.116` | 300–3600 |
| **A** | `www` (optional) | `162.4.177.116` | 300–3600 |

Chỉ cần bản ghi trỏ đúng IP. Kiểm tra:

```bash
# trên máy bất kỳ
ping truongnm-dev.id.vn
# hoặc
nslookup truongnm-dev.id.vn
```

Phải ra `162.4.177.116`. Nếu chưa → **đợi DNS** (5–30 phút, đôi khi lâu hơn) trước bước HTTPS.

---

## 2. Chuẩn bị VPS (Ubuntu 22.04/24.04)

SSH:

```bash
ssh root@162.4.177.116
# hoặc user có sudo
```

### 2.1. Update + Docker

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl git ufw

# Docker official
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
docker --version
docker compose version
```

### 2.2. Firewall

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw enable
ufw status
```

**Không** mở port `3000` hay `5432` ra ngoài.

### 2.3. Clone project

```bash
mkdir -p /opt && cd /opt
git clone <URL_REPO_CUA_BAN> greenoli
cd /opt/greenoli
# checkout branch chính nếu cần
# git checkout main
```

Nếu chưa có remote git: dùng `scp -r` từ Windows:

```powershell
# trên Windows (PowerShell)
scp -r C:\Users\Admin\Desktop\4user\GreenOLI\OLIProject root@162.4.177.116:/opt/greenoli
```

(Loại `node_modules` / `.next` nếu copy tay — trên server sẽ build lại.)

---

## 3. File môi trường production

```bash
cd /opt/greenoli
cp .env.vps.example .env
nano .env
```

Điền tối thiểu:

```env
SITE_ADDRESS=truongnm-dev.id.vn
NEXT_PUBLIC_SERVER_URL=https://truongnm-dev.id.vn
CADDY_EMAIL=email-that@cua-ban.com

POSTGRES_USER=greenoli
POSTGRES_PASSWORD=<mat-khau-manh-khong-ky-tu-@:/#>
POSTGRES_DB=greenoli

PAYLOAD_SECRET=<hex-64-ky-tu>
```

Sinh secret nhanh trên VPS:

```bash
openssl rand -hex 32
openssl rand -base64 24 | tr -d '/+=' | cut -c1-32
```

**Lưu ý:** `NEXT_PUBLIC_SERVER_URL` được **bake lúc build image**. Sai domain → build lại.

---

## 4. Build & chạy

```bash
cd /opt/greenoli
docker compose -f docker-compose.vps.yml up -d --build
```

Lần đầu có thể **10–20+ phút** (npm ci + next build).

Theo dõi:

```bash
docker compose -f docker-compose.vps.yml ps
docker compose -f docker-compose.vps.yml logs -f web
docker compose -f docker-compose.vps.yml logs -f caddy
```

Entrypoint web sẽ: chờ Postgres → `payload migrate` → `next start`.

Kiểm tra nội bộ:

```bash
curl -sI http://127.0.0.1:3000 | head
# qua Caddy (sau khi DNS OK):
curl -sI https://truongnm-dev.id.vn | head
```

Mở trình duyệt:

- Site: https://truongnm-dev.id.vn  
- Admin: https://truongnm-dev.id.vn/admin  

---

## 5. Import database local (nội dung hiện tại)

### 5.1. Copy dump lên VPS

```powershell
# Windows
scp C:\Users\Admin\Desktop\4user\GreenOLI\OLIProject\greenoli_local_dump_20260819_144103.sql root@162.4.177.116:/opt/greenoli/
```

### 5.2. Restore vào container Postgres

```bash
cd /opt/greenoli

# Đảm bảo postgres đang healthy
docker compose -f docker-compose.vps.yml ps

# Restore (ghi đè schema/data theo dump --clean)
docker compose -f docker-compose.vps.yml exec -T postgres \
  psql -U greenoli -d greenoli < greenoli_local_dump_20260819_144103.sql
```

Nếu lỗi role/owner: dump đã `--no-owner --no-acl` nên thường ổn với user `greenoli`.

Sau restore, restart web (cache / connection):

```bash
docker compose -f docker-compose.vps.yml restart web
```

### 5.3. Copy media + documents (file vật lý)

DB chỉ lưu metadata; file nằm volume.

**Cách A — copy vào volume đang mount (đơn giản):**

```powershell
# Windows → VPS temp
scp -r C:\Users\Admin\Desktop\4user\GreenOLI\OLIProject\public\media root@162.4.177.116:/tmp/media
scp -r C:\Users\Admin\Desktop\4user\GreenOLI\OLIProject\public\documents root@162.4.177.116:/tmp/documents
```

```bash
# trên VPS — copy vào container paths
docker compose -f docker-compose.vps.yml cp /tmp/media/. web:/app/public/media/
docker compose -f docker-compose.vps.yml cp /tmp/documents/. web:/app/public/documents/
docker compose -f docker-compose.vps.yml exec web sh -c "ls -la /app/public/media | head"
```

**Cách B — rsync vào volume path** (nếu biết mountpoint `docker volume inspect`).

---

## 6. Tài khoản admin Payload

Sau migrate DB trống, lần đầu mở `/admin` có thể hiện form tạo user đầu tiên.

Nếu đã restore dump local: **đăng nhập bằng user admin local** (email/password đã có trong DB).

Quên mật khẩu: reset trong DB hoặc tạo user mới qua CLI (tuỳ version Payload):

```bash
docker compose -f docker-compose.vps.yml exec web npx payload create-user
# nếu command không có: dùng UI /admin hoặc update hash trong bảng users
```

---

## 7. Cập nhật code sau này

```bash
cd /opt/greenoli
git pull
docker compose -f docker-compose.vps.yml up -d --build
```

Đổi `NEXT_PUBLIC_SERVER_URL` / domain → **bắt buộc rebuild** web.

---

## 8. Backup định kỳ (khuyến nghị)

```bash
# ví dụ cron hàng đêm
0 3 * * * docker compose -f /opt/greenoli/docker-compose.vps.yml exec -T postgres pg_dump -U greenoli greenoli | gzip > /root/backups/greenoli-$(date +\%F).sql.gz
```

Backup volume media:

```bash
docker run --rm -v oliproject_greenoli_media:/data -v /root/backups:/backup alpine \
  tar czf /backup/media-$(date +%F).tar.gz -C /data .
```

(Tên volume xem: `docker volume ls | grep media`.)

---

## 9. Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|---|---|
| Caddy không cấp SSL | DNS chưa trỏ / port 80 bị chặn / `SITE_ADDRESS` sai |
| `payload migrate` fail | Sai `POSTGRES_PASSWORD` / URI có ký tự đặc biệt |
| Container kẹt prompt *dev mode / data loss* | Dump local có `payload_migrations.batch = -1`. Entrypoint mới tự xóa marker. Fix tay: `DELETE FROM payload_migrations WHERE batch = -1;` rồi `restart web` |
| `npm error signal SIGTERM` khi start | Thường do `docker restart` / OOM kill trong lúc app đang chạy — xem `docker inspect` / free RAM, không phải lỗi Next riêng |
| Trang trắng / URL sai | `NEXT_PUBLIC_SERVER_URL` không khớp domain → rebuild |
| Ảnh 404 | Chưa copy `public/media` vào volume |
| Admin login fail sau restore | Dùng đúng user trong dump; clear cookie |
| Build OOM | VPS RAM thấp — thêm swap 2GB hoặc build image trên máy mạnh rồi `docker load` |
| Port 80/443 occupied | Tắt nginx/apache host: `systemctl stop nginx` |

Thêm swap nhanh (VPS 1–2GB RAM):

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## 10. Checklist nhanh

```text
[ ] DNS A → 162.4.177.116
[ ] Docker + ufw 22/80/443
[ ] .env từ .env.vps.example (secret mạnh)
[ ] docker compose -f docker-compose.vps.yml up -d --build
[ ] https://truongnm-dev.id.vn mở được
[ ] Restore SQL dump
[ ] Copy media/documents
[ ] Login /admin OK
[ ] Backup cron
```

---

## File liên quan trong repo

| File | Vai trò |
|---|---|
| `docker-compose.vps.yml` | Postgres + web + Caddy |
| `Caddyfile` | HTTPS reverse proxy |
| `.env.vps.example` | Mẫu env production |
| `Dockerfile` | Image Next + Payload |
| `docker/docker-entrypoint.sh` | wait DB → migrate → start |
| `docs/VPS_DEPLOY.md` | Hướng dẫn này |
