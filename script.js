let startButton = document.getElementById("Start Quiz");
let questionDiv = document.getElementById("Quiz_Questions");
let initalPage = document.getElementById("Start-screen");
let timerSpan = document.getElementById("Time");

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["Script", "js", "Javascript", "HTML"],
    answer: "Script",
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question: "JavaScript is the same as Java.",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onchange", "onmouseclick", "onmouseover"],
    answer: "onclick",
  },
];
let questionNumber = 0;
let timer;
let timeLeft = 75;

questionDiv.style.display = "none";

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {
  questionDiv.innerHTML = "";
  clearInterval(timer);
  questionDiv.textContent = "Game over! Enter your initals to save your score.";
  var initalInput = document.createElement("input");
  initalInput.setAttribute("id", "Initals");
  questionDiv.appendChild(initalInput);
  var saveInital = document.createElement("button");
  saveInital.textContent = "Save";
  questionDiv.appendChild(saveInital);

  saveInital.addEventListener("click", function () {
    var initals = initalInput.value;

    var savedInitals = localStorage.getItem("savedInitals");
    if (!savedInitals) {
      localStorage.setItem(
        "savedInitals",
        JSON.stringify([
          {
            name: initals,
            score: timeLeft,
          },
        ])
      );
      return;
    }
   var initalOb= JSON.parse(savedInitals);
   initalOb.push( {
    name: initals,
    score: timeLeft,
  })
  localStorage.setItem("savedInitals", JSON.stringify(initalOb));
  });
}

function nextQuestion(event) {
  var userChoice = event.target.textContent;
  var answer = questions[questionNumber].answer;
  if (questionNumber < questions.length - 1) {
    if (userChoice !== answer) {
      timeLeft -= 15;
    }

    questionNumber++;
    renderQuestion();
  } else {
    endQuiz();
  }
}

function renderQuestion() {
  questionDiv.innerHTML = "";

  let currentQuestion = questions[questionNumber];
  let questionPara = document.createElement("p");
  questionPara.innerHTML = currentQuestion.question;
  let choiceDiv = document.createElement("div");
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.innerHTML = currentQuestion.choices[i];
    choiceDiv.append(choiceBtn);
    choiceBtn.addEventListener("click", nextQuestion);
  }
  questionDiv.append(questionPara, choiceDiv);
}

function startQuiz(event) {
  event.preventDefault();
  initalPage.style.display = "none";
  questionDiv.style.display = "block";
  startTimer();
  renderQuestion();
}

startButton.addEventListener("click", startQuiz);