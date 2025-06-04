CREATE DATABASE IF NOT EXISTS ahp_db1;

USE ahp_db1;

CREATE TABLE IF NOT EXISTS ahp_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    goal_name VARCHAR(255) NOT NULL,
    criteria_weights JSON,
    alternatives_results JSON,
    chosen_alternative VARCHAR(255),
    visual_data JSON
);