self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('noticias-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index2.html',
        '/index3.html',
        '/main.js',
        '/main2.js',
        '/main3.js',
        '/manifest.json',
        '/icon1922.png',
        '/icon5122.png',
        
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
