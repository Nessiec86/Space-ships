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
        this.imageBackground = [];
        this.speedinvader = 1750;
        this.resumeGame = new Image ();
        this.resumeGame.src = "Assets/pause-message1x.png";
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
        };
        if (this.controls[40]) {
            this.ship.goDown();
        };
        if (this.controls[37]) {
            this.ship.goLeft();
        };
        if (this.controls[39]) {
            this.ship.goRight();
        };
    }
    _shotPauseKey(){
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                case 32: //space  
                    this.ship.shot();
                    break;
                case 80:
                    this._pause();
                    break;
            };
        };
    };
    //NEW INVADER
    _generateInvaders() {
        if (!this.intervalId) {
            this.intervalId = setInterval(this._generateInvaders.bind(this), this.speedinvader);
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
        this._shotPauseKey();
        this._update();
        this._generateInvaders();
        
        this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
    }
    //UPDATE SCREEN
    _update(){
        this._clear();
        this._drawBoard();
        
        this._assignControlsToKeys();
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
    
    //BOARD
    _drawBoard(){
        //this.imageBackground.push(new Background(this.ctx));
        
        const img = new Image ();
        img.src = "Assets/fondo21x.jpg";
        this.ctx.drawImage(img, 0, 0, (this.rows * 10), (this.columns * 10));
            //console.log(this.imageBackground)
        //   this.imageBackground.forEach(function(imageBackground , i ,array){
          //      imageBackground._drawBoard(imageBackground,i,array);
            //    imageBackground._update(imageBackground,i,array);
              //  imageBackground._clearScreen(imageBackground,i,array);
           // });
     
            
            /*this.ctx.drawImage(this.imageBackground.img, this.imageBackground.x, 0);
            if (this.imageBackground.speed < 0) {
                this.ctx.drawImage(this.imageBackground.img, this.imageBackground.x + this.imageBackground.width, 0);
              } else {
                this.ctx.drawImage(this.imageBackground.img, this.imageBackground.x - this.imageBackground.width, 0);
              }
           // if (this.imageBackground.x <= -600) {
            //    this.imageBackground.x = 0;
           // }*/ 
            };
    
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
                if (shipShot.shipX < (newinvader.randomX - 20) + (newinvader.width + 5) &&
                    shipShot.shipX + shipShot.width > (newinvader.randomX - 20) &&
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
                if (shipShot.shipX < (invaderShot.randomShotX - 30) + (invaderShot.width + 20) &&
                    shipShot.shipX + shipShot.width > (invaderShot.randomShotX - 30) &&
                    shipShot.shipY < invaderShot.invaderShotY + invaderShot.height &&
                    shipShot.height + shipShot.shipY > invaderShot.invaderShotY) {
                    shot.splice(i, 1);
                    iShot.splice(j, 1);
                };
            });
        });
        this.ship.bullets.forEach((shipShot, i , shot) => {
            this.newasteroid.forEach((asteroid, j ,rock) => {
                if (shipShot.shipX < (asteroid.randomX - 20) + (asteroid.width + 5) &&
                    shipShot.shipX + shipShot.width > (asteroid.randomX - 20) &&
                    shipShot.shipY < asteroid.asteroidY + asteroid.height &&
                    shipShot.height + shipShot.shipY > asteroid.asteroidY) {
                    shot.splice(i, 1);
                    rock.splice(j, 1);
                    this.points +=5;
                };
            });
        });
        this.newasteroid.forEach((asteroid, i ,rock) => {
            if (this.ship.bodyX < asteroid.randomX + asteroid.width &&
                this.ship.bodyX + this.ship.image.width > asteroid.randomX &&
                this.ship.bodyY < asteroid.asteroidY + asteroid.height &&
                this.ship.image.height + this.ship.bodyY > asteroid.asteroidY) {
                rock.splice(i, 1);
                this.lives -=1;
            };
        });
        this.newinvader.forEach((newinvader, i ,invader) => {
            if (this.ship.bodyX < newinvader.randomX + newinvader.width &&
                this.ship.bodyX + this.ship.image.width > newinvader.randomX &&
                this.ship.bodyY < newinvader.invaderY + newinvader.height &&
                this.ship.image.height + this.ship.bodyY > newinvader.invaderY) {
                invader.splice(i, 1);
                this.lives -=1;
            };
        });
    };
    //SCORE
    _score(){
        const gameOverBackground = new Image ();
        gameOverBackground.src = "Assets/game-over-bg1x.png";
        const gameOver = new Image ();
        gameOver.src = "Assets/game-over-text1x.png";

        this.ctx.font = "bold 16px sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: "+this.points, 10, 20);
        this.ctx.fillText("Lives: "+this.lives, 535, 20);
   
        if(this.lives <= 0){
            clearTimeout(game);
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0,0,this.rows * 10, this.columns * 10);
            this.ctx.font = "bold 50px sans-serif";
            this.ctx.fillStyle = "yellow";
            this.ctx.drawImage(gameOverBackground,0,0);
            this.ctx.drawImage(gameOver,100,100);
            this.ctx.fillText("Your Score:" + this.points +"!!", 120, 520 );
            this._stop();
        }
    }
    //CLEAR SCREEN
    _clear(){
        this.ctx.clearRect(0, 0, this.rows * 10, this.columns * 10);
    }
    //PAUSE GAME
    _pause(){
        this.ctx.drawImage(this.resumeGame,220,280);
            
        if (this.intervalGame) {
            this.ctx.drawImage(this.resumeGame,220,280);
            window.cancelAnimationFrame(this.intervalGame);
            this.intervalGame = undefined;
        } else {
            this.intervalGame = window.requestAnimationFrame(this._update.bind(this));
        }
        
    }
    //STOP GAME
    _stop(){
        if ( this.intervalGame ) {
            clearInterval(this.intervalGame)
            this.intervalGame = undefined;
        }
    }
};

