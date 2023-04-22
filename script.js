const keyState = {};

window.addEventListener("keydown",(e)=>{
    keyState[e.key] = true;
})

window.addEventListener("keyup",(e)=>{
    keyState[e.key] = false;
})



const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

const player = { 
    x : canvas.width / 2 - 25,
    y : canvas.height - 100,
    w : 50,
    h : 50,
    s : 5,
    c : "red",
    draw(){
        drawRect(player)
    },
    update(){
        if(keyState["a"] || keyState["ArrowLeft"]){
            player.x -= player.s;
        } 
        if(keyState["d"] || keyState["ArrowRight"]){
            player.x += player.s; 
        }
        if(keyState["w"] || keyState["ArrowUp"]){
            player.y -= player.s;
        }
        if(keyState["s"] || keyState["ArrowDown"]){
            player.y += player.s;
        }
    }
};


function drawRect(o){
    ctx.fillStyle = o.c;
    ctx.fillRect(
        o.x,
        o.y,
        o.w, 
        o.h
    )
}

const bullets = [];
const bulletsInterval = 10 ;
let lastShootBuletFrame = 0;
let frame = 0;

function createBullet(){
    const bullet = {
        x : player.x + player.w / 2 - 5,
        y : player.y - player.h / 2 + 10,
        w : 10,
        h : 10,
        s : 10,
        c : "yellow",
        draw(){
            drawRect(bullet)
        },
        update(){
            bullet.y -= bullet.s;
        }
    }

    bullets.push(bullet);
}


const enemies = [];
const enemiesSchedule = [
    0,
    10,
    30
];

function createEnemy(){
    const enemy = {
        x : 50 + (Math.random() *  (canvas.width - 100)),
        y : 0,
        w : 50,
        h : 50,
        s : 1,
        c : "blue",
        draw(){
            drawRect(enemy)
        },
        update(){
            enemy.y += enemy.s;
        }
    }

    enemies.push(enemy);
}


setInterval(()=>{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    if(keyState[" "] && frame - lastShootBuletFrame > bulletsInterval){
        createBullet();
        lastShootBuletFrame = frame;
    }

    if(enemiesSchedule.includes(frame)){
        createEnemy();
    }

    bullets.forEach(bullet=>{
        bullet.update();
        bullet.draw();
    });

    enemies.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    })
    frame++;
}, 10);