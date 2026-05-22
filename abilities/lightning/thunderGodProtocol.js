import { triggerShake } from "../../vfx/screenShake.js";

export const thunderGodProtocol = {

    name: "Thunder God Protocol",

    energyCost: 100,

    cooldown: 30,

    activate(fighter, enemy) {

        fighter.gainNode();

        triggerShake(30);

        enemy.takeHit(
            fighter.boostDamage(42),
            45,
            fighter.facing
        );

        fighter.chainLightning(enemy);
    }
};
