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
		$stmt = $this->connection->prepare(
			"SELECT c.*, u.username 
			FROM " . $this->table_name . " c 
			JOIN users u ON c.user_id = u.id 
			WHERE c.post_id = :post_id 
			ORDER BY c.timestamp DESC"
		);
		$stmt->bindParam(':post_id', $post_id);
		$stmt->execute();
		return $stmt->fetchAll();
	}
}
