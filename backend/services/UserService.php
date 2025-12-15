<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

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

		return $this->create($data);
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
