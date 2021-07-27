let CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
'/',
'/index.html',
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('AppCahe').then(function(cache) {
            return cache.addAll(
                [
                    'src/views/Events.js',
                    'src/views/Clubs.js',
                    'src/views/News.js',
                ]
            );
        })
    );
});