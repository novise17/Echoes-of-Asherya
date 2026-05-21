// ============================================
// FILE: main.js
// ============================================

import { MatchManager } from "./engine/matchManager.js";
import { CharacterSelect } from "./ui/characterSelect.js";
import { IntroScreen } from "./ui/introScreen.js";
import { HUD } from "./ui/hud.js";

// fighters
import { Blaze } from "./fighters/Blaze.js";
import { Volt } from "./fighters/Volt.js";
import { Frost } from "./fighters/Frost.js";
import { Nova } from "./fighters/Nova.js";
import { Shade } from "./fighters/Shade.js";
import { Titano } from "./fighters/Titano.js";

import { applyShake } from "./vfx/screenShake.js";
import { updateParticles } from "./vfx/particleSystem.js";

// ============================================
// CANVAS
// ============================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

// ============================================
// STATE
// ============================================

let state = "select";

// ============================================
// ROSTER
// ============================================

const roster = [
    new Blaze(0, { left: "a", right: "d", up: "w" }),
    new Volt(0, { left: "a", right: "d", up: "w" }),
    new Frost(0, { left: "a", right: "d", up: "w" }),
    new Nova(0, { left: "a", right: "d", up: "w" }),
    new Shade(0, { left: "a", right: "d", up: "w" }),
    new Titano(0, { left: "a", right: "d", up: "w" })
];

// ============================================
// SYSTEMS
// ============================================

const selectScreen = new CharacterSelect(roster);
const introScreen = new IntroScreen();

let match;
let hud;

// ============================================
// INPUT STATE
// ============================================

const keys = {};

window.addEventListener("keydown", (e) => {

    keys[e.key] = true;

    if (state === "select") {

        selectScreen.handleInput(e.key);

        if (selectScreen.isReady()) {

            const fighters = selectScreen.getFighters();

            match = new MatchManager(
                fighters.p1,
                fighters.p2
            );

            hud = new HUD(match.player1, match.player2, match);

            introScreen.start();

            state = "intro";
        }
    }

    // ============================
    // ABILITY INPUTS
    // ============================

    if (state === "fight") {

        const p1 = match.player1;
        const p2 = match.player2;

        // 🧑 PLAYER 1 (Z X C V U)
        if (e.key === "z") p1.useAbility(0, p2);
        if (e.key === "x") p1.useAbility(1, p2);
        if (e.key === "c") p1.useAbility(2, p2);
        if (e.key === "v") p1.useAbility(3, p2);
        if (e.key === "u") p1.useAbility(4, p2);

        // 🧑 PLAYER 2 (1 2 3 4 5)
        if (e.key === "1") p2.useAbility(0, p1);
        if (e.key === "2") p2.useAbility(1, p1);
        if (e.key === "3") p2.useAbility(2, p1);
        if (e.key === "4") p2.useAbility(3, p1);
        if (e.key === "5") p2.useAbility(4, p1);
    }
});

window.addEventListener("keyup", (e) => {

    keys[e.key] = false;
});

// ============================================
// UPDATE
// ============================================

function update() {

    if (state === "intro") {

        introScreen.update();

        if (introScreen.done) state = "fight";

        return;
    }

    if (state === "fight") {

        match.update();

        if (!match.roundOver && !match.matchOver) {

            match.player1.move(keys, canvas);
            match.player2.move(keys, canvas);

            match.player1.updateAbilities();
            match.player2.updateAbilities();
        }
    }
}

// ============================================
// DRAW FIGHT
// ============================================

function drawFight() {

    ctx.save();

    applyShake(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#222";

    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    match.player1.draw(ctx);
    match.player2.draw(ctx);

    match.player1.updateProjectiles(ctx, match.player2);
    match.player2.updateProjectiles(ctx, match.player1);

    updateParticles(ctx);

    hud.draw(ctx, canvas);

    ctx.restore();
}

// ============================================
// LOOP
// ============================================

function loop() {

    update();

    if (state === "select") selectScreen.draw?.(ctx, canvas);
    else if (state === "intro") introScreen.draw(ctx);
    else drawFight();

    requestAnimationFrame(loop);
}

loop();
