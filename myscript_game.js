    let totalPoints = 100;
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
    }

    function closeCluePopup() {
		// Remove the "show" class from both the overlay and cluePopup elements
		document.getElementById('overlay').classList.remove('show');
		document.getElementById('clueModal').classList.remove('show');
	}
	
	/* --clueModal--! */
	
	/* !--answerModal-- */

    function showCustomAlert(message, callback) {
        document.getElementById('custom-alert-content').innerText = message;
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
	
	/* !--keyboard-- */
	document.addEventListener('keydown', function(event) { // From keyup turned to keydown to fix shortcut reload bug
	  // Define the IDs of the overlays
	  var overlayIds = ['clueModal', 'custom-alert-box', 'reset-alert-box'];

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
	  if (isAnyOverlayVisible  && event.key !== 'Enter') { // Disables ALL keyboard input except for ENTER
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
      if (letter == 'ENTER') { // Function that accepts Enter and closes the popup
        removeCustomAlert();
        return false;
      }
      
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
		image.src = "hearts-3.png";
		strikesIconDiv.appendChild(image);
		document.getElementById("strikesPanel").appendChild(strikesIconDiv);
	}
	
	function resetStrikesIcon() {
		let strikesIconDiv = document.getElementById("strikesIcon");
		strikesIconDiv.innerHTML = ""; // Remove existing image

		// Create and append the original image
		let image = document.createElement("img");
		image.src = "hearts-3.png";
		strikesIconDiv.appendChild(image);
	}
	
    function useClue(clueCategory) {
        const clueCost = 25;
        let clueButtons = document.getElementsByClassName("clueButton");

        if (clues <= 0) {
            showCustomAlert("You have no more clues left!");
            for (let i = 0; i < clueButtons.length; i++) {
                clueButtons[i].disabled = true;
            }
            return;
        }

        if (totalPoints >= clueCost) {

            let possibleClues = getPossibleClues(clueCategory);
            let randomClue = getRandomClue(possibleClues);

            if (randomClue) {
                guessedLetters.push(randomClue);
                lettersRevealedByClues.push(randomClue);
                totalPoints -= clueCost;
                clues--;
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
            showCustomAlert(`Congratulations! You completed all categories./nPoints: ${totalPoints}`, resetGame);
        }
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
		document.getElementById("clues").textContent = `Clues: ${clues}`;
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
				existingImage.src = "hearts-2.png";
			} else if (incorrectGuesses === 2) {
				existingImage.src = "hearts-1.png";
			} else if (incorrectGuesses === 3) {
				existingImage.src = "hearts-0.png";
			}

            if (incorrectGuesses === 3) {
                playAudioById("deathSound");
                showCustomAlert(`Game over. You reached the maximum incorrect guesses.\nPoints: ${totalPoints}`);
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
        totalPoints = 0;
        currentRound = 0;
        incorrectGuesses = 0;
        clues = 3;
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
	
	playMusic.addEventListener("click", function () {
		toggleBackgroundMusic();
		playAudioById("buttonPress");
	});

	function toggleBackgroundMusic() {
		let backgroundMusic = document.getElementById("backgroundMusic");

		if (backgroundMusic.paused) {
			backgroundMusic.play();
		} else {
			backgroundMusic.pause();
		}
	}

    initGame();
	
	
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
