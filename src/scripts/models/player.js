export default class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.frameX = 0;
        this.frameY = 0;
        this.ground = this.game.gameHeight - this.height;

        this.position = {
            x: 0,
            y: this.ground
        }
    }

    update(){}

    draw(ctx){
        ctx.drawImage(playerImg, this.frameX * this.width, this.frameY * this.height, 
            this.width, this.height, this.position.x, this.position.y, this.width, this.height);
    }
}