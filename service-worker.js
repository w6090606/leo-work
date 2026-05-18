const CACHE = 'leo-app-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './chart.umd.min.js',
  './hammer.min.js',
  './chartjs-plugin-zoom.min.js',
];

/* 安裝：預快取所有靜態資源 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* 啟動：清除舊版快取 */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* 請求攔截：Cache First + 背景更新快取 */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request)
          .then(response => {
            if (response && response.ok) {
              cache.put(e.request, response.clone());
            }
            return response;
          })
          .catch(() => null);
        return cached || networkFetch;
      })
    )
  );
});
