class Game {
    constructor (options) {
        this.rows = options.rows;
        this.columns = options.columns;
        this.ship = options.ship;
        this.ctx = options.ctx;
        this.lives = options.lives;
        this.points = options.points;
        this.bullets = options.bullets;
        this.invaderBullets = [];
        this.invaders = [];
        this.newinvader = [];
        this.counter = 0;
        this.newcounter = 0;
        this.newasteroid = [];
        this.controls = [];
        this.collision = false;
    }

    // CONTROLES NAVE PRINCIPAL
    _assignControlsToKeys(){
        window.addEventListener('keydown',(e) => {
            this.controls[e.keyCode] = true;
        });
        window.addEventListener('keyup',(e) =>{
            this.controls[e.keyCode] = false;
        });

        if (this.controls[38]) {
            this.ship.goUp();
        }
        if (this.controls[40]) {
            this.ship.goDown();
        }
        if (this.controls[37]) {
            this.ship.goLeft();
        }
        if (this.controls[39]) {
            this.ship.goRight();
        }
        if (this.controls[32]) {
            this.ship.shot();
        }
        
        /*document.onkeydown = (e) => {
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
              this.ship.shot();
              break; 
            case 80: // p pause
              this.ship.intervalId ? this.ship._stop() : this.ship.start()
              break;
          }
        };*/
    }

    // función para generar invaders, push a this.invaders cada X ms. NEW INVADER
    _generateInvaders() {
        if (!this.intervalId) {
            this.intervalId = setInterval(this._generateInvaders.bind(this), 2000);
        } 
        this.newinvader.push(new Invader((Math.floor(Math.random() * ((this.ship.maxRows) - 0)) + 0),0,35,34,1,this.ctx,this.invaderBullets));
    };
    //INVADER SHOT
    _generateInvaderShot(){
        if (this.counter % 100 === 0) {
            this.newinvader.forEach((newinvader) =>{
                this.invaderBullets.push(new Invadershot(newinvader.randomX + 15,newinvader.invaderY + 10,5,8,2,this.ctx));
            });
        };
        this.counter+=1;
    };
    //NEW ASTEROID
    _generateAsteroid (){
        if (this.newcounter % 500 === 0){
            this.newasteroid.push(new Asteroid((Math.floor(Math.random() * ((this.ship.maxRows) - 0)) + 0),0,60,60,0.5,this.ctx));
            }
        this.newcounter+=1;
    };
    
    //INICIO
    start(){
        this._update();
        this._generateInvaders();
        this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
    //UPDATE SCREEN
    _update(){
        this._clear();
        
        this._assignControlsToKeys();
        this._drawBoard();
        this._drawInvader();
        this._drawShot();
        this._drawInvaderShot();
        this._drawAsteroid();
        this.ship.drawShip();
        
        this._generateAsteroid();
        this._generateInvaderShot();
       
        
        this._score();
        this._controlCollision();
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
        const img = new Image ();
            img.src = "Assets/Space.png";
            this.ctx.drawImage(img, 0, 0, (this.rows * 10), (this.columns * 10));
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
        this.newinvader.forEach(function(newinvader, i, array){
            newinvader._drawInvader();
            newinvader._update();
            newinvader._clearInvader(newinvader, i, array);
        });
    }
    //INVADER SHOT
    _drawInvaderShot(){
        this.invaderBullets.forEach(function(bullet, i, array){
            bullet._drawShot();
            bullet._update();
            bullet._clearShot(bullet, i, array);
        });
    }
    //ASTEROID
    _drawAsteroid(){
        this.newasteroid.forEach(function(newasteroid, i, array){
            newasteroid._drawAsteroid();
            newasteroid._update();
            newasteroid._clearAsteroid(newasteroid, i, array);
        });
    }
    //COLLISION
    _controlCollision(){
        this.invaderBullets.forEach((invaderShot, i ,array) => {
            if (this.ship.bodyX < invaderShot.randomShotX + invaderShot.width &&
                this.ship.bodyX + this.ship.image.width > invaderShot.randomShotX &&
                this.ship.bodyY < invaderShot.invaderShotY + invaderShot.height &&
                this.ship.image.height + this.ship.bodyY > invaderShot.invaderShotY) {
                array.splice(i, 1);
                this.lives -=1;
            };
        });
        this.ship.bullets.forEach((shipShot, i , shot) => {
            this.newinvader.forEach((newinvader, j ,invader) => {
                if (shipShot.shipX < newinvader.randomX + newinvader.width &&
                    shipShot.shipX + shipShot.width > newinvader.randomX &&
                    shipShot.shipY < newinvader.invaderY + newinvader.height &&
                    shipShot.height + shipShot.shipY > newinvader.invaderY) {
                    shot.splice(i, 1);
                    invader.splice(j, 1);
                    this.points +=10;
                };
            });
        });
        this.ship.bullets.forEach((shipShot, i , shot) => {
            this.invaderBullets.forEach((invaderShot, j ,iShot) => {
                if (shipShot.shipX < invaderShot.randomShotX + invaderShot.width &&
                    shipShot.shipX + shipShot.width > invaderShot.randomShotX &&
                    shipShot.shipY < invaderShot.invaderShotY + invaderShot.height &&
                    shipShot.height + shipShot.shipY > invaderShot.invaderShotY) {
                    shot.splice(i, 1);
                    iShot.splice(j, 1);
                };
            });
        });
      /*  this.newasteroid.forEach((invaderShot, i ,array) => {
            if (this.ship.bodyX < invaderShot.randomShotX + invaderShot.width &&
                this.ship.bodyX + this.ship.image.width > invaderShot.randomShotX &&
                this.ship.bodyY < invaderShot.invaderShotY + invaderShot.height &&
                this.ship.image.height + this.ship.bodyY > invaderShot.invaderShotY) {
                array.splice(i, 1);
                this.lives -=1;
            };
        });*/
        
    };
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

