// === DOM Elements ===
let startButton = document.querySelector("#startButton");
let restartButton = document.querySelector("#restart");
let boxes = document.querySelectorAll(".box");
let result = document.getElementById("result");
let turnO = document.querySelector(".turnO");
let turnX = document.querySelector(".turnX");

// === Game Variables ===
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isTurnO = true; // O starts first
let gameOver = false; // Flag to track game state

// === Event Listeners ===

// Start button functionality

startButton.addEventListener("click", () => {
  document.querySelector(".container").classList.remove("hide");
  document.querySelector(".start").classList.add("hide");
});

// Restart button functionality
restartButton.addEventListener("click", () => {
  resetGame();
});

// Add click event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "" && !gameOver) {
      handleBoxClick(box);
      checkWin();
      checkDraw();
    }
  });
});

// === Game Logic ===

// Handle a box click
function handleBoxClick(box) {
  if (isTurnO) {
    box.innerHTML = "O";
    isTurnO = false;
    turnO.classList.add("hide");
    turnX.classList.remove("hide");
  } else {
    box.innerHTML = "X";
    isTurnO = true;
    turnO.classList.remove("hide");
    turnX.classList.add("hide");
  }
}

// Check for a winner
function checkWin() {
  winPatterns.forEach((pattern) => {
    let box1 = boxes[pattern[0]].innerHTML;
    let box2 = boxes[pattern[1]].innerHTML;
    let box3 = boxes[pattern[2]].innerHTML;

    if (box1 === box2 && box2 === box3 && box1 !== "") {
      result.innerHTML = `Congratulations... <br> ${box1} wins!`;
      result.classList.remove("hide");
      turnO.classList.add("hide"); // Hide O's turn indicator
      turnX.classList.add("hide"); // Hide X's turn indicator
      disableAllBoxes();
      // Add "winBox" class to the winning boxes
      pattern.forEach((i) => {
        boxes[i].classList.add("winBox");
      });
      gameOver = true;
    }
  });
}

// Check for a draw
function checkDraw() {
  if (gameOver) return;

  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    result.innerHTML = "Oops! <br> It's a draw!";
    result.classList.remove("hide");
    gameOver = true;
    turnO.classList.add("hide"); // Hide O's turn indicator
    turnX.classList.add("hide"); // Hide X's turn indicator
  }
}

// Reset the game
function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.pointerEvents = "auto";// Enable pointer events for all boxes
    box.classList.remove("winBox"); // Remove winBox class from all boxes
    
  });
  isTurnO = true; // Ensure O starts first
  gameOver = false;
  turnO.classList.remove("hide"); // Show O's turn indicator
  turnX.classList.add("hide"); // Hide X's turn indicator
  result.classList.add("hide"); // Hide the result message
}

// Disable all boxes
function disableAllBoxes() {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

// Ensure the game starts with O's turn when the page loads
resetGame();
