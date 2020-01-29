var CACHEVERSION = "v2";
var CACHESEPARATOR = "-";
var CACHENAME = "cachestore" + CACHESEPARATOR + CACHEVERSION;
var FILES = [
	"./"
	, "./index.html"
	, "./offline.html"
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
				.map(c => c.split(CACHESEPARATOR))
				.filter(c => c[0] === CACHENAME)
				.filter(c => c[1] !== CACHEVERSION)
				.map(c => caches.delete(c.join(CACHESEPARATOR)))
				)
			)
		);
});

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

/*/ (estrategia offline) networkFirst
self.addEventListener("fetch", function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			return caches.match(event.request);
		})
		);
});
/**/

// Evento al recibir una peticion push desde el backend
self.addEventListener('push', function(event) {

	/*/ Push data example
	var tag = new Date();
	tag = tag.getTime();

	var data_example = {
		title: 'Título'
		, options: {
			body: 'Mensaje'
			, tag: 'push-' + tag
			, vibrate: [200, 100, 200]
			, renotify: true
			, icon: './images/icons/launcher-icon-1x.png'
			, image: './images/p3.jpg' //Relacion aspecto 10:4
			, actions: [
				{
					action: 'reply'
					, title: 'Responder'
					, type: 'text'
					, placeholder: 'Escribe tu respuesta'
				}
				, {
					action: 'action'
					, title: 'Me interesa'
					, type: 'button'
				}
			]
			, data: {
				id: 9999
				, url: 'https://google.com'
			}
		}
	};
	console.debug(JSON.stringify(data_example));
	/**/

	console.debug(event);
	try {
		var data = event.data.json();
		data = JSON.parse(data.notification.body);

		if (('title' in data) && ('options' in data)) {

			event.waitUntil(self.registration.showNotification(data.title, data.options));
		}
	}
	catch(error) {
		console.error(error);
	}
});

// Evento al recibir una peticion sync desde el backend
self.addEventListener('sync', function(event) {
	console.debug(event.tag);

	event.waitUntil(SWApp.syncLocales());
});
/**/

// Evento al cerrar la notificacion
self.addEventListener('notificationclose', event => {
	console.debug(event);
});
/**/

// Evento al hacer click en la notificacion
self.addEventListener('notificationclick', event => {

	console.debug(event);

	if (event.action !== '')
		console.debug(event.action);

	if ((event.reply !== '') && (event.reply !== null)) {

		console.debug(event.reply);

		var data = {
			title: event.notification.title
			, body: event.notification.body
			, reply: event.reply
		}

		saveReply(data)
		.then(data => console.log(data));
	}

	event.notification.close();

	console.debug(event.notification.data);
	/*/ Para redireccionar a la url especificada por el cliente
	try {
		if (event.notification.data.url)
			return clients.openWindow(event.notification.data.url);
	}
	catch(error) {
		//console.error(error);
	}
	/**/

	/*/ Ir a la aplicación
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
	/**/

}, false);
/**/

// Utilidades
var SWApp = {
	syncLocales : () => {
		console.debug('syncLocales');
	}
};

async function saveReply(data) {


	var date = new Date();

	var _date = date.getFullYear();

	var _month = date.getMonth() + 1;
	_month = (_month < 10) ? '0' + _month : _month;
	_date += "/" + _month;

	var _day = date.getDate();
	_day = (_day < 10) ? '0' + _day : _day;
	_date += "/" + _day;
	
	var _hours = date.getHours();
	_hours = (_hours < 10) ? '0' + _hours : _hours;

	var _minutes = date.getMinutes();
	_minutes = (_minutes < 10) ? '0' + _minutes : _minutes;

	var _seconds = date.getSeconds();
	_seconds = (_seconds < 10) ? '0' + _seconds : _seconds;

	_date += " " + _hours;
	_date += ":" + _minutes;
	_date += ":" + _seconds;

	var _reply = _date + " - " + data.title + " - " + data.body + " - " + data.reply;

	// read our JSON
	var misCabeceras = new Headers();

	var miInit = { 
		method: 'POST'
		, headers: misCabeceras
		//, mode: 'cors'
		, mode: 'no-cors'
		, cache: 'default'
	};
	
	let response = await fetch(`https://ganalez-test.herokuapp.com/save-reply.php?reply=${_reply}`, miInit);
	return response;
}
/**/