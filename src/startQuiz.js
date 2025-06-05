import { fetchQuestions, flagDisplayOfLanguageChosenInStartQuiz, showTheme } from "./utils";
import { displayVolumeButton } from "./utils";


const VOLUME_ON_BUTTON = document.getElementById("volumeOn");
const VOLUME_OFF_BUTTON = document.getElementById("volumeOff");
VOLUME_OFF_BUTTON.style.display = "none"
let themeSelect = document.getElementById("themeSelect");

function themeSelectedSetting() {
  let themeSelected = document.getElementById("themeSelect").value;
  return themeSelected ;
}

async function menu() {
  try{
    const quizData = await fetchQuestions();
    let themes = showTheme(quizData);
    console.log(themes)
    themeSelect.innerHTML = "";
        // On insère les options
        themes.forEach(theme => {
          const option = document.createElement("option");
          option.value = theme;
          option.textContent = theme;
          themeSelect.appendChild(option);
        });

    const SELECT_FORM_THEME = document.getElementById("themeSelect");
    flagDisplayOfLanguageChosenInStartQuiz();
    SELECT_FORM_THEME.addEventListener("click", () => {
      themeSelectedSetting();
    });
    
    const START_QUIZ_BUTTON = document.getElementById("fromQuizSettingToInGame");
    START_QUIZ_BUTTON.addEventListener("click", ()=>{
      const THEME_SELECTED = themeSelectedSetting();
      sessionStorage.setItem("themeSelected", THEME_SELECTED);
      window.location.href = "inGame.html";
    })
    
    displayVolumeButton();

    const EXIT_BUTTON = document.getElementById("quit");
    EXIT_BUTTON.addEventListener("click", () => {
      window.location.href = "index.html";
    })
  }catch (error) {
    console.error("Erreur lors du chargement des questions :", error);
  }

}

menu();
