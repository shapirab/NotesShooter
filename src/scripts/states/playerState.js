const states = {
    SITTING: 0,
    RUNNING: 1
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
    }
}