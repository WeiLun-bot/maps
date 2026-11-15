/* Trip map PWA - same-origin shell only. Do NOT cache third-party map tiles or external sites. */
'use strict';
const CACHE_NAME='berlin-dresden-study-trip-v1-20261115';
const APP_SHELL=[
 './',
 './index.html',
 './manifest.webmanifest',
 './icons/icon-192.png',
 './icons/icon-512.png',
 './icons/icon-maskable-512.png',
 './icons/apple-touch-icon-180.png'
];
self.addEventListener('install', event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event=>{
 event.waitUntil(Promise.all([
   caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('berlin-dresden-study-trip-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))),
   self.clients.claim()
 ]));
});
self.addEventListener('fetch', event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const uri=new URL(req.url);
 if(uri.origin!==self.location.origin)return; // external online map & Google Maps remain network-only
 const scope=new URL(self.registration.scope);
 if(!uri.pathname.startsWith(scope.pathname))return;
 if(req.mode==='navigate'){
   event.respondWith(caches.match(new URL('./index.html',scope).href).then(cached=>cached||fetch(req)));
   return;
 }
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});