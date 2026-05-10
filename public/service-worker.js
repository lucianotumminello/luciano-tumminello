
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  return;
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(cacheNames.map(cacheName => caches.delete(cacheName))))
      .then(() => self.clients.claim())
  );
});
