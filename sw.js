// Caches the demo for offline use. Bump happens automatically on every build.
const CACHE = 'health-access-Kk5O9nQ0l-';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'apple-touch-icon.png', 'app-icon-192.png', 'app-icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
