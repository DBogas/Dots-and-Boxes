CREATE TABLE Users(name VARCHAR(32) NOT NULL, pass VARCHAR(32) NOT NULL, salt VARCHAR(4) NOT NULL, PRIMARY KEY (name) ) ENGINE=INNODB; 
CREATE TABLE Rankings ( name VARCHAR(32) NOT NULL, level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL, boxes INT NOT NULL, time INT NOT NULL, INDEX (level, boxes, time), FOREIGN KEY (name) REFERENCES Users (name) ON DELETE CASCADE ) ENGINE=INNODB; 