<?php
require_once __DIR__ . '/../services/UserService.php';

Flight::group('/api/auth', function () {
	$userService = new UserService();

	// Register new user
	Flight::route("POST /register", function () use ($userService) {
		$data = Flight::request()->data->getData();

		try {
			$user = $userService->register($data);
			unset($user['password']);

			Flight::json([
				'message' => 'User registered successfully',
				'data' => $user
			]);
		} catch (Exception $e) {
			haltJson(400, $e->getMessage());
		}
	});

	// Login user
	Flight::route('POST /login', function () use ($userService) {
		$data = Flight::request()->data->getData();

		try {
			if (empty($data['username']) || empty($data['password']))
				throw new Exception('Username and password are required');

			$user = $userService->login($data['username'], $data['password']);

			Flight::json([
				'message' => 'User logged in successfully',
				'data' => $user
			]);
		} catch (Exception $e) {
			haltJson(401, $e->getMessage());
		}
	});

	// Get current user
	Flight::route('GET /whoami', function () {
		$user = Flight::get('user');
		Flight::json([
			'data' => $user // can be null, that's fine
		]);
	})->addMiddleware(JWTMiddleware::class);
});
