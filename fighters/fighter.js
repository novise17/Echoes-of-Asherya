// ============================================ //
// FILE: fighters/Fighter.js
// ECHOES OF ASHERYA - CORE KERNEL V8 CLEAN
// ============================================ //

import { triggerShake } from "../vfx/screenShake.js";
import { spawnParticles } from "../vfx/particleSystem.js";
import { drawCoreAura } from "../vfx/coreAuras.js";
import { ComboTracker } from "../engine/comboTracker.js";

export class Fighter {
  constructor(name, x, color, controls) {
    this.name = name;

    // POSITION
    this.x = x;
    this.y = 0;
    this.width = 60;
    this.height = 120;

    // MOVEMENT
    this.speed = 6;
    this.jumpForce = -15;
    this.gravity = 0.7;
    this.velocityY = 0;
    this.isGrounded = false;

    // STATS
    this.maxHealth = 100;
    this.health = 100;

    this.maxEnergy = 100;
    this.energy = 100;

    // COMBAT
    this.damageMultiplier = 1;
    this.defenseMultiplier = 1;

    // STATE
    this.actionState = "neutral";
    this.stateTimer = 0;
    this.currentAbilityContext = null;

    this.hitstun = 0;
    this.blockstun = 0;
    this.invulnerable = false;
    this.isKO = false;

    // COUNTER SYSTEM
    this.isCounterHitWindow = false;

    // COMBO
    this.combo = new ComboTracker();

    // INPUT
    this.controls = controls;
    this.facing = 1;

    // ABILITIES
    this.abilities = { z: null, x: null, c: null, v: null, u: null };
    this.cooldowns = { z: 0, x: 0, c: 0, v: 0, u: 0 };

    this.state = {
      meter: 0,
      maxMeter: 100,
      transformed: false,
      justTransformed: false
    };
  }

  // =========================
  // UPDATE
  // =========================
  update() {
    this.combo.update();

    if (this.stateTimer > 0) {
      this.stateTimer--;
      if (this.stateTimer === 0) this.resolveActionState();
    }

    if (this.hitstun > 0) this.hitstun--;
    if (this.blockstun > 0) this.blockstun--;

    this.energy = Math.min(this.maxEnergy, this.energy + 0.15);
  }

  resolveActionState() {
    if (this.actionState === "startup") {
      this.actionState = "active";
      this.stateTimer = this.currentAbilityContext?.activeFrames || 2;
      this.isCounterHitWindow = false;

    } else if (this.actionState === "active") {
      this.actionState = "recovery";
      this.stateTimer = this.currentAbilityContext?.recoveryFrames || 10;

    } else {
      this.actionState = "neutral";
      this.currentAbilityContext = null;
      this.isCounterHitWindow = false;
    }
  }

  // =========================
  // MOVE
  // =========================
  move(canvas) {
    const keys = window.keysRefProxy; // 🔥 SINGLE INPUT SOURCE

    if (this.isKO) return;
    if (this.hitstun > 0 || this.blockstun > 0) return;
    if (this.actionState !== "neutral") return;

    if (keys[this.controls.left]) {
      this.x -= this.speed;
      this.facing = -1;
    }

    if (keys[this.controls.right]) {
      this.x += this.speed;
      this.facing = 1;
    }

    if (keys[this.controls.jump] && this.isGrounded) {
      this.velocityY = this.jumpForce;
      this.isGrounded = false;
    }

    this.y += this.velocityY;
    this.velocityY += this.gravity;

    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.velocityY = 0;
      this.isGrounded = true;
    }
  }

  // =========================
  // DAMAGE
  // =========================
  dealDamage(target, dmg, knockback, hitstun = 12, blockstun = 6) {
    let damage = dmg * this.damageMultiplier;
    const dir = target.x >= this.x ? 1 : -1;

    return target.takeHit(damage, knockback, dir, hitstun, blockstun, this);
  }

  // =========================
  // ATTACK
  // =========================
  useAbility(key, enemy) {
    if (this.actionState !== "neutral") return;

    const ability = this.abilities[key];
    if (!ability) return;

    this.actionState = "startup";
    this.stateTimer = ability.startupFrames;
    this.currentAbilityContext = ability;

    ability.activate(this, enemy);
  }

  // =========================
  // BLOCK CHECK
  // =========================
  checkBlock(enemy) {
    const keys = window.keysRefProxy;

    return (
      this.actionState === "neutral" &&
      (
        (enemy.x >= this.x && keys[this.controls.left]) ||
        (enemy.x < this.x && keys[this.controls.right])
      )
    );
  }

  // =========================
  // TAKE HIT
  // =========================
  takeHit(dmg, knockback, dir, hitstun, blockstun, attacker) {
    const keys = window.keysRefProxy;

    const isBlocking = this.checkBlock(attacker);

    if (isBlocking) {
      this.blockstun = blockstun;
      this.x += knockback * 0.3 * dir;
      return { success: true, type: "BLOCK" };
    }

    let isCounter = this.actionState === "startup";
    if (isCounter) dmg *= 1.35;

    this.health -= dmg;
    this.hitstun = isCounter ? 18 : hitstun;

    this.x += knockback * (1 + (1 - this.health / this.maxHealth)) * dir;

    this.actionState = "neutral";

    return {
      success: true,
      type: isCounter ? "COUNTER" : "HIT"
    };
  }
}
