<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Send to all</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" />

	<style>
	label {
		display: block;
		font-weight: bold;
		margin: auto auto 20px;
		width: 300px;
	}
	input {
		display: block;
		padding: 10px;
		border: 1px solid #cdcdcd;
		width: calc(300px - 20px - 2px);
		border-radius: 4px;
		margin: auto;
	}
	</style>
</head>
<body>
	<form method="post">
		<label for="title">
			title <br>
			<input type="text" id="title" name="title">
		</label>
		<label for="icon">
			icon <br>
			<input type="text" id="icon" name="icon">
		</label>
		<label for="image">
			image <br>
			<input type="text" id="image" name="image">
		</label>
		<label for="body">
			body <br>
			<input type="text" id="body" name="body">
		</label>

		<label for="">
			<input type="submit" value="enviar">
		</label>
	</form>
</body>
</html>

<?php
if ((!array_key_exists('title', $_REQUEST)) || ($_REQUEST['title'] == ''))
	exit;



// API access key from Google API's Console
define('API_ACCESS_KEY','AAAANSnda04:APA91bEyi6awZtp-8eO6hyTWJBfIKH8S-5nyD9dl0p8d_NImGn8I8nx9dqz2xe8kxx7Tf6PsiuMS__9B94miaBLOXcgQoQL_XLFCGoHWDRPbro6GOOcQgkvz9KPMVpt_gqJtnQnZpued');

$url = 'https://fcm.googleapis.com/fcm/send';
//$url = 'https://fcmregistrations.googleapis.com/v1/projects/test-pwa-6be03/send';


$title = 'Hola mundo';
$tag = 'tag-' . time();
$icon = '';
$image = '';
$body = '';

$title = (array_key_exists('title', $_REQUEST) && $_REQUEST['title'] != '') ? $_REQUEST['title'] : $title;
$icon = (array_key_exists('icon', $_REQUEST) && $_REQUEST['icon'] != '') ? $_REQUEST['icon'] : $icon;
$image = (array_key_exists('image', $_REQUEST) && $_REQUEST['image'] != '') ? $_REQUEST['image'] : $image;
$body = (array_key_exists('body', $_REQUEST) && $_REQUEST['body'] != '') ? $_REQUEST['body'] : $body;

$actions = array(
	'button-button' => array(
		array(
			'action' => 'action-1'
			, 'title' => 'Boton 1'
			, 'type' => 'button'
			)
		, array(
			'action' => 'action2'
			, 'title' => 'Boton 2'
			, 'type' => 'button'
			)
		)
	, 'text-button' => array(
		array(
			'action' => 'reply'
			, 'title' => 'Responder'
			, 'type' => 'text'
			, 'placeholder' => 'Escribe tu respuesta'
			)
		, array(
			'action' => 'action-1'
			, 'title' => 'Boton 1'
			, 'type' => 'button'
			)
		)
	, 'button' => array(
		array(
			'action' => 'action-1'
			, 'title' => 'Boton 1'
			, 'type' => 'button'
			)
		)
	, 'text' => array(
		array(
			'action' => 'reply'
			, 'title' => 'Responder'
			, 'type' => 'text'
			, 'placeholder' => 'Escribe tu respuesta'
			)
		)
	);

$data = array(
	'id' => 9999
	, 'url' => 'https://google.com'
	);

$body = array(
	'title' => $title
	, 'options' => array(
		'body' => $body
		, 'tag' => $tag
		, 'vibrate' => [200, 100, 200]
		, 'renotify' => true
		, 'icon' => $icon
		, 'image' => $image
		//, 'actions' => $actions['button-button']
		, 'actions' => $actions['text']
		, 'data' => $data
		)
	);

$to = [];
$to['fulano'] = 'token';

$fields = array( 
	'notification' => array(
		'body' => json_encode($body)
		)
	// Un usuario en particular
	//, 'to' =>  $to['fulano']
	// para todos los usuarios
	, 'condition' => "!('enninguno' in topics)"
	);

$headers = array( 
	'Authorization: key='.API_ACCESS_KEY, 
	'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL,$url);
curl_setopt( $ch,CURLOPT_POST,true);
curl_setopt( $ch,CURLOPT_HTTPHEADER,$headers);
curl_setopt( $ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER,false);
curl_setopt( $ch,CURLOPT_POSTFIELDS,json_encode($fields));
$result = curl_exec($ch);
curl_close($ch);

echo $result;
var_dump($result);

echo '<pre>'.json_encode($body).'</pre>';