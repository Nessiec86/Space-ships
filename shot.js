class Shot {
    constructor(shipX,shipY,witdh,height,speed,ctx) {
       this.shipX = shipX;
       this.shipY = shipY;
       this.witdh = witdh;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
        
    }
    _drawShot () {
       this.ctx.fillStyle = 'lime';
       this.ctx.fillRect((this.shipX * 10) + 10,(this.shipY * 10),this.witdh, this.height);
    }
    _clearShot(bullet, i, array){
        if (bullet.shipY <= 0){
            array.splice(i, 1);
        }
        console.log(bullet);
    }
    _update (){
        this.shipY = this.shipY - this.speed;    
    }    
};
