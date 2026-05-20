import { Fighter } from "./fighters/Fighter.js";

import { PlasmaDash } from "./abilities/fire/plasmaDash.js";
import { HeatwavePunch } from "./abilities/fire/heatwavePunch.js";
import { IgnitionField } from "./abilities/fire/ignitionfield.js";
import { FirestormBarrage } from "./abilities/fire/firestormBarrage.js";
import { SolarCollapse } from "./abilities/fire/solarCollapse.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

const keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// PLAYERS
const player1 = new Fighter("Blaze", 200, "red", {
    left: "a",
    right: "d",
    jump: "w",
    attack: " "
});

const player2 = new Fighter("Volt", 900, "blue", {
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp",
    attack: "Enter"
});

// ASSIGN FIRE ABILITIES TO PLAYER 1
player1.abilities = {
    dash: new PlasmaDash(),
    punch: new HeatwavePunch(),
    field: new IgnitionField(),
    barrage: new FirestormBarrage(),
    ultimate: new SolarCollapse()
};

// INPUT ABILITIES
window.addEventListener("keydown", (e) => {
    if (e.key === "q") player1.abilities.dash.use(player1, player2);
    if (e.key === "e") player1.abilities.punch.use(player1, player2);
    if (e.key === "r") player1.abilities.field.use(player1, player2);
    if (e.key === "f") player1.abilities.barrage.use(player1, player2);
    if (e.key === "g") player1.abilities.ultimate.use(player1, player2);
});

function update() {
    player1.move(keys, canvas);
    player2.move(keys, canvas);

    if (keys[player1.controls.attack]) player1.attack(player2);
    if (keys[player2.controls.attack]) player2.attack(player1);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player1.draw(ctx);
    player2.draw(ctx);

    player1.updateProjectiles(ctx, player2);
    player2.updateProjectiles(ctx, player1);

    drawUI();
}

function drawUI() {
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
