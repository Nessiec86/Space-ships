class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.bodyX = 280;
       this.bodyY = 540;
       this.width = 47;
       this.height = 35;
       this.bullets = [];
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
       this.shipSpeed = 25;
       this.image = new Image ();
       this.image.src = "Assets/player1x.png";
    }

    //MOVE SHIP
    goUp () {
        if (this.bodyY >= 0){
            this.bodyY -= this.shipSpeed;
            } else {
                this.bodyY = 600;
        }
    };
    goDown(){
        if (this.bodyY <= 600){
            this.bodyY += this.shipSpeed;
            } else {
                this.bodyY = 0;
        }
    };
    goLeft(){
        if (this.bodyX >= 0){
            this.bodyX -= this.shipSpeed;
            } else {
                this.bodyX = 600;
        }
    };
    goRight () {
        if (this.bodyX <= 600){
            this.bodyX += this.shipSpeed;
            } else {
                this.bodyX = 0;
        }
    };
    //DRAW SHIP
    drawShip(){
        this.ctx.drawImage(this.image, this.bodyX, this.bodyY, this.width, this.height)
    }
    //SHIP SHOT
    shot(){
        this.bullets.push(new Shot((this.bodyX + 4),(this.bodyY - 5),8,54,8,this.ctx));
    };
};

    
 

    
