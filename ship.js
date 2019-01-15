class Ship {
    constructor(maxRows, maxColumns,ctx) {
       this.body = [
          { row: 59, column: 30 },
          ];
       this.bullets = [];
       this.newinvader = [];
       this.newasteroid = [];
       this.invaderBullets = [];
       this.maxRows = maxRows;
       this.maxColumns = maxColumns;
       this.intervalId = undefined;
       this.ctx = ctx;
       this.counter = 0;
       this.newcounter = 0;
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
    _shot(){
        this.bullets.push(new Shot(this.body[0].column,this.body[0].row,5,8,1,this.ctx));
    }
    //NEW INVADER
    _invader (){
        if (!this.intervalId) {
            this.intervalId = setInterval(this._invader.bind(this), 2000);
        } 
        this.newinvader.push(new Invader((Math.floor(Math.random() * ((this.maxRows *10) - 0)) + 0),0,10,10,0.5,this.ctx,this.invaderBullets));
    }
    //NEW ASTEROID
    _asteroid (){
        //if (!this.intervalId) {
        //    this.intervalId = setInterval(this._asteroid.bind(this), 3000);
        //}
    if (this.newcounter % 500 === 0){
        this.newasteroid.push(new Asteroid((Math.floor(Math.random() * ((this.maxRows *10) - 0)) + 0),0,10,10,2,this.ctx));
        }
        this.newcounter+=1;
    }
    //INVADER SHOT
    _invaderShot(){
        if (this.counter % 100 === 0) {
            this.newinvader.forEach((newinvader) =>{
            console.log(newinvader);
            this.invaderBullets.push(new Invadershot(newinvader.randomX,newinvader.invaderY,5,8,3,this.ctx));
        });
        };
        this.counter+=1;
        console.log(this.counter);
        
    }
    // COLLISIONS
    _collisionsCheck(a, b) {
        a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
    }
    _collisionOccurs() {
        pBullets.forEach(function(bullet) {
        enemies.forEach(function(enemy) {
            if (collisionCheck(bullet, enemy)) {
                bullet.die();
                enemy.die();
            }
        });
        enemies.forEach(function(enemy) {
            if (collisionCheck(enemy, player)) {
              if (hit_delay === 0) {
                enemy.die();
                player.getHit();
              }
            }
          });
        
    });
    }
    //SCREEN
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

    
 

    
