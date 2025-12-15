import { API_BASE_URL } from './constants.js';

export async function request(endpoint, options = {}) {
	const token = localStorage.getItem('jwt_token');

	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	if (token)
		headers['Authorization'] = `Bearer ${token}`;

	const config = {
		...options,
		headers,
	};

	const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

	// Check if response is JSON before parsing
	const contentType = response.headers.get('content-type');
	const data = contentType?.includes('application/json')
		? await response.json()
		: {};

	if (!response.ok)
		throw new Error(data.error || `HTTP error! status: ${response.status}`);

	return data;
}

export async function getPosts() {
	return request('api/posts');
}

export async function getPost(slug) {
	return request(`api/posts/slug/${slug}`);
}

export async function getPostComments(postId) {
	return request(`api/posts/${postId}/comments`);
}

export async function createPost(formData) {
	const token = localStorage.getItem('jwt_token');

	const headers = {};
	if (token)
		headers['Authorization'] = `Bearer ${token}`;

	const config = {
		method: 'POST',
		headers,
		body: formData, // FormData for file upload
	};

	const response = await fetch(`${API_BASE_URL}api/posts`, config);

	// Check if response is JSON before parsing
	const contentType = response.headers.get('content-type');
	const data = contentType?.includes('application/json')
		? await response.json()
		: {};

	if (!response.ok)
		throw new Error(data.error || `HTTP error! status: ${response.status}`);

	return data;
}

export async function updatePost(id, formData) {
	const token = localStorage.getItem('jwt_token');

	const headers = {};
	if (token)
		headers['Authorization'] = `Bearer ${token}`;

	const config = {
		method: 'POST', // Using POST instead of PUT for multipart/form-data compatibility
		headers,
		body: formData, // FormData for file upload
	};

	const response = await fetch(`${API_BASE_URL}api/posts/${id}`, config);

	// Check if response is JSON before parsing
	const contentType = response.headers.get('content-type');
	const data = contentType?.includes('application/json')
		? await response.json()
		: {};

	if (!response.ok)
		throw new Error(data.error || `HTTP error! status: ${response.status}`);

	return data;
}

export async function getCategories() {
	return request('api/categories');
}

export async function login(username, password) {
	const response = await request('api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
	});

	if (response.data && response.data.token) {
		localStorage.setItem('jwt_token', response.data.token);
	}

	return response;
}

export async function register(userData) {
	const response = await request('api/auth/register', {
		method: 'POST',
		body: JSON.stringify(userData),
	});

	if (response.data && response.data.token) {
		localStorage.setItem('jwt_token', response.data.token);
	}

	return response;
}

export async function deletePost(id) {
	return request(`api/posts/${id}`, {
		method: 'DELETE',
	});
}

export async function whoami() {
	return request('api/auth/whoami');
}

export function logout() {
	localStorage.removeItem('jwt_token');
}

export async function likePost(postId) {
	return request(`api/posts/${postId}/like`, {
		method: 'POST',
	});
}

export async function unlikePost(postId) {
	return request(`api/posts/${postId}/unlike`, {
		method: 'POST',
	});
}

export async function getComments(postId) {
	return request(`api/posts/${postId}/comments`);
}

export async function createComment(commentData) {
	return request('api/comments', {
		method: 'POST',
		body: JSON.stringify(commentData),
	});
}
