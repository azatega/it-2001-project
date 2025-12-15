<?php
require_once __DIR__ . '/../services/CommentService.php';

$commentService = new CommentService();

// Get all comments
Flight::route(
	'GET /api/comments',
	function () use ($commentService) {
		$comments = $commentService->getAll();
		Flight::json($comments);
	}
);

// Get comment by ID
Flight::route(
	'GET /api/comments/@id',
	function ($id) use ($commentService) {
		$comment = $commentService->getById($id);
		if (!$comment)
			throw new Exception('Comment not found');
		Flight::json($comment);
	}
);

// Get comments by post
Flight::route(
	'GET /api/posts/@post_id/comments',
	function ($post_id) use ($commentService) {
		$comments = $commentService->getByPostId($post_id);
		Flight::json($comments);
	}
);

// Create comment
Flight::route(
	'POST /api/comments',
	function () use ($commentService) {
		$data = Flight::request()->data->getData();
		$commentService->create($data);
	}
);

// Update comment
Flight::route(
	'PUT /api/comments/@id',
	function ($id) use ($commentService) {
		$data = Flight::request()->data->getData();
		$commentService->update($id, $data);
	}
);

// Delete comment
Flight::route(
	'DELETE /api/comments/@id',
	function ($id) use ($commentService) {
		$commentService->delete($id);
	}
);
