import { Ability } from "../Ability.js";

export class EMPPulse extends Ability {
    constructor() {
        super({ name: "EMP Pulse", cooldown: 2000, energyCost: 20 });
    }

    activate(fighter, enemy) {
        enemy.energy -= 30;
        enemy.health -= 5;
    }
}
