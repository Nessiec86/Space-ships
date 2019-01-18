class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.bodyX = 280;
       this.bodyY = 540;
       this.width = 40;
       this.height = 60;
       this.bullets = [];
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
       this.shipSpeed = 25;
       this.image = new Image ();
       this.image.src = "Assets/milenium-falcon1.png";
       
            
    }
    
    //MOVE SHIP
    goUp () {
        var head = this.body;
        this.body.unshift({
            row: ( (head.row -= this.shipSpeed) + this.maxRows ) % this.maxRows,
            column: head.column,
        })
        this.previousposition = this.body.pop();
        
    };
    goDown(){
        this.bodyY = ( (this.bodyY += this.shipSpeed) + this.maxRows%this.maxRows ); 
    };
    goLeft(){
        this.bodyX -= this.shipSpeed;
    };
    goRight () {
        this.bodyX += this.shipSpeed;
    };
    //DRAW SHIP
    drawShip(){
        this.ctx.drawImage(this.image, this.bodyX, this.bodyY, this.width, this.height)
    }
    //SHIP SHOT
    _shot(){
        this.bullets.push(new Shot(this.bodyX,this.bodyY,8,54,8,this.ctx));
    };
    
    //SCREEN
    _clear() {
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    }; 
    stop () {
        if ( this.intervalId ) {
          clearInterval(this.intervalId)
          this.intervalId = undefined;
        }
    };
};

    
 

    
