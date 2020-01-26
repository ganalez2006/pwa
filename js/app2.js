"use strict";

var app = {
	msgServiceUnsupported: document.getElementById('msgServiceUnsupported')
	, msgNotificationDenied: document.getElementById('msgNotificationDenied')
	, btnSubscription: document.getElementById('btnSubscription')
	, listLog: document.getElementById('listLog')

	// Comprobar el soporte de notificaciones push y serviceWorker
	, serviceSupported: () => {
		return ('serviceWorker' in navigator && 'PushManager' in window);
	}
	// Preguntar al usuario si quiere recibir notificaciones
	, askNotificationPermission: () => {
		
		if (app.serviceSupported()) {

			// Solicitar permisos
			Notification.requestPermission()
			.then((permission) => {

				if (permission == 'granted') {

					// registrar serviceWorker
					app.registerServiceWorker();
				} else {
					// mostrar mensaje para notificaciones bloqueadas
					app.msgNotificationDenied.classList.remove('hide');
				}

				// ocultar botón para suscripción
				app.btnSubscription.classList.add('hide');
			});
		} else {
			// Mostrar mensaje en caso de no soportar los servicios
		}
	}
	//
	, init: () => {


		if (!app.serviceSupported()) {

			// mostrar mensaje para navegadores sin soporte
			app.msgServiceUnsupported.classList.remove('hide');

		} else if (Notification.permission === 'denied') {

			// mostrar mensaje para notificaciones bloqueadas
			app.msgNotificationDenied.classList.remove('hide');

		} else if (Notification.permission === 'default') {
			
			// mostrar botón para suscripción
			app.btnSubscription.classList.remove('hide');
			app.btnSubscription.onclick = (e) => {
				e.preventDefault();
				app.askNotificationPermission();
			};
		}
	}
	// registrar serviceWorker
	, registerServiceWorker: () => {
		
		if (app.serviceSupported()) {
			
			navigator.serviceWorker.register('./service-workers.js').then(function(registration) {
				// Si es exitoso
				console.log('SW registrado correctamente');
				app.listLog.innerHTML += '<li>SW registrado correctamente</li>';
			}, function(err) {
				// Si falla
				console.debug('SW error', err);
				app.listLog.innerHTML += '<li>SW error</li>';
			});
		}
	}
};

app.init();