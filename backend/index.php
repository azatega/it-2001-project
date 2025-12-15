<?php
// Run autoloader
require 'vendor/autoload.php';

Flight::route('/', function () {
	Flight::json([
		'message' => 'Blog API Server',
		'version' => '1.0',
	]);
});

// Serve uploaded images
Flight::route('/uploads/@filename', function ($filename) {
	$filePath = __DIR__ . '/uploads/' . basename($filename);

	if (!file_exists($filePath)) {
		Flight::halt(404, 'Image not found');
	}

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

require __DIR__ . '/routes/users.php';
require __DIR__ . '/routes/posts.php';
require __DIR__ . '/routes/comments.php';
require __DIR__ . '/routes/categories.php';
require __DIR__ . '/routes/likes.php';

Flight::start();
