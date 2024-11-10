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

        this.score = 0;
        this.addToScoreValue = 50;

        this.debug = false;
        this.gameOver = false;

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

    createFriendemy(deltaTime){
        if(this.friendemiesTimer > this.friendemiesInterval){
            this.addFriendemy();
            this.friendemiesTimer = 0;
        }
        else{
            this.friendemiesTimer += deltaTime;
        }
    }

    addFriendemy(){
        if(this.speed > 0 && Math.random() < 0.5){
            this.friendemies.push(new Bat(this, this.generateRandomNote()));
        }
        else if(this.speed > 0){
            this.friendemies.push(new GroundZombie(this, this.generateRandomNote()));
        }
    }

    hitAction(){
        this.friendemies.forEach((friendemy) => {
            this.shootingProjectiles.forEach((projectile) => {
                if(this.isHit(friendemy, projectile)){
                    projectile.markedForDeletion = true;                  
                    if(!this.isFriend(friendemy)){
                        this.score += this.addToScoreValue;                        
                    }
                    else{
                        this.score -= this.addToScoreValue;
                    }
                    friendemy.markedForDeletion = true;
                }
            });
        });
    }

    isHit(friendemy, projectile){
        let projectileMiddle = projectile.radius;
        let firendemyMiddle = friendemy.width / 2;
        let distance = this.calcProjectileDistanceFromFriendemy(friendemy, projectile);
        if(distance - projectileMiddle - firendemyMiddle < 1){
            return true;
        }
        return false;
    }

    calcProjectileDistanceFromFriendemy(friendemy, projectile){
        return Math.hypot(projectile.position.x - friendemy.position.x, projectile.position.y - friendemy.position.y);
    }

    collisionAction(){
        this.friendemies.forEach((friendemy) => {
            if(this.isColliding(friendemy)){
                if(this.isFriend(friendemy)){
                    friendemy.markedForDeletion = true;
                    this.score += this.addToScoreValue * 4;
                }
                else{
                    this.gameOver = true;
                }
            }
        });
    }

    isColliding(friendemy){
        return friendemy.position.x < this.player.position.x + this.player.width
        && friendemy.position.x + friendemy.width > this.player.position.x 
        && friendemy.position.y < this.player.position.y + this.player.height
        && friendemy.position.y + friendemy.height > this.player.position.y;
    }

    isFriend(friendemy){
        return this.player.note === friendemy.note;
    }

    update(deltaTime){
        console.log(`score: ${this.score}`);
        this.background.update();
        this.player.update(this.input, deltaTime);

        this.createFriendemy(deltaTime);
        this.hitAction();
     
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

        this.collisionAction();
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