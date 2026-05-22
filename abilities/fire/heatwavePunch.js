export class HeatwavePunch {
  constructor() {
    this.energyCost = 15;
    this.cooldown = 15;

    this.startupFrames = 8;
    this.activeFrames = 3;
    this.recoveryFrames = 16;
  }

  activate(caster, enemy) {
    caster.dealDamage(enemy, 14, 8, 24, 12);
  }
}
