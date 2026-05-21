// ============================================
// FILE: ui/hud.js
// ============================================

export class HUD {

    constructor(player1, player2, match) {

        this.p1 = player1;
        this.p2 = player2;
        this.match = match;
    }

    // ============================================
    // BASIC BAR
    // ============================================

    drawBar(ctx, x, y, width, height, value, max, color) {

        const percent = Math.max(0, value / max);

        ctx.fillStyle = "#222";
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, width * percent, height);

        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, width, height);
    }

    // ============================================
    // COOLDOWN BAR (NEW)
    // ============================================

    drawCooldown(ctx, x, y, width, height, ability, label) {

        const max = ability.cooldownMax;
        const current = ability.cooldown;

        const percentReady = 1 - (current / max);

        // background
        ctx.fillStyle = "#111";
        ctx.fillRect(x, y, width, height);

        // fill (blue = charging, green = ready)
        ctx.fillStyle = percentReady >= 1 ? "lime" : "cyan";

        ctx.fillRect(x, y, width * percentReady, height);

        // border
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, width, height);

        // label
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            label,
            x + width / 2,
            y + height - 2
        );
    }

    // ============================================
    // ABILITY ROW
    // ============================================

    drawAbilityRow(ctx, fighter, x, y, labels) {

        const size = 60;
        const gap = 10;

        for (let i = 0; i < fighter.abilities.length; i++) {

            const ability = fighter.abilities[i];

            const ax = x + i * (size + gap);
            const ay = y;

            this.drawCooldown(
                ctx,
                ax,
                ay,
                size,
                12,
                ability,
                labels[i]
            );
        }
    }

    // ============================================
    // MAIN HUD
    // ============================================

    draw(ctx, canvas) {

        ctx.textAlign = "left";

        // ============================
        // PLAYER 1
        // ============================

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";

        ctx.fillText(this.p1.name, 20, 25);

        this.drawBar(ctx, 20, 35, 300, 18, this.p1.health, 100, "red");
        this.drawBar(ctx, 20, 60, 300, 10, this.p1.energy, this.p1.maxEnergy, "cyan");

        // P1 abilities (Z X C V U)
        this.drawAbilityRow(
            ctx,
            this.p1,
            20,
            90,
            ["Z", "X", "C", "V", "U"]
        );

        // ============================
        // PLAYER 2
        // ============================

        ctx.fillText(this.p2.name, canvas.width - 120, 25);

        this.drawBar(ctx, canvas.width - 320, 35, 300, 18, this.p2.health, 100, "blue");
        this.drawBar(ctx, canvas.width - 320, 60, 300, 10, this.p2.energy, this.p2.maxEnergy, "cyan");

        // P2 abilities (1-5)
        this.drawAbilityRow(
            ctx,
            this.p2,
            canvas.width - 380,
            90,
            ["1", "2", "3", "4", "5"]
        );

        // ============================
        // CENTER INFO
        // ============================

        ctx.textAlign = "center";

        ctx.fillStyle = "white";
        ctx.font = "22px Arial";

        ctx.fillText(
            `ROUND ${this.match.currentRound}`,
            canvas.width / 2,
            30
        );

        ctx.fillText(
            `TIME ${Math.ceil(this.match.timer)}`,
            canvas.width / 2,
            60
        );

        ctx.fillText(
            `${this.match.score.p1} - ${this.match.score.p2}`,
            canvas.width / 2,
            90
        );

        // ============================
        // COMBOS
        // ============================

        if (this.p1.combo > 0) {

            ctx.fillStyle = "yellow";

            ctx.fillText(
                `P1 Combo: ${this.p1.combo}`,
                canvas.width / 2 - 200,
                140
            );
        }

        if (this.p2.combo > 0) {

            ctx.fillStyle = "orange";

            ctx.fillText(
                `P2 Combo: ${this.p2.combo}`,
                canvas.width / 2 + 200,
                140
            );
        }
    }
}
