class Game {
    constructor (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.ship = options.ship;
        this.ctx = options.ctx;
    }
   
    _drawBoard () {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0,0, this.rows * 10, this.columns * 10);
    }

    _drawShip () {
        this.ship.body.forEach((position) => {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(position.column * 10, position.row * 10, 8, 8);
        });
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    }

    start() {
        this._update();
    }

    _update () {
        this._clear();
        this._drawBoard();
        this._drawShip();
    }
};

console.log("dentro de game");
console.log(this.rows, this.columns, this.ship, this.ctx);
