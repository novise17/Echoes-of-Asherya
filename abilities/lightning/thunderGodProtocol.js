import { Ability } from "../Ability.js";

export class ThunderGodProtocol extends Ability {
    constructor() {
        super({ name: "Thunder God Protocol", cooldown: 8000, energyCost: 60 });
    }

    activate(fighter, enemy) {
        enemy.health -= 40;
        enemy.x += fighter.facing * 120;

        fighter.speed += 3;

        setTimeout(() => {
            fighter.speed -= 3;
        }, 3000);
    }
}
