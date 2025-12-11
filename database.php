<?php
    $hostName = "localhost";
    $dbUser = "root";
    $dbPassword = "root";
    $dbName = "sibucao_log_register";
    $conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
    if (!$conn) {
        die("Something went wrong!");
    }
?>