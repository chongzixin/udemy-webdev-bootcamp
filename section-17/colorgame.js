var numChoices = 6;
var colorsArray = new Array(numChoices);
var colorToGuess;

var gameBoxes = document.querySelectorAll(".gameBox");
var topbar = document.querySelector("#topbar");
var btnReset = document.querySelector("#btnNewGame");
var btnEasy = document.querySelector("#btnEasy");
var btnHard = document.querySelector("#btnHard");
var txtGameMsg = document.querySelector("#txtGameMsg");
var buttonsMode = document.querySelectorAll(".mode");

init();

function init() {
    // init game, only need to add eventListeners first time.
    for(var i=0; i<gameBoxes.length; i++) {
        // event listener that checks against the correct answer when clicked.
        gameBoxes[i].addEventListener("click", checkCorrectAnswer);
    }
    btnReset.addEventListener("click", newGame);
    
    for(var i=0; i<buttonsMode.length; i++) {
        buttonsMode[i].addEventListener("click", function() {
            if(this.textContent === "EASY") {
                numChoices = 3;
                document.querySelector("#fourthBox").style.visibility = "hidden";
                document.querySelector("#fifthBox").style.visibility = "hidden";
                document.querySelector("#sixthBox").style.visibility = "hidden";
            } else {
                numChoices = 6;
                document.querySelector("#fourthBox").style.visibility = "visible";
                document.querySelector("#fifthBox").style.visibility = "visible";
                document.querySelector("#sixthBox").style.visibility = "visible";
            }
            
            buttonsMode[0].classList.remove("active");
            buttonsMode[1].classList.remove("active");
            this.classList.add("active");
            
            newGame();
        });
    }
    
    // create a new game
    newGame();
}

function newGame() {
    for(var i=0; i<numChoices; i++) {
        colorsArray[i] = generateRandomRGB();
        gameBoxes[i].style.backgroundColor = colorsArray[i];
    }
    
    // reset topbar colour
    topbar.style.backgroundColor = "steelblue";
    
    colorToGuess = colorsArray[Math.floor(Math.random() * numChoices)];
    document.querySelector("#txtRGB").textContent = colorToGuess;
    
    btnReset.textContent = "New Game";
    txtGameMsg.textContent = "";
}

function generateRandomRGB() {
    var r = Math.round(Math.random() * 256);
    var g = Math.round(Math.random() * 256);
    var b = Math.round(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function checkCorrectAnswer() {
    if(this.style.backgroundColor === colorToGuess) {
        guessedCorrectAnswer();
    }
    else
    this.style.backgroundColor = "#232323";
}

function guessedCorrectAnswer() {
    // change each box to colorToGuess
    for(var i=0; i<gameBoxes.length; i++) {
        gameBoxes[i].style.backgroundColor = colorToGuess;
    }
    
    // update background color and change text
    topbar.style.backgroundColor = colorToGuess;
    txtGameMsg.textContent = "Correct!";
    
    btnReset.textContent = "Play Again?"
}