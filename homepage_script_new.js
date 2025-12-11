/* Audio Functions */
function playAudioById() {
	let audio = document.getElementById("buttonPress");
	if (audio) {
		audio.currentTime = 0;
		audio.volume = 0.5;
		audio.play();
	}
}

function toggleMusic() {
	playAudioById();
	var audioElement = document.getElementById("gameMusic");
	if (audioElement.paused) {
		audioElement.play();
	} else {
		audioElement.pause();
	}
}

/* Initialize on DOM Ready */
document.addEventListener('DOMContentLoaded', function() {
	
	// Play Button
	var playButton = document.getElementById('playBtn');
	if (playButton) {
		playButton.addEventListener('click', function() {
			playAudioById();
			setTimeout(function() {
				window.location.href = 'game.php';
			}, 100);
		});
	}

	// How to Play Modal
	var howToPlayModal = document.getElementById("howToPlayModal");
	var howToPlayBtn = document.getElementById("howToPlayBtn");
	var closeModalBtns = document.querySelectorAll("#closeModalBtn");
	var modalOverlay = document.getElementById("modalOverlay");

	if (howToPlayBtn && howToPlayModal) {
		howToPlayBtn.addEventListener('click', function() {
			playAudioById();
			howToPlayModal.style.display = "block";
			modalOverlay.style.display = "block";
		});
	}

	if (closeModalBtns.length > 0) {
		closeModalBtns[0].addEventListener('click', function() {
			playAudioById();
			howToPlayModal.style.display = "none";
			modalOverlay.style.display = "none";
		});
	}

	// Leaderboards Modal
	var leaderboardsModal = document.getElementById("leaderboardsModal");
	var leaderboardsBtn = document.getElementById("leaderboardsBtn");
	var closeLeaderboardsModalBtn = document.getElementById("closeLeaderboardsModalBtn");

	if (leaderboardsBtn && leaderboardsModal) {
		leaderboardsBtn.addEventListener('click', function() {
			playAudioById();
			leaderboardsModal.style.display = "block";
			modalOverlay.style.display = "block";
		});
	}

	if (closeLeaderboardsModalBtn) {
		closeLeaderboardsModalBtn.addEventListener('click', function() {
			leaderboardsModal.style.display = "none";
			modalOverlay.style.display = "none";
		});
	}

	// Logout Modal
	var logoutModal = document.getElementById("logoutModal");
	var logoutBtns = document.querySelectorAll("#logoutBtn");
	var cancelLogoutBtn = document.getElementById("cancelLogoutBtn");

	// Only bind the first logout button (the one in the menu)
	if (logoutBtns.length > 0) {
		logoutBtns[0].addEventListener('click', function() {
			playAudioById();
			logoutModal.style.display = "block";
			modalOverlay.style.display = "block";
		});
	}

	if (cancelLogoutBtn) {
		cancelLogoutBtn.addEventListener('click', function() {
			playAudioById();
			logoutModal.style.display = "none";
			modalOverlay.style.display = "none";
		});
	}

	// Close modals when clicking outside
	window.addEventListener('click', function(event) {
		if (event.target === modalOverlay) {
			howToPlayModal.style.display = "none";
			leaderboardsModal.style.display = "none";
			logoutModal.style.display = "none";
			modalOverlay.style.display = "none";
		}
	});
});
