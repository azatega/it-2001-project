<?php
require_once __DIR__ . '/BaseDao.php';

class UserDao extends BaseDao
{
	protected $table_name;

	public function __construct()
	{
		$this->table_name = "users";
		parent::__construct($this->table_name);
	}

	public function getByUsername($username)
	{
		$stmt = $this->connection->prepare("SELECT * FROM " . $this->table_name . " WHERE username = :username");
		$stmt->bindParam(':username', $username);
		$stmt->execute();
		return $stmt->fetch();
	}
}
