export default class ShootingParticle{
    constructor(x, y, radius, color, velocity){
        this.position = {
            x: x,
            y:y
        };
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.markedForDeletion = false;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.alpha -= 0.001;
        if(this.alpha <= 0){
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    
}