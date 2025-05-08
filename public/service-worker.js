// Enhanced service worker for caching and performance optimization
const CACHE_NAME = 'blog-cache-v2';
const STATIC_CACHE_NAME = 'static-cache-v1';
const IMAGE_CACHE_NAME = 'image-cache-v1';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/App.css'
];

// Install event - cache critical assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Ensure the new service worker activates immediately
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME)
        .then(cache => {
          console.log('Service worker caching static assets');
          return cache.addAll(STATIC_ASSETS);
        }),
      
      // Pre-cache important images
      caches.open(IMAGE_CACHE_NAME)
        .then(cache => {
          return cache.addAll([
            '/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png', // Hero image
            '/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png'  // Profile image
          ]);
        })
    ])
    .catch(error => {
      console.error('Service worker cache failed:', error);
      // Continue installation even if caching fails
      return Promise.resolve();
    })
  );
});

// Efficient fetch strategy with network-first for HTML/API and cache-first for assets
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) return;
  
  const url = new URL(event.request.url);
  
  // HTML navigation - network first, fallback to cache
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response for browser and cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          console.log('Falling back to cache for:', event.request.url);
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html');
            });
        })
    );
    return;
  }
  
  // Images and Fonts - cache first, fallback to network
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot)$/) || 
      url.pathname.includes('/lovable-uploads/')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response if found
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise fetch, clone and cache
          return fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
              }
              
              const responseToCache = networkResponse.clone();
              caches.open(IMAGE_CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
                
              return networkResponse;
            });
        })
    );
    return;
  }
  
  // JS/CSS assets - stale while revalidate
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response immediately while fetching updated version in background
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (!networkResponse || networkResponse.status !== 200) {
                return networkResponse;
              }
              
              // Update the cache with the new version
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
                
              return networkResponse;
            });
          
          // Return the cached version or wait for network
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // Default fetch strategy for other resources
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE_NAME, IMAGE_CACHE_NAME];
  
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
  );
});
