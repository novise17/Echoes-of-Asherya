import { Ability } from "../Ability.js";

export class HeatwavePunch extends Ability {
    constructor() {
        super({
            name: "Heatwave Punch",
            cooldown: 1200,
            energyCost: 15
        });
    }

    activate(fighter, enemy) {
        enemy.health -= 18;

        enemy.x += fighter.facing * 30; // knockback
    }
}
