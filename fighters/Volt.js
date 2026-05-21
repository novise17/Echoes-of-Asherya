// ============================================
// FILE: fighters/Volt.js
// ============================================

import { Fighter } from "./Fighter.js";

import { lightningDash } from "../abilities/lightningDash.js";
import { railJab } from "../abilities/railJab.js";
import { staticMinefield } from "../abilities/staticMinefield.js";
import { thunderChain } from "../abilities/thunderChain.js";
import { stormOverclock } from "../abilities/stormOverclock.js";

export class Volt extends Fighter {

    constructor(x, controls) {

        super("Volt", x, "blue", controls);

        this.nodes = 0;

        this.abilities = [
            lightningDash,
            railJab,
            staticMinefield,
            thunderChain,
            stormOverclock
        ];
    }

    onHit(enemy) {

        // ⚡ NODE SYSTEM
        this.nodes++;

        if (this.nodes >= 3) {

            this.energy = Math.min(this.maxEnergy, this.energy + 25);

            this.nodes = 0;
        }
    }
}
