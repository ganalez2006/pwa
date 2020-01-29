<?php

$file = 'reply.html';
$file_content = (file_exists($file)) ? file_get_contents($file) : '';

if (array_key_exists('reply', $_REQUEST)) {

	var_dump($_REQUEST['reply']);

	// Log de respuestas
	$reply = $_REQUEST['reply'] . "\n";

	$fch = fopen($file, "a");
	fwrite($fch, $reply);
	fclose($fch);

	echo 'ok';
} elseif (array_key_exists('show', $_REQUEST)) {
	echo "<pre>".$file_content."</pre>";
}