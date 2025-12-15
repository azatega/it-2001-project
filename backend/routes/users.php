<?php
require_once __DIR__ . '/../services/UserService.php';

$userService = new UserService();

// Get all users
Flight::route(
	'GET /api/users',
	function () use ($userService) {
		$users = $userService->getAll();
		// Remove passwords from response
		foreach ($users as &$user) {
			unset($user['password']);
		}
		Flight::json($users);
	}
);

// Get user by ID
Flight::route(
	'GET /api/users/@id',
	function ($id) use ($userService) {
		$user = $userService->getById($id);
		if (!$user)
			throw new Exception('User not found');
		unset($user['password']);
		Flight::json($user);
	}
);

// Register new user
Flight::route(
	'POST /api/users/register',
	function () use ($userService) {
		$data = Flight::request()->data->getData();
		$userService->register($data);
	}
);

// Login user
Flight::route(
	'POST /api/users/login',
	function () use ($userService) {
		$data = Flight::request()->data->getData();
		$user = $userService->login($data['username'], $data['password']);
		Flight::json($user);
	}
);

// Update user
Flight::route(
	'PUT /api/users/@id',
	function ($id) use ($userService) {
		$data = Flight::request()->data->getData();
		$userService->update($id, $data);
	}
);

// Delete user
Flight::route(
	'DELETE /api/users/@id',
	function ($id) use ($userService) {
		$userService->delete($id);
	}
);
