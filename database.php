<?php
    // Get database config from environment or use local defaults
    $hostName = getenv('DB_HOST') ?: "localhost";
    $dbUser = getenv('DB_USER') ?: "root";
    $dbPassword = getenv('DB_PASSWORD') ?: "root";
    $dbName = getenv('DB_NAME') ?: "sibucao_log_register";
    
    $conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
    if (!$conn) {
        die("Database connection failed: " . mysqli_connect_error());
    }
?>