import { Ability } from "../Ability.js";

export class EclipseDomain extends Ability {
    constructor() {
        super({ name: "Eclipse Domain", cooldown: 8000, energyCost: 60 });
    }

    activate(fighter, enemy) {
        enemy.health -= 35;

        // disorient effect (simple version)
        enemy.speed = 2;

        setTimeout(() => {
            enemy.speed = 6;
        }, 3000);
    }
}
