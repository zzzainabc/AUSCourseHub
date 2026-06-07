CREATE DATABASE CourseHubDB;
USE CourseHubDB;
-- to handle new users
CREATE TABLE Users (
    id VARCHAR(9) PRIMARY KEY,        
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- to store user schedules, linked to Users table
CREATE TABLE UserSchedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, -- matches the 'id' in your Users table
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(100) NOT NULL,
    course_type VARCHAR(50),
    days VARCHAR(255),             -- stores joined string like "Monday, Wednesday"
    start_time VARCHAR(20),        -- stores "8:00", "9:30", etc.
    room VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- if a user is deleted, their schedule is also deleted
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  course_code VARCHAR(20),
  course_name VARCHAR(100),
  semester VARCHAR(50),
  instructor VARCHAR(100),
  instructor_email VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT,
  task_name VARCHAR(100),
  due_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE grades (
  grade_id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT,
  name VARCHAR(100),
  grade DOUBLE,
  weight DOUBLE,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE flowchart_status (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    course_status VARCHAR(30) NOT NULL,
    UNIQUE KEY unique_user_course (user_id, course_code)
);

CREATE TABLE homepage_todos (
    todo_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(9) NOT NULL,
    task_text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
