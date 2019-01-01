class Ship {
    constructor(maxRows, maxColumns) {
       this.body = [
          { row: 59, column: 30 },
          ];
       this.shot = this.body;
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
    }
    start () {
        this.move();
    }
    move () {
         if (!this.intervalId) {
          this.intervalId = setInterval(this._moveBackground.bind(this), 20);
        }
    }
    _moveBackground () {
    }
    
    //MOVE SHIP
    goUp () {
        var head = this.body[0];
        this.body.unshift({
            row: ( (head.row - 1) + this.maxRows ) % this.maxRows,
            column: head.column,
        })
        this.previousposition = this.body.pop();
    }
    goDown () {
        var head = this.body[0];
        this.body.unshift({
            row: (head.row + 1) % this.maxRows,
            column: head.column,
        })
        this.previousposition = this.body.pop();
    }
    goLeft () {
        var head = this.body[0];
        this.body.unshift({
            row: head.row,
            column: ( (head.column - 1) + this.maxColumns) % this.maxColumns,
        })
        this.previousposition = this.body.pop();
    }
    goRight () {
        var head = this.body[0];
        this.body.unshift({
            row: head.row,
            column: (head.column + 1) % this.maxColumns,
        })
        this.previousposition = this.body.pop();
    }
    /*//SHIP SHOT
    goShot () {
        var bullet = this.shot[0];
        this.shot.unshift({
            row: ( (bullet.row - 1) + this.maxRows ) % this.maxRows,
            column: bullet.column,
        })
        this.previousposition = this.shot.pop();
        
    }
      */   
    stop () {
        if ( this.intervalId ) {
          clearInterval(this.intervalId)
          this.intervalId = undefined;
        }
    }  
};
    
