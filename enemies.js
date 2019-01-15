class Invader {
    constructor(randomX,invaderY,witdh,height,speed,shotspeed,ctx) {
        this.randomX = randomX;
        this.invaderY = invaderY;
        this.witdh = witdh;
        this.height = height;
        this.speed = speed;
        this.ctx = ctx;
    }
    
    _drawInvader(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.randomX,this.invaderY, 10,10);
    }
    _clearInvader(newinvader, i, array){
        if (newinvader.invaderY >= 590){
            array.splice(i, 1);
        }
    }
    _update(){
        this.invaderY = this.invaderY + this.speed;
    }
    
};