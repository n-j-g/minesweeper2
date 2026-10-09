// Offline support. Bump CACHE when shipping a new version so old files are cleared.
const CACHE = "ms2-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./fonts/martian-mono-latin-500-normal.woff2",
  "./fonts/martian-mono-latin-700-normal.woff2",
  "./fonts/martian-mono-latin-800-normal.woff2",
  "./fonts/instrument-sans-latin-400-normal.woff2",
  "./fonts/instrument-sans-latin-500-normal.woff2",
  "./fonts/instrument-sans-latin-600-normal.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from the cache first so the game opens instantly with no signal,
// then refresh the cache in the background so the next launch gets any update.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const key = req.mode === "navigate" ? new URL("./index.html", self.location).href : req;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(key, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => { if (res && res.ok) cache.put(key, res.clone()); return res; })
        .catch(() => null);
      if (cached) { e.waitUntil(network); return cached; }
      return (await network) || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
    })
  );
});
