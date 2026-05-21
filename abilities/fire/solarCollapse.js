// ============================================
// FILE:
// abilities/fire/solarCollapse.js
// ============================================

import { Ability } from "../Ability.js";

import {
    spawnParticles
} from "../../vfx/particleSystem.js";

import {
    triggerShake
} from "../../vfx/screenShake.js";

export class SolarCollapse extends Ability {

    constructor() {

        super({

            name: "Solar Collapse",

            cooldown: 8000,

            energyCost: 60
        });
    }

    activate(fighter, enemy) {

        // MASSIVE SCREEN SHAKE
        triggerShake(25);

        // HUGE PARTICLE EXPLOSION
        spawnParticles(

            enemy.x,

            enemy.y,

            "red",

            50
        );

        // ULTIMATE DAMAGE
        enemy.takeHit(

            35,

            120,

            fighter.facing
        );
    }
}
