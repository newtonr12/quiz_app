const questions = [
    {
        question: "The only true wisdom is knowing you know nothing",
        choices: ["Socrates", "Nietzche", "John Locke", "Plato"],
        correctAnswer: "Socrates",
    },
    {
        question: "Experience without theory is blind, but theory without experience is mere intellectual play.",
        choices: ["Lao Tzu", "John Locke", "Alan Watts", "Immanuel Kant"],
        correctAnswer: "Immanuel Kant",
    },
    {
        question: "Who said, 'I think, therefore I am'?",
        choices: ["Kuhn", "Socrates", "Descartes", "Plato"],
        correctAnswer: "Descartes",
    },
    // Add more questions here
];

const startContainer = document.querySelector(".start-container");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const finishButton = document.getElementById("finish");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

let currentQuestion = 0;
let score = 0;
let timeLimitMinutes = 1; // Set the desired time limit in minutes
let timeLeft = timeLimitMinutes * 60; // Convert minutes to seconds
let timer;

window.addEventListener("load", () => {
    // Initially hide the quiz-container and result-container
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
});

const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
    // Hide the start-container
    startContainer.style.display = "none";
    // Show the quiz-container and start the quiz
    quizContainer.style.display = "block";
    // Start the timer and display the first question
    startTimer();
    displayQuestion(currentQuestion);
});

function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            timerExpired();
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeElement.textContent = `${minutes}m ${seconds}s`;
            timeLeft--;
        }
    }, 1000);
}

let displayQuestion = (questionIndex) => {
    // the statement below grabs first object in the array. example: questions[0]
    const question = questions[questionIndex];
    //the statement below grabs the question in the array example: questions[0].question
    questionElement.textContent = question.question;
    // This statement below will delete previous question when on current one while taking the quiz
    choicesElement.innerHTML = "";
    question.choices.forEach((choice, index) => {
        // Create the label element for each input
        const choiceLabel = document.createElement("label");
        // Create the input that is assigned to each label element which is nested inside.
        choiceLabel.innerHTML = `<input type="radio" name="choice" value="${choice}"> ${choice}`;
        // Then append the label and nested input to the choices div tag.
        choicesElement.appendChild(choiceLabel);
    });

    // Check if there is a stored answer for this question
    const storedAnswer = localStorage.getItem(`answer_${questionIndex}`);
    if (storedAnswer) {
        const radioInput = document.querySelector(`input[value="${storedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

previousButton.addEventListener("click", () => {
    checkAnswer()
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
    // Disable the "Previous" button on the first question
    if (currentQuestion === 0) {
        previousButton.disabled = true;
    }
    // Enable the "Next" button when navigating from the last question
    if (currentQuestion < questions.length - 1) {
        nextButton.disabled = false;
    }
});

nextButton.addEventListener("click", () => {
    checkAndProceed();
});

finishButton.addEventListener("click", () => {
    checkAnswer(); // Check the answer before finishing the quiz
    finishQuiz();
});

function checkAnswer() {
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) return;
    const userAnswer = selectedChoice.value;
    const currentQuestionObj = questions[currentQuestion];
    if (userAnswer === currentQuestionObj.correctAnswer) {
        score++;
    }

    // Store the selected answer and current question index in localStorage
    localStorage.setItem(`answer_${currentQuestion}`, userAnswer);
}

function timerExpired() {
    checkAnswer();
    finishQuiz();
}

function checkAndProceed() {
    checkAnswer(); // Check the answer
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    }

    // Disable the "Next" button on the last question
    if (currentQuestion === questions.length - 1) {
        nextButton.disabled = true;
    }
    // Enable the "Previous" button when navigating from the first question
    if (currentQuestion > 0) {
        previousButton.disabled = false;
    }
}

function finishQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    // Calculate the percentage
    const percentage = (score / questions.length) * 100;
    console.log(percentage.toFixed(2));
    const userScore = (percentage / 100) * 100; // Normalize the score to 100
    console.log(userScore);

    // Determine the grade based on the user's score
    let grade;
    if (userScore >= 90) {
        grade = "A+";
    } else if (userScore >= 80) {
        grade = "A";
    } else if (userScore >= 70) {
        grade = "B";
    } else if (userScore >= 60) {
        grade = "C";
    } else {
        grade = "F";
    }

    // This line of code ensures that the displayed score is limited to the minimum of 'score' and 'questions.length'
    scoreElement.textContent = `Your Score: ${Math.min(score, questions.length)} out of ${questions.length}`;
    document.getElementById("percentage").textContent = `Percentage: ${Math.min(percentage.toFixed(2), 100)}%`;
    document.getElementById("attempts").textContent = `Correct Attempts: ${Math.min(score, questions.length)}`;
    document.getElementById("grade").textContent = `Grade: ${grade}`;
}

// When quiz results pages pops up start over with try again.
const tryAgainButton = document.getElementById("try-again");
tryAgainButton.addEventListener("click", () => {
    // Reset quiz variables and UI
    currentQuestion = 0;
    score = 0;
    timeLeft = timeLimitMinutes * 60; // Reset the timer to the initial time limit
    clearInterval(timer);

    // Clear stored answers from localStorage
    for (let i = 0; i < questions.length; i++) {
        localStorage.removeItem(`answer_${i}`);
    }

    // Hide the result-container
    resultContainer.style.display = "none";
    // Show the quiz-container and start the quiz
    quizContainer.style.display = "block";

    // Start the timer and display the first question
    startTimer();
    displayQuestion(currentQuestion);

    // Enable the "Next" button and disable the "Previous" button
    nextButton.disabled = false;
    previousButton.disabled = true;
});