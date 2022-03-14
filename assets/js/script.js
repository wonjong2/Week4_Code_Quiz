// Get the header tag element
var headerEl = document.querySelector("header");
var viewHighScore = document.querySelector("#highscore");
var time = document.querySelector("#time");
var mainEl = document.querySelector("main");
var title = document.querySelector("#title")
var description = document.querySelector("#description");
var startButton = document.querySelector("#start");
var question = document.querySelector("#question");
var ulEl = document.querySelector("#list");
var liEl = document.querySelectorAll("li");
var submitButton = document.querySelector("#submit");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

// time limitation 75 secs
var timeInitialValue = 15;
var timeRemain; 
var timeInterval;
// var resultInterval;

// User Score variable
var userScore;

// Highscore lists
var top5Scorer = [];

var quizIndex;

// mouseover listener of the button with id="start"
function cursorChange(event) {
    event.target.style.cursor = "pointer";
}

// function startBtnCursorChange() {
//     startButton.setAttribute("style", "font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px; cursor: pointer;");
//     return;
// }

// mouseover listener of the button with id="submit"
// function submitBtnCursorChange() {
//     submitButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px; cursor: pointer;");
//     return;
// }

// // mouseover listener of the button with id="back"
// function backBtnCursorChange() {
//     backButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px; margin-right: 10px; cursor: pointer;");
//     return;
// }

// // mouseover listener of the button with id="clear"
// function clearBtnCursorChange() {
//     clearButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px; cursor: pointer;");
//     return;
// }

// // 
// function viewHsCursorChange() {
//     // viewHighScore.setAttribute("style", "color: purple; padding: 10px; font-size: 1.5rem; cursor: pointer;");
//     viewHighScore.style.cursor = "pointer";
// }

function startQuiz() {   
    // Remove eventlistener from startButton
    // startButton.removeEventListener("mouseover", startBtnCursorChange);
    startButton.removeEventListener("mouseover", cursorChange);
    startButton.removeEventListener("click", startQuiz);

    // Starts timer, intial value is 75 secs
    timeRemain = timeInitialValue;
    time.textContent = "Time: " + timeRemain;

    // Clear contents of the main page
    title.setAttribute("style", "display: none");
    description.setAttribute("style", "display: none");
    startButton.setAttribute("style", "display: none");

    // initialize user score
    userScore = 0;
    quizIndex = 0;

    // function call to display quiz
    showQuiz(quizIndex);
}


function multiChoiceBgColorChange(event) {
    var element = event.target;

    if(event.type == "mouseover") {
        element.setAttribute("style", "display: block; background-color: purple;");
    }
    else {
        element.setAttribute("style", "display: block; background-color: white;");
    }
}

function showQuiz(index) {
    // put quiz data into elements
    question.textContent = quizData[index][0];

    for(var i = 0; i < 4; i++) {
        liEl[i].textContent = quizData[index][i+1];
        liEl[i].setAttribute("style", "display: block;");
    }

    // add eventlistener to ulEl for mouseover, mouseout and click
    if(index === 0){
        ulEl.addEventListener("mouseover", multiChoiceBgColorChange);
        ulEl.addEventListener("mouseout", multiChoiceBgColorChange);
        ulEl.addEventListener("click", checkAnswer);
    }

    timeInterval = setInterval(() => {
        if(timeRemain <= 0) {
            clearInterval(timeInterval);
            gameResult();
            return;
        }
        else{
            timeRemain--;
            time.textContent = "Time: " + timeRemain;
        }        
    }, 1000);
}

function checkAnswer(event) {
    var element = event.target;
    // if user answer is correct, show "Correct!!" message 
    // show "Wrong!!" message if it's incorrect
    if(element.id == quizData[quizIndex][5]) {
        console.log("Correct!!");
        document.querySelector("#result").textContent = "Correct!";
        userScore++;
    }
    else {
        console.log("Wrong!!");
        document.querySelector("#result").textContent = "Wrong!";
        timeRemain -=10;
    }

    var resultInterval = setTimeout(() => {
        clearInterval(timeInterval);
        document.querySelector("#result").textContent = "";
        // if user went through all quesions, go to game result screen
        // if there are any questions to be answered, show the next question
        if(quizData.length === quizIndex+1) {
            gameResult();
            return;
        }
        else {
            quizIndex++;
            showQuiz(quizIndex); // display the next question
        }
    }, 500);
}

function gameResult() {
    // remove eventlistener from ulEl for mouseover, mouseout and click
    ulEl.removeEventListener("mouseover", multiChoiceBgColorChange);
    ulEl.removeEventListener("mouseout", multiChoiceBgColorChange);
    ulEl.removeEventListener("click", checkAnswer);

    question.textContent = "";

    for(var i = 0; i < liEl.length; i++) {
        liEl[i].setAttribute("style", "display: none;")
    }

    time.textContent = "Time: 0";

    title.textContent = "All done!";
    title.setAttribute("style", "font-size: 3rem; font-weight: bold; color: black; margin-bottom: 1rem");

    description.textContent = "Your final score is " + userScore; 
    description.setAttribute("style", "width: 60%; font-size: 1.2rem; color: black; text-align: center; text-align-last: center; margin-bottom: 1rem");

    document.querySelector("label").setAttribute("style", "display: inline-block");
    document.querySelector("#initial").setAttribute("style", "display: inline-block");
    document.querySelector("#initial").value = "";
    submitButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px;");

    submitButton.addEventListener("mouseover", cursorChange);
    submitButton.addEventListener("click", checkInitials);
}

