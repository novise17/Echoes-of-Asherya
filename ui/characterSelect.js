// ============================================
// FILE: ui/characterSelect.js
// ============================================

export class CharacterSelect {

    constructor(fighters) {

        this.fighters = fighters;

        this.selectedP1 = 0;

        this.selectedP2 = 1;

        this.confirmedP1 = false;

        this.confirmedP2 = false;

        this.activePlayer = 1; // 1 or 2
    }

    // ============================
    // INPUT HANDLING
    // ============================

    handleInput(key) {

        // MOVE LEFT
        if (key === "a" || key === "ArrowLeft") {

            this.moveSelection(-1);
        }

        // MOVE RIGHT
        if (key === "d" || key === "ArrowRight") {

            this.moveSelection(1);
        }

        // CONFIRM
        if (key === " " || key === "Enter") {

            this.confirmSelection();
        }
    }

    moveSelection(dir) {

        if (this.activePlayer === 1 && !this.confirmedP1) {

            this.selectedP1 =
                (this.selectedP1 + dir + this.fighters.length) %
                this.fighters.length;
        }

        if (this.activePlayer === 2 && !this.confirmedP2) {

            this.selectedP2 =
                (this.selectedP2 + dir + this.fighters.length) %
                this.fighters.length;
        }
    }

    confirmSelection() {

        if (this.activePlayer === 1) {

            this.confirmedP1 = true;

            this.activePlayer = 2;

        } else {

            this.confirmedP2 = true;
        }
    }

    // ============================
    // READY CHECK
    // ============================

    isReady() {

        return this.confirmedP1 && this.confirmedP2;
    }

    // ============================
    // GET FIGHTERS
    // ============================

    getFighters() {

        return {
            p1: this.fighters[this.selectedP1],

            p2: this.fighters[this.selectedP2]
        };
    }
}
