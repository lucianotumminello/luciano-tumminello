
// Simple service worker for caching blog assets
const CACHE_NAME = 'blog-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/App.css'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Ensure the new service worker activates immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service worker installing and caching initial assets');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service worker cache failed:', error);
        // Continue installation even if caching fails
        return Promise.resolve();
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }
        
        // Clone the request for fetch and cache
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response for browser and cache
            const responseToCache = response.clone();
            
            // Cache image and font assets
            if (
              fetchRequest.url.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot)$/) ||
              fetchRequest.url.includes('/lovable-uploads/')
            ) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                })
                .catch(error => {
                  console.error('Cache put failed:', error);
                  // Continue even if caching fails
                });
            }
            
            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // Try to return a cached response for offline support
            return caches.match('/index.html');
          });
      })
      .catch(error => {
        console.error('Cache match failed:', error);
        // Return the homepage as a fallback
        return caches.match('/index.html');
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('Service worker deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch(error => {
        console.error('Cache cleanup failed:', error);
        // Continue activation even if cleanup fails
        return Promise.resolve();
      })
  );
});
