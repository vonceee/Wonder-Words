<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="./assets/points.png">
	<link rel="stylesheet" href="mystyle.css">
	
	<!-- jQuery ni chatGPT -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<!-- jQuery ni chatGPT -->


    <title>Wonder Words</title>

</head>
<footer>Mendoza | Ranola | Sibucao | Marcos | De Francia</footer>
<body>

	<div class="menuBox">
	
		<div class="Panel">
			<a id="backBtn" href="index.php">
				<img src="./assets/exit.png" title="Go Back">
			</a>
		</div>
		
		<div class="Panel">
			<div id="pointsIcon"><img src="./assets/points.png" title="Points"></div>
			<div id="points" style="margin-left: 2vh;"></div>
		</div>
		
		<div class="Panel" id="strikesPanel">
			<div id="strikes"></div>
			<div id="strikesIcon" title="Lives"></div>
		</div>
		
		<div class="Panel-1">
			<div id="clues"></div><br>
			<div id="category"></div><br>
			<div id="questions"></div><br>
		</div>
		
		<button class="modalClueButtons" id="clueButton" onclick="showCluePopup()"><b>Use Clue</b></button>
		
		<div class="modal" id="clueModal">
			<!-- pop-overlay UNKNOWN CLASS?! -->
			<div class="modal-content popup-overlay">
			<!-- pop-overlay UNKNOWN CLASS?! -->
			
				<!-- make font larger, bobo nanan nag code pangit implementation -->
				<p style="font-size: 5vh;">Please select a type of clue.<br><br></p> 
				<!-- make font larger, bobo nanan nag code pangit implementation -->

				<!-- change button class so line 171 works in javaScript -->
				<button class="modalClueButtons" onclick="useClue('consonant'), closeCluePopup()">Consonant</button> 
				<button class="modalClueButtons" onclick="useClue('vowel'), closeCluePopup()">Vowel</button>
				<button class="modalClueButtons" onclick="closeCluePopup()">Cancel</button>
				<!-- change button class so line 171 works in javaScript -->
			</div>
		</div>
		
		<button id="playMusic"><b>Toggle Music</b></button>
		
		<button onclick="showResetConfirmationPopup()"><b>Reset Game</b></button>
		
	</div>

<div class="overlay" id="overlay"></div>

<div class="menuBox1" id="word-display"></div>
<div class="menuBox2" id="keyboard"></div>

<div id="custom-alert-box" class="box">
    <div id="custom-alert-content"></div>
    <button class="btn1" id="custom-button" onclick="removeCustomAlert()">OK</button>
</div>

<div id="reset-alert-box">
    <div id="reset-alert-content">Are you sure you want to reset the game? You will lose all your current progress.<br><br><br><br><br></div>
    <button onclick="resetGame(), hideResetConfirmationPopup()">Yes</button>
    <button onclick="hideResetConfirmationPopup()">Cancel</button>
</div>

<div id="login-alert-box">
    <div id="reset-alert-content">You are not logged in yet, please login to save your score!<br><br><br><br><br></div>
    <button onclick="redirectToLogin(), hideLoginConfirmationPopup()">Login</button>
    <button onclick="redirectToRegistration(), hideLoginConfirmationPopup()">Register</button>
</div>

<footer>Mendoza | Ranola | Sibucao | Marcos | De Francia</footer>

<audio id="buttonPress" src="./assets/buttonPress.mp3"></audio>
<audio id="backgroundMusic" src="./assets/gameBackground.mp3"  loop></audio>
<audio id="deathSound" src="./assets/death.mp3"></audio>
<audio id="wrongLetterSound" src="./assets/damage.mp3"></audio>
<audio id="correctLetterSound" src="./assets/correctLetter.mp3"></audio>
<audio id="completeWordSound" src="./assets/completeWord.mp3"></audio>
<audio id="completeRoundSound" src="./assets/completeRound.mp3"></audio>
<audio id="giveClueSound" src="./assets/giveClue.mp3"></audio>
<audio id="goBackSound" src="./assets/goBack.mp3"></audio>

<script src="myscript_game.js"></script>
<?php
    if(!isset($_SESSION["user"])){
        echo '<script>showLoginConfirmationPopup();</script>';
		
    }
?>


</body>
</html>
