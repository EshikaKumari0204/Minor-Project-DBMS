CREATE DATABASE IF NOT EXISTS mental_health_tracker;
USE mental_health_tracker;

CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL ,
  role ENUM('admin','therapist','client') NOT NULL
);

CREATE TABLE IF NOT EXISTS Therapists (
  therapist_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
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
  therapist_id INT NOT NULL,
  client_id INT NOT NULL,
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
  client_id INT NOT NULL,
  date DATE,
  mood_score INT CHECK (mood_score BETWEEN 1 AND 10),
  notes TEXT,
  FOREIGN KEY (client_id) REFERENCES Clients(client_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comments TEXT,
  FOREIGN KEY (session_id) REFERENCES Sessions(session_id) ON DELETE CASCADE
);


INSERT INTO Users (name, email, password, role) VALUES
  ('Admin User','admin@example.com','admin123','admin'),
  ('Dr. Priya','priya@example.com','therapist123','therapist'),
  ('Raj Client','raj@example.com','client123','client');

-- Link therapist row to Priya
INSERT INTO Therapists (user_id, specialization, experience, availability)
  VALUES ((SELECT user_id FROM Users WHERE email='priya@example.com'), 'CBT', 5, 'Mon-Fri 10:00-16:00');

-- Link client row to John
INSERT INTO Clients (user_id, age, gender, contact)
  VALUES ((SELECT user_id FROM Users WHERE email='raj@example.com'), 29, 'Male', '‪+911234567890‬');

-- Create one initial session (scheduled)
INSERT INTO Sessions (therapist_id, client_id, session_date, session_time, duration, status)
VALUES (
  (SELECT therapist_id FROM Therapists WHERE user_id=(SELECT user_id FROM Users WHERE email='priya@example.com')),
  (SELECT client_id FROM Clients WHERE user_id=(SELECT user_id FROM Users WHERE email='raj@example.com')),
  CURDATE(), '10:00:00', 60, 'scheduled'
);

INSERT INTO Mood_Track (client_id, date, mood_score, notes)
VALUES (
  (SELECT client_id FROM Clients WHERE user_id=(SELECT user_id FROM Users WHERE email='raj@example.com')),
  DATE_SUB(CURDATE(), INTERVAL 7 DAY), 4, 'Feeling anxious'
),
(
  (SELECT client_id FROM Clients WHERE user_id=(SELECT user_id FROM Users WHERE email='raj@example.com')),
  DATE_SUB(CURDATE(), INTERVAL 3 DAY), 6, 'Slight improvement'
);

INSERT INTO Feedback (session_id, rating, comments)
VALUES
(
    (SELECT session_id FROM Sessions 
     WHERE therapist_id = (SELECT therapist_id FROM Therapists WHERE user_id = (SELECT user_id FROM Users WHERE email='priya@example.com'))
       AND client_id = (SELECT client_id FROM Clients WHERE user_id = (SELECT user_id FROM Users WHERE email='raj@example.com'))
     LIMIT 1),
    4,
    'Good experience overall, therapist was understanding and gave helpful advice.'
  );
