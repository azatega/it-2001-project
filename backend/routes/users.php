<?php
require_once __DIR__ . '/../services/UserService.php';

$userService = new UserService();

// Get all users
Flight::route(
	'GET /api/users',
	function () use ($userService) {
		$users = $userService->getAll();
		// Remove passwords from response
		foreach ($users as &$user_data) {
			unset($user_data['password']);
		}
		Flight::json($users);
	}
)->addMiddleware(RequireAdmin::class);

// Get user by ID
Flight::route(
	'GET /api/users/@id',
	function ($id) use ($userService) {
		$user = Flight::get('user');

		// Users can only view their own profile unless they're admin
		if ($user->role !== 'admin' && $user->id != $id)
			Flight::halt(403, json_encode(['error' => 'Forbidden: You can only view your own profile']));

		$user_data = $userService->getById($id);
		if (!$user_data)
			throw new Exception('User not found');
		unset($user_data['password']);
		Flight::json($user_data);
	}
)->addMiddleware(RequireUser::class);

// Update user
Flight::route(
	'PUT /api/users/@id',
	function ($id) use ($userService) {
		$user = Flight::get('user');

		// Users can only update their own profile unless they're admin
		if ($user->role !== 'admin' && $user->id != $id)
			Flight::halt(403, json_encode(['error' => 'Forbidden: You can only update your own profile']));

		$data = Flight::request()->data->getData();

		// Prevent non-admins from changing their own role
		if ($user->role !== 'admin' && isset($data['role']))
			unset($data['role']);

		$userService->update($id, $data);
	}
)->addMiddleware(RequireUser::class);

// Delete user
Flight::route(
	'DELETE /api/users/@id',
	function ($id) use ($userService) {
		$userService->delete($id);
	}
)->addMiddleware(RequireAdmin::class);
