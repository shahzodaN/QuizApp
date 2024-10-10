const questions = [
    {
        questions: "which is the largest animal in the world?",
        answer: [
            {text: "shark", correct: false},
            {text: "blue whale", correct: true},
            {text: "elephant", correct: false},
            {text: "giraffe", correct: false},
        ]
    },
    {
        questions: "which is the smallest continent in the world?",
        answer: [
            {text: "asia", correct: false},
            {text: "australia", correct: true},
            {text: "arctic", correct: false},
            {text: "africa", correct: false},
        ]
    },
    {
        questions: "which is the largest desert in the world",
        answer: [
            {text: "kalahari", correct: false},
            {text: "gobi", correct: true},
            {text: "sahara", correct: false},
            {text: "antarktica", correct: false},
        ]
    },
    {
        questions: "which is smallest country in the world",
        answer: [
            {text: "vatikan", correct: false},
            {text: "bhutan", correct: true},
            {text: "nepal", correct: false},
            {text: "shri lanka", correct: false},
        ]
    },
];




const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestion + 1
    questionElement.innerHTML = questionNo + "." + currentQuestion.questions;


    currentQuestion.answer.forEach(ans => {
        const button = document.createElement("button")
        button.innerHTML = ans.text
        button.classList.add("btn")
        answerButton.appendChild(button)
        if (ans.correct) {
            button.dataset.correct = ans.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function selectAnswer(a) {
    const selectBtn = a.target
    const iscorrect = selectBtn.dataset.correct === "true"
    if (iscorrect) {
        selectBtn.classList.add("correct")
        score++
    }
    else{
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct")
        }
        button.disabled = "true"
    })
    nextButton.style.display = "block"
}
function resetState(){
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if (currentQuestionsIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionsIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();