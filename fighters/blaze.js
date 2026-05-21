// ============================================
// FILE: fighters/Blaze.js
// ============================================

import { Fighter } from "./Fighter.js";

import { plasmaDash } from "../abilities/plasmaDash.js";
import { heatwavePunch } from "../abilities/heatwavePunch.js";
import { ignitionField } from "../abilities/ignitionfield.js";
import { firestormBarrage } from "../abilities/firestormBarrage.js";
import { solarCollapse } from "../abilities/solarCollapse.js";

export class Blaze extends Fighter {

    constructor(x, controls) {

        super("Blaze", x, "red", controls);

        this.heat = 0;

        // Q W E R U
        this.abilities = [
            plasmaDash,
            heatwavePunch,
            ignitionField,
            firestormBarrage,
            solarCollapse
        ];
    }

    onHit(enemy) {

        // 🔥 UNIQUE MECHANIC: Heat buildup
        this.heat += 8;

        if (this.heat >= 100) {

            this.speed = 8;
        }
    }
}
