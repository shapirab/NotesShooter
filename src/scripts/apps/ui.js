export default class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.fontColor = 'black';
    }

    draw(ctx){
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'left';
        ctx.fillStyle = this.fontColor;
        ctx.fillText('Score: ' + this.game.score, 20, 50);

        if(this.game.gameOver){
            ctx.textAlign = 'center';
            ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            ctx.fillText('Boo-Yah', this.game.gameWidth / 2, this.game.gameHeight / 2 - 20);

            ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            ctx.fillText('What are creatures of the night affraid of? You!!!', 
                    this.game.gameWidth / 2, this.game.gameHeight / 2 + 20);
        }
    }       
}