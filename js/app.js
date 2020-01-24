const textbox = document.getElementById('text');

// Agregar serviceWorker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('./service-workers.js').then(function(registration) {
			// Si es exitoso
			console.log('SW registrado correctamente');
			textbox.innerHTML += '<li>SW registrado correctamente</li>';
		}, function(err) {
			// Si falla
			console.log('SW fallo', err);
			textbox.innerHTML += '<li>SW fallo</li>';
		});
	});
}

var app = {
	saludo: 'Hola mundo'
};

console.debug(app.saludo);

/**
var notificationBtn = document.getElementById('enable');

if(('permission' in Notification) && (Notification.permission === 'granted') ){
	notificationBtn.style.display = 'none';
}

textbox.innerHTML += '<li>' + Notification.permission + '</li>';

function askNotificationPermission() {


	// function to actually ask the permissions
	function handlePermission(permission) {
		// Whatever the user answers, we make sure Chrome stores the information
		if(!('permission' in Notification)) {
			Notification.permission = permission;
		}

		// set the button to shown or hidden, depending on what the user answers
		if(Notification.permission === 'denied' || Notification.permission === 'default') {
			notificationBtn.style.display = 'block';
		} else {
			notificationBtn.style.display = 'none';
		}
	}

	// Let's check if the browser supports notifications
	if (!"Notification" in window) {
		console.log("This browser does not support notifications.");
	} else {
		if(checkNotificationPromise()) {
			Notification.requestPermission()
			.then((permission) => {
				handlePermission(permission);
			})
		} else {
			Notification.requestPermission(function(permission) {
				handlePermission(permission);
			});
		}
	}
}

function checkNotificationPromise() {
	try {
		Notification.requestPermission().then();
	} catch(e) {
		return false;
	}

	return true;
}


/**

// Agregar notificaciones push
var Notification = window.Notification || window.mozNotification || window.webkitNotification;

Notification.requestPermission().then(function(permission) {
	// console.log(permission);
	textbox.innerHTML += '<li>permission</li>';
});

/**/

function show2() {

	textbox.innerHTML += '<li>click show</li>';
	alert('asdasd');
	
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
			textbox.innerHTML += '<li>onclick</li>';
		};
		instance.onerror = function () {
			// Something to do
			console.log('onerror');
			textbox.innerHTML += '<li>onerror</li>';
		};
		instance.onshow = function () {
			// Something to do
			console.log('onshow');
			textbox.innerHTML += '<li>onshow</li>';
		};
		instance.onclose = function () {
			// Something to do
			console.log('onclose');
			textbox.innerHTML += '<li>onclose</li>';
		};
	}, 5000);

	return false;
}
/**/