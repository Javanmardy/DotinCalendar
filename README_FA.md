# تقویم داتین

این پروژه یک تقویم آفلاین برای نمایش رویدادها بر اساس سه گاه‌شمار شمسی، قمری و میلادی است. برای اجرای محلی مراحل زیر را انجام دهید:

## نصب وابستگی‌ها
```bash
npm install
```

## اجرای محیط توسعه
```bash
npm run dev
```

## ساخت نسخه‌ی دموی قابل استقرار
```bash
npm run make:demo
```

خروجی پوشه `dist/` را می‌توانید روی nginx کپی کرده و سرویس دهید.

## استقرار روی nginx
نمونه پیکربندی ساده:
```nginx
server {
    listen 80;
    server_name calendar.local;
    root /var/www/calendar/dist;
    location / {
        try_files $uri /index.html;
    }
}
```
