import { Ability } from "../Ability.js";

export class CryoLance extends Ability {
    constructor() {
        super({ name: "Cryo Lance", cooldown: 900, energyCost: 12 });
    }

    activate(fighter, enemy) {
        enemy.health -= 10;
    }
}
