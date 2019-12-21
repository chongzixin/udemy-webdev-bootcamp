var player1 = 0;
var player2 = 0;
var playTill = 5;
var gameEnded = false;

var spanPlayer1 = document.querySelector("#spanPlayer1");
var spanPlayer2 = document.querySelector("#spanPlayer2");
var btnPlayer1 = document.querySelector("#btnPlayer1");
var btnPlayer2 = document.querySelector("#btnPlayer2");
var btnReset = document.querySelector("#btnReset");
var txtBestOf = document.querySelector("#txtBestOf");
var inputNum = document.querySelector("#inputNum");

btnPlayer1.addEventListener("click", addScore);
btnPlayer2.addEventListener("click", addScore);
function addScore() {
    // if the game has ended, dont do anything.
    if(gameEnded) return;

    // increment the scores and display accordingly
    if(this === btnPlayer1) {
        player1++;
        spanPlayer1.textContent = player1;
    } else {
        player2++;
        spanPlayer2.textContent = player2;
    }

    // if either has reached the bestOf number, game has ended.
    if(player1 === playTill || player2 === playTill) {
        gameEnded = true;

        if(player1 === playTill) spanPlayer1.classList.toggle("winner");
        else spanPlayer2.classList.toggle("winner");
    }
}

// reset all the scores and their text
btnReset.addEventListener("click", function() {
    gameEnded = false;
    player1 = 0;
    player2 = 0;
    spanPlayer1.textContent = 0;
    spanPlayer2.textContent = 0;
    spanPlayer1.classList.remove("winner");
    spanPlayer2.classList.remove("winner");
});

inputNum.addEventListener("change", function () {
    txtBestOf.textContent = "Playing to: " + this.value;
    playTill = Number(this.value);
});