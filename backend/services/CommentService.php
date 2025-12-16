<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/CommentDao.php';

class CommentService extends BaseService
{
	public function __construct()
	{
		$dao = new CommentDao();
		parent::__construct($dao);
	}

	public function getByPostId($post_id)
	{
		return $this->dao->getByPostId($post_id);
	}

	public function create($data)
	{
		// Validate required fields
		if (empty($data['content']))
			throw new Exception("Comment content is required");
		if (empty($data['post_id']))
			throw new Exception("Post ID is required");
		if (empty($data['user_id']))
			throw new Exception("User ID is required");

		// Validate content length
		if (strlen($data['content']) < 1)
			throw new Exception("Comment content cannot be empty");
		if (strlen($data['content']) > 1000)
			throw new Exception("Comment content cannot exceed 1000 characters");

		// Set timestamp if not provided
		if (!isset($data['timestamp']))
			$data['timestamp'] = date('Y-m-d H:i:s');

		return parent::create($data);
	}

	public function update($id, $data)
	{
		// Validate content if provided
		if (isset($data['content'])) {
			if (empty($data['content']))
				throw new Exception("Comment content cannot be empty");
			if (strlen($data['content']) > 1000)
				throw new Exception("Comment content cannot exceed 1000 characters");
		}

		return parent::update($id, $data);
	}
}
