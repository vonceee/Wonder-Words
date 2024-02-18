<?php
// Include the database connection file
include_once "database.php";

// Write the SQL query to select the top 10 highest scores with user's First_Name
$sql = "SELECT u.First_Name, l.score 
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

// Display the results
echo "<h2>Top 10 Highest Scores</h2>";
echo "<ul>";
$rank = 1;
foreach ($topScores as $score) {
    echo "<li>";
    if ($rank === 1) {
        echo "<span>&#x1F451;</span>"; // Crown icon
    }
    echo "User Name: " . $score['First_Name'] . ", Score: " . $score['score'];
    echo "</li>";
    $rank++; 
}
echo "</ul>";

// Close the statement
$stmt->close();

// Close the database connection
$conn->close();
?>
