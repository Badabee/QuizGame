
const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.querySelector('#questionCounter');
const scoreText = document.querySelector('#score');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "When was Nigeria Amalgamated??",
    choice1: "2020",
    choice2: "1900",
    choice3: "1914",
    choice4: "1960",
    answer: 3
  },
  {
    question: "Who is the current Vice-President of Nigeria?",
    choice1: "Femi Kuti",
    choice2: "Ayo Balogun",
    choice3: "Jack Daniels",
    choice4: "Yemi Osinbajo",
    answer: 4
  },
  {
    question: "What is the meaning of 'Valar Morghulis' in Game of Thrones?",
    choice1: "All men must die",
    choice2: "Get rich or Die trying",
    choice3: "It is what it is",
    choice4: "Hustle hard, hustle smart",
    answer: 1
  },
  {
    question: "What year did the last pandemic happen?",
    choice1: "1900",
    choice2: "1990",
    choice3: "1920",
    choice4: "1960",
    answer: 3
  },
  {
    question: "Who is the founder of Alibaba?",
    choice1: "Richard Hendricks",
    choice2: "Jack Ma",
    choice3: "Bill Gates",
    choice4: "Elon Musk",
    answer: 2
  }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5 ;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
}

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign('./end.html')
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion[`choice${number}`];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; 
    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply === 'correct') incrementScore(CORRECT_BONUS);
    

    setTimeout(() => { 
      selectedChoice.parentElement.classList.remove(classToApply);
    
    getNewQuestion();
    }, 1000);
  })
});

const incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();
