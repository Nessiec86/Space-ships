class Shot {
    constructor(shipX,shipY,witdh,height,speed,ctx) {
       this.shipX = shipX;
       this.shipY = shipY;
       this.witdh = witdh;
       this.height = height;
       this.speed = speed;
       this.ctx = ctx;
        
    }
    _drawBullet () {
       this.ctx.fillStyle = 'lime';
       this.ctx.fillRect((this.shipX * 10),(this.shipY * 10),this.witdh, this.height);
       }
    
    _update (){
        this.shipY = this.shipY - this.speed;    
    }    
};
