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

        this.isGrounded = false;
        this.isAttacking = false;

        this.controls = controls;
        this.facing = 1;

        this.projectiles = [];

        this.abilities = {};
    }

    move(keys, canvas) {
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

        this.regenEnergy();
    }

    regenEnergy() {
        if (this.energy < this.maxEnergy) {
            this.energy += 0.2;
        }
    }

    attack(enemy) {
        const hitbox = {
            x: this.facing === 1 ? this.x + this.width : this.x - 40,
            y: this.y + 30,
            width: 40,
            height: 30
        };

        if (
            hitbox.x < enemy.x + enemy.width &&
            hitbox.x + hitbox.width > enemy.x &&
            hitbox.y < enemy.y + enemy.height &&
            hitbox.y + hitbox.height > enemy.y
        ) {
            enemy.health -= 10;
        }
    }

    updateProjectiles(ctx, enemy) {
        for (let i = 0; i < this.projectiles.length; i++) {
            let p = this.projectiles[i];

            p.x += p.speed;

            ctx.fillStyle = p.color || "orange";
            ctx.fillRect(p.x, p.y, p.width, p.height);

            if (
                p.x < enemy.x + enemy.width &&
                p.x + p.width > enemy.x &&
                p.y < enemy.y + enemy.height &&
                p.y + p.height > enemy.y
            ) {
                enemy.health -= p.damage;
                this.projectiles.splice(i, 1);
                i--;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // energy bar
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y - 10, this.energy, 5);
    }
}
