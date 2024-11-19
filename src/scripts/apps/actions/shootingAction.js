import ShootingParticle from "../../models/shootingParticle.js";

export default class ShootingAction{
    constructor(game){
        this.game = game;
    }

    addShot(event){
        let angle = Math.atan2(event.clientY - this.game.player.position.y, event.clientX - this.game.player.position.x);
        let velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5,
        };
        let positionX = this.game.player.position.x + this.game.player.width * 0.5;
        let positionY = this.game.player.position.y + this.game.player.height * 0.5;
        let radius = 3;
        let color = 'white';
        this.game.shootingProjectiles.push(new ShootingParticle(positionX, positionY, radius, color, velocity));
    }

    hitAction(){
        this.game.friendemies.forEach((friendemy) => {
            this.game.shootingProjectiles.forEach((projectile) => {
                if(this.isHit(friendemy, projectile)){
                    projectile.markedForDeletion = true;                  
                    if(!this.game.isFriend(friendemy)){
                        this.game.score += this.game.addToScoreValue;                        
                    }
                    else{
                        this.game.score -= this.game.addToScoreValue;
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
}