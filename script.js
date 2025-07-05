// Get elements
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");

const btn1 = document.getElementById("rollDiceBtn1");
const btn2 = document.getElementById("rollDiceBtn2");
const startBtn = document.getElementById("start-game");

const timerDisplay = document.getElementById("time-remain");
const score1Display = document.querySelector("#player1 .score-point");
const score2Display = document.querySelector("#player2 .score-point");

let currentPlayer = 1;
let timer;
let countdown = 10;
let scores = [0, 0];
let gameActive = false;

// Disable both dice buttons initially
disableDiceButtons();

startBtn.addEventListener("click", startGame);

function startGame() {
  gameActive = true;
  scores = [0, 0];
  currentPlayer = 1;

  // Reset UI
  score1Display.textContent = "00";
  score2Display.textContent = "00";
  dice1.src = "images/dice1.png";
  dice2.src = "images/dice1.png";
  startBtn.disabled = true;
  timerDisplay.textContent = countdown;

  updateActivePlayerUI();
  startTurn();
}

function startTurn() {
  resetTimer();

  if (currentPlayer === 1) {
    btn1.disabled = false;
    btn2.disabled = true;
  } else {
    btn1.disabled = true;
    btn2.disabled = false;
  }

  timer = setInterval(() => {
    countdown--;
    timerDisplay.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(timer);
      switchPlayer();
    }
  }, 1000);
}

function rollDice(player) {
  if (!gameActive) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  const imgPath = `images/dice${roll}.png`;

  const dice = player === 1 ? dice1 : dice2;

  // Apply rolling effect
  dice.classList.add("rolling");

  // Wait for animation to complete before changing the image
  setTimeout(() => {
    dice.src = imgPath;
    dice.classList.remove("rolling");

    // Add score
    scores[player - 1] += roll;
    const scoreDisplay = player === 1 ? score1Display : score2Display;
    scoreDisplay.textContent = scores[player - 1];

    // Check winner
    if (scores[player - 1] >= 40) {
      endGame(player);
      return;
    }

    if (roll === 6) {
      resetTimer();
    } else {
      clearInterval(timer);
      switchPlayer();
    }
  }, 600); // match animation duration
}

function rollDice1() {
  if (currentPlayer === 1) rollDice(1);
}

function rollDice2() {
  if (currentPlayer === 2) rollDice(2);
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateActivePlayerUI();
  startTurn();
}

function resetTimer() {
  clearInterval(timer);
  countdown = 10;
  timerDisplay.textContent = countdown;
}

function disableDiceButtons() {
  btn1.disabled = true;
  btn2.disabled = true;
}

function updateActivePlayerUI() {
  document
    .getElementById("player1")
    .classList.toggle("winner", currentPlayer === 1);
  document
    .getElementById("player2")
    .classList.toggle("winner", currentPlayer === 2);
}

function endGame(winner) {
  gameActive = false;
  clearInterval(timer);
  disableDiceButtons();
  timerDisplay.textContent = "Game Over";
  alert(`🎉 Player ${winner} wins the game!`);
  startBtn.disabled = false;
}
