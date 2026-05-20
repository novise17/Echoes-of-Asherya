import { Ability } from "../Ability.js";

export class AbsoluteZero extends Ability {
    constructor() {
        super({ name: "Absolute Zero", cooldown: 8000, energyCost: 60 });
    }

    activate(fighter, enemy) {
        enemy.health -= 38;
        enemy.speed = 1;

        setTimeout(() => {
            enemy.speed = 6;
        }, 3000);
    }
}
