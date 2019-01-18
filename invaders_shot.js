class Invadershot {
    constructor(randomShotX,invaderShotY,width,height,speed,ctx) {
       this.randomShotX = randomShotX;
       this.invaderShotY = invaderShotY;
       this.width = width;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
       
    }
    _drawShot(){
       this.ctx.fillStyle = 'lime';
       this.ctx.fillRect(this.randomShotX,this.invaderShotY,this.width, this.height);
    }
    _clearShot(bullet, i, array){
        console.log()
        if (bullet.invaderShotY >= 600){
            array.splice(i, 1);
        }
    }
    _update(){
        this.invaderShotY = this.invaderShotY + this.speed;    
    }    
};
