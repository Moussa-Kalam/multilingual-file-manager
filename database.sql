CREATE DATABASE multifile_language_manager;

USE multifile_language_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  language VARCHAR(50) DEFAULT 'en'
);

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255) NOT NULL,
  size INT,
  type VARCHAR(50),
  path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);  
