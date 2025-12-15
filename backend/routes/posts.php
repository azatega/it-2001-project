<?php
require_once __DIR__ . '/../services/PostService.php';
require_once __DIR__ . '/../services/PostLikeService.php';

$postService = new PostService();

// Get all posts
Flight::route(
	'GET /api/posts',
	function () use ($postService) {
		$posts = $postService->getAll();
		Flight::json($posts);
	}
);

// Get post by slug
Flight::route(
	'GET /api/posts/slug/@slug',
	function ($slug) use ($postService) {
		$post = $postService->getBySlug($slug);
		if (!$post)
			throw new Exception('Post not found');

		$postLikeService = new PostLikeService();
		$post['like_count'] = $postLikeService->getLikeCount($post['id']);

		$user_id = Flight::request()->query->user_id ?? null;
		if ($user_id)
			$post['is_liked'] = $postLikeService->isLiked($post['id'], $user_id);

		Flight::json($post);
	}
);

// Create post
Flight::route(
	'POST /api/posts',
	function () use ($postService) {
		$data = Flight::request()->data->getData();
		$postService->create($data);
	}
)->addMiddleware(RequireAdmin::class);

// Update post
Flight::route(
	'PUT /api/posts/@id',
	function ($id) use ($postService) {
		$data = Flight::request()->data->getData();
		$postService->update($id, $data);
	}
)->addMiddleware(RequireAdmin::class);

// Delete post
Flight::route(
	'DELETE /api/posts/@id',
	function ($id) use ($postService) {
		$postService->delete($id);
	}
)->addMiddleware(RequireAdmin::class);
