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
)->addMiddleware(RequireAdmin::class);

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
		$user = Flight::get('user');

		$data = Flight::request()->data->getData();
		// Ensure the user_id is set to the authenticated user
		$data['user_id'] = $user->id;
		$commentService->create($data);
	}
)->addMiddleware(RequireUser::class);

// Update comment
Flight::route(
	'PUT /api/comments/@id',
	function ($id) use ($commentService) {
		$user = Flight::get('user');

		// Get the comment to check ownership
		$comment = $commentService->getById($id);
		if (!$comment)
			haltJson(404, 'Comment not found');

		// Check if user is admin or owner of the comment
		if ($user->role !== 'admin' && $comment['user_id'] != $user->id)
			haltJson(403, 'Forbidden: You can only update your own comments');

		$data = Flight::request()->data->getData();
		$commentService->update($id, $data);
	}
)->addMiddleware(RequireUser::class);

// Delete comment
Flight::route(
	'DELETE /api/comments/@id',
	function ($id) use ($commentService) {
		$user = Flight::get('user');

		// Get the comment to check ownership
		$comment = $commentService->getById($id);
		if (!$comment)
			haltJson(404, 'Comment not found');

		// Check if user is admin or owner of the comment
		if ($user->role !== 'admin' && $comment['user_id'] != $user->id)
			haltJson(403, 'Forbidden: You can only delete your own comments');

		$commentService->delete($id);
	}
)->addMiddleware(RequireUser::class);
