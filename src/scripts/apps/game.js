import Player from "../models/player.js";
import InputHandler from "./input.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.playerNote = this.generatePlayerNote();
        this.player = new Player(this, this.playerNote);
        this.input = new InputHandler();
    }

    generatePlayerNote(){
        let noteValue = this.getRandomNumber(1, 7);
        switch (noteValue){
            case 1:
                return 'Do';
            break;
            case 2:
                return 'Re';
            break;
            case 3:
                return 'Mi';
            break;
            case 4:
                return 'Fa';
            break;
            case 5:
                return 'Sol';
            break;
            case 6:
                return 'La';
            break;
            case 7:
                return 'Si';           
        }

    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update(deltaTime){
        this.player.update(this.input, deltaTime);
    }

    draw(ctx){
        this.player.draw(ctx);
    }
}