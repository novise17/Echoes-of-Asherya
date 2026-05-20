import { Ability } from "../Ability.js";

export class ZeroField extends Ability {
    constructor() {
        super({ name: "Zero Field", cooldown: 2000, energyCost: 20 });
    }

    activate(fighter, enemy) {
        enemy.speed = 2;

        setTimeout(() => {
            enemy.speed = 6;
        }, 2500);
    }
}
