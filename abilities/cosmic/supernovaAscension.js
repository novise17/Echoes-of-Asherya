import { Ability } from "../Ability.js";

export class SupernovaAscension extends Ability {
    constructor() {
        super({ name: "Supernova Ascension", cooldown: 8000, energyCost: 60 });
    }

    activate(fighter, enemy) {
        enemy.health -= 40;
        enemy.x += fighter.facing * 140;

        // temporary power boost
        fighter.speed += 2;

        setTimeout(() => {
            fighter.speed -= 2;
        }, 3000);
    }
}
