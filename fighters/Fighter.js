// ============================================
// FILE: fighters/Fighter.js
// ============================================

export class Fighter {

    constructor(name, x, color, controls) {

        this.name = name;

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
        this.energy = 100;
        this.maxEnergy = 100;

        this.hitstun = 0;
        this.invulnerable = false;

        this.combo = 0;

        this.facing = 1;

        this.controls = controls;

        this.projectiles = [];

        // abilities system
        this.abilities = [];
    }

    // ============================================
    // MOVE (WASD or ARROWS depending on fighter)
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
    // ABILITY SYSTEM
    // ============================================

    useAbility(index, enemy) {

        const ability = this.abilities[index];

        if (ability) {

            ability.use(this, enemy);
        }
    }

    updateAbilities() {

        for (let a of this.abilities) {

            a.update();
        }
    }

    // ============================================
    // DRAW
    // ============================================

    draw(ctx) {

        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
