class Game {
    constructor (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.ship = options.ship;
        this.ctx = options.ctx;
        this.lives = options.lives;
        this.points = options.points;
        this.bullets = options.bullets;
    }

    // CONTROLES NAVE PRINCIPAL
    _assignControlsToKeys(){
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
              this.ship._shot();
              break; 
            case 80: // p pause
              this.ship.intervalId ? this.ship.stop() : this.ship.start()
              break;
          }
        };
    }
    
    //INICIO
    start(){
        this._assignControlsToKeys();
        this._update();
        this.ship._invader();
        this.ship._asteroid();
        this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
    //UPDATE SCREEN
    _update(){
        this._clear();
        this._drawBoard();
        this._drawShip();
        this._drawShot();
        this._drawInvader();
        //this._drawInvaderShot();
        this._drawAsteroid();
        this._score();
        if (this.intervalGame !== undefined) {
            this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
        }
    }
    
    //BACKGROUND
    _moveBackground(){
        if (!this.intervalId) {
            this.intervalId = setInterval(this._moveBackground.bind(this), 10);
        }
    }
    
    //BOARD
    _drawBoard(){
        //this.ctx.fillStyle = "#000000";
        //this.ctx.fillRect(0,0, this.rows * 10, this.columns * 10);
        const img = new Image ();
            img.src = "Assets/Space.png";
            this.ctx.drawImage(img,0,0 );
    }
    //SHIP
    _drawShip(){
        this.ship.body.forEach((position) => {
            const img = new Image ();
            img.src = "Assets/milenium-falcon1.png";
            //img.src = "Assets/newhorizons.png"
            this.ctx.drawImage(img,position.column * 9.7,position.row * 9 );
        });
    }
    //SHOT
    _drawShot(){
        this.ship.bullets.forEach(function(bullet,i,array) {
            bullet._drawShot();
            bullet._clearShot(bullet,i,array);
            bullet._update();
        });
    }
    //INVADER
    _drawInvader(){
       this.ship.newinvader.forEach(function(newinvader, i, array){
            newinvader._drawInvader();
            newinvader._update();
            newinvader._clearInvader(newinvader, i, array);
            //newinvader._randomShot(newinvader);
            //newinvader._updateShot(newinvader);
        });
    }
    //INVADER SHOT
    _drawInvaderShot(){

    }
    //ASTEROID
    _drawAsteroid(){
        this.ship.newasteroid.forEach(function(newasteroid, i, array){
            newasteroid._drawAsteroid();
            newasteroid._update();
            newasteroid._clearAsteroid(newasteroid, i, array);
        });
    }
    //SCORE
    _score(){
        this.ctx.font = "bold 16px sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: "+this.points, 10, 20);
        this.ctx.fillText("Lives: "+this.lives, 535, 20);
   
        if(this.lives <= 0){
            clearTimeout(game);
            this.ctx.font = "bold 20px sans-serif";
            this.ctx.fillStyle = "yellow";
            this.ctx.fillText("Game Over!", 160, 160);
        }
    }
    //CLEAR SCREEN
    _clear(){
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    }
    //PAUSE GAME
    _pause(){
        if (this.intervalGame) {
            window.cancelAnimationFrame(this.intervalGame);
            this.intervalGame = undefined;
        }
    }
    //STOP GAME
    _stop(){
        if ( this.intervalId ) {
            clearInterval(this.intervalId)
            this.intervalId = undefined;
        }
    }
};

