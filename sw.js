/* Service worker della cassa "Pizza in piazza".
   Serve solo alla versione ospitata su https: tiene la pagina in cache, cosi'
   dopo la prima apertura l'iPad la lancia anche senza nessuna rete.
   Aprendo il file con doppio clic da file:// questo file non viene nemmeno letto.

   >>> SE MODIFICHI cassa_pizzata.html, CAMBIA IL NUMERO DI VERSIONE QUI SOTTO <<<
   E' quello che dice al browser di buttare la vecchia copia e riscaricare.
   Senza, l'iPad continua a mostrare la versione di prima. */
var CACHE = "cassa-pizzata-v7";
var FILE = "./cassa_pizzata.html";

self.addEventListener("install", function (e) {
  self.skipWaiting();                       // la nuova versione subentra subito
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.add(FILE); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (nomi) {
      return Promise.all(nomi.map(function (n) {
        return n === CACHE ? null : caches.delete(n);   // via le versioni vecchie
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Prima la cache, sempre. In piazza l'iPad e' agganciato al wifi della stampante:
   una rete che esiste ma non porta da nessuna parte, dove mettersi ad aspettare
   una risposta significherebbe restare piantati sulla schermata bianca. */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (inCache) {
      if (inCache) return inCache;
      return fetch(e.request).then(function (fresca) {
        if (fresca && fresca.ok) {
          var copia = fresca.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
        }
        return fresca;
      }).catch(function () { return caches.match(FILE); });
    })
  );
});
