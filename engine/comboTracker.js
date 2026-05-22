// ============================================ //
// FILE: engine/comboTracker.js                //
// ============================================ //

export class ComboTracker {
  constructor() {
    this.count = 0;
    this.lastHitTimestamp = 0;

    this.maxWindow = 900;
    this.airHits = 0;
  }

  registerHit() {
    const now = performance.now();
    const timeSinceLast = now - this.lastHitTimestamp;

    this.count = timeSinceLast <= this.maxWindow ? this.count + 1 : 1;
    this.lastHitTimestamp = now;
  }

  registerJuggle(isGrounded) {
    if (!isGrounded) {
      this.airHits++;
      if (this.airHits > 12) this.reset();
    }
  }

  reset() {
    this.count = 0;
    this.airHits = 0;
  }

  update() {}
}
