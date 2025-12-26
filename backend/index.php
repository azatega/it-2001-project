<?php
// Run autoloader
require 'vendor/autoload.php';
require __DIR__ . '/config.php';
require __DIR__ . '/middleware/JWTMiddleware.php';
require __DIR__ . '/middleware/RequireAdmin.php';
require __DIR__ . '/middleware/RequireUser.php';

// Utility function to halt with JSON error
function haltJson($statusCode, $error)
{
	header('Content-Type: application/json');
	Flight::halt($statusCode, json_encode(['error' => $error]));
}

// Enable CORS for all routes
Flight::before('start', function () {
	Flight::response()->header('Access-Control-Allow-Origin', '*');
	Flight::response()->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	Flight::response()->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

Flight::route('/', function () {
	Flight::json([
		'message' => 'Blog API Server',
		'version' => '1.0',
	]);
});

// Serve uploaded images
Flight::route('/uploads/@filename', function ($filename) {
	$filePath = __DIR__ . '/uploads/' . basename($filename);

	if (!file_exists($filePath))
		Flight::halt(404, 'Image not found');

	// Get file extension and set appropriate content type
	$extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
	$contentTypes = [
		'jpg' => 'image/jpeg',
		'jpeg' => 'image/jpeg',
		'png' => 'image/png',
		'webp' => 'image/webp'
	];

	$contentType = $contentTypes[$extension] ?? 'application/octet-stream';

	header('Content-Type: ' . $contentType);
	header('Content-Length: ' . filesize($filePath));
	readfile($filePath);
	exit;
});

require __DIR__ . '/routes/auth.php';
require __DIR__ . '/routes/users.php';
require __DIR__ . '/routes/posts.php';
require __DIR__ . '/routes/comments.php';
require __DIR__ . '/routes/categories.php';
require __DIR__ . '/routes/likes.php';

Flight::start();
