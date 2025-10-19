<?php
// Run autoloader
require 'vendor/autoload.php';

// Define route and define function to handle requests
Flight::route('/', function () {
	echo 'Hello world!';
});

// Start FlightPHP
Flight::start();
