-- BookMyShoot Database Schema
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bookmyshoot
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bookmyshoot` ;

-- -----------------------------------------------------
-- Schema bookmyshoot
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookmyshoot` DEFAULT CHARACTER SET utf8 ;
USE `bookmyshoot` ;

-- -----------------------------------------------------
-- Table `bookmyshoot`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`users` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `role` ENUM('client', 'pro', 'admin') NOT NULL DEFAULT 'client',
  `password_hash` VARCHAR(255) NOT NULL,
  `locale` VARCHAR(10) NULL DEFAULT 'en',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`profiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`profiles` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`profiles` (
  `user_id` INT NOT NULL,
  `business_name` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `location_city` VARCHAR(100) NULL,
  `location_area` VARCHAR(100) NULL,
  `lat` DECIMAL(10,8) NULL,
  `lng` DECIMAL(11,8) NULL,
  `languages` VARCHAR(255) NULL COMMENT 'Comma separated list of language codes',
  `avg_rating` DECIMAL(3,2) NULL DEFAULT 0.00,
  `portfolio_count` INT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profiles_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`services`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`services` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pro_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `duration_minutes` INT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_services_users1_idx` (`pro_id` ASC),
  CONSTRAINT `fk_services_users1`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`packages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`packages` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`packages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `service_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `hours` DECIMAL(4,2) NULL,
  `details` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_packages_services1_idx` (`service_id` ASC),
  CONSTRAINT `fk_packages_services1`
    FOREIGN KEY (`service_id`)
    REFERENCES `bookmyshoot`.`services` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`portfolios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`portfolios` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`portfolios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pro_id` INT NOT NULL,
  `media_url` VARCHAR(500) NOT NULL,
  `media_type` ENUM('image', 'video') NOT NULL,
  `caption` VARCHAR(500) NULL,
  `thumbnail_url` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_portfolios_users1_idx` (`pro_id` ASC),
  CONSTRAINT `fk_portfolios_users1`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`availability` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`availability` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pro_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `is_booked` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_availability_users1_idx` (`pro_id` ASC),
  CONSTRAINT `fk_availability_users1`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`bookings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`bookings` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `pro_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `package_id` INT NULL,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `status` ENUM('pending', 'confirmed', 'completed', 'cancelled', 'rejected') NOT NULL DEFAULT 'pending',
  `total_price` DECIMAL(10,2) NOT NULL,
  `deposit_paid` DECIMAL(10,2) NULL,
  `payment_id` INT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_bookings_users1_idx` (`client_id` ASC),
  INDEX `fk_bookings_users2_idx` (`pro_id` ASC),
  INDEX `fk_bookings_services1_idx` (`service_id` ASC),
  INDEX `fk_bookings_packages1_idx` (`package_id` ASC),
  CONSTRAINT `fk_bookings_users1`
    FOREIGN KEY (`client_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_users2`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_services1`
    FOREIGN KEY (`service_id`)
    REFERENCES `bookmyshoot`.`services` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_packages1`
    FOREIGN KEY (`package_id`)
    REFERENCES `bookmyshoot`.`packages` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`payments` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'LKR',
  `provider` VARCHAR(100) NOT NULL,
  `status` ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  `transaction_id` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_payments_bookings1_idx` (`booking_id` ASC),
  CONSTRAINT `fk_payments_bookings1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `bookmyshoot`.`bookings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`reviews` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `pro_id` INT NOT NULL,
  `rating` TINYINT(1) NOT NULL,
  `comment` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_reviews_bookings1_idx` (`booking_id` ASC),
  INDEX `fk_reviews_users1_idx` (`client_id` ASC),
  INDEX `fk_reviews_users2_idx` (`pro_id` ASC),
  CONSTRAINT `fk_reviews_bookings1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `bookmyshoot`.`bookings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_users1`
    FOREIGN KEY (`client_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_users2`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`messages` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `from_user` INT NOT NULL,
  `to_user` INT NOT NULL,
  `message` TEXT NOT NULL,
  `attachments` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_bookings1_idx` (`booking_id` ASC),
  INDEX `fk_messages_users1_idx` (`from_user` ASC),
  INDEX `fk_messages_users2_idx` (`to_user` ASC),
  CONSTRAINT `fk_messages_bookings1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `bookmyshoot`.`bookings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`from_user`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_messages_users2`
    FOREIGN KEY (`to_user`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`categories` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`coupons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`coupons` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`coupons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `discount_type` ENUM('percentage', 'fixed') NOT NULL,
  `discount_value` DECIMAL(10,2) NOT NULL,
  `valid_from` DATETIME NOT NULL,
  `valid_to` DATETIME NOT NULL,
  `max_uses` INT NULL,
  `used_count` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`commissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`commissions` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`commissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `booking_id` INT NOT NULL,
  `pro_id` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'paid', 'refunded') NOT NULL DEFAULT 'pending',
  `paid_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_commissions_bookings1_idx` (`booking_id` ASC),
  INDEX `fk_commissions_users1_idx` (`pro_id` ASC),
  CONSTRAINT `fk_commissions_bookings1`
    FOREIGN KEY (`booking_id`)
    REFERENCES `bookmyshoot`.`bookings` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_commissions_users1`
    FOREIGN KEY (`pro_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookmyshoot`.`admin_logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`admin_logs` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`admin_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin_id` INT NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `table_name` VARCHAR(100) NULL,
  `record_id` INT NULL,
  `details` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_logs_users1_idx` (`admin_id` ASC),
  CONSTRAINT `fk_admin_logs_users1`
    FOREIGN KEY (`admin_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bookmyshoot`.`chatbot_conversations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`chatbot_conversations` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`chatbot_conversations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `user_message` TEXT NOT NULL,
  `bot_response` TEXT NOT NULL,
  `intent` VARCHAR(100) NOT NULL DEFAULT 'unknown',
  `context` JSON NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_chatbot_conversations_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_chatbot_conversations_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `bookmyshoot`.`notifications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmyshoot`.`notifications` ;

CREATE TABLE IF NOT EXISTS `bookmyshoot`.`notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `data` JSON NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `read_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_notifications_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_notifications_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookmyshoot`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;