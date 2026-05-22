// ============================================ //
// FILE: input/keyState.js                     //
// GLOBAL INPUT STATE SINGLE SOURCE OF TRUTH    //
// ============================================ //

export const keys = {};

// Optional helper for safe binding
export function bindKeyEvents() {
  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });
}
