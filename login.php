<?php
    // Start the session
    session_start();
        if(isset($_SESSION["user"])){
            header("Location: game.php");
        }

    // Check if the login form is submitted
    if(isset($_POST["login"])){
        $email = $_POST["email"];
        $password = $_POST["password"];
        require_once "database.php";
        $sql = "SELECT * FROM user WHERE email='$email'";
        $result = mysqli_query($conn, $sql);
        $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
        if ($user) {
            if (password_verify($password, $user["password"])) {
                // Sets the user session
                $_SESSION["user"] = $user;
                // Redirect to the game.php page
                header("Location: game.php");
                exit(); // Stop script execution after redirect
            } else {
                // Password does not match
                $errorMessage = "Password does not match";
            }
        } else {
            // Email does not match
            $errorMessage = "Email does not match";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WonderWords Login</title>
  
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
  <link rel="icon" href="./assets/points.png">
  <link rel="stylesheet" href="login.css">
 
</head>
<body>

</body>
    <div class = "container">
        
    <?php if(isset($errorMessage)): ?>
        <div class='alert alert-danger'><?php echo $errorMessage; ?></div>
        <?php endif; ?>

        <form action="login.php" method="post">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password"  name="password" class="form-control" required>
                        </div>

                        <div class="form-btn">                        
                            <input type="submit" value ="Login" name="login" class="btn btn-primary">
                        </div>
        </form>
        <div><br><p>Not Registered yet? <a href="registration.php">Register Here</a></div>  
    </div>
    <footer>Mendoza | Rañola | Sibucao | Marcos | De Francia</footer>
</body>
</html>