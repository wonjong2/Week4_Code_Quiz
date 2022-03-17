// Get elements to be used in this web page
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
var highscoreTitle = document.querySelector("#highscore-title");
var highscoreList = document.querySelector("#top10list");
var inputEl = document.querySelector("#initial"); 

// variables for timer
var timeInitialValue = 10*quizData.length; // Number of quesitons * 10s
var timeRemain; 
var timeInterval;
var resultInterval;

// variable to store current user score
var userScore;
// variable to store Top10 HighScore List
var top10Scorer = [];
// variable to store the Quiz number
var quizNumber;
// variable to store the place to return to from the highscore screen
var comeFrom;

// add event listeners for mouse events
viewHighScore.addEventListener("mouseover", cursorChange);
viewHighScore.addEventListener("click", showHighscoreScreen);
startButton.addEventListener("mouseover", cursorChange);
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("mouseover", cursorChange);
submitButton.addEventListener("click", checkInitials);
backButton.addEventListener("mouseover", cursorChange);
backButton.addEventListener("click", decideToWhere);
clearButton.addEventListener("mouseover", cursorChange);
clearButton.addEventListener("click", clearHighscores);
for(var k = 0; k < 4; k++) {
    liEl[k].addEventListener("mouseover", multiChoiceBgColorChange);
    liEl[k].addEventListener("mouseout", multiChoiceBgColorChange);
    liEl[k].addEventListener("click", checkAnswer);
}

// add event listener for keyboard event on the input element
inputEl.addEventListener("keydown", checkInitials); 

// change cursor property of all buttons
function cursorChange(event) {
    event.target.style.cursor = "pointer";
}

// change background color of specific item at the quiz screen (mouseover/mouseout)
function multiChoiceBgColorChange(event) {
    var element = event.target;

    if(event.type == "mouseover") {
        element.style.background = "rgb(209, 160, 209)";
        element.style.border = "1px rgb(209, 160, 209) solid"
    }
    else {
        element.style.background = "purple";
        element.style.border = "1px purple solid"
    }
}

// check if user answer is correct or not
function checkAnswer(event) {
    var element = event.target;
   
    // if correct, show "Correct!" in blue
    if(element.dataset.id == quizData[quizNumber][5]) {
        document.querySelector("#result").textContent = "Correct!";
        document.querySelector("#result").style.color = "blue";
        userScore++;
    }
    else { // if incorrect, show "Wrong!" in red
        document.querySelector("#result").textContent = "Wrong!";
        document.querySelector("#result").style.color = "red";
        timeRemain -=10;
    }

    // timer starts to show the result for 0.7s
    resultInterval = setTimeout(() => {
        // stop 'timeInterval' timer while the result is displaying
        // it will start again when the next question displays
        clearInterval(timeInterval);

        document.querySelector("#result").textContent = "";

        // if user went through all quesions, go to the final result screen
        // if there are any questions to be answered, show the next question
        if(quizData.length === quizNumber+1) {
            showFinalResultScreen(); // go to the final result screen
            return;
        }
        else {
            quizNumber++;  // quiz number increament
            showQuizScreen(quizNumber); // display the next question
        }
    }, 700);
}

// if user entered the initial correctly, then go to the highscore screen
function checkInitials(event) {
    // when unexpected key event comes, ignore it
    if(!(event.type === "keydown" && event.key === "Enter" ) && !(event.type === "onclick")) {
        return;
    }
    var enteredInitial = document.querySelector("#initial");

    event.preventDefault(); 
    
    // Request user to enter initials again if entered initials is nothing
    if(enteredInitial.value.length === 0){
        alert("Please enter at least one character.")
        return;
    }

    makeHighscoreList(enteredInitial.value, userScore);
    comeFrom = "First screen";  // set return point from the highscore screen
    showHighscoreScreen();
}


// Set initialize variables and then call showQuizScreen function
function startQuiz() { 
    // set return point from the highscore screen  
    comeFrom = "Quiz screen";

    // set values used in "Time: XX"
    timeRemain = timeInitialValue;
    time.textContent = "Time: " + timeRemain;

    // set display property to "flex" of the containers to be displayed
    setDisplayProperty(".header-container", "flex");
    setDisplayProperty(".quiz-container", "flex");
    setDisplayProperty(".firstpage-container", "none");
    setDisplayProperty(".result-container", "none");
    setDisplayProperty(".highscore-container", "none");

    // initialize user score and quiz number
    userScore = 0;
    quizNumber = 0;

    // function call to display quiz content
    showQuizScreen(quizNumber);
}

// show index-th question
function showQuizScreen(index) {
    // put quiz data into elements
    question.textContent = quizData[index][0];
    question.style.marginBottom = "1rem";

    // set style of each li elements
    for(var i = 0; i < 4; i++) {
        if(quizData[index][i+1] !== "") {
            liEl[i].textContent = quizData[index][i+1];
            liEl[i].style.backround = "purple";
            liEl[i].style.border = "1px purple solid"
            liEl[i].style.display = "block";
        }
        else {
            liEl[i].style.display = "none";
        }
    }

    // timer starts, it stops whenever result shown
    timeInterval = setInterval(() => {
        if(timeRemain <= 0) {
            clearInterval(timeInterval);
            showFinalResultScreen();
            return;
        }
        else{
            timeRemain--;
            time.textContent = "Time: " + timeRemain;
        }        
    }, 1000);
}

