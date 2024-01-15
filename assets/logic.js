// logic.js

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const timeElement = document.getElementById("time");
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  const endScreen = document.getElementById("end-screen");
  const finalScoreElement = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const clearButton = document.getElementById("clear");

  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time in seconds
  let timerInterval;

  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", submitScore);
  clearButton.addEventListener("click", clearHighScores);

  function startQuiz() {
    startButton.style.display = "none";
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("questions").style.display = "block";
    nextQuestion();
    startTimer();
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      questionTitle.textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";

      currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", function () {
          checkAnswer(this.textContent);
        });
        choicesContainer.appendChild(button);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice === currentQuestion.correctAnswer) {
      // Correct answer
      showFeedback("Correct!", "green");
    } else {
      // Incorrect answer
      timeLeft -= 10; // Penalty for incorrect answer
      showFeedback("Incorrect!", "red");
    }

    currentQuestionIndex++;
    nextQuestion();
  }

  function showFeedback(message, color) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
    feedbackElement.style.display = "block";

    setTimeout(function () {
      feedbackElement.style.display = "none";
    }, 1000);
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft--;
        timeElement.textContent = timeLeft;
      } else {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("questions").style.display = "none";
    endScreen.style.display = "block";
    finalScoreElement.textContent = timeLeft;
  }

  function submitScore() {
    const initials = initialsInput.value;
    saveHighScore(timeLeft, initials);
    console.log("Score submitted:", timeLeft, initials);
    // You can add your logic to navigate to the highscores page or perform other actions
  }

  function saveHighScore(score, initials) {
    const highScores = getHighScores();

    const newScore = {
      score: score,
      initials: initials
    };

    highScores.push(newScore);

    // Sort the high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 5 high scores
    highScores.splice(5);

    // Save the updated high scores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  function getHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    return highScores;
  }

  function clearHighScores() {
    localStorage.removeItem("highScores");
    // Optionally, update the UI to remove displayed high scores
  }
});
