import { Ability } from "../Ability.js";

export class VoidStep extends Ability {
    constructor() {
        super({ name: "Void Step", cooldown: 600, energyCost: 10 });
    }

    activate(fighter) {
        fighter.x += fighter.facing * 90;
    }
}
