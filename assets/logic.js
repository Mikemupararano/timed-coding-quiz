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

  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time in seconds

  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", submitScore);

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
    const timerInterval = setInterval(function () {
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
    document.getElementById("questions").style.display = "none";
    endScreen.style.display = "block";
    finalScoreElement.textContent = timeLeft;
  }

  function submitScore() {
    // Implement score submission logic (you can save to localStorage or send to a server)
    const initials = initialsInput.value;
    console.log("Score submitted:", timeLeft, initials);
    // You can add your logic to handle score submission here
  }
});
