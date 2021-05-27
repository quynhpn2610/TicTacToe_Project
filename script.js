// variables
const cells = Array.from(document.getElementsByClassName("game-cell"));
const restartBtn = document.getElementById("restart");
const playText = document.getElementById("playText");
const spaces = [];
const O_text = "0";
const X_text = "X";
let currentPlayer = O_text;
let moveCount = 0;
//let gameIsLive = true;

// Handle cell click
const cellClicked = (e) => {
    moveCount += 1;
    console.log(moveCount);
    const id = e.target.id;
    // Check if the space is available, then add x or o
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        // Check if someone has won (aka game is finished). If so, stop the game.
        if (playerHasWon()) {
            playText.innerText = `${currentPlayer} wins!!`
            return;
        }
        // Check if game is tied and stop the game.
        else if (gameIsTied()) {
            playText.innerText = "Game is tied!!"
            return
        }
        // Else, continue to switch turn between x and o
        else {
            currentPlayer = currentPlayer === O_text ? X_text : O_text;
        }
    }
}

// Check if a player has won, or game is tied, or game is not finished.
const playerHasWon = () => {
    // check from position 0
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        } else if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        } else if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            return true;
        }
        else if (spaces[2] === currentPlayer && spaces[4] === currentPlayer && spaces[6]===currentPlayer){
            return true;
        }

    }
    // check from position 8
    else if (spaces[8] === currentPlayer) {
        if (spaces[5] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        } else if (spaces[7] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        }
    }
    // check from position 4
    else if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            return true;
        } else if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            return true;
        } else if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            return true;
        }
    }
    // check from position 2
}


// Check if game is tied
const gameIsTied = () => {
    let allCellsAreOccupied = moveCount === 9;
    let neitherPlayWin = !playerHasWon();
    if (allCellsAreOccupied && neitherPlayWin) {
        return true;
    }
    return false;
}
//gameIsLive = false;


// Event listener for each cell
for (const cell of cells) {
    cell.addEventListener("click", cellClicked);
}

const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    cells.forEach((cell) => {
        cell.innerText = "";
    })
    playText.innerText = `Let's Play!`;
    currentPlayer = O_text;
    //gameIsLive = true;
}

restartBtn.addEventListener("click", restart);

restart();


