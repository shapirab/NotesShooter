class Layer{
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.position = {
            x: 0,
            y: 0
        }
    }

    update(){
        if(this.position.x < -this.width){
            this.position.x = 0;
        }
        else{
            this.position.x -= this.game.speed * this.speedModifier;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image, this.position.x + this.width, this.position.y, this.width, this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = this.game.gameWidth;
        this.height = this.game.gameHeight;
        
        this.layer1image = layer_1;
        this.layer2image = layer_2;
        this.layer3image = layer_3;
        this.layer4image = layer_4;
        this.layer5image = layer_5;

        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);

        this.layers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];

    }

    update(){
        this.layers.forEach(layer => layer.update());
    }

    draw(ctx){
        this.layers.forEach(layer => layer.draw(ctx));
    }
}