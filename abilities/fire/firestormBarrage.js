import { Ability } from "../Ability.js";

export class FirestormBarrage extends Ability {
    constructor() {
        super({
            name: "Firestorm Barrage",
            cooldown: 2500,
            energyCost: 30
        });
    }

    activate(fighter, enemy) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                enemy.health -= 4;
                enemy.x += fighter.facing * 5;
            }, i * 200);
        }
    }
}
