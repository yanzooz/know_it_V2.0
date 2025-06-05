const FR_DISPLAY = document.getElementById("cityPictureDisplayFR");
const UK_DISPLAY = document.getElementById("cityPictureDisplayUK");
const FR_FLAG = document.getElementById("flagDisplayFR");
const UK_FLAG = document.getElementById("flagDisplayUK");



export function flagDisplayOfLanguageChosen() {
  let languageSelected = document.getElementById("languageSelect").value;
  if (languageSelected) {
    if (languageSelected === "french") {
      FR_DISPLAY.style.display = "block";
      FR_FLAG.style.display = "block";
      UK_DISPLAY.style.display = "none";
      UK_FLAG.style.display = "none";
      return languageSelected
    } else if (languageSelected === "english") {
      FR_DISPLAY.style.display = "none";
      FR_FLAG.style.display = "none";
      UK_DISPLAY.style.display = "block";
      UK_FLAG.style.display = "block";
      return languageSelected
    } else {
      console.log("on ne change rien");
    }
  }
}

const LANGUAGE_SELECTED = sessionStorage.getItem("languageSelected");
export function flagDisplayOfLanguageChosenInStartQuiz() {
  if (LANGUAGE_SELECTED) {
    if (LANGUAGE_SELECTED === "french") {
      FR_DISPLAY.style.display = "block";
      FR_FLAG.style.display = "block";
      UK_DISPLAY.style.display = "none";
      UK_FLAG.style.display = "none";
    } else if (LANGUAGE_SELECTED === "english") {
      FR_DISPLAY.style.display = "none";
      FR_FLAG.style.display = "none";
      UK_DISPLAY.style.display = "block";
      UK_FLAG.style.display = "block";
    }
  }
}

const VOLUME_ON_BUTTON = document.getElementById("volumeOn");
const VOLUME_OFF_BUTTON = document.getElementById("volumeOff");
let isVolumeOn = sessionStorage.getItem("volume") !== "off"; 

export function displayVolumeButton() {
  if (isVolumeOn) {
    VOLUME_ON_BUTTON.style.display = "block";
    VOLUME_OFF_BUTTON.style.display = "none";
  } else {
    VOLUME_ON_BUTTON.style.display = "none";
    VOLUME_OFF_BUTTON.style.display = "block";
  }

  VOLUME_ON_BUTTON.addEventListener("click", () => {
    VOLUME_ON_BUTTON.style.display = "none";
    VOLUME_OFF_BUTTON.style.display = "block";
    isVolumeOn = false;
    sessionStorage.setItem("volume", "off");
  });

  VOLUME_OFF_BUTTON.addEventListener("click", () => {
    VOLUME_ON_BUTTON.style.display = "block";
    VOLUME_OFF_BUTTON.style.display = "none";
    isVolumeOn = true;
    sessionStorage.setItem("volume", "on");
  });
}


export function sessionLanguageSelected(language){
    if (LANGUAGE_SELECTED === "english"){
      FR_FLAG.style.display = "none";
      UK_FLAG.style.display = "block";
    }else if(LANGUAGE_SELECTED === "french"){
      FR_FLAG.style.display = "block";
       UK_FLAG.style.display = "none";
    }
}




 export async function fetchQuestions() {
  const response = await fetch('http://localhost:8000/api/questions'); // Remplacez par l'URL complète si nécessaire
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des annonces');
  }
  const data = await response.json();
  console.log(data.member)
  return data.member;
}


export function showTheme(data){
  const themes = [...new Set(data.map(q => q.theme))];
  console.log(themes)
  return themes
}


export function getQuestions(theme, language, quizData) {
  let result = [];
  for (let item of quizData) {
    if (item.theme === theme) {
      let question, answer;
      if (language === "french") {
        question = item.en;
        answer = item.fr;
      } else if (language === "english") {
        question = item.fr;
        answer = item.en;
      }
      result.push({ question, answer });
    }
  }
  return result;
}

let currentQuestionIndex = 0 ;
let scoreUser = 0;

export function startQuiz(){
  currentQuestionIndex = 0;
  scoreUser = 0;
  sessionStorage.setItem("quizHistoric", JSON.stringify([]));
}

export function mixingQuestion(tab){
  for (let i= tab.length -1 ;  i>0  ;  i--){
        let j = Math.floor(Math.random()*(i+1));
        [tab[i],tab[j]] = [tab[j],tab[i]];
    }
    return tab;
}