function checkInitials() {
    var enteredInitial = document.querySelector("#initial");
    
    // Request user to enter initials again if entered initials is nothing
    if(enteredInitial.value.length === 0){
        alert("Please enter at least one character.")
        return;
    }

    // remove eventlistener from submitButton
    submitButton.removeEventListener("mouseover", cursorChange);
    submitButton.removeEventListener("click", checkInitials);

    makeHsList(enteredInitial.value, userScore);
    highScorePage();
}

// Add user score and initials to the Top5 list and then sort it
function makeHsList(initial, score) {
    top5Scorer.push([score, initial]);
    top5Scorer.sort(function(a,b){return b[0]-a[0]});
    while(top5Scorer.length > 5){
        top5Scorer.pop();
    }
    return;
}

function highScorePage() {
    var headerEl = document.querySelectorAll("h1");
    headerEl[0].setAttribute("style", "display: none");
    headerEl[1].setAttribute("style", "display: none");
    // headerEl[0].textContent = "";
    // headerEl[1].textContent = "";

    description.setAttribute("style", "display: none;");
    document.querySelector("label").setAttribute("style", "display: none;");
    document.querySelector("#initial").setAttribute("style", "display: none;");
    document.querySelector("#submit").setAttribute("style", "display: none;");

    title.textContent = "Highscores";
    for(var i = 0; i < liEl.length; i++) {
        if(i < top5Scorer.length){
            liEl[i].textContent = i+1 + ". " + top5Scorer[i][1] + " - " + top5Scorer[i][0];
            liEl[i].setAttribute("style", "display: block;");
        }
        else {
            liEl[i].textContent = "";
            liEl[i].style.display = "none";
        }
    }

    backButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px; margin-right: 10px");
    backButton.addEventListener("mouseover", cursorChange);
    backButton.addEventListener("click", remEvtListenerNGoMain);

    clearButton.setAttribute("style", "display: inline-block; font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px;");
    clearButton.addEventListener("mouseover", cursorChange);
    clearButton.addEventListener("click", clearHighscores);
}

function remEvtListenerNGoMain() {
    backButton.removeEventListener("mouseover", cursorChange);
    backButton.removeEventListener("click", remEvtListenerNGoMain);
    clearButton.removeEventListener("mouseover", cursorChange);
    clearButton.removeEventListener("click", clearHighscores);

    mainPage();
}

function remEvtListenerNHighscores() {
    startButton.style.display = "none";
    viewHighScore.removeEventListener("mouseover", cursorChange);
    viewHighScore.removeEventListener("click", remEvtListenerNHighscores);
    // startButton.removeEventListener("mouseover", startBtnCursorChange);
    startButton.removeEventListener("mouseover", cursorChange);
    startButton.removeEventListener("click", startQuiz);

    highScorePage();
}

function clearHighscores() {
    for(var i = 0; i < top5Scorer.length ; i++) {
        top5Scorer.pop();
    }
    highScorePage();
}

function mainPage() {
    // set the h1 element for 'View Highscore'
    viewHighScore.setAttribute("style", "color: purple; padding: 10px; font-size: 1.5rem");
    // Add eventlisteners for 'View Highscre' 
    viewHighScore.addEventListener("mouseover", function(){viewHighScore.setAttribute("style", "color: purple; padding: 10px; font-size: 1.5rem; cursor: pointer;")});
    viewHighScore.addEventListener("click", remEvtListenerNHighscores);

    // set the h1 element for 'Time:'
    time.textContent = "Time: 0";
    time.setAttribute("style", "color: black; padding: 10px; font-size: 1.5rem");

    // Set the element h2 for the title
    title.textContent = "Coding Quiz Challenge";
    title.setAttribute("style", "font-size: 3rem; font-weight: bold; color: black; margin-bottom: 1rem");

    // Set the element p for the description
    description.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by tem seconds!";
    description.setAttribute("style", "width: 60%; font-size: 1.2rem; color: black; text-align: center; text-align-last: center; margin-bottom: 1rem");

    // Set the button for 'Start Quiz'
    startButton.textContent = "Start Quiz";
    startButton.setAttribute("style", "font-size: 1.2rem; color: white; background-color: purple; text-align: center; border: 1px purple solid; border-radius: 5px; padding: 2px 10px;");
    // Add eventlisteners for 'Start Quiz' 
    // startButton.addEventListener("mouseover", startBtnCursorChange);
    startButton.addEventListener("mouseover", cursorChange);
    startButton.addEventListener("click", startQuiz);

    for(var i = 0; i < liEl.length; i++) {
        liEl[i].setAttribute("style", "display: none;")
    }

    document.querySelector("label").setAttribute("style", "display: none");
    document.querySelector("#initial").setAttribute("style", "display: none");
    submitButton.setAttribute("style", "display: none");

    backButton.setAttribute("style", "display: none");
    clearButton.setAttribute("style", "display: none");
}

mainPage();
