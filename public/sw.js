// Bump this on every deploy so old caches get cleared out.
const CACHE_NAME = 'ethio-saints-cache-v1';

// Pages/assets guaranteed to be cached on install, so the app opens
// offline even before the user has browsed around.
const PRECACHE_URLS = ['/', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategy: cache-first, then refresh the cache in the background.
// Since every saint's story is baked into the static export at build
// time, once a page has been opened once it is available forever
// offline - this just makes the FIRST visit sticky too.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached); // offline and not cached-yet: nothing we can do

      return cached ?? network;
    })
  );
});
