// ============================================
// FILE: ui/hud.js
// ============================================

export class HUD {

    constructor(player1, player2, match) {

        this.p1 = player1;

        this.p2 = player2;

        this.match = match;
    }

    // ============================
    // BAR RENDER
    // ============================

    drawBar(ctx, x, y, width, height, value, max, color) {

        const percent = Math.max(0, value / max);

        ctx.fillStyle = "#222";

        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = color;

        ctx.fillRect(x, y, width * percent, height);

        ctx.strokeStyle = "white";

        ctx.strokeRect(x, y, width, height);
    }

    // ============================
    // MAIN DRAW
    // ============================

    draw(ctx, canvas) {

        // =================================
        // PLAYER 1 HUD
        // =================================

        ctx.fillStyle = "white";

        ctx.font = "20px Arial";

        ctx.fillText(this.p1.name, 20, 30);

        this.drawBar(
            ctx,
            20,
            40,
            300,
            20,
            this.p1.health,
            100,
            "red"
        );

        this.drawBar(
            ctx,
            20,
            70,
            300,
            10,
            this.p1.energy,
            this.p1.maxEnergy,
            "cyan"
        );

        // =================================
        // PLAYER 2 HUD
        // =================================

        ctx.fillText(this.p2.name, canvas.width - 120, 30);

        this.drawBar(
            ctx,
            canvas.width - 320,
            40,
            300,
            20,
            this.p2.health,
            100,
            "blue"
        );

        this.drawBar(
            ctx,
            canvas.width - 320,
            70,
            300,
            10,
            this.p2.energy,
            this.p2.maxEnergy,
            "cyan"
        );

        // =================================
        // CENTER INFO
        // =================================

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

        // =================================
        // COMBO DISPLAY FIX
        // =================================

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
