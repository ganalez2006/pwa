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

					// suscribir usuario 
					//app.registerSubscription();
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


		if (app.serviceSupported()) {
			// registrar serviceWorker
			app.registerServiceWorker();
		}

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
	// registrar suscripción en el servidor
	, registerSubscription: () => {

		var pushServerKey = 'BD1q7scbIb_UGTNaRkU6MeHQrFx8FJnRjRUvT415NyhYzaer44Lsa7uldgPchm75xvprGc1n-PUNQUVxW6yZqqo';

		/**
		return navigator.serviceWorker.ready.then(serviceWorker => {
			return serviceWorker.pushManager
			.subscribe({
				userVisibleOnly: true
				, aplicationServerKey: pushServerKey
			})
			.then(subscription => {
				console.debug('suscription', suscription);
				return suscription;
			});
		});
		/**/

		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
			.then(function(subscription) {
				if(subscription.endpoint.startsWith("https://android.googleapis.com/gcm/send")){
					var parts = subscription.endpoint.split("/");
					var registrationId = parts[parts.length -1];
					console.log("RegistrationId:")
					console.log(registrationId);
				}
			})
			.catch(function(e) {
				console.log('Something unfortunate happened: ' + e);
			});
		});

	}
};

app.init();


function showNotification(event) {

	event.preventDefault();

	Notification.requestPermission(function(result) {
		if (result === 'granted') {
			navigator.serviceWorker.ready.then(function(registration) {
				registration.showNotification('Título de la notificación', {
					// occiones
					body: 'Mensaje de la notificación. 2'
					, icon: './images/icons/launcher-icon-1x.png'
					, tag: 'jgil-pwa-test'
				});
			});
		}
	});
}