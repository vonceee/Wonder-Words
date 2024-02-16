<?php
    session_start();
    if(isset($_POST["login"])){
        $email=$_POST["email"];
        $password=$_POST["password"];
        require_once "database.php";
        $sql="SELECT * FROM user WHERE email='$email'";
        $result=mysqli_query($conn, $sql);
        $user=mysqli_fetch_array($result, MYSQLI_ASSOC);
        if ($user) {
            if (password_verify($password, $user["password"])) {
                // Set user data in session
                $_SESSION["user"] = $user;
                // Redirect to dashboard
                header("Location: dashboard.php");
                die();
            } else {
                echo "<div class='alert alert-danger'> Password does not match</div>";
            }
        } else {
            echo "<div class='alert alert-danger'>Email does not match </div>";
        }
    }
?>
