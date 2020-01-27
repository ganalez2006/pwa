<?php
// API access key from Google API's Console
define('API_ACCESS_KEY','AAAANSnda04:APA91bEyi6awZtp-8eO6hyTWJBfIKH8S-5nyD9dl0p8d_NImGn8I8nx9dqz2xe8kxx7Tf6PsiuMS__9B94miaBLOXcgQoQL_XLFCGoHWDRPbro6GOOcQgkvz9KPMVpt_gqJtnQnZpued');

$url = 'https://fcm.googleapis.com/fcm/send';

$title = '@helmet_indonesia';
$tag = 'tag-' . time();
$icon = 'https://scontent-mia3-1.cdninstagram.com/v/t51.2885-19/s150x150/30078221_372310423248218_4337383886209155072_n.jpg?_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_ohc=hpZxfLhIEK0AX99Ee3G&oh=e6ed36b1438a246b2fa172fd5ff32917&oe=5ECE6CE6';
$image = 'https://scontent-mia3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s750x750/82018619_782986595445444_8634981211527501189_n.jpg?_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=2b9AI32vMFQAX8J67XA&oh=c41f1cdb44c76386f232193be7d7702e&oe=5ECD0B4D';
$body = 'Sunday vibes';

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
		, 'actions' => $actions['text-button']
		, 'data' => $data
		)
	);

$to = [];
$to['redmi'] = 'fTQIiN665_z6AuaWsarX6s:APA91bHIliwGYXaminX9bGxpdSucIWrt4p1CB53GkPhOWNnBsQSd7oNAZ18_z6U7G6pT4LR5oaYBj6f_lhVhrFYub1pdXXW3AwE8jLxkk0gHTF335SAK3PYZJByzBVbQOa9p0vo5Eo4R';
$to['laptop'] = 'cak_SHtwe5VvsZq0ddGuTo:APA91bHdKZxVjc7ALWs34H60lpKjWQ0h9acMwtjdEO2uopcDGMlV4xODjvPPNMKfV-gZ0A5tiDsxX7rgHN0TucUPcF_iTKu7gjUIpOO1LqNi77zbRkDXW82UI08rbyWQEhzsD9PR3Hyp';



$fields = array( 
	'notification' => array(
		'body' => json_encode($body)
		)
	, 'to' =>  $to['redmi']
	, 'to' =>  $to['laptop']
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

echo '<pre>'.json_encode($body).'</pre>';