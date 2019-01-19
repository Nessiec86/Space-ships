class Invader {
    constructor(randomX,invaderY,width,height,speed,ctx) {
        this.randomX = randomX;
        this.invaderY = invaderY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.ctx = ctx;
        this.image = new Image ();
        this.image.src = "Assets/enemy1x.png";
    }
    
    _drawInvader(){
        this.ctx.drawImage(this.image, this.randomX, this.invaderY, this.width, this.height)
    }
    _clearInvader(newinvader, i, array){
        if (newinvader.invaderY >= 600){
            array.splice(i, 1);
        }
    }
    _update(){
        this.invaderY = this.invaderY + this.speed;
    }    
};