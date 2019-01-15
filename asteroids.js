class Asteroid {
    constructor(randomX,asteroidY,witdh,height,speed,ctx) {
        this.randomX = randomX;
        this.asteroidY = asteroidY;
        this.witdh = witdh;
        this.height = height;
        this.speed = speed;
        this.ctx = ctx;
    }
    
    _drawAsteroid(){
        console.log("asteroide!");
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.randomX,this.asteroidY,10,10);
    }
    _clearAsteroid(newasteroid, i, array){
        if (newasteroid.asteroidY >= 590){
            array.splice(i, 1);
        }
    }
    _update(){
        this.asteroidY = this.asteroidY + this.speed;    
    }
};