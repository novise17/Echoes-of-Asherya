export const empPulse = {

    name: "EMP Pulse",

    energyCost: 18,

    cooldown: 90,

    activate(fighter, enemy) {

        fighter.gainNode();

        enemy.takeHit(
            fighter.boostDamage(18),
            16,
            fighter.facing
        );

        fighter.chainLightning(enemy);
    }
};
