<?php
require_once __DIR__ . '/../services/CategoryService.php';

$categoryService = new CategoryService();

// Get all categories
Flight::route(
	'GET /api/categories',
	function () use ($categoryService) {
		$categories = $categoryService->getAll();
		Flight::json($categories);
	}
);

// Get category by ID
Flight::route(
	'GET /api/categories/@id',
	function ($id) use ($categoryService) {
		$category = $categoryService->getById($id);
		if (!$category)
			throw new Exception('Category not found');

		Flight::json($category);
	}
);

// Create category
Flight::route(
	'POST /api/categories',
	function () use ($categoryService) {
		$data = Flight::request()->data->getData();
		$categoryService->create($data);
	}
);

// Update category
Flight::route(
	'PUT /api/categories/@id',
	function ($id) use ($categoryService) {
		$data = Flight::request()->data->getData();
		$categoryService->update($id, $data);
	}
);

// Delete category
Flight::route(
	'DELETE /api/categories/@id',
	function ($id) use ($categoryService) {
		$categoryService->delete($id);
	}
);
