import { Ability } from "../Ability.js";

export class NebulaBurst extends Ability {
    constructor() {
        super({ name: "Nebula Burst", cooldown: 1800, energyCost: 18 });
    }

    activate(fighter, enemy) {
        enemy.health -= 10;

        // soft push
        enemy.x += fighter.facing * 30;
    }
}
