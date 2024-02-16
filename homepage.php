

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
	
	<!-- Left Box Layout -->
	<div class="menuBox">
			
		<button class="btn1" id="playBtn"><b>Play</b></button>
		
		<button class="btn1" id="howToPlayBtn"><b>How to Play</b></button>

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

		<!-- Overlay -->
		<div id="modalOverlay" class="overlay"></div>

		
		<button class="btn1" onclick="toggleMusic()"><b>Toggle Music</b></button>
	
	</div>

	<!-- Right Box Layout -->
    <div class="titleBox">
		<img id="title" src="./assets/title.png">
	</div> 
	
	<footer>Mendoza | Rañola | Sibucao | Marcos | De Francia</footer>
	
	
	<audio id="buttonPress" src="./assets/buttonPress.mp3"  preload="auto"></audio>
	<audio id="gameMusic" src="./assets/homepageBackground.mp3" autoplay loop preload="auto"></audio>

	<script src="myscript.js"></script>
	
</body>
</html>
