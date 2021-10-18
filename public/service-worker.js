var CACHE_NAME = 'OTM-3';
var urlsToCache = [
    'assets/moving-header.jpg',
    'assets/inventory.jpg',
    'assets/cosas-draw.jpg',
    'assets/cajas-draw.jpg',
];
const offlineUrl = 'offline.html';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
        );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fetch(event.request).catch(function (error) {
            // The following validates that the request was for a navigation to a new document
            if (
                event.request.destination !== "document" ||
                event.request.mode !== "navigate"
            ) {
                return;
            }

            console.error("[PWA Builder] Network request Failed. Serving offline page " + error);
            return caches.open(CACHE).then(function (cache) {
                return cache.match(offlineUrl);
            });
        })
        );
});


self.addEventListener('install', function(e) {
    console.log("Service Worker Installed")
})

self.addEventListener('activate', function(e) {
    console.log("Service Worker Activated")
})

self.addEventListener('fetch', function(e) {
    console.log("Service Worker Fetched")
})