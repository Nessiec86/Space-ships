class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.body = [
          { row: 59, column: 30 },
          ];
       this.shot = this.body[0] -1;
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
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
    start () {
        this.move();
        }
    move () {
         if (!this.intervalId) {
          this.intervalId = setInterval(this.goShot.bind(this), 20);
        }
    } 
    
    goShot () {
        //const shot = new Shot(this.body[0].row,this.body[0].column,this.maxRows,this.maxColumns, this.ctx);
        //shot.start(); 
        console.log(this.shot[0].row)
        var bullet = this.shot[0];
        this.shot.unshift({
                row: ((bullet.row - 1 )+ this.maxRows ) % this.maxRows,
                column: bullet.column,
            })
        
        this.previousposition = this.shot.pop();
    }
    
    stop () {
        if ( this.intervalId ) {
          clearInterval(this.intervalId)
          this.intervalId = undefined;
        }
    }  
};
    
