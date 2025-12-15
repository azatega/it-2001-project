<?php
require_once __DIR__ . '/JWTMiddleware.php';

// Middleware that requires authenticated user
class RequireUser extends JWTMiddleware
{
	public function before($params)
	{
		// First run the parent JWT middleware to decode the token
		parent::before($params);

		// Then check if user is authenticated
		$user = Flight::get('user');
		if (!$user)
			Flight::halt(401, json_encode(['error' => 'Unauthorized: Authentication required']));
	}
}