const DISPLAY_QUESTION_IN_GAME = document.getElementById("displayQuestionInGame");
const DISPLAY_CORRECTION_ANSWER_IN_GAME = document.getElementById("displayCorrectionAnswerInGame");
const DISPLAY_USER_ANSWER = document.getElementById("userAnswer");
const DISPLAY_EXPECTED_ANSWER = document.getElementById("expectedAnswer");
let progressBar = document.getElementById("progressBar");
let questionCounter = document.getElementById("questionCounter");
let counterDisplay = document.getElementById("counterDisplay");
let questionDisplay = document.getElementById("question");
let answer = document.getElementById("answer")
const correctAudio = document.getElementById('correct-audio');
const incorrectAudio = document.getElementById('incorrect-audio');
let validateButton = document.getElementById("validateButton");


export function showQuestion(question){
  DISPLAY_CORRECTION_ANSWER_IN_GAME.style.display ="none";
  DISPLAY_QUESTION_IN_GAME.style.display = "block";
  updateProgressBar(question)
  answer.value = "";
  let questionNo = currentQuestionIndex + 1;
  let currentQuestion = question[currentQuestionIndex];
  questionCounter.innerHTML="Question " + questionNo + " sur " + question.length;
  counterDisplay.innerHTML= questionNo + '.';
  questionDisplay.innerHTML= currentQuestion.question;
  validateButton.onclick = () => {
    let ANSWER_USER = document.getElementById("answer").value;
    if(ANSWER_USER === '') ANSWER_USER = "no answer";
    checkAnswer(ANSWER_USER, currentQuestion);
  };
}

function cleanUserAnswer(answerUser) {
  let cleaned = answerUser.toLowerCase();
  cleaned = cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  cleaned = cleaned.replace(/[^a-z\s]/g, "");
  cleaned = cleaned.trim();
  return cleaned;
}

function displayGoodOrBadAnswer(stateAnswer) {
  if (stateAnswer) {
    if (isVolumeOn) correctAudio.play();
    DISPLAY_USER_ANSWER.classList.add('good-answer');
    DISPLAY_USER_ANSWER.classList.remove('bad-answer');
  } else {
    if (isVolumeOn) incorrectAudio.play();
    DISPLAY_USER_ANSWER.classList.add('bad-answer');
    DISPLAY_USER_ANSWER.classList.remove('good-answer');
  }
}


function updateProgressBar(question){
    const totalQuestions = question.length;
    const progressPercentage = ((currentQuestionIndex+1) / totalQuestions) * 100;
    progressBar.style.width = progressPercentage + '%';
}


function checkAnswer(answerUser, currentQuestion) {
  DISPLAY_CORRECTION_ANSWER_IN_GAME.style.display = "block";
  DISPLAY_QUESTION_IN_GAME.style.display = "none";

  let historic = JSON.parse(sessionStorage.getItem("quizHistoric")) || [];

  let ansUser = cleanUserAnswer(answerUser);
  let expectedAnswer = cleanUserAnswer(currentQuestion.answer);

  // Gestion de réponses multiples (optionnelle)
  let isCorrect = false;
  if (Array.isArray(currentQuestion.answer)) {
    isCorrect = currentQuestion.answer.some(ans => cleanUserAnswer(ans) === ansUser);
  } else {
    isCorrect = ansUser === expectedAnswer;
  }

  // Affichage
  displayGoodOrBadAnswer(isCorrect);
  DISPLAY_USER_ANSWER.textContent = ansUser || "no answer";
  DISPLAY_EXPECTED_ANSWER.textContent = expectedAnswer;

  // Ajout à l'historique
  historic.push({
    userAnswer: ansUser || "no answer",
    expectedAnswer: expectedAnswer,
    state: isCorrect ? "correct" : "incorrect"
  });

  sessionStorage.setItem("quizHistoric", JSON.stringify(historic));

if(isCorrect){
  scoreUser++
}
}


export function isFinished(tab) {
  return currentQuestionIndex >= tab.length - 1;
}

const NEXT_BUTTON = document.getElementById("nextButton");
export function handleNextButton(question) {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion(question);
    if (isFinished(question)) {
      NEXT_BUTTON.textContent = "Voir score";
      NEXT_BUTTON.style.backgroundColor = "#fa5170";
    }
  }else {
    showScore(question);
  }
}

function showScore(question){
  let scoreMax = question.length
  sessionStorage.setItem("scoreUser",scoreUser);
  sessionStorage.setItem("scoreMax",scoreMax)
  window.location.href = "score.html";
}

const DISPLAY_SCORE_ONLY = document.getElementById("displayScoreOnly")
const HISTORIC_DISPLAY = document.getElementById("historicDisplay")

export function displayHistoricCurrentGame(){
  let historicData = sessionStorage.getItem("quizHistoric");
  HISTORIC_DISPLAY.style.display="block";
  DISPLAY_SCORE_ONLY.style.display="none"

  const HISTORIC_BUTTON = document.getElementById("toHistoric")
  HISTORIC_BUTTON.textContent = "Voir score";
    HISTORIC_BUTTON.addEventListener("click",()=>{
      window.location.href = "score.html";
    })

  return historicData
}




