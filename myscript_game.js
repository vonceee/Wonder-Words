    let totalPoints = 0;
    let incorrectGuesses = 0;
    let currentRound = 0;
    let currentWord = "";
    let currentWordObject = {};
    let currentQuestion = "";
    let guessedLetters = [];
    let clues = 3;
    let lettersRevealedByClues = [];
	
    /* !--clueModal-- */
	
	function showCluePopup() {
        // Add the "show" class to the overlay element
        document.getElementById('overlay').classList.add('show');
        document.getElementById('clueModal').classList.add('show');
        playAudioById("buttonPress");

        // Disable the button momentarily
    }

    function closeCluePopup() {
		// Remove the "show" class from both the overlay and cluePopup elements
		document.getElementById('overlay').classList.remove('show');
		document.getElementById('clueModal').classList.remove('show');
        playAudioById("buttonPress");
	}
	
	/* --clueModal--! */
	
	/* !--answerModal-- */

    function showCustomAlert(message, callback, textSize) {
        if (textSize == undefined) {
            textSize = 5;
        }
        document.getElementById('custom-alert-content').innerText = message;
        
        document.getElementById('custom-alert-content').style.fontSize = textSize + "vh"; // Makes font size larger 
        document.getElementById('custom-alert-content').style.marginTop = '5%';
        
        document.getElementById('custom-alert-box').style.display = 'block';
        document.getElementById('custom-alert-box').dataset.callback = String(callback);
		document.getElementById('overlay').style.display = 'block';
    }

    function removeCustomAlert() {

        
        var callbackString = document.getElementById('custom-alert-box').dataset.callback;
        document.getElementById('custom-alert-box').style.display = 'none';
		document.getElementById('overlay').style.display = 'none';
        if (callbackString) {
            var callback = eval('(' + callbackString + ')');
            if (typeof callback === 'function') {
                callback();
            }
        }
        
        // This is where no more clues left moved from previous position // Cannot display two showCustomAlert in one function? Moved to this function instead
        if (clues == 0) {
            PinakaWalangKwentangFunctionSaBuongMundo();
        }
    }
	
    function PinakaWalangKwentangFunctionSaBuongMundo() { // IT JUST WORKS AHAHAHAHAHAHAHAHAHAHAHAHA
        showCustomAlert("You have no more clues left!");
        clues --;
    }
	/* --answerModal--! */
	
	/* !--resetgameModal-- */
	
	function showResetConfirmationPopup() {
		document.getElementById('reset-alert-box').style.display = 'block';
		document.getElementById('overlay').style.display = 'block';
		playAudioById("buttonPress");
	}

	function hideResetConfirmationPopup() {
		document.getElementById('reset-alert-box').style.display = 'none';
		document.getElementById('overlay').style.display = 'none';
		playAudioById("buttonPress");
	}
	
	/* --resetgameModal--! */

    /* --logingameModal--! */

    function showLoginConfirmationPopup() {
		document.getElementById('login-alert-box').style.display = 'block';
		document.getElementById('overlay').style.display = 'block';
		playAudioById("buttonPress");
	}

    function hideLoginConfirmationPopup() {
		document.getElementById('login-alert-box').style.display = 'none';
		document.getElementById('overlay').style.display = 'none';
		playAudioById("buttonPress");
	}
    
    /* --logingameModal--! */
	
	/* !--keyboard-- */
	document.addEventListener('keydown', function(event) { // From keyup turned to keydown to fix shortcut reload bug
	  // Define the IDs of the overlays
	  var overlayIds = ['clueModal', 'custom-alert-box', 'reset-alert-box', 'login-alert-box'];

	  
      // Check if any of the overlays are visible
	  var isAnyOverlayVisible = overlayIds.some(function(id) {
		var overlay = document.getElementById(id);
		if (overlay) {
		  var overlayStyle = window.getComputedStyle(overlay);
		  return overlayStyle.display !== 'none';
		}
		return false;
	  });

	  // If any overlay is visible, don't allow keyboard input
	  if (isAnyOverlayVisible  && !(event.key === 'Enter')) { // Disables ALL keyboard input EXCEPT  for ENTER
        return;
	  }

	  // Convert the key to uppercase to match the case of the letters in the word
	  var letter = event.key.toUpperCase();
	  // Check if the key is an alphabetic character
	  if (/^[A-Z]$/.test(letter)) {
		// Find the button element that corresponds to the pressed key
		var buttonElement = document.querySelector(`button[data-letter="${letter}"]`);

		// If the button exists, simulate a click event on it
		if (buttonElement) {
		  buttonElement.click();
		}
	  }

      // Check if the custom-alert-box overlay is visible
      var isCustomAlertVisible = overlayIds.some(function(id) {
        return id === 'custom-alert-box' && document.getElementById(id).style.display !== 'none';
      });

    // Now you can use isCustomAlertVisible in an if condition
      if (letter == 'ENTER' && isCustomAlertVisible) { // Function that accepts Enter and closes the popup
        removeCustomAlert();
        return;
      }
        // Your code here for when the custom-alert-box overlay is visible
      });

    function createKeyboard() {
        let keyboardDiv = document.getElementById("keyboard");
        keyboardDiv.innerHTML = "";

        const keyboardLayout = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

        for (let row of keyboardLayout) {
            for (let letter of row) {
                let button = document.createElement("button");
                button.textContent = letter;
                button.setAttribute('data-letter', letter);
				if (guessedLetters.includes(letter)) {
                button.disabled = true;
            }
                if (lettersRevealedByClues.includes(letter)) {
                button.disabled = true;
            }

                button.addEventListener("click", () => handleGuess(letter, button));
                keyboardDiv.appendChild(button);
            }
        }
    }

    function resetKeyboard() {
        guessedLetters = [];
        lettersRevealedByClues = [];

        let keyboardDiv = document.getElementById("keyboard");
        keyboardDiv.innerHTML = "";

        createKeyboard();
    }
	
	/* --keyboard--! */
	
	function createHearts() {
		let strikesIconDiv = document.getElementById("strikesIcon");
		let image = document.createElement("img");
		image.src = "./assets/hearts-3.png";
		strikesIconDiv.appendChild(image);
		document.getElementById("strikesPanel").appendChild(strikesIconDiv);
	}
	
	function resetStrikesIcon() {
		let strikesIconDiv = document.getElementById("strikesIcon");
		strikesIconDiv.innerHTML = ""; // Remove existing image

		// Create and append the original image
		let image = document.createElement("img");
		image.src = "./assets/hearts-3.png";
		strikesIconDiv.appendChild(image);
	}
	
    function useClue(clueCategory) {
        playAudioById("buttonPress");
        const clueCost = 25;
        let clueButtons = document.getElementsByClassName("modalClueButtons"); // To fix unknown class name clueButton turned to modalClueButtons

        // if (clues == 0) {
        //     showCustomAlert("You have no more clues left!")
        // }

        if (totalPoints >= clueCost) {

            let possibleClues = getPossibleClues(clueCategory);
            let randomClue = getRandomClue(possibleClues);

            if (randomClue) {
                guessedLetters.push(randomClue);
                lettersRevealedByClues.push(randomClue);
                totalPoints -= clueCost;
                clues--;  

                // Moved if statemenet from line 173 to instantly disable button once it reaches 0
                if (clues <= 0) {            
                    for (let i = 0; i < clueButtons.length; i++) {
                        clueButtons[i].disabled = true; // Disables Use Clue button
                    }
                    
                }

                showCustomAlert(`Clue used! The letter is: ${randomClue}`);
                updateDisplay();
                updateScoreboard();
                createKeyboard();

                if (new Set(currentWord.split("")).size === guessedLetters.length) {
                    showCustomAlert(`Congratulations! You guessed the word: ${currentWord}`, startRound);
                    totalPoints += 10;
					playAudioById("completeWordSound");
                    resetKeyboard();
                    }
            }
        } else {
            showCustomAlert("Not enough points to avail a clue!");
        }
    }

    function getPossibleClues(clueCategory) {
        let possibleClues = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(letter => !guessedLetters.includes(letter));

        if (clueCategory === "vowel") {
            possibleClues = possibleClues.filter(letter => "AEIOU".includes(letter) && currentWord.includes(letter));
            if (possibleClues.length === 0) {
            showCustomAlert('There are no more vowels in the word!');
            }
        } else {
            possibleClues = possibleClues.filter(letter => !"AEIOU".includes(letter) && currentWord.includes(letter));
            if (possibleClues.length === 0) {
            showCustomAlert('There are no more consonant in the word!');
            }
        }

        return possibleClues;
    }

    function getRandomClue(possibleClues) {
        return possibleClues.length > 0 ? possibleClues[Math.floor(Math.random() * possibleClues.length)] : null;
    }

    let easyWords = [
        { word: "APPLE", question: "A fruit often associated with teachers." },
        { word: "BANANA", question: "A yellow fruit with a peel." },
        { word: "ORANGE", question: "A citrus fruit with a tough outer layer." },
        { word: "APOLLO", question: "Who was the ancient greek god of sun." },
        { word: "HANGAROO", question: "A word-guessing game with a kangaroo theme." },
        { word: "GIRAFFE", question: "A long-necked mammal found in Africa." },
        { word: "ELEPHANT", question: "A large land mammal known for its tusks." },
        { word: "C", question: "Programmer's favorite note." },
        { word: "COFFEE", question: "A popular caffeinated beverage." },
        { word: "ZEUS", question: "Who was the ancient greek god of lightning." }
    ];

    let moderateWords = [
        { word: "PROGRAMMING", question: "The process of writing code for software development." },
        { word: "ALGORITHM", question: "A set of instructions or rules for solving a problem." },
        { word: "DATABASE", question: "A structured collection of data." },
        { word: "NETWORK", question: "A system of interconnected computers or devices." },
        { word: "JAVASCRIPT", question: "A scripting language used for web development." },
        { word: "PYTHON", question: "A versatile programming language." },
        { word: "JAVA", question: "A popular object-oriented programming language." },
        { word: "HTML", question: "A markup language for creating web pages." },
        { word: "CSS", question: "A style sheet language for designing web pages." },
        { word: "CLOUD", question: "A network of remote servers for storing and managing data." }
    ];

    let difficultWords = [
        { word: "CYBERSECURITY", question: "The practice of protecting computer systems and networks from digital attacks." },
        { word: "BLOCKCHAIN", question: "A decentralized and distributed ledger technology." },
        { word: "MACHINELEARNING", question: "A subset of artificial intelligence that enables machines to learn from data." },
        { word: "ARTIFICIALINTELLIGENCE", question: "The simulation of human intelligence in machines." },
        { word: "WEBDEVELOPMENT", question: "The process of building and maintaining websites." },
        { word: "DATASCIENCE", question: "The extraction of knowledge and insights from structured and unstructured data." },
        { word: "FRONTEND", question: "The part of a website that users interact with directly." },
        { word: "BACKEND", question: "The server-side of a website, responsible for processing requests." },
        { word: "VIRTUALIZATION", question: "The creation of a virtual version of a resource, such as an operating system or server." },
        { word: "DOCKER", question: "A platform for developing, shipping, and running applications in containers." }
    ];

    let categories = ["Easy", "Moderate", "Difficult"];
    let words = [easyWords, moderateWords, difficultWords];

    function startRound() {
        if (currentRound < categories.length) {
            currentWordObject = getRandomWord();
            currentWord = currentWordObject.word;
            currentQuestion = currentWordObject.question;
            resetKeyboard();

            updateDisplay();
            updateScoreboard();
        } else {
            // Send to database through php
            insertScore(totalPoints);
            // Send to database through php
            
            showCustomAlert(`Congratulations! You completed all categories.\nPoints: ${totalPoints}`, resetGame);
        }
    }


    // INSERT SCORE TO DATABASE FUNCTION
    function insertScore(scoreFinal) {
        $.ajax({
            url: "score_inserter.php",
            type: "POST",
            data: { score: scoreFinal }, // Send the score as data
            success: function(response) {
                console.log(response); // Handle the response from PHP
            },
            error: function(xhr, status, error) {
                console.error(error); // Handle errors
            }
        });
    }
    
    
 
    
    function getRandomWord() {
        let categoryIndex = currentRound;
        let availableQuestions = words[categoryIndex].filter(wordObj => !wordObj.used);

        if (availableQuestions.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableQuestions.length);
            let selectedWordObject = availableQuestions[randomIndex];
            selectedWordObject.used = true;
            return selectedWordObject;
        } else {
            showCustomAlert(`Congratulations! You have finished the ${categories[currentRound]} round!`, startRound);
            playAudioById("completeRoundSound");
            currentRound++;
        }
    }

    function resetQuestionsUsage() {
        for (let category of words) {
            for (let wordObj of category) {
                wordObj.used = false;
            }
        }
    }

    function updateDisplay() {
        let display = `${currentQuestion}<br><br>`;

        // Cannot display two showCustomAlert in one function? Moved to this function instead
        
        // }

		for (let letter of currentWord) {
			if (!isLetter(letter)) {
				display += letter + " ";
			} else if (guessedLetters.includes(letter)) {
				display += letter + " ";
			} else {
				display += "_ ";
			}
		}

		document.getElementById("word-display").innerHTML = display.trim();
	}

    function updateScoreboard() {
		let answeredQuestions = words[currentRound].filter(wordObj => wordObj.used).length;
		document.getElementById("points").textContent = `${totalPoints}`;
		
        // Will display 0 instead -1 in clues, final value of clues is -1 check clues--;
        if (clues <= 0) {
            document.getElementById("clues").textContent = `Clues: 0`;    
        } else {
            document.getElementById("clues").textContent = `Clues: ${clues}`;
        }
        // Will display 0 instead -1 in clues, final value of clues is -1 check clues--;

		document.getElementById("category").textContent = `Category: ${categories[currentRound]}`;
		document.getElementById("questions").textContent = `Question: ${answeredQuestions}/${words[currentRound].length}`;
	}

    function handleGuess(letter, buttonElement) {
        let occurrences = getAllOccurrences(currentWord, letter);
    
        if (occurrences.length > 0) {
            occurrences.forEach(position => {
                if (!guessedLetters.includes(letter) && currentWord[position] === letter) {
                    guessedLetters.push(letter);
                    playAudioById("correctLetterSound");
    
                    if (guessedLetters.length === new Set(currentWord.split("")).size) {
                        playAudioById("completeWordSound");
                        showCustomAlert(`Congratulations! You guessed the word: ${currentWord}`, startRound);
                        totalPoints += 10;
                    }
    
                    updateDisplay();
                    updateScoreboard();
                    buttonElement.disabled = true; // Disable the button
                    buttonElement.classList.add('correct-guess'); // Add a class for correct guess
                }
            });
        } else {
            incorrectGuesses++;
            buttonElement.disabled = true; // Disable the button
            buttonElement.classList.add('wrong-guess'); // Add a class for wrong guess
            playAudioById("wrongLetterSound");
			
			let strikesIconDiv = document.getElementById("strikesIcon");
			let existingImage = strikesIconDiv.querySelector("img");
			
			if (incorrectGuesses === 1) {
				existingImage.src = "./assets/hearts-2.png";
			} else if (incorrectGuesses === 2) {
				existingImage.src = "./assets/hearts-1.png";
			} else if (incorrectGuesses === 3) {
				existingImage.src = "./assets/hearts-0.png";
			}

            if (incorrectGuesses === 3) {
                playAudioById("deathSound");
                showCustomAlert(`Game over. You reached the maximum incorrect guesses.\nPoints: ${totalPoints}`, null, 4);
                resetGame();
            } else {
                updateScoreboard();
            }
        }
    }


    function getAllOccurrences(word, letter) {
        let occurrences = [];
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                occurrences.push(i);
            }
        }
        return occurrences;
    }

    function isLetter(char) {
        return /^[a-zA-Z]$/.test(char);
    }

    function resetGame() {
        currentRound = 0;
        clues = 3;

        // If gameOver, insert score first before reverting to 0
        if (incorrectGuesses == 3){
            insertScore(totalPoints);
            incorrectGuesses = 0;
            totalPoints = 0;
        }
        
        else {
            incorrectGuesses = 0;
            totalPoints = 0;
            }
        
        let enableClueButton = document.getElementsByClassName("modalClueButtons"); 
        for (let i = 0; i < enableClueButton.length; i++) {
            enableClueButton[i].disabled = false; // Disables Use Clue button
        }
        

        resetQuestionsUsage();
        startRound();
        resetKeyboard();
		resetStrikesIcon();
        let clueButtons = document.getElementsByClassName("clueButton");
        for (let i = 0; i < clueButtons.length; i++) {
            clueButtons[i].disabled = false;
        }
    }

    function initGame() {
		resetQuestionsUsage();
		startRound();
		createKeyboard();
		createHearts();
	}
	
    // To delete function if this is not used
	function disableBackgroundButtons(disable) {
        let backgroundButtons = document.querySelectorAll('#keyboard button, #clueButton, #playMusic');
        backgroundButtons.forEach(button => {
            button.disabled = disable;
        });
    }
	
	function playAudioById(audioId) {
		let audio = document.getElementById(audioId);

		if (audio) {
			audio.currentTime =  0;
			audio.volume =  0.5;
			audio.play();
		} else {
			console.error(`Audio element with ID '${audioId}' not found.`);
		}
	}
	
	playMusic.addEventListener("click", function () { //Add onClick function
		toggleBackgroundMusic();
		playAudioById("buttonPress");
	});

    let backgroundMusicPlaying = false;

	function toggleBackgroundMusic() {
		
        //set to false because music is disabled by default
        
         let backgroundMusic = document.getElementById("backgroundMusic");
        let toggleMusicButton = document.getElementById("playMusic"); // Get ID of Toggle Music Button and Assigned to Variable
        


		if (backgroundMusicPlaying == false) {
            toggleMusicButton.innerHTML = "<b>Untoggle Music</b>";
            backgroundMusic.play();
            backgroundMusicPlaying = true;
            
          
		} else {
            toggleMusicButton.innerHTML = "<b>Toggle Music</b>";
			backgroundMusic.pause();
            backgroundMusicPlaying = false;
            
		}
	}

    // Plays buttonPress and redirects after a short delay
    window.onload = function() { // adds button press in back button
        var a = document.getElementById("backBtn");  
        a.onclick = function (event) {
            event.preventDefault(); // Prevent default redirection behavior
    
            playAudioById("buttonPress");
    
            // Delay redirection by 500 milliseconds (0.5 seconds)
            setTimeout(function() {
                window.location.href = "index.php"; // Redirect to index.html
            }, 100);
        }
    }

    function redirectToLogin() {
        // Redirect to the PHP file
        window.location.href = "login.php";
    }

    function redirectToRegistration() {
        // Redirect to the PHP file
        window.location.href = "registration.php";
    }

    
    

    initGame();
	

    // unsure what this function does 
	document.addEventListener('DOMContentLoaded', function() {
	  var audioElement = document.getElementById("buttonPress");
	  var parentElement = document.body; // Or another container element

	  parentElement.addEventListener('click', function(event) {
		// Check if the clicked element or its parent has the 'sound-trigger' class
		if (event.target.matches('.btn1') || event.target.parentNode.matches('.btn1')) {
		  // Check if the audio is already playing
		  if (!audioElement.paused && !audioElement.ended) {
			// Audio is currently playing, ignore the click or wait
			return;
		  }

		  // Reset the audio to the start before playing
		  audioElement.currentTime =   0;
		  audioElement.play();
		}
	  });
	});
