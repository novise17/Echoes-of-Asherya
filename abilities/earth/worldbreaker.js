import { Ability } from "../Ability.js";

export class Worldbreaker extends Ability {
    constructor() {
        super({ name: "Worldbreaker", cooldown: 8000, energyCost: 60 });
    }

    activate(fighter, enemy) {
        enemy.health -= 35;
        enemy.x += fighter.facing * 150;

        // temporary slow effect
        enemy.speed = 2;

        setTimeout(() => {
            enemy.speed = 6;
        }, 3000);
    }
}
