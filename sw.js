self.addEventListener("install", function(e) {
    e.waitUntil(
      caches.open("race-app").then(function(cache) {
        return cache.addAll([
          "/",
          "index.html",
          "style.css",
          "counter.html",
          "counter.css",
          "counter.js",
          "résultats.html",
          "résultats.css",
          "résultats.js",
          "saveResults.html",
          "saveResults.css",
          "saveResults.js",
          "manifest.json"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  