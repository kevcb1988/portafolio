// Asignar nombre y versión del cache
const CACHE_NAME = 'kevCB_v1';

// Ficheros a cachear en la pwa
var urlToCache = [
  './',
  './css/bootstrap.min.css',
  './css/font-awesome.min.css',
  './css/styles.css',
  './fonts/FontAwesome.otf',
  './fonts/fontawesome-webfont.eot',
  './fonts/fontawesome-webfont.svg',
  './fonts/fontawesome-webfont.ttf',
  './fonts/fontawesome-webfont.woff',
  './fonts/fontawesome-webfont.woff2',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/favicon.png',
  './img/favicon-16.png',
  './img/favicon-32.png',
  './img/favicon-64.png',
  './img/favicon-96.png',
  './img/favicon-128.png',
  './img/favicon-192.png',
  './img/favicon-256.png',
  './img/favicon-384.png',
  './img/favicon-512.png',
  './img/favicon-1024.png',
  './js/bootstrap.min.js',
  './js/jquery-3.3.1.min.js',
  './js/popper.js',
]

// Evento Install: Instalar la app, el service worker y los recursos y/o elementos estáticos en la cache

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => {
            return cache.addAll(urlToCache)
                        .then(() => {
                          self.skipWaiting();
                        });
          })
          .catch(error => console.log('No se han almacenado los ellemtos en el cache', error))
  );
});

// Evento Active: Activar la app, para que funcione sin conexión

self.addEventListener('activata', e => {
  const CACHE_WHITE_LIST = [CACHE_NAME];

  e.whileUntil(
    caches.keys()
          .then(cachesNames =>{
            return Promise.all(
              cachesNames.map(cacheName => {

                if(CACHE_WHITE_LIST.indexOf(cacheName) === -1){
                  // Borramos los ellemtos que no necesitamos
                  return caches.delete(cacheName);
                }

              })
            );
          })
          .then(() => {
            // Activa cache en el dispositivo
            self.clients.claim();
          })
  );

});

// Evento Fetch: Actualizar la app

self.addEventListener('fetch', e => {

  e.respondWith(
    caches.match(e.request)
          .then( respuesta => {
            if(respuesta){
              // Devuelvo los datos desde cache
              return respuesta;
            }
            return fetch(e.request);
          })
  );

});
