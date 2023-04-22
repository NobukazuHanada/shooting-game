const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawRedRectangle();
}

function drawRedRectangle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 200, 100);
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
