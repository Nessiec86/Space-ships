class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.body = [
          { row: 59, column: 30 },
          ];
       this.bullets = [];
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
    _shot(){
        this.bullets.push(new Shot (this.body[0].column,this.body[0].row,2,5,1,this.ctx));
        console.log(this.bullets);
       }
    
   
    start () {
        this.move();
      }
    
      move () {
        if (!this.intervalId) {
          this.intervalId = setInterval(this._goShot.bind(this), 70);
        }
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

    
 

    
