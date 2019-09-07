
CREATE TABLE `current_affair_quiz` (
	`qid` INT NOT NULL AUTO_INCREMENT,
	`question` varchar(255) NOT NULL,
	`optiona` varchar(255) NOT NULL,
	`optionb` varchar(255) NOT NULL,
	`optionc` varchar(255) NOT NULL,
	`optiond` varchar(255) NOT NULL,
	`answer` varchar(255) NOT NULL,
	PRIMARY KEY (`qid`)
);

CREATE TABLE `subject_quiz` (
	`qid` INT NOT NULL AUTO_INCREMENT,
	`question` varchar(255) NOT NULL,
	`optiona` varchar(255) NOT NULL,
	`optionb` varchar(255) NOT NULL,
	`optionc` varchar(255) NOT NULL,
	`optiond` varchar(255) NOT NULL,
	`answer` varchar(255) NOT NULL,
	PRIMARY KEY (`qid`)
);

CREATE TABLE `admin` (
	`uid` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`uid`)
);
