const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");

let scoreValue = 0;
let scoreInterval;
let gameStarted = false;
let gameOver = false;

function startScore() {
  if (gameStarted) return;
  gameStarted = true;

  scoreInterval = setInterval(() => {
    if (!gameOver) {
      scoreValue++;
      score.innerText = scoreValue;
    }
  }, 200); // Score alle 200ms hochzählen
}

function jump() {
  if (dino.classList.contains("jump-animation") || gameOver) return;

  startScore(); // Score startet beim ersten Jump
  dino.classList.add("jump-animation");
  setTimeout(() => dino.classList.remove("jump-animation"), 500);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") jump();
});

setInterval(() => {
  if (gameOver) return;

  const dinoTop = parseInt(
    window.getComputedStyle(dino).getPropertyValue("top"),
  );
  const rockLeft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left"),
  );

  // Game Over, wenn Dino nicht springt
  if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
    gameOver = true;
    clearInterval(scoreInterval);
    rock.style.animation = "none";
    score.innerText = "GAME OVER | Points: " + scoreValue;
  }
}, 50);
