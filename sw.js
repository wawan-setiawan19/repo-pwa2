const CACHE_NAME = "one-soccer-v1.01";
const urlsToCache = [
    "/",
    "/components/nav.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/Fifa.svg",
    "/js/api.js",
    "/js/main.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/competitions.html",
    "/pages/favourites.html",
    "/pages/matches.html",
    "/.eslintrc.json",
    "/index.html",
    "/sw.js"
];

self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches
            .match(event.request, {cacheName:CACHE_NAME})
            .then((response)=>{
                if(response) return response;
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate",(event)=>{
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if(cacheName != CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
});