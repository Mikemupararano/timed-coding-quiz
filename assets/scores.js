// scores.js

// Function to get high scores from local storage
function getHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  return highScores;
}

// Function to save a new high score
function saveHighScore(score, initials) {
  const highScores = getHighScores();

  const newScore = {
    score: score,
    initials: initials
  };

  highScores.push(newScore);

  // Sorting the high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Keeping the top 5 high scores
  highScores.splice(5);

  // Saving updated high scores to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}


