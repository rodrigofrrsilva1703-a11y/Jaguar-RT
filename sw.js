const CACHE='jaguar-rtav-v3';
const BASE='/Jaguar-RTAV/';
const STATIC=[
  BASE,
  BASE+'index.html',
  BASE+'manifest.webmanifest',
  BASE+'icon.svg',
  BASE+'icon-192.png',
  BASE+'icon-512.png'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;

  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req)
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(BASE+'index.html',copy));
          return response;
        })
        .catch(()=>caches.match(BASE+'index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      const network=fetch(req).then(response=>{
        if(response && response.status===200){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(req,copy));
        }
        return response;
      }).catch(()=>cached);
      return cached||network;
    })
  );
});