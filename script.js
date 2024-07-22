const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;

const startButton = document.getElementById("start-button");
const colorDivs = document.querySelectorAll(".color");

startButton.addEventListener("click", startGame);

colorDivs.forEach(color => {
    color.addEventListener("click", handleUserInput);
});

function startGame() {
    gameSequence = [];
    userSequence = [];
    level = 0;
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    level++;
    document.querySelector("h1").textContent = `Level ${level}`;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, (index + 1) * 600);
    });
}

function flashColor(color) {
    const colorDiv = document.getElementById(color);
    colorDiv.classList.add("active");
    setTimeout(() => {
        colorDiv.classList.remove("active");
    }, 300);
}

function handleUserInput(event) {
    const userChosenColor = event.target.id;
    userSequence.push(userChosenColor);
    flashColor(userChosenColor);

    if (!checkSequence(userSequence.length - 1)) {
        gameOver();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

function checkSequence(currentLevel) {
    return userSequence[currentLevel] === gameSequence[currentLevel];
}

function gameOver() {
    document.querySelector("h1").textContent = "Game Over, Press Start to Restart";
    gameSequence = [];
    userSequence = [];
    level = 0;
}
