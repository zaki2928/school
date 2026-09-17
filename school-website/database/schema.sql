-- =====================================================
-- SCHOOL WEBSITE DATABASE
-- Run this in MySQL Workbench or: mysql -u root -p < schema.sql
-- =====================================================

CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- -----------------------------------------------------
-- USERS (students + admin)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  class_name VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- TEACHERS / FACULTY
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  email VARCHAR(120),
  phone VARCHAR(20),
  bio TEXT,
  image_url VARCHAR(255)
);

-- -----------------------------------------------------
-- COURSES / CLASSES
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  grade_level VARCHAR(50),
  teacher_id INT,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- NOTES (study materials)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  class_name VARCHAR(50),
  content TEXT NOT NULL,
  file_url VARCHAR(255),
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- NOTICES / ANNOUNCEMENTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  important TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- EVENTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location VARCHAR(150)
);

-- -----------------------------------------------------
-- CONTACT MESSAGES
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- GALLERY
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  image_url VARCHAR(255) NOT NULL,
  caption VARCHAR(255)
);

-- =====================================================
-- SAMPLE DATA (so website is not empty)
-- =====================================================

INSERT INTO users (name, email, password, role, class_name) VALUES
('Admin User', 'admin@school.com', 'admin123', 'admin', NULL),
('Riya Sharma', 'riya@student.com', 'student123', 'student', 'Class 10'),
('Aman Verma', 'aman@student.com', 'student123', 'student', 'Class 9');

INSERT INTO teachers (name, subject, email, phone, bio) VALUES
('Mrs. Priya Mehta', 'Mathematics', 'priya@school.com', '9876500001', '10+ years teaching Maths. Loves making algebra simple.'),
('Mr. Rajesh Kumar', 'Science', 'rajesh@school.com', '9876500002', 'Physics & Chemistry specialist.'),
('Ms. Ananya Das', 'English', 'ananya@school.com', '9876500003', 'Focus on writing skills and literature.'),
('Mr. Vikram Singh', 'Computer Science', 'vikram@school.com', '9876500004', 'Teaches coding, web and databases.');

INSERT INTO courses (title, description, grade_level, teacher_id) VALUES
('Mathematics', 'Algebra, Geometry and Mensuration', 'Class 10', 1),
('Science', 'Physics, Chemistry and Biology basics', 'Class 9', 2),
('English Literature', 'Poetry, prose and grammar', 'Class 10', 3),
('Computer Basics', 'HTML, CSS, JS and databases', 'Class 9-10', 4);

INSERT INTO notes (title, subject, class_name, content, uploaded_by) VALUES
('Algebra Formulas', 'Mathematics', 'Class 10',
 'Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\n(a+b)² = a² + 2ab + b²\n(a-b)² = a² - 2ab + b²\na² - b² = (a+b)(a-b)', 1),
('Laws of Motion', 'Science', 'Class 9',
 'Newton 1: Object stays at rest or uniform motion unless force acts.\nNewton 2: F = ma\nNewton 3: Every action has equal and opposite reaction.', 1),
('Essay Writing Tips', 'English', 'Class 10',
 '1. Start with a clear introduction.\n2. Use 3 body paragraphs.\n3. End with a conclusion.\n4. Check spelling and grammar.', 1),
('HTML Basics', 'Computer Science', 'Class 9-10',
 'HTML = structure of a webpage.\nTags: <html>, <head>, <body>, <h1>, <p>, <a>, <img>\nExample: <h1>Hello School</h1>', 1);

INSERT INTO notices (title, body, important) VALUES
('School Reopening', 'School reopens on Monday 8:00 AM. Bring your ID cards.', 1),
('Parent-Teacher Meeting', 'PTM will be held this Saturday from 10 AM to 1 PM.', 1),
('Library Hours', 'Library is open Mon–Fri, 9 AM to 4 PM.', 0);

INSERT INTO events (title, description, event_date, location) VALUES
('Annual Day', 'Music, dance and prize distribution', '2026-12-15', 'School Auditorium'),
('Science Fair', 'Students showcase science projects', '2026-11-10', 'Science Block'),
('Sports Meet', 'Inter-house sports competitions', '2026-10-20', 'School Ground');

INSERT INTO gallery (title, image_url, caption) VALUES
('Campus', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', 'Our beautiful campus'),
('Classroom', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', 'Smart classrooms'),
('Library', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', 'Quiet study space'),
('Sports', 'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=800', 'Sports day moments');
