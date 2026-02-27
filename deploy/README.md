# Деплой Aitu.kz на VPS

Пошаговая инструкция для Ubuntu 22.04+ VPS.

> ⚠️ Замените `yourdomain.kz` на ваш домен и `/home/deploy/aitu` на путь к проекту.

## 1. Подготовка сервера

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx
```

Установка Node.js 20:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. Создание пользователя

```bash
sudo adduser deploy
sudo usermod -aG www-data deploy
```

## 3. Загрузка проекта

```bash
su - deploy
git clone <your-repo-url> ~/aitu
cd ~/aitu
```

## 4. Backend (Django)

```bash
cd ~/aitu/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Настройте `.env`:
```bash
cp .env.example .env
nano .env
```

Обязательно измените:
- `DJANGO_SECRET_KEY` — сгенерируйте: `python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- `DEBUG=False`
- `ALLOWED_HOSTS=yourdomain.kz,www.yourdomain.kz`
- `CORS_ALLOWED_ORIGINS=https://yourdomain.kz,https://www.yourdomain.kz`

Инициализация:
```bash
mkdir -p logs
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## 5. Frontend (Next.js)

```bash
cd ~/aitu
npm ci
```

Создайте `.env.local`:
```bash
echo "NEXT_PUBLIC_API_URL=https://yourdomain.kz" > .env.local
```

Соберите:
```bash
npm run build
```

Скопируйте статику для standalone:
```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

## 6. Systemd сервисы

```bash
sudo cp ~/aitu/deploy/aitu-backend.service /etc/systemd/system/
sudo cp ~/aitu/deploy/aitu-frontend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now aitu-backend aitu-frontend
```

Проверка:
```bash
sudo systemctl status aitu-backend
sudo systemctl status aitu-frontend
```

## 7. Nginx

```bash
sudo cp ~/aitu/deploy/nginx.conf /etc/nginx/sites-available/aitu
sudo ln -s /etc/nginx/sites-available/aitu /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 8. SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d yourdomain.kz -d www.yourdomain.kz
```

Certbot автоматически обновит Nginx конфиг. После этого в `deploy/nginx.conf` можно раскомментировать `return 301 https://...` для принудительного HTTPS.

## 9. Проверка

- Откройте `https://yourdomain.kz` — должен загрузиться сайт
- Откройте `https://yourdomain.kz/admin/` — панель Django
- Проверьте форму заявки — отправьте тестовую заявку

## Обновление проекта

```bash
su - deploy
cd ~/aitu

# Обновить код
git pull

# Backend
cd backend && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart aitu-backend

# Frontend
cd ~/aitu
npm ci && npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
sudo systemctl restart aitu-frontend
```
