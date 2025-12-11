# Wonder Words - Setup Guide

## Quick Start

### Prerequisites
1. **PHP 7.0+** - [Download](https://www.php.net/downloads)
2. **MySQL 5.7+** or **MariaDB** - [Download](https://www.mysql.com/downloads/) or [MariaDB](https://mariadb.org/download/)
3. Any text editor or IDE (VS Code, PHPStorm, etc.)

### Setup Steps

#### 1. Start MySQL Server
- **Windows**: Open Services (services.msc) and start MySQL or MariaDB service
- Or use: `mysql -u root` in terminal if installed via command line

#### 2. Create Database & Tables
Run these SQL commands in MySQL:

```sql
-- Create database
CREATE DATABASE sibucao_log_register;
USE sibucao_log_register;

-- Create users table
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create scores table
CREATE TABLE scores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

#### 3. Start PHP Server
Run this command in the project directory:
```bash
php -S localhost:8000
```

#### 4. Open in Browser
Navigate to: `http://localhost:8000/index.php`

### Default Credentials
- Email: `test@test.com`
- Password: `test123` (if you create this user)

### Troubleshooting
- **"Connection refused"** → Check if MySQL service is running
- **"Table not found"** → Run the SQL commands above
- **"Port 8000 already in use"** → Use a different port: `php -S localhost:8001`

## Project Structure
- `index.php` - Main menu/homepage
- `login.php` - Login page
- `registration.php` - Register new users
- `game.php` - Main game interface
- `leaderboard.php` - View high scores
- `database.php` - Database connection config
- `myscript_game.js` - Game logic
- `mystyle.css` - Styling

