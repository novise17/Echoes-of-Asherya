import { Ability } from "../Ability.js";

export class PlasmaDash extends Ability {
    constructor() {
        super({
            name: "Plasma Dash",
            cooldown: 800,
            energyCost: 12
        });
    }

    activate(fighter, enemy) {
        fighter.x += fighter.facing * 80;
        fighter.isAttacking = true;

        setTimeout(() => {
            fighter.isAttacking = false;
        }, 100);
    }
}
