// ============================================
// FILE: fighters/volt.js
// ============================================

import { Fighter } from "./fighter.js";

// LIGHTNING ABILITIES
import { arcKnives } from "../abilities/lightning/arcKnives.js";
import { empPulse } from "../abilities/lightning/empPulse.js";
import { railstep } from "../abilities/lightning/railstep.js";
import { staticPrison } from "../abilities/lightning/staticPrison.js";
import { thunderGodProtocol } from "../abilities/lightning/thunderGodProtocol.js";

export class Volt extends Fighter {

    constructor(x, controls) {

        super(
            "Volt",
            x,
            "#3dbbff",
            controls,
            "lightning"
        );

        // ============================================
        // NODE SYSTEM
        // ============================================

        this.nodes = 0;

        this.maxNodes = 3;

        this.overcharge = false;

        // ============================================
        // ABILITIES
        // ============================================

        this.abilities = {

            z: arcKnives,
            x: empPulse,
            c: railstep,
            v: staticPrison,
            u: thunderGodProtocol
        };
    }

    // ============================================
    // NODE GAIN
    // ============================================

    gainNode() {

        this.nodes++;

        if (this.nodes > this.maxNodes) {

            this.nodes = this.maxNodes;
        }

        // ENTER OVERCHARGE
        if (this.nodes >= 3 && !this.overcharge) {

            this.activateOvercharge();
        }
    }

    // ============================================
    // OVERCHARGE
    // ============================================

    activateOvercharge() {

        this.overcharge = true;

        this.state.transformed = true;

        // speed buff
        this.speed = this.baseSpeed + 3;

        console.log("⚡ OVERCHARGE ACTIVATED");
    }

    deactivateOvercharge() {

        this.overcharge = false;

        this.state.transformed = false;

        this.speed = this.baseSpeed;

        this.nodes = 0;
    }

    // ============================================
    // LIGHTNING AMPLIFICATION
    // ============================================

    boostDamage(baseDamage) {

        let bonus = this.nodes * 3;

        if (this.overcharge) {

            bonus += 10;
        }

        return baseDamage + bonus;
    }

    // ============================================
    // CHAIN LIGHTNING
    // ============================================

    chainLightning(enemy) {

        if (!this.overcharge) return;

        enemy.takeHit(
            6,
            4,
            this.facing
        );
    }

    // ============================================
    // UPDATE
    // ============================================

    update() {

        if (this.overcharge) {

            this.state.meter -= 0.4;

            if (this.state.meter <= 0) {

                this.state.meter = 0;

                this.deactivateOvercharge();
            }
        }
    }

    // ============================================
    // DRAW
    // ============================================

    draw(ctx) {

        super.draw(ctx);

        // ========================================
        // NODE UI
        // ========================================

        for (let i = 0; i < this.nodes; i++) {

            ctx.fillStyle = "cyan";

            ctx.beginPath();

            ctx.arc(
                this.x + 10 + (i * 14),
                this.y - 45,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        // ========================================
        // OVERCHARGE GLOW
        // ========================================

        if (this.overcharge) {

            ctx.strokeStyle = "cyan";

            ctx.lineWidth = 5;

            ctx.strokeRect(
                this.x - 4,
                this.y - 4,
                this.width + 8,
                this.height + 8
            );
        }
    }
}
