"use strict";

var app = {
	wrapMsg: document.getElementById('msgError')
	, btnSubscription: document.getElementById('btnSubscription')
	, listLog: document.getElementById('listLog')

	, msgServiceUnsupported: document.getElementById('msgServiceUnsupported')
	, msgNotificationDenied: document.getElementById('msgNotificationDenied')


	// Mostrar log
	, showLog: (msg) => {
		app.listLog.innerHTML += '<li>'+msg+'</li>';
	}
	// Mostrar mensaje
	, showMsg: (msg) => {
		app.wrapMsg.classList.remove('hide');
		app.wrapMsg.innerHTML = '<p>'+msg+'</p>';
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
	// registrar serviceWorker
	, registerServiceWorker: () => {
		
		navigator.serviceWorker.register('./service-workers.js').then(function(registration) {
			// Si es exitoso
			app.showLog('SW registrado correctamente');

			// cambiar el serviceWorker por defecto de firebase
			app.firebaseMessaging.useServiceWorker(registration);
		}, function(err) {
			// Si falla
			app.showMsg('SW error', err);
		});
	}
	, registerSubscriptionFirebase: () => {

		const messaging = app.firebaseMessaging;

		// Get Instance ID token. Initially this makes a network call, once retrieved
		// subsequent calls to getToken will return from cache.
		messaging.getToken().then((currentToken) => {

			if (currentToken) {

				app.showLog('currentToken:');
				app.showLog(currentToken);

				// 
				app.showMsg('Servicio de notificaciones activo.');

				// [Aquí] Funcion para enviar el token al servidor.
			} else {

				app.showMsg('Se requieren permisos para el uso de este servicio.');
			}
		}).catch((err) => {
			app.showMsg('Error al crear el token <br>' + err);
			console.debug('Error al crear el token: ', err);
		});

		// ocultar botón para suscripción
		app.btnSubscription.classList.add('hide');
	}
	// Funcion de inicio
	, init: () => {

		if (!('serviceWorker' in navigator && 'PushManager' in window)) {
			app.showMsg('Servicio no disponible para este dispositivo.');
			return;
		}

		// iniciar servicios de firebase
		app.firebaseInit();

		// registrar serviceWorker
		app.registerServiceWorker();
		
		try {
			switch(Notification.permission) {

				case 'default':
				// mostrar botón para suscripción
				app.btnSubscription.classList.remove('hide');
				app.btnSubscription.onclick = (e) => {
					e.preventDefault();

					// click para registrar suscriptor
					app.registerSubscriptionFirebase();
				};
				break;

				case 'denied':
				app.showMsg('Servicio de notificaciones desactivado por el usuario.');
				break;

				case 'granted':
				app.showMsg('Servicio de notificaciones activo.');

				// token de usuario
				navigator.serviceWorker.ready.then(function(registration) {
					
					try {
						app.firebaseMessaging.getToken().then((currentToken) => { 

							app.showLog('currentToken:');
							app.showLog(currentToken);

							// send token to SW
							registration.active.postMessage({
								currentToken: currentToken
							});
							/**/
						}, function(err) {
							// Si falla
							app.showMsg('SW error', err);
						});
					}
					catch(error) {
						app.showMsg(error);
					}
				});
				break;
			}
		} catch(err) {
			app.showMsg(err);
		};
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