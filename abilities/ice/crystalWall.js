import { Ability } from "../Ability.js";

export class CrystalWall extends Ability {
    constructor() {
        super({ name: "Crystal Wall", cooldown: 1800, energyCost: 18 });
    }

    activate(fighter) {
        fighter.armor = 25;

        setTimeout(() => {
            fighter.armor = 0;
        }, 3000);
    }
}
