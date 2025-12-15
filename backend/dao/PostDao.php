<?php
require_once __DIR__ . '/BaseDao.php';

class PostDao extends BaseDao
{
	protected $table_name;

	public function __construct()
	{
		$this->table_name = "posts";
		parent::__construct($this->table_name);
	}

	public function getAll()
	{
		$stmt = $this->connection->prepare("
			SELECT 
				p.*,
				c.id as category_id,
				c.name as category_name,
				c.slug as category_slug
			FROM " . $this->table_name . " p
			LEFT JOIN categories c ON p.category_id = c.id
			ORDER BY p.date_published DESC
		");
		$stmt->execute();
		return $stmt->fetchAll();
	}

	public function getBySlug($slug)
	{
		$stmt = $this->connection->prepare("
			SELECT 
				p.*,
				c.id as category_id,
				c.name as category_name,
				c.slug as category_slug
			FROM " . $this->table_name . " p
			LEFT JOIN categories c ON p.category_id = c.id
			WHERE p.slug = :slug
		");
		$stmt->bindParam(':slug', $slug);
		$stmt->execute();
		return $stmt->fetch();
	}
}
