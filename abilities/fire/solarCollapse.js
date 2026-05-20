import { Ability } from "../Ability.js";

export class SolarCollapse extends Ability {
    constructor() {
        super({
            name: "Solar Collapse",
            cooldown: 8000,
            energyCost: 60
        });
    }

    activate(fighter, enemy) {
        enemy.health -= 35;

        // massive knockback
        enemy.x += fighter.facing * 120;

        // temporary arena pressure effect
        fighter.speed += 2;

        setTimeout(() => {
            fighter.speed -= 2;
        }, 3000);
    }
}
