// ============================================ //
// FILE: engine/comboTracker.js                //
// ECHOES OF ASHERYA - BALANCED COMBO TRACKER   //
// ============================================ //

export class ComboTracker {
  constructor() {
    this.count = 0;
    this.timer = 0;              
    this.maxWindow = 900;        
    this.lastHitTimestamp = 0;   
    
    // Aerial Juggle Metrics
    this.airHits = 0;
    this.maxAirHits = 0;
  }

  registerHit() {
    const now = performance.now();
    const timeSinceLastHit = now - this.lastHitTimestamp;

    if (timeSinceLastHit <= this.maxWindow) {
      this.count += 1;
    } else {
      this.count = 1; 
    }

    this.lastHitTimestamp = now;
    this.timer = 60; 
  }

  /**
   * Registers and evaluates aerial juggle state constraints.
   * @param {boolean} isGrounded Current floor collision status of the victim
   */
  registerJuggle(isGrounded) {
    if (!isGrounded) {
      this.airHits += 1;
      this.maxAirHits = Math.max(this.maxAirHits, this.airHits);

      // HARD TUNING CAP: Enforce a structural ceiling to prevent infinite air loops
      if (this.airHits > 12) {
        if (this.debug) console.log("🚨 INFINITE JUGGLE PROTECTION ACTIVATED: COMBO BREAK!");
        this.reset(); // Voluntarily drop string data to allow the victim to escape
      }
    }
  }

  update() {
    if (this.timer > 0) {
      this.timer--;
      if (this.timer === 0) {
        this.reset();
      }
    }
  }

  reset() {
    this.count = 0;
    this.timer = 0;
    this.airHits = 0;
  }
}
