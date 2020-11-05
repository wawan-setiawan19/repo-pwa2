const CACHE_NAME = "one-soccer-v1.08";
const urlsToCache = [
    "/",
    "/components/nav.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/Fifa.svg",
    "/img/logo.png",
    "/js/api.js",
    "/js/competitions.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/main.js",
    "/js/matches.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/competitions.html",
    "/pages/detail-competitions.html",
    "/pages/last-matches.html",
    "/pages/matches.html",
    "/pages/saved.html",
    "/.eslintrc.json",
    "/index.html",
    "/manifest.json",
    "/sw.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return fetch(event.request).then( response => {
                cache.put(event.request.url, response.clone());
                return response;
            });
        })
    );
    } else {
        event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then((response) => {
            return response || fetch (event.request);
            })
        );
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheName != CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});