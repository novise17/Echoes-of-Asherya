import { Ability } from "../Ability.js";

export class GravityRift extends Ability {
    constructor() {
        super({ name: "Gravity Rift", cooldown: 2000, energyCost: 20 });
    }

    activate(fighter, enemy) {
        enemy.x += fighter.facing * 60;
        enemy.y -= 20;
        enemy.health -= 8;
    }
}
