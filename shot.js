class Shot {
    constructor(shiprow,shipcolumn,maxRows,maxColumns,ctx) {
       this.body = [
           {row: shiprow, column: shipcolumn,
           }],
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
        
    }
    start () {
        this.move();
        this._drawBullet();
    }
    move () {
         if (!this.intervalId) {
          this.intervalId = setInterval(this.goShot.bind(this), 20);
        }
    }
    
    goShot(){
        console.log(this.body[0].row)
        var bullet = [{
            row:59,column:30}]
        this.body.unshift({
                row: bullet.row - 1,
                column: bullet.column,
            })
        
        this.previousposition = this.body.pop();
        
    }
    _drawBullet () {
        this.body.forEach((position) => {
        this.ctx.fillStyle = "yellow";
        //this.ctx.fillRect( position.column * 10, position.row * 10, 10, 10);
        this.ctx.arc(position.column * 10.37, position.row * 8.9, 5, 0, Math.PI*2);
        this.ctx.fill();
        });
    }

    
};