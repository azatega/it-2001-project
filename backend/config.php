<?php

// Taken from https://github.com/ibu-web-programming2001/Web-Programming-2025/blob/main/lecture-code/backend/rest/config.php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config
{
	public static function DB_NAME()
	{
		return Config::get_env("DB_NAME", "it2001");
	}

	public static function DB_PORT()
	{
		return Config::get_env("DB_PORT", 3306);
	}

	public static function DB_USER()
	{
		return Config::get_env("DB_USER", 'root');
	}

	public static function DB_PASSWORD()
	{
		return Config::get_env("DB_PASSWORD", '');
	}

	public static function DB_HOST()
	{
		return Config::get_env("DB_HOST", '127.0.0.1');
	}

	public static function JWT_SECRET()
	{
		return Config::get_env("JWT_SECRET", 'w0kk/2LaU1nFBH6wIH7u6rI4AwdYRGeaXbXRXsKckZfD3+1S5wYEBic+sQ/ZUMFF');
	}

	public static function get_env($name, $default)
	{
		return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
	}
}
