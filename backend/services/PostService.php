<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PostDao.php';

class PostService extends BaseService
{
	public function __construct()
	{
		$dao = new PostDao();
		parent::__construct($dao);
	}

	public function getBySlug($slug)
	{
		return $this->dao->getBySlug($slug);
	}

	public function create($data)
	{
		// Validate required fields
		if (empty($data['title']))
			throw new Exception("Title is required");
		if (empty($data['category_id']))
			throw new Exception("Category ID is required");

		// Generate slug from title if not provided
		if (empty($data['slug']))
			$data['slug'] = $this->generateSlug($data['title']);

		// Check if slug already exists
		$existingPost = $this->getBySlug($data['slug']);
		if ($existingPost)
			$data['slug'] = $data['slug'] . '-' . time();

		// Handle image upload
		if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK)
			$data['image'] = $this->handleImageUpload($_FILES['image']);

		// Set default values if not provided
		if (!isset($data['date_published']))
			$data['date_published'] = date('Y-m-d H:i:s');

		return parent::create($data);
	}

	public function update($id, $data)
	{
		// Validate title if provided
		if (isset($data['title']) && empty($data['title']))
			throw new Exception("Title cannot be empty");

		// Update slug if title changed
		if (isset($data['title']) && !isset($data['slug'])) {
			$data['slug'] = $this->generateSlug($data['title']);

			// Check if new slug conflicts with existing posts (excluding current post)
			$existingPost = $this->getBySlug($data['slug']);
			if ($existingPost && $existingPost['id'] != $id)
				$data['slug'] = $data['slug'] . '-' . time();
		}

		// Handle image upload
		if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK)
			$data['image'] = $this->handleImageUpload($_FILES['image']);

		return parent::update($id, $data);
	}

	private function generateSlug($title)
	{
		// Convert to lowercase
		$slug = strtolower($title);

		// Replace spaces with hyphens
		$slug = str_replace(' ', '-', $slug);

		// Remove special characters
		$slug = preg_replace('/[^a-z0-9\-]/', '', $slug);

		// Remove multiple consecutive hyphens
		$slug = preg_replace('/-+/', '-', $slug);

		// Trim hyphens from ends
		$slug = trim($slug, '-');

		return $slug;
	}

	private function handleImageUpload($file)
	{
		// Validate file type
		$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
		if (!in_array($file['type'], $allowedTypes))
			throw new Exception('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');

		// Validate file size (max 5MB)
		$maxSize = 5 * 1024 * 1024;
		if ($file['size'] > $maxSize)
			throw new Exception('File size exceeds 5MB limit.');

		// Generate unique filename
		$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
		$filename = uniqid('post_') . '_' . time() . '.' . $extension;

		// Upload directory
		$uploadDir = __DIR__ . '/../uploads/';
		if (!is_dir($uploadDir))
			mkdir($uploadDir, 0777, true);

		// Move uploaded file
		$targetPath = $uploadDir . $filename;
		if (!move_uploaded_file($file['tmp_name'], $targetPath))
			throw new Exception('Failed to upload image.');

		return $filename;
	}

	private function deleteImage($filename)
	{
		if (empty($filename)) return;

		$filePath = __DIR__ . '/../uploads/' . $filename;
		if (file_exists($filePath))
			unlink($filePath);
	}
}
