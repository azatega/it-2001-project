<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// JWT Decoding Middleware
class JWTMiddleware
{
	public function before($params)
	{
		$auth_header = Flight::request()->getHeader("Authorization");

		if ($auth_header) {
			try {
				$token = null;
				if (preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches))
					$token = $matches[1];

				if ($token) {
					$decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
					Flight::set('user', $decoded_token->user);
					Flight::set('jwt_token', $token);
				}
			} catch (\Exception $e) {
				Flight::halt(401, json_encode(['error' => 'Invalid token: ' . $e->getMessage()]));
			}
		}
	}

	public function after($params) {}
}
