class Game {
    constructor (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.ship = options.ship;
        this.ctx = options.ctx;
        this.shot = options.shot;
    }
    // CONTROLES NAVE PRINCIPAL
    _assignControlsToKeys () {
        document.onkeydown = (e) => {
          switch (e.keyCode) {
            case 38: //arrow up
              this.ship.goUp();
              break;
            case 40: //arror down
              this.ship.goDown();
              break;
            case 37: //arror left
              this.ship.goLeft();
              break;
            case 39: //arrow right
              this.ship.goRight();
              break;
            case 32: //space
              this.shot.goShot();
              this.shot.move();
              break; 
            case 80: // p pause
              this.ship.intervalId ? this.ship.stop() : this.ship.start()
              break;
          }
        };
    }
    //BOARD
    _drawBoard () {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0,0, this.rows * 10, this.columns * 10);
    }
    //SHIP
    _drawShip () {
        this.ship.body.forEach((position) => {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(position.column * 10, position.row * 10, 10, 10);
        });
    }
    //SHIP SHOT
    _drawBullet () {
        this.shot.body.forEach((position) => {
            this.ctx.fillStyle = "yellow";
            this.ctx.fillRect(position.column * 10, position.row * 10, 10, 10);
        });
    }
    _drawX(){
        const img = new Image ();
        img.src = "Assets/x-wing1.png";
        this.ctx.drawImage(img,this.ship.body.row,this.ship.column);
    }
    //CLEAR SCREEN
    _clear() {
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    }
    //INICIO
    start() {
        this._assignControlsToKeys();
        this._update();
        this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
    //UPDATE SCREEN
    _update () {
        this._clear();
        this._drawBoard();
        this._drawX();
        this._drawShip();
        this._drawBullet();
        if (this.intervalGame !== undefined) {
            this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
        }
    }
    //PAUSE GAME
    pause () {
        if (this.intervalGame) {
          window.cancelAnimationFrame(this.intervalGame);
          this.intervalGame = undefined;
        }
    }
};

