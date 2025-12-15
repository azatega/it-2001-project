<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/CategoryDao.php';

class CategoryService extends BaseService
{
	public function __construct()
	{
		$dao = new CategoryDao();
		parent::__construct($dao);
	}

	public function create($data)
	{
		// Validate required fields
		if (empty($data['name']))
			throw new Exception("Category name is required");

		// Validate name length
		if (strlen($data['name']) < 2)
			throw new Exception("Category name must be at least 2 characters long");
		if (strlen($data['name']) > 100)
			throw new Exception("Category name cannot exceed 100 characters");

		return parent::create($data);
	}

	public function update($id, $data)
	{
		// Validate name if provided
		if (isset($data['name'])) {
			if (empty($data['name']))
				throw new Exception("Category name cannot be empty");
			if (strlen($data['name']) < 2)
				throw new Exception("Category name must be at least 2 characters long");
			if (strlen($data['name']) > 100)
				throw new Exception("Category name cannot exceed 100 characters");
		}

		return parent::update($id, $data);
	}
}
