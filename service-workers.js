var CACHENAME = "cachestore-v1";
var FILES = [
	"./index.html"
	, "./offline.html"
	//, "./css/style.css",
	, "./js/app.js"
	, "./image.html"
	, "./images/icons/launcher-icon-4x.png"
];

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHENAME).then(function(cache) {
			return cache.addAll(FILES);
		})
	);
});

self.addEventListener('activate', function(event) {
	var version = 'v1';
	event.waitUntil(
		caches.keys()
		.then(cacheNames =>
			Promise.all(
				cacheNames
				.map(c => c.split('-'))
				.filter(c => c[0] === 'cachestore')
				.filter(c => c[1] !== version)
				.map(c => caches.delete(c.join('-')))
				)
			)
		);
});

/**
// (estrategia offline) cacheFirst
self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});
/**/

/**/
// (estrategia offline) cacheFirst con página de error
self.addEventListener("fetch", function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request).then(function(response) {
				return response || caches.match("./offline.html");
			});
		})
		);
});
/**/