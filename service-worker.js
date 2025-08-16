const CACHE_NAME = 'my-apps-script-cache-v1';
const urlsToCache = [
    '/', // يشير إلى الصفحة الرئيسية للـ PWA (ملف index.html)
    // بما أن تطبيقك بالكامل يأتي من Apps Script، لن تحتاج لإضافة العديد من الروابط هنا.
    // يمكنك إضافة روابط للأيقونات إذا أردت التأكد من تخزينها مؤقتًا.
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
