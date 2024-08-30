import Player from "../models/player.js";
import InputHandler from "./input.js";

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.playerNote = this.generatePlayerNote();
        this.player = new Player(this, this.playerNote);
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
        
        this.input = new InputHandler();
        this.speed = 0;
        this.maxSpeed = 6;
    }

    generatePlayerNote(){
        let noteValue = this.getRandomNumber(1, 7);
        switch (noteValue){
            case 1:
                return 'Do';
            case 2:
                return 'Re';
            case 3:
                return 'Mi';
            case 4:
                return 'Fa';
            case 5:
                return 'Sol';
            case 6:
                return 'La';
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