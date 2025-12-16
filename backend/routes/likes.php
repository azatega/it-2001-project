<?php
require_once __DIR__ . '/../services/PostLikeService.php';

$postLikeService = new PostLikeService();

// Like a post
Flight::route(
	'POST /api/posts/@post_id/like',
	function ($post_id) use ($postLikeService) {
		$user = Flight::get('user');
		$postLikeService->like($post_id, $user->id);
	}
)->addMiddleware(RequireUser::class);

// Unlike a post
Flight::route(
	'POST /api/posts/@post_id/unlike',
	function ($post_id) use ($postLikeService) {
		$user = Flight::get('user');
		$postLikeService->unlike($post_id, $user->id);
	}
)->addMiddleware(RequireUser::class);
