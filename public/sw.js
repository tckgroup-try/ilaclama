// Minimal service worker to pass PWA installation requirements
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Just pass through requests to network
  e.respondWith(fetch(e.request).catch(() => new Response("Offline")));
});
