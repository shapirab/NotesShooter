const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
};

class PlayerState{
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends PlayerState{
    constructor(game){
        super('SITTING', game);
    }

    enter(){
        this.game.player.maxFrames = 4;
        this.game.player.frameY = 5;
    }

    handleInputs(input){
        if(input.keys.rightKey.pressed){
           this.game.player.setState(states.RUNNING, 1); 
        }
    }
}

export class Running extends PlayerState{
    constructor(game){
        super('RUNNING', game);
    }

    enter(){
        this.game.player.maxFrames = 8;
        this.game.player.frameY = 3;
    }

    handleInputs(input){
        if(input.keys.downKey.pressed){
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.keys.upKey.pressed){
            this.game.player.setState(states.JUMPING, 1);
        }
    }
}

export class Jumping extends PlayerState{
    constructor(game){
        super('JUMPING', game);
    }

    enter(){
        this.game.player.maxFrames = 6;
        this.game.player.frameY = 1;
        if(this.game.player.onGround()){
            this.game.player.velocity.y -= this.game.player.maxHeight;
        }
    }

    handleInputs(input){
        if(this.game.player.velocity.y > this.game.player.gravity){
            this.game.player.setState(states.FALLING, 1);
        }
        else if(input.keys.downKey.pressed){
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.keys.rightKey.pressed){
            this.game.player.setState(states.RUNNING, 1);
        }
    }
}

export class Falling extends PlayerState{
    constructor(game){
        super('FALLING', game);
    }

    enter(){
        this.game.player.maxFrames = 6;
        this.game.player.frameY = 2;       
    }

    handleInputs(input){
       if(this.game.player.onGround()){
        this.game.player.setState(states.RUNNING, 1);
       }
    }
}