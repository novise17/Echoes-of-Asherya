import { Ability } from "../Ability.js";

export class SeismicCrash extends Ability {
    constructor() {
        super({ name: "Seismic Crash", cooldown: 1200, energyCost: 15 });
    }

    activate(fighter, enemy) {
        enemy.health -= 14;
        enemy.y -= 20;
        enemy.x += fighter.facing * 10;
    }
}
