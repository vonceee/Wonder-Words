<?php
    // Start the session
    session_start();

    // Include the database connection file
    include_once "database.php";

    // Check if user data exists in the session
    if(isset($_SESSION["user"])) {
        // Retrieve the user's first name from the session
        $firstName = $_SESSION["user"]["First_Name"]; // Check the session key and structure
        
        // Retrieve the user's ID from the session
        $userId = $_SESSION["user"]["id"];
    } else {
        // Redirect the user to the login page if session data is not available
        header("Location: login.php");
        exit(); // Terminate script execution
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http_equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class ="container">
    <h1>Welcome to Dashboard, <?php echo $firstName . " (User ID: " . $userId . ")"; ?></h1>
        <a href="homepage.php" class="btn btn-link">Play Hangaroo</a>
        <a href="logout.php" class="btn btn-warning">Logout</a>
    </div>
</body>
</html>
