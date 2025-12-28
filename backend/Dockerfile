# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
	unzip \
	&& rm -rf /var/lib/apt/lists/*

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Configure PHP for Flight framework
RUN echo "output_buffering = Off" >> /usr/local/etc/php/conf.d/flight.ini && \
    echo "implicit_flush = On" >> /usr/local/etc/php/conf.d/flight.ini

# Enable Apache mod_rewrite and mod_headers
RUN a2enmod rewrite headers

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Create uploads directory and set permissions
RUN mkdir -p /var/www/html/uploads && \
	chown -R www-data:www-data /var/www/html && \
	chmod -R 755 /var/www/html

# Configure Apache
RUN echo '<Directory /var/www/html>\n\
	Options Indexes FollowSymLinks\n\
	AllowOverride All\n\
	Require all granted\n\
	DirectoryIndex index.php index.html\n\
	CGIPassAuth On\n\
	<FilesMatch \.php$>\n\
	SetHandler application/x-httpd-php\n\
	</FilesMatch>\n\
	</Directory>' > /etc/apache2/conf-available/docker-php.conf && \
	a2enconf docker-php

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
