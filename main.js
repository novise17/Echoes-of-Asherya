import { Fighter } from "./fighters/Fighter.js";

// -------------------- CANVAS --------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

// -------------------- INPUT SYSTEM --------------------
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// -------------------- FIGHTERS --------------------
const player1 = new Fighter(
    "Blaze",
    200,
    "red",
    {
        left: "a",
        right: "d",
        jump: "w",
        attack: " "
    }
);

const player2 = new Fighter(
    "Volt",
    900,
    "blue",
    {
        left: "ArrowLeft",
        right: "ArrowRight",
        jump: "ArrowUp",
        attack: "Enter"
    }
);

// -------------------- GAME LOOP --------------------
function update() {
    player1.move(keys, canvas);
    player2.move(keys, canvas);

    // attacks
    if (keys[player1.controls.attack]) {
        player1.attack(player2);
    }

    if (keys[player2.controls.attack]) {
        player2.attack(player1);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // arena floor
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    player1.draw(ctx);
    player2.draw(ctx);

    drawUI();
}

function drawUI() {
    // health bars
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, player1.health * 3, 20);

    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width - player2.health * 3 - 20, 20, player2.health * 3, 20);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
