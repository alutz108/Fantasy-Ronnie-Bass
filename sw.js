// A very small service worker. Its only job is to tell Chrome this site can be installed as an app.
// It does NOT save (cache) anything, so the site always loads the newest version from GitHub.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  // Only touch this site's own files. Everything else (live Sleeper data, Firebase, fonts) goes straight through untouched.
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request));
});
