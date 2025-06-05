import { flagDisplayOfLanguageChosenInStartQuiz , displayHistoricCurrentGame} from "./utils";

let scoreUser = document.getElementById("scoreUser");
let scoreMax = document.getElementById("scoreMax");
const HISTORIC_DISPLAY = document.getElementById("historicDisplay")
const DISPLAY_SCORE_ONLY = document.getElementById("displayScoreOnly")
const historicList = document.getElementById("listHistoric")



function menu(){
    flagDisplayOfLanguageChosenInStartQuiz();
    HISTORIC_DISPLAY.style.display ="none"

    scoreUser.textContent = sessionStorage.getItem("scoreUser")
    scoreMax.textContent = sessionStorage.getItem("scoreMax")

    const EXIT_BUTTON = document.getElementById("toMenu");
    EXIT_BUTTON.addEventListener("click", () => {
    window.location.href = "index.html";
    })

    const HISTORIC_BUTTON = document.getElementById("toHistoric")
    HISTORIC_BUTTON.addEventListener("click",()=>{
        let historic = displayHistoricCurrentGame();
        let arrayHistoric = JSON.parse(historic);
        arrayHistoric.forEach(data => {
            let userAnswer = data.userAnswer;
            let expectedAnswer = data.expectedAnswer;
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            p2.className = "main-color";

            if(data.state === "correct"){
                p1.innerHTML = userAnswer +" [VRAI] <br>" 
                let li = document.createElement("li");
                li.className="good-answer-historic"
                li.appendChild(p1)
                console.log(li)
                historicList.appendChild(li)
            }else{
                p1.innerHTML = userAnswer +" [FAUX] <br>";
                p2.innerHTML = "Correction: " + expectedAnswer
                let li = document.createElement("li");
                li.className="bad-answer-historic"
                li.appendChild(p1)
                li.appendChild(p2)
                console.log(li)
                historicList.appendChild(li)
            }
            
        });
    
    })
}

menu()
