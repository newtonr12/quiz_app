
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
    
];


const quizContainer = document.querySelector('.quiz-container')
const resultContainer = document.querySelector('.result-container')

// hide quiz and and results section on load
window.addEventListener('load', () =>  {
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
})

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