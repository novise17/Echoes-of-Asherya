console.log("Echoes of Asherya V1 Stable Build");

import { Fighter } from "./fighters/Fighter.js";

// =====================
// CANVAS
// =====================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

// =====================
// INPUT SYSTEM
// =====================
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// =====================
// FIGHTERS
// =====================
const player1 = new Fighter("Blaze", 150, "red", {
  left: "a",
  right: "d",
  jump: "w",
  attack: "z"
});

const player2 = new Fighter("Frost", 700, "cyan", {
  left: "ArrowLeft",
  right: "ArrowRight",
  jump: "ArrowUp",
  attack: "Enter"
});

// =====================
// GAME LOOP
// =====================
function loop() {
  // background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ground
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 560, canvas.width, 40);

  // update
  player1.update(keys, canvas, player2);
  player2.update(keys, canvas, player1);

  // draw
  player1.draw(ctx);
  player2.draw(ctx);

  // UI
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`${player1.name} HP: ${player1.hp}`, 20, 30);
  ctx.fillText(`${player2.name} HP: ${player2.hp}`, 800, 30);

  requestAnimationFrame(loop);
}

loop();
