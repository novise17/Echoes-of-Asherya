// ============================================
// FILE: fighters/Fighter.js
// ============================================

import { triggerShake } from "../vfx/screenShake.js";
import { spawnParticles } from "../vfx/particleSystem.js";
import { AbilityRegistry } from "../abilities/abilityRegistry.js";
import { drawCoreAura } from "../vfx/coreAuras.js";

export class Fighter {

    constructor(name, x, color, controls, core = null) {

        this.name = name;
        this.core = core;

        this.x = x;
        this.y = 0;

        this.width = 60;
        this.height = 120;

        this.velocityY = 0;
        this.speed = 6;
        this.jumpForce = -15;
        this.gravity = 0.7;

        this.color = color;

        this.health = 100;
        this.maxHealth = 100;

        this.energy = 100;
        this.maxEnergy = 100;

        this.hitstun = 0;
        this.invulnerable = false;

        this.combo = 0;
        this.facing = 1;

        this.controls = controls;

        this.projectiles = [];

        this.abilities = [];

        // unique systems (future mechanics)
        this.heat = 0;
        this.nodes = 0;
        this.mass = 0;

        // load abilities safely
        if (this.core) this.loadAbilities();
    }

    // ============================================
    // ABILITIES
    // ============================================

    loadAbilities() {

        if (!AbilityRegistry[this.core]) return;

        this.abilities = AbilityRegistry[this.core].map(a => a);
    }

    updateAbilities() {

        for (let a of this.abilities) a.update();
    }

    useAbility(index, enemy) {

        if (!this.abilities[index]) return false;

        return this.abilities[index].use(this, enemy);
    }

    // ============================================
    // MOVEMENT
    // ============================================

    move(keys, canvas) {

        if (this.hitstun > 0) {

            this.hitstun--;
            return;
        }

        if (keys[this.controls.left]) {

            this.x -= this.speed;
            this.facing = -1;
        }

        if (keys[this.controls.right]) {

            this.x += this.speed;
            this.facing = 1;
        }

        if (keys[this.controls.up] && this.isGrounded) {

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

        this.regenEnergy();
    }

    regenEnergy() {

        if (this.energy < this.maxEnergy) {

            this.energy += 0.25;
        }
    }

    // ============================================
    // DAMAGE
    // ============================================

    takeHit(damage, knockback, direction) {

        if (this.invulnerable) return;

        this.health -= damage;

        this.hitstun = 20;

        triggerShake(knockback * 0.5);

        spawnParticles(
            this.x + this.width / 2,
            this.y + this.height / 2,
            "orange",
            12
        );

        this.invulnerable = true;

        setTimeout(() => this.invulnerable = false, 300);
    }

    // ============================================
    // DRAW
    // ============================================

    draw(ctx) {

        // 🌌 CORE AURA (THIS IS WHAT YOU ASKED ABOUT)
        if (this.core) {

            drawCoreAura(ctx, this);
        }

        // BODY
        ctx.fillStyle = this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        // ENERGY
        ctx.fillStyle = "cyan";

        ctx.fillRect(
            this.x,
            this.y - 10,
            this.energy,
            5
        );

        // HIT FLASH
        if (this.invulnerable) {

            ctx.strokeStyle = "white";

            ctx.strokeRect(
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}
