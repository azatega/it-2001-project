<?php
require_once __DIR__ . '/../services/PostLikeService.php';

$postLikeService = new PostLikeService();

// Check if post is liked by user
Flight::route(
	'GET /api/posts/@post_id/likes/@user_id',
	function ($post_id, $user_id) use ($postLikeService) {
		$isLiked = $postLikeService->isLiked($post_id, $user_id);
		Flight::json(['liked' => $isLiked]);
	}
);

// Like a post
Flight::route(
	'POST /api/posts/@post_id/likes',
	function ($post_id) use ($postLikeService) {
		$data = Flight::request()->data->getData();

		$user_id = $data['user_id'] ?? null;
		if (!$user_id)
			throw new Exception('User ID is required');

		$postLikeService->like($post_id, $user_id);
	}
);

// Unlike a post
Flight::route(
	'DELETE /api/posts/@post_id/likes/@user_id',
	function ($post_id, $user_id) use ($postLikeService) {
		$postLikeService->unlike($post_id, $user_id);
	}
);
