class Invadershot {
    constructor(randomShotX,invaderShotY,witdh,height,speed,ctx) {
       this.randomShotX = randomShotX;
       this.invaderShotY = invaderShotY;
       this.witdh = witdh;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
       
    }
    _drawShot(){
       this.ctx.fillStyle = 'lime';
       this.ctx.fillRect(this.randomShotX,this.invaderShotY,this.witdh, this.height);
    }
    _clearShot(bullet, i, array){
        if (bullet.invaderShotY <= 0){
            array.splice(i, 1);
        }
    }
    _update(){
        this.invaderShotY = this.invaderShotY + this.speed;    
    }    
};
