const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let lastTime = 0;

// The main engine loop
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    draw(ctx);

    requestAnimationFrame(gameLoop);
}

// Handle physics, state, and collisions
function update(deltaTime) {
    // Engine logic goes here
}

// Render the graphics to the screen
function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Drawing logic goes here
}

// Initialize the loop
requestAnimationFrame(gameLoop);
const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
    color: '#00FF00', // A highly visible neon green
    speed: 300        // Movement speed in pixels per second
};const keys = {};

// When a key is pressed down, mark it as true
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

// When a key is released, mark it as false
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});function update(deltaTime) {
    // Convert deltaTime from milliseconds to seconds for smooth movement
    const dtSeconds = deltaTime / 1000; 

    // Move up and down (W/S or Up/Down Arrows)
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed * dtSeconds;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed * dtSeconds;
    
    // Move left and right (A/D or Left/Right Arrows)
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed * dtSeconds;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed * dtSeconds;

    // Optional: Keep the player inside the canvas bounds
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw(ctx) {
    // Wipe the screen clean from the last frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw our player block
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
