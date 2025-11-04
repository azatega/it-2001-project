<?php
require_once 'BaseDao.php';

class PostDao extends BaseDao
{
	protected $table_name;

	public function __construct()
	{
		$this->table_name = "posts";
		parent::__construct($this->table_name);
	}

	public function getBySlug($slug)
	{
		$stmt = $this->connection->prepare("SELECT * FROM " . $this->table_name . " WHERE slug = :slug");
		$stmt->bindParam(':slug', $slug);
		$stmt->execute();
		return $stmt->fetch();
	}

	public function getByCategoryId($category_id)
	{
		$stmt = $this->connection->prepare("SELECT * FROM " . $this->table_name . " WHERE category_id = :category_id");
		$stmt->bindParam(':category_id', $category_id);
		$stmt->execute();
		return $stmt->fetchAll();
	}
}
