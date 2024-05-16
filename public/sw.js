const cacheName = 'luizbills.litecanvas-editor-v1'
const version = '1.3.0'

const precacheResources = [
  '/',
  '/index.html',
  '/icons/favicon.ico',
  '/icons/icon.png',
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(event.request)
      })
  )
})

self.addEventListener('message', (event) => {
  const type = event.data.type
  if ('GET_VERSION' === type) {
    event.source.postMessage({ type, res: version })
  }
})
