var CACHEVERSION = "v2";
var CACHENAME = "cachestore-" + CACHEVERSION;
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
	event.waitUntil(
		caches.keys()
		.then(cacheNames =>
			Promise.all(
				cacheNames
				.map(c => c.split('-'))
				.filter(c => c[0] === 'cachestore')
				.filter(c => c[1] !== CACHEVERSION)
				.map(c => caches.delete(c.join('-')))
				)
			)
		);
});

/**
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

/**
// (estrategia offline) networkFirst
self.addEventListener("fetch", function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
		);
});
/**/

/**/
// Notificacion click
self.addEventListener('notificationclick', event => {

	console.debug(event);
	console.log('On notification click: ', event.notification.tag);
	event.notification.close();

	event.waitUntil(clients.matchAll({
		type: "window"
	}).then(function(clientList) {

		for (var i = 0; i < clientList.length; i++) {

			var client = clientList[i];
			return client.focus();
		}

		if (clients.openWindow)
			return clients.openWindow('./');
	}));

}, false);
/**/