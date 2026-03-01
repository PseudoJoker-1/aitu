# Деплой Aitu.kz

## Быстрый старт (одна команда)

```bash
git clone -b deploy https://github.com/PseudoJoker-1/aitu.git
cd aitu
sudo bash deploy/deploy.sh
```

Скрипт сделает всё автоматически:
- Установит Python 3, Node.js 20, Nginx, Certbot
- Создаст пользователя `deploy`
- Настроит Django backend (venv, миграции, collectstatic)
- Соберёт Next.js frontend (standalone)
- Настроит systemd сервисы
- Настроит Nginx reverse proxy
- Получит SSL сертификат (Let's Encrypt)

Единственное что спросит — **Green-API credentials** для WhatsApp уведомлений (можно пропустить и настроить позже).

---

## Требования

- Ubuntu 22.04+ VPS
- Минимум 1 ГБ RAM, 1 CPU, 20 ГБ SSD
- Домен `aituevents.kz` направлен на IP сервера (A-запись)
- Root-доступ (или sudo)

## После деплоя

- Сайт: `https://aituevents.kz`
- Админка: `https://aituevents.kz/admin/`
- Скрипт предложит создать суперпользователя Django

## Обновление

```bash
cd /path/to/aitu
git pull origin deploy

# Backend
cd backend && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart aitu-backend

# Frontend
cd ..
npm ci && npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
sudo systemctl restart aitu-frontend
```

## Настройка Green-API позже

Отредактируйте `backend/.env`:
```bash
nano /path/to/aitu/backend/.env
```

Измените:
```
GREEN_API_ID_INSTANCE=ваш-instance-id
GREEN_API_TOKEN=ваш-api-token
GREEN_API_PHONE=77001234567
```

Перезапустите backend:
```bash
sudo systemctl restart aitu-backend
```

## Структура файлов

```
deploy/
├── deploy.sh               # Автоматический скрипт деплоя
├── nginx.conf               # Nginx конфигурация (шаблон)
├── gunicorn.conf.py          # Gunicorn настройки (2 воркера)
├── aitu-backend.service      # Systemd: Django/Gunicorn (шаблон)
├── aitu-frontend.service     # Systemd: Next.js standalone (шаблон)
└── README.md                 # Этот файл
```

> **Примечание**: `.service` и `nginx.conf` файлы — шаблоны с placeholder `__PROJECT_DIR__`. Скрипт `deploy.sh` автоматически подставляет реальные пути.
