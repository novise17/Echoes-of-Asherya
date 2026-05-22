import { HitboxSystem } from "./hitboxSystem.js";

export class Simulation {
  static update(state, inputs) {
    if (state.state !== "fight") return;

    const p1In = inputs.p1;
    const p2In = inputs.p2;

    state.player1.processMovementAndBufferedInputs(p1In, state.canvas);
    state.player2.processMovementAndBufferedInputs(p2In, state.canvas);

    state.player1.update();
    state.player2.update();

    HitboxSystem.resolveFrameCollision(state.player1, state.player2);
    HitboxSystem.resolveFrameCollision(state.player2, state.player1);
  }
}
