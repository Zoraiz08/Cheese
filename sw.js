const CACHE_NAME = 'cheese-radar-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/js/Classes.js',
  '/js/index.js',
  '/js/eventListeners.js',
  '/img/cheese/Babibel.png',
  '/img/cheese/Manchego.png',
  '/img/cheese/Parmesano.png',
  '/img/cheese/Roquefort.png',
  '/img/cheese/Brie.png',
  '/img/cheese/Camembert.png',
  '/img/cheese/Edam.png',
  '/img/cheese/Cheddar.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('🧀 Cheese Radar: Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
  // Activa el service worker inmediatamente
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧀 Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Toma control inmediatamente
  return self.clients.claim();
});

// Estrategia: Cache First con Network Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devuelve la versión cacheada
        if (response) {
          return response;
        }
        
        // Si no, hace la petición a la red
        return fetch(event.request).then(response => {
          // Verifica si es una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona la respuesta para cachearla
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Si falla todo, podrías devolver una página offline
        console.log('🧀 Error de red y sin caché disponible');
      })
  );
});