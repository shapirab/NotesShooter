export default class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = {
            rightKey: {
                pressed: false
            },
            leftKey: {
                pressed: false
            },
            upKey: {
                pressed: false
            },
            downKey: {
                pressed: false
            },
            enterKey: {
                pressed: false
            }
        };

        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowRight'){
                this.keys.rightKey.pressed = true;
            }
            else if(e.key === 'ArrowLeft'){
                this.keys.leftKey.pressed = true;
            }
            else if(e.key === 'ArrowUp'){
                this.keys.upKey.pressed = true;
            }
            else if(e.key === 'ArrowDown'){
                this.keys.downKey.pressed = true;
            }
            else if(e.key === 'Enter'){
                this.keys.enterKey.pressed = true;
            }

            if(e.key === 'd'){
                this.game.debug = !this.game.debug;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight'){
                this.keys.rightKey.pressed = false;
            }
            else if(e.key === 'ArrowLeft'){
                this.keys.leftKey.pressed = false;
            }
            else if(e.key === 'ArrowUp'){
                this.keys.upKey.pressed = false;
            }
            else if(e.key === 'ArrowDown'){
                this.keys.downKey.pressed = false;
            }
            else if(e.key === 'Enter'){
                this.keys.enterKey.pressed = false;
            }
        });
    }
}