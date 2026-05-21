const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

console.log("ENGINE STARTED");

function loop() {

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(loop);
}

loop();
