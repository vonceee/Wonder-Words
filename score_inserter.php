<?php
// Include the database connection file
include_once "database.php";

// Start the session
session_start();

// Check if the user ID is present in the session
if (isset($_SESSION["user"]["id"])) {
    // Retrieve the user ID from the session
    $userId = $_SESSION["user"]["id"];

    // Proceed with inserting the score into the database
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Retrieve the score from the POST request
        $score = $_POST["score"];

        // Prepare and execute the SQL statement to insert the score into the database
        $sql = "INSERT INTO leaderboard (user_id, score) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $userId, $score); // "ii" indicates integer parameters
        $stmt->execute();

        // Close the prepared statement
        $stmt->close();

        // Respond to the client-side AJAX request
        echo "Score inserted successfully";
    } else {
        // Handle invalid request method (e.g., GET requests)
        echo "Invalid request method";
    }
} else {
    // Handle the case where the user ID is not set in the session
    echo "User ID not found in session";
}
?>

