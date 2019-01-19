class Shot {
    constructor(shipX,shipY,width,height,speed,ctx) {
       this.shipX = shipX;
       this.shipY = shipY;
       this.width = width;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
       this.shotImg = new Image ();
       this.shotImg.src = "Assets/shot.png";
    }

    _drawShot () {
        this.ctx.drawImage(this.shotImg,this.shipX + 15,this.shipY,this.width,this.height);
    }
    _clearShot(bullet, i, array){
        if (bullet.shipY <= 0){
            array.splice(i, 1);
        }
    }
    _update (){
        this.shipY = this.shipY - this.speed;    
    }    
};
