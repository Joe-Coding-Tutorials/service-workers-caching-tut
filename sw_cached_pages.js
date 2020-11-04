const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  'about.html',
  '/js/main.js',
];

// Call the install event
self.addEventListener('install', e => {
  console.log('Service Worker Intsalled')

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files..')
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  )
})

// Call the activate event
self.addEventListener('activate', e => {
  console.log('Service Worker Activated')

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== cacheName) return caches.delete(cache)
    })))
  )
})

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('Service Worker Fetching')
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})