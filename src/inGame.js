import {sessionLanguageSelected,startQuiz,displayVolumeButton,mixingQuestion,fetchQuestions,getQuestions,showQuestion,handleNextButton, showTheme} from "./utils.js";

const language = sessionStorage.getItem("languageSelected");
const theme = sessionStorage.getItem("themeSelected");


async function main() {
  try {
    sessionLanguageSelected();
    startQuiz();
    displayVolumeButton();

    const quizData = await fetchQuestions();
    
    const questions = mixingQuestion(getQuestions(theme, language, quizData));

    showQuestion(questions);

    const NEXT_BUTTON = document.getElementById("nextButton");
    NEXT_BUTTON.addEventListener("click", () => handleNextButton(questions));

    const EXIT_BUTTON = document.getElementById("quit");
    EXIT_BUTTON.addEventListener("click", () => {
      window.location.href = "startQuiz.html";
    });
  } catch (error) {
    console.error("Erreur lors du chargement des questions :", error);
  }
}

main();