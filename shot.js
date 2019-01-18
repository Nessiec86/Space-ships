class Shot {
    constructor(shipX,shipY,witdh,height,speed,ctx) {
       this.shipX = shipX;
       this.shipY = shipY;
       this.witdh = witdh;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
       this.shotImg = new Image ();
       this.shotImg.src = "Assets/shot.png";
    }

    _drawShot () {
        this.ctx.drawImage(this.shotImg,this.shipX + 15,this.shipY,this.witdh,this.height);
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
