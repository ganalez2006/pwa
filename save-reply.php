<?php

$file = 'reply.html';
$file_content = (file_exists($file)) ? file_get_contents($file) : '';

$reply = file_get_contents('php://input');
$reply = ($reply !== '') ? json_decode($reply) : (object)[];
$reply = (property_exists($reply, 'reply')) ? htmlspecialchars($reply->reply) : '';

if ($reply !== '') {

	date_default_timezone_set('America/La_Paz');
	$date = date("Y/m/d H:i:s");

	$reply = $date . '|' . trim($reply, '|');

	// Log de respuestas
	$fch = fopen($file, "a");
	fwrite($fch, $reply . "\n");
	fclose($fch);

	//var_dump(explode('|', $reply));

	echo 'ok';
} elseif (array_key_exists('show', $_REQUEST)) {
	header('Content-Type: text/html; charset=utf-8');
	echo "<pre>".htmlspecialchars_decode($file_content)."</pre>";
}