import { triggerShake } from "../vfx/screenShake.js";
import { spawnParticles } from "../vfx/particleSystem.js";
import { AbilityRegistry } from "../abilities/abilityRegistry.js";
import { CoreVisuals } from "../vfx/coreVisuals.js";
import { drawCoreAura } from "../vfx/coreAuras.js";
import { SpriteAnimator } from "../engine/SpriteAnimator.js";

export class Fighter {

    constructor(name, x, color, controls, core) {

        this.name = name;
        this.core = core;

        this.visual = CoreVisuals[this.core];

        this.x = x;
        this.y = 0;

        this.width = 60;
        this.height = 120;

        this.speed = 6;
        this.jumpForce = -15;
        this.gravity = 0.7;

        this.velocityY = 0;
        this.isGrounded = false;

        this.health = 100;
        this.energy = 100;

        this.hitstun = 0;
        this.invulnerable = false;
        this.isKO = false;

        this.facing = 1;
        this.controls = controls;

        this.abilities = [];

        this.animations = {};
        this.currentAnim = "idle";

        if (this.core) this.loadAbilities();
    }

    // =========================
    // SPRITE SYSTEM
    // =========================

    updateAnimation(state) {

        this.currentAnim = state;

        const anim = this.animations[state];

        if (anim) anim.update();
    }

    // =========================
    // ABILITIES
    // =========================

    loadAbilities() {

        if (!AbilityRegistry[this.core]) return;

        this.abilities = AbilityRegistry[this.core].map(a => a);
    }

    // =========================
    // MOVEMENT
    // =========================

    move(keys, canvas) {

        if (this.isKO) return;

        if (this.hitstun > 0) {

            this.hitstun--;
            return;
        }

        if (keys[this.controls.left]) {

            this.x -= this.speed * this.visual.speedBoost;
            this.facing = -1;
        }

        if (keys[this.controls.right]) {

            this.x += this.speed * this.visual.speedBoost;
            this.facing = 1;
        }

        if (keys[this.controls.up] && this.isGrounded) {

            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }

        // animation state
        if (!this.isGrounded) this.updateAnimation("jump");
        else if (keys[this.controls.left] || keys[this.controls.right]) this.updateAnimation("run");
        else this.updateAnimation("idle");

        this.y += this.velocityY;
        this.velocityY += this.gravity;

        if (this.y + this.height >= canvas.height) {

            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.isGrounded = true;
        }

        this.energy = Math.min(100, this.energy + 0.25);
    }

    // =========================
    // DAMAGE + KO SYSTEM
    // =========================

    takeHit(damage, knockback) {

        if (this.invulnerable || this.isKO) return;

        this.health -= damage;

        this.hitstun = 20;

        triggerShake(knockback * this.visual.shakeIntensity);

        spawnParticles(this.x, this.y, this.visual.aura, 10);

        if (this.health <= 0) this.KO();

        this.invulnerable = true;

        setTimeout(() => this.invulnerable = false, 300);
    }

    KO() {

        this.isKO = true;
        this.hitstun = 999;

        triggerShake(30);

        spawnParticles(this.x, this.y, this.visual.aura, 60);

        this.updateAnimation("ko");

        window.gameTimeScale = 0.25;

        setTimeout(() => window.gameTimeScale = 1, 600);
    }

    // =========================
    // DRAW
    // =========================

    draw(ctx) {

        if (this.core) drawCoreAura(ctx, this);

        const anim = this.animations[this.currentAnim];

        if (anim) {

            anim.draw(
                ctx,
                this.x,
                this.y,
                this.width,
                this.height,
                this.facing === -1
            );

        } else {

            ctx.fillStyle = "white";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        // energy bar
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y - 10, this.energy, 5);
    }
}
