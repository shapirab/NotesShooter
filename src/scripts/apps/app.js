import Game from "./game.js";
import ShootingAction from "./shootingAction.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let game = new Game(canvas.width, canvas.height);

    window.addEventListener('click', addShot);

    function addShot(event){
        let angle = Math.atan2(event.clientY - game.player.position.y, event.clientX - game.player.position.x);
        let velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5,
        };
        let positionX = game.player.position.x + game.player.width * 0.5;
        let positionY = game.player.position.y + game.player.height * 0.5;
        let radius = 3;
        let color = 'white';
        game.shootingProjectiles.push(new ShootingAction(positionX, positionY, radius, color, velocity));
    }
    
    let lastTimestamp = 0;
    function animate(timestamp){
        let deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
    }
    animate(0);
});