"use strict";

var app = {
	msgServiceUnsupported: document.getElementById('msgServiceUnsupported')
	, msgNotificationDenied: document.getElementById('msgNotificationDenied')
	, btnSubscription: document.getElementById('btnSubscription')
	, listLog: document.getElementById('listLog')
	, messaging: ''

	// Comprobar el soporte de notificaciones push y serviceWorker
	, serviceSupported: () => {
		return ('serviceWorker' in navigator && 'PushManager' in window);
	}
	// registrar serviceWorker
	, registerServiceWorker: () => {
		
		if (app.serviceSupported()) {
			
			navigator.serviceWorker.register('./service-workers.js').then(function(registration) {
				// Si es exitoso
				console.log('SW registrado correctamente');
				app.listLog.innerHTML += '<li>SW registrado correctamente</li>';

				// cambiar el serviceWorker por defecto de firebase
				app.firebaseMessaging.useServiceWorker(registration);
			}, function(err) {
				// Si falla
				console.debug('SW error', err);
				app.listLog.innerHTML += '<li>SW error</li>';
			});
		}
	}
	, firebaseMessaging: ''
	, firebaseInit: () => {

		// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyCuMQvWQDrPlsx4g24Ym2RNo3jd5Ts2bkE",
			authDomain: "test-pwa-6be03.firebaseapp.com",
			databaseURL: "https://test-pwa-6be03.firebaseio.com",
			projectId: "test-pwa-6be03",
			storageBucket: "test-pwa-6be03.appspot.com",
			messagingSenderId: "228335643470",
			appId: "1:228335643470:web:e478c73ea06b9c6b858c1f"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);

		// Retrieve Firebase Messaging object.
		const messaging = firebase.messaging();

		// Add the public key generated from the console here.
		messaging.usePublicVapidKey("BD1q7scbIb_UGTNaRkU6MeHQrFx8FJnRjRUvT415NyhYzaer44Lsa7uldgPchm75xvprGc1n-PUNQUVxW6yZqqo");

		// variable para uso de la aplicacion
		app.firebaseMessaging = messaging;
	}
	, registerSubscriptionFirebase: () => {

		const messaging = app.firebaseMessaging;

		// Get Instance ID token. Initially this makes a network call, once retrieved
		// subsequent calls to getToken will return from cache.
		messaging.getToken().then((currentToken) => {

			if (currentToken) {
				console.debug('currentToken', currentToken);

				app.listLog.innerHTML += '<li>currentToken</li>';
				app.listLog.innerHTML += '<li>'+currentToken+'</li>';
				//sendTokenToServer(currentToken);
				//updateUIForPushEnabled(currentToken);
			} else {
			// Show permission request.
			console.log('No Instance ID token available. Request permission to generate one.');
			// Show permission UI.
			//updateUIForPushPermissionRequired();
			//setTokenSentToServer(false);
			}
		}).catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// showToken('Error retrieving Instance ID token. ', err);
			//setTokenSentToServer(false);
		});
	}
	//
	, init: () => {

		if (app.serviceSupported()) {

			// iniciar servicios de firebase
			app.firebaseInit();

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

				// Registrar al suscriptor
				app.registerSubscriptionFirebase();
			};
		}

		// token de usuario
		navigator.serviceWorker.ready.then(function(registration) {
			
			if (Notification.permission === 'granted') {
				try {
					app.firebaseMessaging.getToken().then((token) => { 
						console.debug(token);
					});
				}
				catch(error) {
					console.error(error);
				}
			}
		});
		/**/

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