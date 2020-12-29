importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
    
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    {url:'/', revision:'1'},
    {url:'/components/nav.html', revision:'1'},
    {url:'/css/materialize.min.css', revision:'1'},
    {url:'/css/style.css', revision:'1'},
    {url:'/img/Fifa.svg', revision:'1'},
    {url:'/img/logo.png', revision:'1'},
    {url:'/js/api.js', revision:'1'},
    {url:'/js/competitions.js', revision:'1'},
    {url:'/js/db.js', revision:'1'},
    {url:'/js/idb.js', revision:'1'},
    {url:'/js/main.js', revision:'1'},
    {url:'/js/matches.js', revision:'1'},
    {url:'/materialize.min.js', revision:'1'},
    {url:'/js/nav.js', revision:'1'},
    {url:'/pages/competitions/html', revision:'1'},
    {url:'/pages/detail-competitions.html', revision:'1'},
    {url:'/pages/last-matches.html', revision:'1'},
    {url:'/pages/matches.html', revision:'1'},
    {url:'/pages/saved.html', revision:'1'},
    {url:'/.eslintrc.json', revision:'1'},
    {url:'/manifest.json', revision:'1'},
    {url:'/push.js', revision:'1'},
    {url:'/sw.js', revision:'1'}
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);