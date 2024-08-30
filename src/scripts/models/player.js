import { Running, Sitting } from "../states/playerState.js";

export default class Player{
    constructor(game, playerNote){
        this.game = game;
        this.width = 100;       
        this.height = 91.3;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 4;
        this.framesPerSecond = 20;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;
        
        this.note = playerNote;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.heightAdjustor = 20;

        this.states = [new Sitting(this.game), new Running(this.game)]

        this.ground = this.game.gameHeight - this.height;
        this.rightCanvasLimit = this.game.gameWidth - this.width;

        this.position = {
            x: 0,
            y: this.ground
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 1;
        this.maxSpeed = 5;
    }

    onGround(){
        return this.position.y >= this.ground;
    }

    setState(stateIndex, speed){
        this.currentState = this.states[stateIndex];
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState.enter();
    }

    moveLeftOrRight(input){
        this.position.x += this.velocity.x;
        if(input.keys.rightKey.pressed && this.position.x <= this.rightCanvasLimit){
            this.velocity.x = this.maxSpeed;
        }
        else if(input.keys.leftKey.pressed && this.position.x > 0){
            this.velocity.x = -this.maxSpeed;
        }
        else{
            this.velocity.x = 0;
        }
    }

    animatePlayer(deltaTime){
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrames){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
        }
        else{
            this.frameTimer += deltaTime;
        }
    }

    update(input, deltaTime){
        this.moveLeftOrRight(input);
        this.animatePlayer(deltaTime);
        
        this.position.y -= this.velocity.y;
        
        if(!this.onGround()){
            this.velocity.y -= this.gravity;
        }
        else{
            this.velocity.y = 0;
        }

        this.currentState.handleInputs(input);

    }

    draw(ctx){
        ctx.drawImage(playerImg, this.frameX * this.width, this.frameY * this.height, 
            this.width, this.height, this.position.x, this.position.y, this.width, this.height);
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'Red';
        ctx.fillText(this.note, this.position.x + this.width / 2, this.position.y + this.height - this.heightAdjustor);
    }
}