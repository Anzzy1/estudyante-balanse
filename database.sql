-- Estudyante Balanse database
-- phpMyAdmin > click database > SQL tab > paste > Go
-- O kaya: Import tab > piliin ang file na ito > Go

CREATE DATABASE IF NOT EXISTS estudyante_balanse
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE estudyante_balanse;

-- Users (register/login)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Fixed subjects (mula sa Setup Step 2 + schedule editor)
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  days VARCHAR(50) NOT NULL COMMENT 'Hal: Mon,Wed,Fri',
  color VARCHAR(20) DEFAULT 'blue',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Fixed commitments (mula sa Setup Step 3 + schedule editor)
CREATE TABLE IF NOT EXISTS commitments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  days VARCHAR(50) NOT NULL,
  icon VARCHAR(10) DEFAULT '💼',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Today-only schedules (dashboard/schedule Add button)
CREATE TABLE IF NOT EXISTS today_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  sched_date DATE NOT NULL,
  name VARCHAR(150) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- User preferences (Setup Step 1 + Step 4, isang row kada user)
CREATE TABLE IF NOT EXISTS preferences (
  user_id INT PRIMARY KEY,
  level VARCHAR(50) DEFAULT '',
  job VARCHAR(10) DEFAULT '',
  priorities TEXT DEFAULT '',
  study_time VARCHAR(30) DEFAULT '',
  task_time VARCHAR(30) DEFAULT '',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
