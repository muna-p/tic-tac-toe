const chooseGameboard = document.querySelectorAll(".xo-container");
const winnerResponse = document.getElementById("winner-response");
const form = document.querySelector("#name-input");
const playerXname = document.querySelector("#player-x-name");
const playerOname = document.querySelector("#player-o-name");
const container = document.querySelector("#container");
const openScreen = document.querySelector("#open-screen");
const popup = document.querySelector("#popup");
const replay = document.querySelector("#replay-btn");
const turnResponse = document.querySelector("#turn-response");

const gameBoard = (() => {
    let gameboardContainer = [];
    let currentIndex = 0;

    for (let i=0; i < 5; i++) {
        gameboardContainer.push('X');
        gameboardContainer.push('O');
    };

    const appendXO = (event) => {
        if ((event.target.textContent == "") && (currentIndex < gameboardContainer.length)) {
            event.target.textContent = gameboardContainer[currentIndex];

            if (gameboardContainer[currentIndex] == 'X') {
                turnResponse.textContent = `${playerO['player']}'s Turn!`;
            } else {
                turnResponse.textContent = `${playerX['player']}'s Turn!`;
            }

            currentIndex++;
        } else {
            console.log('Spot Already Picked');
        }
    };

    return {
        appendXO,
    };
})();

function Player (player,chosenValue) {
    this.player = player;
    this.chosenValue = chosenValue;
};

let playerX;
let playerO;

form.addEventListener("submit", (event) => { 
    event.preventDefault(); 
   playerX = new Player(playerXname.value, "X");
   playerO = new Player(playerOname.value, "O");
   openScreen.style.display = "none";
   container.style.display = "grid";
   turnResponse.textContent = `${playerX['player']}'s Turn!`;
   form.reset();
});

let winningArray = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let checkArray = new Array(9).fill(null);

const displayController = (() => { //control turns between the players
    const checkWin = (index,value) => { 
        if (checkArray[index] === null) {
            checkArray[index] = value;

            for (let win of winningArray) {
                const [a, b, c] = win;
                if (checkArray[a] !== null && checkArray[a] === checkArray[b] && checkArray[a] === checkArray[c]) {
                    if (checkArray [a, b, c] == 'X') {
                        popup.style.display = "block";
                        winnerResponse.textContent = `${playerX['player']} Wins!`;
                        break;
                    } else if (checkArray [a, b, c] == 'O') {
                        popup.style.display = "block";
                        winnerResponse.textContent = `${playerO['player']} Wins!`;
                        break;
                    }  
                } else if (((checkArray.some(x => x == null)) == false) && (checkArray[a, b, c] != 'X' || checkArray[a, b, c] != 'O')) {
                    popup.style.display = "block";
                    winnerResponse.textContent = "It's a Tie!";
                }
            }
        } 
    };

    return {
        checkWin,
    };
})();

chooseGameboard.forEach((box,index) => {
    box.addEventListener("click", gameBoard.appendXO);
    box.addEventListener("click", () => {displayController.checkWin(index, chooseGameboard[index].textContent)});
    box.addEventListener("click", gameBoard.appendXO);
});


replay.addEventListener("click", () => {
    popup.style.display="none";
    location.reload();
});