// show the final result
function showFinalResultScreen() {
    // set return point from the highscore screen  
    comeFrom = "Result screen";

    // set contents properly
    time.textContent = "Time: 0";
    document.querySelector("#score").textContent = "Your final score is " + userScore;
    document.querySelector("#initial").value = "";

    // set display property to "flex" of the containers to be displayed
    setDisplayProperty(".header-container", "flex");
    setDisplayProperty(".quiz-container", "none");
    setDisplayProperty(".firstpage-container", "none");
    setDisplayProperty(".result-container", "flex");
    setDisplayProperty(".highscore-container", "none");
}

// show the final result when return from the highscore screen
function backTofinalResultScreen() {
    comeFrom = "Result screen";
    time.textContent = "Time: 0";
    document.querySelector("#score").textContent = "Your final score is " + userScore;

    setDisplayProperty(".header-container", "flex");
    setDisplayProperty(".quiz-container", "none");
    setDisplayProperty(".firstpage-container", "none");
    setDisplayProperty(".result-container", "flex");
    setDisplayProperty(".highscore-container", "none");
}


// Add user score and initials to the Top10 list and then sort it
function makeHighscoreList(initial, score) {
    top10Scorer.push([score, initial]);
    top10Scorer.sort(function(a,b){return b[0]-a[0]});
    while(top10Scorer.length > 10){
        top10Scorer.pop();
    }
    localStorage.setItem("top10", JSON.stringify(top10Scorer));
    return;
}

// show Top10 highscore list
function showHighscoreScreen() {
    // if screen transition from 'Quiz screen'
    if(comeFrom === "Quiz screen") {
        clearInterval(timeInterval);
        clearInterval(resultInterval);        
    }
    // get the number of li elements that already exist
    var curListLength = highscoreList.children.length;
    var maxNum = (top10Scorer.length<10)?top10Scorer.length:10;

    setDisplayProperty(".header-container", "none");
    setDisplayProperty(".quiz-container", "none");
    setDisplayProperty(".firstpage-container", "none");
    setDisplayProperty(".result-container", "none");
    setDisplayProperty(".highscore-container", "flex");

    // make li elements with the top10 highscore
    for(var i = 0; i < maxNum; i++) {
        if((i + 1) <= curListLength) {  // if li element exists, just replace 'textContent' with new one.
            highscoreList.children[i].textContent = i+1 + ". " + top10Scorer[i][1] + " - " + top10Scorer[i][0];
        }
        else {  // if additional li elements needed, create new li elements and add them to the ul element with ID="top10list"
            var newListItem = document.createElement("li");
            newListItem.textContent = i+1 + ". " + top10Scorer[i][1] + " - " + top10Scorer[i][0];
            highscoreList.appendChild(newListItem);
        }
    }

}

// when 'Go back' button clicks, decide where to go
function decideToWhere() {
    switch(comeFrom){
        case "Quiz screen":
            returnToQuiz();
            break;
        case "Result screen":
            backTofinalResultScreen();
            break;
        default:
            showFirstScreen();
            break;
    }
}

function returnToQuiz() {
    // Clear contents of the first screen
    setDisplayProperty(".header-container", "flex");
    setDisplayProperty(".quiz-container", "flex");
    setDisplayProperty(".firstpage-container", "none");
    setDisplayProperty(".result-container", "none");
    setDisplayProperty(".highscore-container", "none");
    
    // function call to display quiz
    showQuizScreen(quizNumber);
}

// When 'Clear Highscore' button clicks, delete all lists including li elements and data in local Storage
function clearHighscores() {
    // var curListLength = highscoreList.children.length;
    while(highscoreList.firstElementChild) {
        highscoreList.removeChild(highscoreList.firstElementChild);
    }
    top10Scorer = [];
    localStorage.removeItem("top10");
    showHighscoreScreen();
}

// show the first page when open the web site
function showFirstScreen() {
    setDisplayProperty(".header-container", "flex");
    setDisplayProperty(".firstpage-container", "flex");
    setDisplayProperty(".quiz-container", "none");
    setDisplayProperty(".result-container", "none");
    setDisplayProperty(".highscore-container", "none");
    comeFrom = "First screen";
}

// function to change the value of the display property
function setDisplayProperty(selector, value) {
    document.querySelector(selector).style.display = value;
    return;
}

// load the top10 highscore date from localStorage and initialize the array 
function init() {
    top10Scorer = JSON.parse(localStorage.getItem("top10"));
    if(!top10Scorer) {
        top10Scorer = [];
    }
    showFirstScreen();
}

init();
