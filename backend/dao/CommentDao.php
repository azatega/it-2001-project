<?php
require_once __DIR__ . '/BaseDao.php';

class CommentDao extends BaseDao
{
	protected $table_name;

	public function __construct()
	{
		$this->table_name = "comments";
		parent::__construct($this->table_name);
	}

	public function getByPostId($post_id)
	{
		$stmt = $this->connection->prepare("SELECT * FROM " . $this->table_name . " WHERE post_id = :post_id ORDER BY `timestamp` ASC");
		$stmt->bindParam(':post_id', $post_id);
		$stmt->execute();
		return $stmt->fetchAll();
	}
}
