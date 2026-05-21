export let screenShake = 0;

export function triggerShake(power) {
    screenShake = power;
}

export function applyShake(ctx) {

    if (screenShake <= 0) return;

    const dx = (Math.random() - 0.5) * screenShake;
    const dy = (Math.random() - 0.5) * screenShake;

    ctx.translate(dx, dy);

    screenShake *= 0.9;

    if (screenShake < 0.5) {
        screenShake = 0;
    }
}
