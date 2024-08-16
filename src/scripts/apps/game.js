import Player from "../models/player.js";
import InputHandler from "./input.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.player = new Player(this);
        this.input = new InputHandler();
    }

    update(deltaTime){
        this.player.update(this.input, deltaTime);
    }

    draw(ctx){
        this.player.draw(ctx);
    }
}