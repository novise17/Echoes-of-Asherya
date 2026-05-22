export const plasmaDash = {

    name: "Plasma Dash",

    energyCost: 10,

    cooldown: 20,

    activate(fighter, enemy) {

        fighter.gainHeat(8);

        fighter.x += 120 * fighter.facing;

        enemy.takeHit(
            fighter.boostDamage(10),
            10,
            fighter.facing
        );
    }
};
