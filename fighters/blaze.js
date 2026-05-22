// ============================================
// FILE: fighters/blaze.js
// ============================================

import { Fighter } from "./fighter.js";

// abilities
import { plasmaDash } from "../abilities/fire/plasmaDash.js";
import { heatwavePunch } from "../abilities/fire/heatwavePunch.js";
import { ignitionField } from "../abilities/fire/ignitionfield.js";
import { firestormBarrage } from "../abilities/fire/firestormBarrage.js";
import { solarCollapse } from "../abilities/fire/solarCollapse.js";

export class Blaze extends Fighter {

    constructor(x, controls) {

        super(
            "Blaze",
            x,
            "#ff5c33",
            controls,
            "fire"
        );

        // ============================================
        // HEAT SYSTEM
        // ============================================

        this.heat = 0;

        this.maxHeat = 100;

        this.overdrive = false;

        // ============================================
        // ABILITIES
        // ============================================

        this.abilities = {

            z: plasmaDash,
            x: heatwavePunch,
            c: ignitionField,
            v: firestormBarrage,
            u: solarCollapse
        };
    }

    // ============================================
    // PASSIVE
    // ============================================

    gainHeat(amount) {

        this.heat += amount;

        if (this.heat > this.maxHeat) {

            this.heat = this.maxHeat;
        }

        // ENTER OVERDRIVE
        if (this.heat >= 100 && !this.overdrive) {

            this.activateOverdrive();
        }
    }

    // ============================================
    // OVERDRIVE MODE
    // ============================================

    activateOverdrive() {

        this.overdrive = true;

        this.state.transformed = true;

        // movement buff
        this.speed = this.baseSpeed + 2;

        // VFX burst
        console.log("🔥 OVERDRIVE ACTIVATED");
    }

    deactivateOverdrive() {

        this.overdrive = false;

        this.state.transformed = false;

        this.speed = this.baseSpeed;
    }

    // ============================================
    // ATTACK BONUS
    // ============================================

    boostDamage(baseDamage) {

        // heat scaling
        let bonus = this.heat * 0.08;

        // overdrive bonus
        if (this.overdrive) {

            bonus += 8;
        }

        return baseDamage + bonus;
    }

    // ============================================
    // UPDATE
    // ============================================

    update() {

        // heat drain during overdrive
        if (this.overdrive) {

            this.heat -= 0.35;

            if (this.heat <= 0) {

                this.heat = 0;

                this.deactivateOverdrive();
            }
        }
    }

    // ============================================
    // DRAW
    // ============================================

    draw(ctx) {

        super.draw(ctx);

        // ========================================
        // HEAT BAR
        // ========================================

        ctx.fillStyle = "orange";

        ctx.fillRect(
            this.x,
            this.y - 40,
            this.heat,
            6
        );

        // ========================================
        // OVERDRIVE GLOW
        // ========================================

        if (this.overdrive) {

            ctx.strokeStyle = "yellow";

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
