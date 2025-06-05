import { flagDisplayOfLanguageChosen } from "./utils";

let questions = [];

const BUTTON_TO_QUIZ_SETTING = document.getElementById("buttonFromMenuToQuizSetting");
let historicScoreUser = document.getElementById("historicScoreUser");
let historicScoreMax = document.getElementById("historicScoreMax");


function menu() {
  const UK_DISPLAY = document.getElementById("cityPictureDisplayUK");
  const UK_FLAG = document.getElementById("flagDisplayUK");
  const SELECT_FORM_LANGUAGE = document.getElementById("languageSelect");
  let displayStillNoScore= document.getElementById("displayStillNoScore")
  UK_DISPLAY.style.display = "none";
  UK_FLAG.style.display = "none";

  SELECT_FORM_LANGUAGE.addEventListener("click", () => {
    flagDisplayOfLanguageChosen();
  });

  BUTTON_TO_QUIZ_SETTING.addEventListener ("click", ()=>{
    const LANGUAGE_SELECTED = flagDisplayOfLanguageChosen()
    sessionStorage.setItem("languageSelected", LANGUAGE_SELECTED);
    window.location.href = "startQuiz.html";
})

  if(!(sessionStorage.getItem("scoreUser"))||!sessionStorage.getItem("scoreMax")){
    historicScoreUser.textContent = sessionStorage.getItem("scoreUser")
    historicScoreMax.textContent = sessionStorage.getItem("scoreMax")
    displayStillNoScore.textContent = "- Pas de score enregistré pour le moment -"
    
  }else{
    historicScoreUser.textContent = sessionStorage.getItem("scoreUser")
    historicScoreMax.textContent = sessionStorage.getItem("scoreMax")
    const buttonFromMenuToHistoric = document.getElementById('buttonFromMenuToHistoric')
    buttonFromMenuToHistoric.addEventListener("click",()=>{
      window.location.href = "score.html"
    })

  }


}

menu();
