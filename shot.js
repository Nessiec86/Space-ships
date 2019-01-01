class Shot {
    constructor(bodyrow,bodycolumn,maxRows,maxColumns) {
       this.body = [
           {row:bodyrow, column: bodycolumn,
           }],
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
    }
    start () {
        this.move();
    }
    move () {
         if (!this.intervalId) {
          this.intervalId = setInterval(this.goShot.bind(this), 20);
        }
    }
    
    goShot(){
        console.log(this.body)
        var bullet = this.body[0];
        this.body.unshift({
                row: bullet.row - 1,
                column: bullet.column,
            })
        
        this.previousposition = this.body.pop();
    }
};