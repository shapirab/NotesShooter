import Player from "../models/player.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.player = new Player(this);
    }

    update(){}

    draw(ctx){
        this.player.draw(ctx);
    }
}