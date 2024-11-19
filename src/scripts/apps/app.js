import Game from "./game.js";
import ShootingAction from "./actions/shootingAction.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let game = new Game(canvas.width, canvas.height);

    window.addEventListener('click', (event) => {
        new ShootingAction(game).addShot(event);
    });
    
    let lastTimestamp = 0;
    function animate(timestamp){
        let deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        if(!game.gameOver){
            requestAnimationFrame(animate);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
    }
    animate(0);
});