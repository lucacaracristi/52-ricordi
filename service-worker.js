const CACHE_NAME = "52-ricordi-v2";

const FILES_TO_CACHE = [
  "/52-ricordi/",
  "/52-ricordi/index.html",
  "/52-ricordi/manifest.json",
  "/52-ricordi/icon-192.png",
  "/52-ricordi/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
