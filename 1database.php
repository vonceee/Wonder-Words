<?php

    $hostName = "localhost";
    $dbUser = "id21883054_admin";
    $dbPassword = "Asdasdasd!1";
    $dbName = "id21883054_sibucao_log_register";
    $conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
    if (!$conn) {
        die("Something went wrong!");
    }
?>