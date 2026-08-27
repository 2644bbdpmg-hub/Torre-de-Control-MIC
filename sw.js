/* Controla las actualizaciones del sitio.
   Estrategia: primero la red, y si no hay conexión se usa la copia guardada.
   Así el tablero siempre abre con la última versión publicada, incluso desde el
   ícono de la pantalla de inicio, que es donde el navegador se aferra a lo viejo. */
const CACHE = "torre-mic-26.08.26-1313";
const SHELL = ["./", "./index.html", "./manifest.json", "./app-192.png", "./app-512.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  /* el histórico y los avances pesan mucho y ya se piden con revalidación propia */
  if (/\.(gz|enc)$/i.test(url.pathname)) return;
  e.respondWith(
    fetch(req)
      .then(r => {
        const copia = r.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
