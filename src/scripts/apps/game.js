import { Background } from "../background.js";
import Player from "../models/player.js";
import InputHandler from "./input.js";

import { Bat, GroundZombie } from '../models/friendemy.js';

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.background = new Background(this);

        this.playerNote = this.generateRandomNote();
        this.player = new Player(this, this.playerNote);
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
        
        this.input = new InputHandler(this);
        this.speed = 0;
        this.maxSpeed = 6;

        this.friendemies = [];
        this.shootingProjectiles = [];
        this.friendemiesTimer = 0;
        this.friendemiesInterval = 1000;

        this.debug = false;
    }

    generateRandomNote(){
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

    addFriendemy(){
        if(this.speed > 0 && Math.random() < 0.5){
            this.friendemies.push(new Bat(this, this.generateRandomNote()));
        }
        else if(this.speed > 0){
            this.friendemies.push(new GroundZombie(this, this.generateRandomNote()));
        }
    }

    update(deltaTime){
        this.background.update();
        this.player.update(this.input, deltaTime);
     
        if(this.friendemiesTimer > this.friendemiesInterval){
            this.addFriendemy();
            this.friendemiesTimer = 0;
        }
        else{
            this.friendemiesTimer += deltaTime;
        }

        this.friendemies.forEach((friendemy, index) => {
            friendemy.update(deltaTime);
            
            if(friendemy.markedForDeletion){
                this.friendemies.splice(index, 1);
            }
        });

        this.shootingProjectiles.forEach((projectile, index) => {
            if(projectile.markedForDeletion){
                this.shootingProjectiles.splice(index, 1);
            }
            projectile.update();
        });
    }

    draw(ctx){
        this.background.draw(ctx);
        this.player.draw(ctx);

        this.friendemies.forEach(friendemy => {
            friendemy.draw(ctx);
        });

        this.shootingProjectiles.forEach(projectile => {
            projectile.draw(ctx);
        })
    }
}