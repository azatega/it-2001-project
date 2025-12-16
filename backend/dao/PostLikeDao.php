<?php
require_once __DIR__ . '/BaseDao.php';

class PostLikeDao extends BaseDao
{
	protected $table_name;

	public function __construct()
	{
		$this->table_name = "post_likes";
		parent::__construct($this->table_name);
	}

	public function is_liked($post_id, $user_id)
	{
		$stmt = $this->connection->prepare("SELECT id FROM " . $this->table_name . " WHERE post_id = :post_id AND user_id = :user_id LIMIT 1");
		$stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
		return $stmt->fetch() !== false;
	}

	public function like($post_id, $user_id)
	{
		if ($this->is_liked($post_id, $user_id))
			return true;

		$stmt = $this->connection->prepare("INSERT INTO " . $this->table_name . " (post_id, user_id) VALUES (:post_id, :user_id)");
		$stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
		return true;
	}

	public function unlike($post_id, $user_id)
	{
		$stmt = $this->connection->prepare("DELETE FROM " . $this->table_name . " WHERE post_id = :post_id AND user_id = :user_id");
		$stmt->execute([':post_id' => $post_id, ':user_id' => $user_id]);
		return $stmt->rowCount() > 0;
	}

	public function getLikeCount($post_id)
	{
		$stmt = $this->connection->prepare("SELECT COUNT(*) as count FROM " . $this->table_name . " WHERE post_id = :post_id");
		$stmt->execute([':post_id' => $post_id]);
		$result = $stmt->fetch();
		return $result['count'];
	}
}
