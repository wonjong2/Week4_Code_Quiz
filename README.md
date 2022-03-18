# Week4_Code_Quiz

## Description

This Web site provides Coding Quiz about JavaScript and manages Top10 highscore lists.

- Make five major containers for different screens in HTML file
    - .header-container : It includes elements for "View Highscore" and "Time: XX"
    - .firstpage-container : It includes elements to configure the first screen shown when a user opens the web site.
    - .quiz-container : It includes elements to configure the quiz screen 
    - .result-container : It includes elements to configure the final result screen
    - .highscore-container : It includes elements to configure the highscore screen
- To show proper contents on the screen, set 'display' property of specific containers to 'flex' and other containers to 'none'
    - For example, in the quiz screen, only .header-container and quiz-container have 'display: flex' and others have 'display: none' 
- Basic style for each elements are defined in CSS file
- Use JavaScript to change contents on the screen according to user input
- Use setInterval()/setTimeout() to execute time related functions
- Store and load top10 highscore data in localStorage
- Use event listener to interact with various events
- Dynamically add li elements according to the length of the highscore list
- Seperated js file("data.js") contains data of quiz questions

## Web Site's URL

- Code Quiz : 
https://wonjong2.github.io/Week4_Code_Quiz/

## Git Hub URL for this Web Site
- wonjong2/Week4_Code_Quiz : https://github.com/wonjong2/Week4_Code_Quiz

## Usage

- When a user clicks "Start Quiz" button, Coding Quiz starts and the timer runs
- A user can select the one among the multi-choice shown on the screen
    - Background color of the item changed when the mouse is over it.
    - When a user selects the one, the result of whether the answer is correct or not is displayed for 0.5sec
    - If the incorrect answer, timer value decreased by 10sec
- When all questions are answered or the timer reaches 0, it shows your score and request you to enter your initials
    - If a user clicks "Submit" button without any input, it requests you to enter initials until you fill something.
- When a user clicks "View highscore" or clicks "Submit" button with initials, it shows the Top10 highscore lists
    - A user can click "View Highscore" on various places like the first screen, the quiz screen and the final result screen
    - Therefore, if a user clicks "Go back" button, it leads to previous screen. (except for the case of clicking "Submit" button with initials)

- __Simple Demo__ : https://watch.screencastify.com/v/pysN5OX8p5OMCKZjnfAX

Please see the screenshots on this Website.

- The first screen when user opens this web site.<br>
    ![First](/assets/images/firstScreen.png)

- The quiz screen.<br>
    ![quiz](/assets/images/quizScreen.png)

- The final result screen <br>
    ![Result](/assets/images/finalResultScreen.png)

- The highscore screen <br>
    ![highscore](/assets/images/top10highscore.png)

