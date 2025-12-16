<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';
require_once __DIR__ . '/../config.php';

use Firebase\JWT\JWT;

class UserService extends BaseService
{
	public function __construct()
	{
		$dao = new UserDao();
		parent::__construct($dao);
	}

	public function getByUsername($username)
	{
		return $this->dao->getByUsername($username);
	}

	private function generateToken($user)
	{
		// Generate JWT token
		$jwt_payload = [
			'user' => $user,
			'iat' => time(),
			'exp' => time() + (60 * 60 * 24) // valid for 1 day
		];

		return JWT::encode(
			$jwt_payload,
			Config::JWT_SECRET(),
			'HS256'
		);
	}

	public function register($data)
	{
		// Validate required fields
		if (empty($data['username']))
			throw new Exception("Username is required");
		if (empty($data['password']))
			throw new Exception("Password is required");

		// Validate password length
		if (strlen($data['password']) < 8)
			throw new Exception("Password must be at least 8 characters long");

		// Check if username already exists
		$existingUser = $this->getByUsername($data['username']);
		if ($existingUser)
			throw new Exception("Username already exists");

		// Hash password before storing
		$data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

		// Always set role to 'user' for registration
		$data['role'] = 'user';

		$user = $this->create($data);

		// Remove password from response
		unset($user['password']);

		// Generate and add JWT token
		$user['token'] = $this->generateToken($user);

		return $user;
	}

	public function login($username, $password)
	{
		$user = $this->getByUsername($username);

		if (!$user)
			throw new Exception("Invalid username or password");

		if (!password_verify($password, $user['password']))
			throw new Exception("Invalid username or password");

		// Remove password from response
		unset($user['password']);

		// Generate and add JWT token
		$user['token'] = $this->generateToken($user);

		return $user;
	}

	public function update($id, $data)
	{
		// If password is being updated, validate and hash it
		if (isset($data['password']) && !empty($data['password'])) {
			if (strlen($data['password']) < 8)
				throw new Exception("Password must be at least 8 characters long");
			$data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
		} else {
			// Don't update password if not provided
			unset($data['password']);
		}

		return parent::update($id, $data);
	}
}
