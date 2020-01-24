// Agregar serviceWorker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('./service-workers.js').then(function(registration) {
			// Si es exitoso
			console.log('SW registrado correctamente');
		}, function(err) {
			// Si falla
			console.log('SW fallo', err);
		});
	});
}

var app = {
	saludo: 'Hola mundo'
};

console.debug(app.saludo);

// Agregar notificaciones push
var Notification = window.Notification || window.mozNotification || window.webkitNotification;

Notification.requestPermission(function (permission) {
	// console.log(permission);
});

function show() {
	window.setTimeout(function () {

		var instance = new Notification(
			"titulo de la notificacion", {
				body: "Mensaje a mostrar",
				icon: "https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/81166872_212815416544938_4862436782680835568_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Fwo66KurzTgAX-KSEgC&oh=a2f6ff7ebbd5be9e41c6387160cbfaca&oe=5EBF7536"
			}
		);

		instance.onclick = function () {
			// Something to do
			console.log('onclick');
		};
		instance.onerror = function () {
			// Something to do
			console.log('onerror');
		};
		instance.onshow = function () {
			// Something to do
			console.log('onshow');
		};
		instance.onclose = function () {
			// Something to do
			console.log('onclose');
		};
	}, 3000);

	return false;
}