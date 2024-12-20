class Friendemy{
    constructor(note){
        this.frameX = 0;
        this.frameY = 0;

        this.framesPerSecond = 20;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;

        this.markedForDeletion = false;

        this.note = note;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.heightAdjustor = 20;
    }

    animateFriendemy(deltaTime){
        if(this.frameTimer > this.frameInterval){
            //start counting the frameTimer again
            this.frameTimer = 0;
            //serve the next frame
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

    setMarkedForDeletion(){
        if(this.position.x < -this.width || this.position.y > this.game.gameHeight){
            this.markedForDeletion = true;
        }
    }

    update(deltaTime){
        this.position.x -= this.speed.x;
        this.position.y += this.speed.y;

        this.animateFriendemy(deltaTime);
        this.setMarkedForDeletion();
    }

    draw(ctx){
        ctx.font = this.fontSize + 'px ' + this.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'Red';
        
    }
}

export class Bat extends Friendemy{
    constructor(game, note){
        super(note);
        this.game = game;
        
        this.width = 1596 / 6;
        this.height = 188;
        this.sizeFactor = 2;
        this.drawWidth = this.width / this.sizeFactor;
        this.drawHeight = this.height / this.sizeFactor;

        this.position = {
            x: this.game.gameWidth + Math.random() * this.game.gameWidth * 0.5,
            y: Math.random() * this.game.gameHeight * 0.5
        }
        this.speed = {
            x: Math.random() + 1,
            y: 0
        }

        this.maxFrames = 5;
        this.image = bat_3;

        this.angle = 0;
        this.variableOfAngle = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.variableOfAngle;
        this.position.y += Math.sin(this.angle);
    }
    
    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 
            this.width, this.height, this.position.x, this.position.y, 
            this.drawWidth, this.drawHeight);

        ctx.fillText(this.note, this.position.x + this.drawWidth / 2, 
            this.position.y + this.drawHeight - this.heightAdjustor);
        if(this.game.debug){
            ctx.strokeRect(this.position.x, this.position.y, this.drawWidth, this.drawHeight); 
        }
        super.draw(ctx);        
    }
}

export class GroundZombie extends Friendemy{
    constructor(game, note){
        super(note);
        this.game = game;

        this.width = 120;
        this.height = 87;

        this.position = {
            x: this.game.gameWidth + Math.random() * this.game.gameWidth * 0.5,
            y: this.game.gameHeight - this.height
        }
        this.speed = {
            x: Math.random() + 1,
            y: 0
        }

        this.maxFrames = 7;
        this.image = enemy_zombie;
    }

    update(deltaTime){
        super.update(deltaTime);
    }

    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, 
            this.width, this.height, this.position.x, this.position.y, 
            this.width, this.height);
            super.draw(ctx);
        ctx.fillText(this.note, this.position.x + this.width / 2, this.position.y + this.height - this.heightAdjustor);
        if(this.game.debug){
            ctx.strokeRect(this.position.x, this.position.y, this.width, this.height); 
        }
    }
}