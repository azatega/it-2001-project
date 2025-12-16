<?php
require_once __DIR__ . '/JWTMiddleware.php';

// Middleware that requires admin role
class RequireAdmin extends JWTMiddleware
{
	public function before($params)
	{
		// First run the parent JWT middleware to decode the token
		parent::before($params);

		// Then check if user is admin
		$user = Flight::get('user');
		if (!$user || $user->role !== 'admin')
			Flight::halt(403, json_encode(['error' => 'Forbidden: Admin access required']));
	}
}
