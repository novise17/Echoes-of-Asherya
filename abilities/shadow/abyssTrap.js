import { Ability } from "../Ability.js";

export class AbyssTrap extends Ability {
    constructor() {
        super({ name: "Abyss Trap", cooldown: 2200, energyCost: 22 });
    }

    activate(fighter, enemy) {
        enemy.speed = 1;

        setTimeout(() => {
            enemy.speed = 6;
        }, 2500);
    }
}
