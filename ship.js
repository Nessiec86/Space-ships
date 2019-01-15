class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.body = [
          { row: 59, column: 30 },
          ];
       this.bullets = [];
       this.newinvader = [];
       this.newasteroid = [];
       this.invaderBullets = [];
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
       this.counter = 0;
    }
    
    //MOVE SHIP
    goUp () {
        var head = this.body[0];
        this.body.unshift({
            row: ( (head.row - 2.5) + this.maxRows ) % this.maxRows,
            column: head.column,
        })
        this.previousposition = this.body.pop();
        
    }
    goDown () {
        var head = this.body[0];
        this.body.unshift({
            row: (head.row + 2.5) % this.maxRows,
            column: head.column,
        })
        this.previousposition = this.body.pop();
    }
    goLeft () {
        var head = this.body[0];
        this.body.unshift({
            row: head.row,
            column: ( (head.column - 2.5) + this.maxColumns) % this.maxColumns,
        })
        this.previousposition = this.body.pop();
    }
    goRight () {
        var head = this.body[0];
        this.body.unshift({
            row: head.row,
            column: (head.column + 2.5) % this.maxColumns,
        })
        this.previousposition = this.body.pop();
    }
    //SHIP SHOT
    _shot(){
        this.bullets.push(new Shot(this.body[0].column,this.body[0].row,5,8,1,this.ctx));
    }
    //NEW INVADER
    _invader (){
        if (!this.intervalId) {
            this.intervalId = setInterval(this._invader.bind(this), 2000);
        } 
        this.newinvader.push(new Invader((Math.floor(Math.random() * ((this.maxRows *10) - 0)) + 0),0,10,10,1,0.2,this.ctx,this.invaderBullets));
    }
    //INVADER SHOT
    _invaderShot(){
        //if (!this.intervalId) {
        //    this.intervalId = setInterval(this._invaderShot.bind(this), 1000);
        //}
        
        if (this.counter % 100 === 0) {
            this.newinvader.forEach((newinvader) =>{
            console.log(newinvader);
            this.invaderBullets.push(new Invadershot(newinvader.randomX,newinvader.invaderY,5,8,3,this.ctx));
        });
        };
        this.counter+=1;
        console.log(this.counter);
        //let counter = 0;
        
        //if (counter / 100 === 0) {};
            
        //counter++;
 
    }
        
               //this.invaderBullets.push(new Invadershot(this.newinvader.randomX,this.newinvader.invaderY,5,8,3,this.ctx));
        //console.log(this.newinvader);
        //console.log(this.newinvader[1].randomX, this.newinvader[1].invaderY);
    
    
    //NEW ASTEROID
    _asteroid (){
        if (!this.intervalId) {
            this.intervalId = setInterval(this._asteroid.bind(this), 2000);
        } 
        this.newasteroid.push(new Asteroid((Math.floor(Math.random() * ((this.maxRows *10) - 0)) + 0),0,10,10,0.5,this.ctx));
    }
    //SCREEN
    _clear() {
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    } 
    stop () {
        if ( this.intervalId ) {
          clearInterval(this.intervalId)
          this.intervalId = undefined;
        }
    } 
};

    
 

    
