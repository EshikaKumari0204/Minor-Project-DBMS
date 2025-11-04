CREATE DATABASE IF NOT EXISTS mental_health_tracker;
USE mental_health_tracker;

CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin','therapist','client')
);

CREATE TABLE IF NOT EXISTS Therapists (
  therapist_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  specialization VARCHAR(100),
  experience INT,
  availability VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Clients (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  age INT,
  gender ENUM('Male','Female','Other'),
  contact VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  therapist_id INT,
  client_id INT,
  session_date DATE,
  session_time TIME,
  duration INT,
  status ENUM('scheduled','completed','cancelled'),
  notes TEXT,
  FOREIGN KEY (therapist_id) REFERENCES Therapists(therapist_id) ON DELETE SET NULL,
  FOREIGN KEY (client_id) REFERENCES Clients(client_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Mood_Track (
  mood_id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT,
  date DATE,
  mood_score INT,
  notes TEXT,
  FOREIGN KEY (client_id) REFERENCES Clients(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT,
  rating INT,
  comments TEXT,
  FOREIGN KEY (session_id) REFERENCES Sessions(session_id) ON DELETE CASCADE
);
