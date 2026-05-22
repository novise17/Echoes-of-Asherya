export const railstep = {

    name: "Railstep",

    energyCost: 10,

    cooldown: 15,

    activate(fighter, enemy) {

        fighter.gainNode();

        // lightning dash
        fighter.x += 140 * fighter.facing;

        enemy.takeHit(
            fighter.boostDamage(10),
            8,
            fighter.facing
        );
    }
};
