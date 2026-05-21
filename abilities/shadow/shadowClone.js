import { Ability } from "../Ability.js";

export class ShadowClone extends Ability {
    constructor() {
        super({ name: "Shadow Clone", cooldown: 1500, energyCost: 18 });
    }

    activate(fighter, enemy) {
        enemy.health -= 6;
        enemy.x += fighter.facing * 20;

        // fake pressure effect
    }
}
