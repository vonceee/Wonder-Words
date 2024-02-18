<?php
    session_start();
    if(isset($_SESSION["user"])){
        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        
        <meta charset="UTF-8">
        <meta name ="viewport" content ="width-device-width, initial-scale=1.0">
        <title>Registration From</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <?php
            if(isset($_POST["submit"])){
                $LastName = $_POST["LastName"];
                $FirstName = $_POST["FirstName"];
                $email = $_POST["email"];
                $password = $_POST["password"];
                $RepeatPassword = $_POST["repeat_password"];
                
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                $errors = array();
            

            if (empty($LastName) OR empty($FirstName) OR empty($email) OR empty($password) OR empty($RepeatPassword)) {
                array_push($errors, "All fields are required");
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                array_push($errors, "Email is not valid");

            }

            if (strlen($password)<8) {
                array_push ($errors, "Password must be at least 8 characters long");
            
            }

            if($password!=$RepeatPassword){
                array_push($errors, "Password does not match");
            }
            require_once "database.php";
            $sql="SELECT * FROM user WHERE email='$email'";
            $result=mysqli_query($conn, $sql);
            $rowCount=mysqli_num_rows($result);
            if ($rowCount>0) {
                array_push($errors, "Email Already Exist");
            }
            
            if (count($errors)>0){
                foreach ($errors as $error) {
                    echo"<div class='alert alert-danger'>$error</div>";
                }
            } else {
                require_once "database.php";
                $sql="INSERT INTO user(Last_Name, First_Name, email, password) values(?, ?, ?, ?)";
                $stmt=mysqli_stmt_init($conn); //initializes a statement and returns an object suitable for mysqli_stmt_prepare()
                $preparestmt=mysqli_stmt_prepare($stmt, $sql);
                if ($preparestmt) {
                    mysqli_stmt_bind_param($stmt, "ssss", $LastName, $FirstName, $email, $passwordHash);
                    mysqli_stmt_execute($stmt);
                    echo "<div class='alert alert-success'> You are Registered Successfully! </div>";
                } else {
                    die("Something went wrong");
                }
            }
        }   
    ?>
            <form action="registration.php" method="post">
                <div class="form-group">
                    <input type="text" class="form-control" name="LastName" placeholder="LastName">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="FirstName" placeholder="FirstName">
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Input Password: ">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="repeat_password" placeholder="Repeat Password: ">
                </div>
                <div class="form-group">
                    <input type="submit" name="submit" class="btn btn-primary" value="Register" placeholder="submit">
                </div>
            </form>
            <div><p>Already registered?<a href="login.php">Login Here</a></div>  
        </div>

        <script src="script.js" name="Register" placeholder="submit ">
    </body>
    </html>
