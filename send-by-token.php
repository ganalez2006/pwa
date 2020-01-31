<?php
// API access key from Google API's Console
define('API_ACCESS_KEY','AAAANSnda04:APA91bEyi6awZtp-8eO6hyTWJBfIKH8S-5nyD9dl0p8d_NImGn8I8nx9dqz2xe8kxx7Tf6PsiuMS__9B94miaBLOXcgQoQL_XLFCGoHWDRPbro6GOOcQgkvz9KPMVpt_gqJtnQnZpued');

$url = 'https://fcm.googleapis.com/fcm/send';

$title = '@helmet_indonesia';
$tag = 'tag-' . time();
$icon = 'https://scontent-mia3-1.cdninstagram.com/v/t51.2885-19/s150x150/79542261_567791763999477_2903843610917076992_n.jpg?_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_ohc=iRX37xiterwAX_IPGlW&oh=e39fd0c8b1b24f7da9e8cd3cf58492c2&oe=5EB92309';
$image = 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/82867744_258042528508480_4930865722176797546_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=104&_nc_ohc=7bOaBfVqpKkAX8Enn_o&oh=15e5e48d43f37f43b044f4f3d61680b0&oe=5ECD8E21';
$body = 'No se necesitan más razones ❤';
$body = 'No se necesitan más razones ❤ #ecoslovers #sícuadra';

$actions = array(
	'button' => array(
		array(
			'action' => 'action-1'
			, 'title' => 'Boton 1'
			, 'type' => 'button'
			)
		)
	, 'button-button' => array(
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
	, 'text' => array(
		array(
			'action' => 'reply'
			, 'title' => 'Responder'
			, 'type' => 'text'
			, 'placeholder' => 'Escribe tu respuesta'
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
	, 'button-text' => array(
		array(
			'action' => 'action-1'
			, 'title' => 'Boton 1'
			, 'type' => 'button'
			)
		, array(
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
		//, 'actions' => $actions['button']
		//, 'actions' => $actions['button-button']
		//, 'actions' => $actions['text']
		, 'actions' => $actions['button-text']
		, 'actions' => $actions['text-button']
		, 'data' => $data
		)
	);

$to = [];
$to['redmi'] = 'fTQIiN665_z6AuaWsarX6s:APA91bHIliwGYXaminX9bGxpdSucIWrt4p1CB53GkPhOWNnBsQSd7oNAZ18_z6U7G6pT4LR5oaYBj6f_lhVhrFYub1pdXXW3AwE8jLxkk0gHTF335SAK3PYZJByzBVbQOa9p0vo5Eo4R';
$to['laptop'] = 'dursn2uAKzU4VQy6wzUIvl:APA91bEMufb1adT_GS9MmxonGdSuJvSI7REb5t4Pn5H_EU0Gej9RFfJfR8YKfBGvCOj87dH81RzEkV8la66MSbIwpCozD3QU_zdsaOH_raCQeMvGxCfrRGNnfMScmn1FvyI09cxAg1Y5';

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

echo '<pre>'.json_encode($fields).'</pre>';