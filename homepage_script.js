	/* !--playButton-- */
	document.addEventListener('DOMContentLoaded', function() {
		var playButton = document.getElementById('playBtn');
		playButton.addEventListener('click', function() {
			window.location.href = 'game.php';
		});
	});
	/* --playButton--! */
	
	/* !--howToPlayBtn-- */

	// How to Play
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
	  } else if (event.target == leaderboardsModal) {
		leaderboardsModal.style.display = "none";
		document.getElementById('modalOverlay').style.display = "none";
	  } else if (event.target == logoutModal) {
		logoutModal.style.display = "none";
		document.getElementById('modalOverlay').style.display = "none";
	  }
	}

	// Leaderboards
	// Get the leaderboards modal
	var leaderboardsModal = document.getElementById("leaderboardsModal");

	// Get the leaderboards button
	var leaderboardsBtn = document.getElementById("leaderboardsBtn");

	// Function to display the modal
	function openModal() {
		leaderboardsModal.style.display = "block";
		document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
	}

	leaderboardsBtn.addEventListener("click", openModal);

	// Function to close the modal
	function closeModal() {
		leaderboardsModal.style.display = "none";
		document.body.style.overflow = "auto"; // Restore scrolling when modal is closed
	}

	// Event listener for the close button in the modal
	var closeModalBtn = document.getElementById("closeLeaderboardsModalBtn");
	closeModalBtn.addEventListener("click", closeModal);

	// Event listener for the overlay (to close the modal when clicking outside it)
	var modalOverlay = document.getElementById("modalOverlay");
	modalOverlay.addEventListener("click", closeModal);

	// Logout
	// Get the logout modal
	var logoutModal = document.getElementById("logoutModal");

	// Get the logout button and link
	var logoutBtn = document.getElementById("logoutBtn");
	var confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
	var cancelLogoutBtn = document.getElementById("cancelLogoutBtn");

	// When the user clicks the logout button, open the logout confirmation modal  
	logoutBtn.onclick = function() {
		logoutModal.style.display = "block";
		document.getElementById('modalOverlay').style.display = "block";
	}

	// When the user clicks on <span> (x) or Cancel, close the logout confirmation modal
	var closeLogoutModalBtn = document.getElementById("closeLogoutModalBtn");
	closeLogoutModalBtn.onclick = cancelLogoutBtn.onclick = function() {
		logoutModal.style.display = "none";
		document.getElementById('modalOverlay').style.display = "none";
	}
	
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