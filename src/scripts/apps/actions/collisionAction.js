export default class CollisionAction{
    constructor(game){
        this.game = game;
    }

    collisionAction(){
        this.game.friendemies.forEach((friendemy) => {
            if(this.isColliding(friendemy)){
                console.log('collision occured')
                if(this.game.isFriend(friendemy)){
                    friendemy.markedForDeletion = true;
                    this.game.score *= 4;
                }
                else{
                    this.game.gameOver = true;
                }
            }
        });
    }

    isColliding(friendemy){
        return friendemy.position.x < this.game.player.position.x + this.game.player.width
        && friendemy.position.x + friendemy.width > this.game.player.position.x 
        && friendemy.position.y < this.game.player.position.y + this.game.player.height
        && friendemy.position.y + friendemy.height > this.game.player.position.y;
    }
}