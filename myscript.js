	/* !--playButton-- */
	document.addEventListener('DOMContentLoaded', function() {
		var playButton = document.getElementById('playBtn');
		playButton.addEventListener('click', function() {
			window.location.href = 'game.html';
		});
	});
	/* --playButton--! */
	
	/* !--howToPlayBtn-- */
	// Get the modal
	var modal = document.getElementById("howToPlayModal");

	// Get the button that opens the modal
	var btn = document.getElementById("howToPlayBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("closeModalBtn");

	// When the user clicks the button, open the modal  
	btn.onclick = function() {
	  modal.style.display = "block";
	  document.getElementById('modalOverlay').style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	  document.getElementById('modalOverlay').style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
		document.getElementById('modalOverlay').style.display = "none";
	  }
	}
	
	/* --howToPlayBtn--! */

	/* !--audio-- */
	
	function toggleMusic() {
	  var audioElement = document.getElementById("gameMusic");
	  if (audioElement.paused) {
		audioElement.play();
	  } else {
		audioElement.pause();
	  }
	}
	
	/* --buttonPress-- */
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

	/* --audio--! */