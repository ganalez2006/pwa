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

	if (event.action === 'uno') {
		console.debug(event.action);
	} else if (event.action === 'dos') {
		console.debug(event.action);
	}

	console.debug(event.notification.data);
	if (event.notification.data.url)
		return clients.openWindow(event.notification.data.url);

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


self.addEventListener('push', function(event) {

	console.log('[Service Worker] Push Received.');
	console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

	console.log('event.data', event.data);

	const title = 'Push Notificacion';
	const options = {
		body: event.data.text()
		, badge: './images/icons/launcher-icon-16x16.png'
		, icon: './images/icons/launcher-icon-1x.png'
		, image: './images/p6.jpg' //320x220px
		, tag: 'push'
		, actions: [
			{action: 'uno', title: 'title uno'}
			, {action: 'dos', title: 'title dos'}
		]
		, data: {
			url: 'http://google.com'
		}
	};

	event.waitUntil(self.registration.showNotification(title, options));
});