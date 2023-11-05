document.addEventListener("DOMContentLoaded", function () {
    // const API_KEY = "QVa2qkvRuih90Wdil6xhpDTnlmj1hI637EY13vXP"; // Replace with your quizapi.io API key
    const API_URL = `https://quizapi.io/api/v1/questions?difficulty=medium&type=multiple&apiKey=QVa2qkvRuih90Wdil6xhpDTnlmj1hI637EY13vXP`;
    const questionElement = document.querySelector(".question");
    const optionsList = document.querySelector(".options");
    const optionElements = optionsList.querySelectorAll("li");
    const checkAnswerButton = document.querySelector(".check-answer");
    const playAgainButton = document.querySelector(".play-again");
    const correctAnswerElement = document.querySelector(".c-ans");
    const wrongAnswerElement = document.querySelector(".w-ans");
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    async function fetchQuestions() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data)
            questions = data;
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }
    async function startGame() {
        await fetchQuestions();
        correctAnswerElement.textContent = "Correct Answer";
        wrongAnswerElement.textContent = "Wrong Answer";
        checkAnswerButton.style.display = "block";
        playAgainButton.style.display = "none";
        score = 0;
        currentQuestionIndex = 0;
        displayQuestion(currentQuestionIndex);
    }
    function displayQuestion(index) {
        if (questions.length > 0 && index < questions.length) {
            const question = questions[index];
            questionElement.textContent = question.question;
            const option1 = question.answers.answer_a;
            const option2 = question.answers.answer_b;
            const option3 = question.answers.answer_c;
            const option4 = question.answers.answer_d;
            const option5 = question.answers.answer_e;
            const option6 = question.answers.answer_f;
            // optionElements.forEach((optionElement, i) => {
            optionElements[0].textContent = option1;
            optionElements[1].textContent = option2;
            optionElements[2].textContent = option3;
            optionElements[3].textContent = option4;
            optionElements[4].textContent = option5;
            optionElements[5].textContent = option6;
            // });
        } else {
            endGame();
        }
    }
    optionElements.forEach((optionElement, i) => {
        optionElement.addEventListener("click", () => {
            const selectedAnswer = optionElement.textContent;
            checkAnswer(selectedAnswer);
        });
    })
    function checkAnswer(selectedAnswer) {
        const correctAnswerKey = questions[currentQuestionIndex].correct_answer;
        const correctAnswer = questions[currentQuestionIndex].answers[correctAnswerKey];
        if (selectedAnswer === correctAnswer) {
            score++;
            correctAnswerElement.textContent = `Correct Answer: ${score}`;
        } else {
            wrongAnswerElement.textContent = `Wrong Answer: ${currentQuestionIndex - score}`;
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            endGame();
        }
    }
    function endGame() {
        let go = questionElement.textContent = "Game Over!";
        if(go)
        {
            optionsList.style.display = "none";
        }
        checkAnswerButton.style.display = "none";
        playAgainButton.style.display = "block";
    }
    optionElements.forEach((optionElement, i) => {
        optionElement.addEventListener("click", () => {
            optionElements.forEach((el) => el.classList.remove("selected"));
            optionElement.classList.add("selected");
        });
    });
    checkAnswerButton.addEventListener("click", checkAnswer);
    playAgainButton.addEventListener("click", startGame);
    startGame();
    fetchQuestions();
});