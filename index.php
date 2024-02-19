<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
	
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wonder Words</title>
	<link rel="icon" href="./assets/points.png">
	<link rel="stylesheet" href="mystyle.css">

</head>

<body>
	<!-- UsernameText -->
	<?php
       if(isset($_SESSION["user"]["username"])) {
			$username = $_SESSION["user"]["username"];
            echo '<h4 id="usernameText">Hi! ' . $username . '</h4>';
        }?>	
	<!-- UsernameText -->

	<!-- Left Box Layout -->
	<div class="menuBox">
			
		
		<button class="btn1" id="playBtn"><b>Play</b></button>
		
		<button class="btn1" id="howToPlayBtn"><b>How to Play</b></button>

		<!-- Overlay -->
		<div id="modalOverlay" class="overlay"></div>

		<button class="btn1" id="leaderboardsBtn"><b>Leaderboards</b></button>
		<button class="btn1" onclick="toggleMusic()"><b>Toggle Music</b></button>
		<br><br>
		
		<!-- Only Appear if User is Logged In -->
		<?php
        if(isset($_SESSION["user"])){
            echo '<button id="logoutBtn" class="btn1"><b>Logout</b></button>';
        }?>	
		<!-- Only Appear if User is Logged In -->

		<!-- The Modal -->
		<div id="howToPlayModal" class="modal">
		  <!-- Modal Content -->
		  <div class="modal-content">
			<span id="closeModalBtn">&times;</span>
			<h2 style="text-align: center;">HOW TO PLAY</h2>
			<p style="text-align: justify;"><b>
			CATEGORIES:<br><br>There are 3 categories <span style="color: green;">Easy</span>, <span style="color: orange;">Moderate</span>, and <span style="color: red;">Difficult</span> categories, each with 10 questions. Answer by selecting letters to form the correct answer.<br><br>
			POINTS:<br><br>Earn <span style="color: green;">10 points</span> for each correct answer. Spend points <span style="color: blue;">(25 each) on clues</span> - choose between vowel or consonant clues. You have <span style="color: blue;">3 clues</span> for the entire game.<br><br>
			STRIKES:<br><br>You have 3 chances. <span style="color: red;">Three wrong guesses</span> and you lose.<br><br>
			<h2 style="text-align: center;">Good Luck!<h2></b></p>
		  </div>
		</div>

		<!-- The Modal -->
        <div id="leaderboardsModal" class="modal">
            <!-- Modal Content -->
            <div class="modal-content">
                <span id="closeLeaderboardsModalBtn">&times;</span>
                <!-- Add your leaderboards content here -->
                <h2 style="text-align: center;">LEADERBOARDS</h2>
                
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // Include the database connection file
                        include_once "database.php";
        
                        // Write the SQL query to select the top 10 highest scores with user's First_Name
                        $sql = "SELECT u.username, l.score 
                                FROM leaderboard l
                                INNER JOIN user u ON l.user_id = u.id
                                ORDER BY l.score DESC LIMIT 10";
        
                        // Prepare and execute the query
                        $stmt = $conn->prepare($sql);
                        $stmt->execute();
        
                        // Get the result set
                        $result = $stmt->get_result();
        
                        // Fetch the results as an associative array
                        $topScores = $result->fetch_all(MYSQLI_ASSOC);
        
                        // Display the results in a table
                        $rank = 1;
                        foreach ($topScores as $score) {
                            echo "<tr>";
                            echo "<td>" . $rank . "</td>";
                            
                            if ($rank === 1) {
                                echo "<td>" . "<span>&#x1F451;</span>" . " " . $score['username'] . "</td>";
                            } else {
                                echo "<td>" . $score['username'] . "</td>";
                            }
                            
                            echo "<td>" . $score['score'] . "</td>";
                            echo "</tr>";
                            $rank++;
                        }
        
                        // Close the statement
                        $stmt->close();
        
                        // Close the database connection
                        $conn->close();
                        ?>
                    </tbody>
                </table>
            </div>
        </div>

		<!-- The Modal for Logout Confirmation -->
		<div id="logoutModal" class="modal">
			<!-- Modal Content -->
			<div class="modal-content">
				<h2 style="text-align: center;">Logout Confirmation</h2>
				<p style="text-align: center;">Are you sure you want to logout?</p>
				<a href="logout.php"><button class="btn1" id="confirmLogoutBtn"><b>Yes</b></button></a>
				<button class="btn1" id="cancelLogoutBtn"><b>Cancel</b></button>
			</div>
		</div>

		<!-- The Modal for Login/Register -->
		<div id="loginModal" class="modal">
			<!-- Modal Content -->
			<div class="modal-content">
				<span id="closeModalBtn">&times;</span>
				<h2 style="text-align: center;">Not Logged In!</h2>
				<p style="text-align: center;">Make sure to login/register first.</p>
				<a href="login.php"><button class="btn1" id="loginBtn"><b>Login</b></button></a>
				<a href="login.php"><button class="btn1" id="logoutBtn"><b>Register</b></button></a>
			</div>
		</div>
	</div>

	<!-- Right Box Layout -->
    <div class="titleBox">
		<img id="title" src="./assets/title.png">
	</div> 
	
	<footer>Mendoza | Rañola | Sibucao | Marcos | De Francia</footer>
	
	
	<audio id="buttonPress" src="./assets/buttonPress.mp3"></audio>
	<audio id="gameMusic" src="./assets/homepageBackground.mp3" autoplay loop preload="auto"></audio>

	<script src="homepage_script.js"></script>
	
</body>
</html>