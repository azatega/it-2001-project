<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PostLikeDao.php';

class PostLikeService extends BaseService
{
	public function __construct()
	{
		$dao = new PostLikeDao();
		parent::__construct($dao);
	}

	public function isLiked($post_id, $user_id)
	{
		if (empty($post_id) || empty($user_id))
			throw new Exception("Post ID and User ID are required");
		return $this->dao->is_liked($post_id, $user_id);
	}

	public function like($post_id, $user_id)
	{
		if (empty($post_id))
			throw new Exception("Post ID is required");
		if (empty($user_id))
			throw new Exception("User ID is required");
		return $this->dao->like($post_id, $user_id);
	}

	public function unlike($post_id, $user_id)
	{
		if (empty($post_id))
			throw new Exception("Post ID is required");
		if (empty($user_id))
			throw new Exception("User ID is required");
		return $this->dao->unlike($post_id, $user_id);
	}

	public function getLikeCount($post_id)
	{
		if (empty($post_id))
			throw new Exception("Post ID is required");
		return $this->dao->getLikeCount($post_id);
	}
}
