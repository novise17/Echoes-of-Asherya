import { Ability } from "../Ability.js";

export class GravitonPull extends Ability {
    constructor() {
        super({ name: "Graviton Pull", cooldown: 1800, energyCost: 20 });
    }

    activate(fighter, enemy) {
        const direction = fighter.x < enemy.x ? -1 : 1;

        enemy.x -= direction * 60;
        enemy.health -= 6;
    }
}
