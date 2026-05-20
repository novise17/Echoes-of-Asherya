export class Ability {
    constructor({
        name,
        cooldown = 1000,
        energyCost = 10
    }) {
        this.name = name;
        this.cooldown = cooldown;
        this.energyCost = energyCost;

        this.lastUsed = 0;
    }

    canUse(fighter) {
        const now = Date.now();

        return (
            now - this.lastUsed >= this.cooldown &&
            fighter.energy >= this.energyCost
        );
    }

    use(fighter, enemy) {
        const now = Date.now();

        if (!this.canUse(fighter)) return false;

        this.lastUsed = now;
        fighter.energy -= this.energyCost;

        this.activate(fighter, enemy);

        return true;
    }

    // OVERRIDE THIS IN EACH ABILITY
    activate(fighter, enemy) {
        console.log(`${this.name} used!`);
    }
}
