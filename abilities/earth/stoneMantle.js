import { Ability } from "../Ability.js";

export class StoneMantle extends Ability {
    constructor() {
        super({ name: "Stone Mantle", cooldown: 2500, energyCost: 25 });
    }

    activate(fighter) {
        fighter.armor = 30;

        setTimeout(() => {
            fighter.armor = 0;
        }, 4000);
    }
}
