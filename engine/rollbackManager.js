import { StateSnapshot } from "./stateSnapshot.js";

export class RollbackManager {
  constructor(gameState, maxHistory = 120) {
    this.gameState = gameState;
    this.history = new Map();
    this.inputHistory = new Map();
    this.maxHistory = maxHistory;
  }

  saveFrame(frame, inputs) {
    this.history.set(frame, StateSnapshot.captureState(this.gameState));
    this.inputHistory.set(frame, structuredClone(inputs));

    const cutoff = frame - this.maxHistory;
    this.history.delete(cutoff);
    this.inputHistory.delete(cutoff);
  }

  loadFrame(frame) {
    const snapshot = this.history.get(frame);
    if (!snapshot) return false;

    StateSnapshot.restoreState(this.gameState, snapshot);
    return true;
  }
}
