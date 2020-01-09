var CACHE_NAME = "mp3pam_service_worker_cache"
var urlsToCache = []

// Install  a service worker
self.addEventListener("install", event => {
  self.skipWaiting()

  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // console.log("Opened cache")
      // return cache.addAll(urlsToCache)
      // console.log("deleting stuff")

      return cache.delete(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", event => {
  // event.respondWith(
  //   caches.match(event.request).then(function(response) {
  //   // Cache hit - return response
  //   if (response) {
  //     return response
  //   }
  // return fetch(event.request)
  //   }),
  // )
})

self.addEventListener("activate", event => {
  var cacheWhiteList = ["mp3pam_service_worker_cache"]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
