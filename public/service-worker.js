
// Enhanced service worker for caching and performance optimization
const CACHE_NAME = 'blog-cache-v3';
const STATIC_CACHE_NAME = 'static-cache-v2';
const IMAGE_CACHE_NAME = 'image-cache-v2';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/App.css'
];

// Critical images to precache
const CRITICAL_IMAGES = [
  '/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png', // Hero image
  '/lovable-uploads/2598eb07-464e-4495-a4bd-acc4b5070f3a.png'  // Profile image
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
          return cache.addAll(CRITICAL_IMAGES);
        })
    ])
    .catch(error => {
      console.error('Service worker cache failed:', error);
      // Continue installation even if caching fails
      return Promise.resolve();
    })
  );
});

// Efficient fetch strategy with stale-while-revalidate for most resources
self.addEventListener('fetch', event => {
  // Skip non-GET requests and non-HTTP(S) requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
  
  const url = new URL(event.request.url);
  
  // HTML navigation - network first, fallback to cache with 1-day max age
  if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response for browser and cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              const headers = new Headers(responseClone.headers);
              // Add cache control header for 1 day max age
              headers.append('Cache-Control', 'max-age=86400');
              const responseToCache = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers
              });
              cache.put(event.request, responseToCache);
            });
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
  
  // Images - cache first, update in background (stale-while-revalidate)
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/) || 
      url.pathname.includes('/lovable-uploads/')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Always try to update the cache in the background
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(IMAGE_CACHE_NAME)
                  .then(cache => {
                    // Add cache control headers for 7 days
                    const headers = new Headers(responseToCache.headers);
                    headers.append('Cache-Control', 'max-age=604800');
                    const enhancedResponse = new Response(responseToCache.body, {
                      status: responseToCache.status,
                      statusText: responseToCache.statusText,
                      headers
                    });
                    cache.put(event.request, enhancedResponse);
                  });
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
          
          // Return cached response immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // JS/CSS assets - stale while revalidate with long cache
  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response immediately while fetching updated version in background
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    // Add cache control headers for 30 days
                    const headers = new Headers(responseToCache.headers);
                    headers.append('Cache-Control', 'max-age=2592000');
                    const enhancedResponse = new Response(responseToCache.body, {
                      status: responseToCache.status,
                      statusText: responseToCache.statusText,
                      headers
                    });
                    cache.put(event.request, enhancedResponse);
                  });
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);
          
          // Return the cached version or wait for network
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }
  
  // Web fonts - cache first with long TTL, fallback to network
  if (url.pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Use cached font but update in background
            fetch(event.request).then(response => {
              if (response.status === 200) {
                caches.open(STATIC_CACHE_NAME)
                  .then(cache => cache.put(event.request, response));
              }
            }).catch(() => {});
            return cachedResponse;
          }
          
          // If not in cache, fetch and cache for future
          return fetch(event.request)
            .then(response => {
              const responseToCache = response.clone();
              if (response.status === 200) {
                caches.open(STATIC_CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache));
              }
              return response;
            });
        })
    );
    return;
  }
  
  // Default fetch strategy with stale-while-revalidate for other resources
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
        
        return cachedResponse || fetchPromise;
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
      .then(() => {
        // Claim clients to ensure updates take effect immediately
        return self.clients.claim();
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_URLS') {
    // Handle request to cache specific URLs
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(event.data.urls))
    );
  }
});
