class Asteroid {
    constructor(randomX,asteroidY,width,height,speed,ctx) {
        this.randomX = randomX;
        this.asteroidY = asteroidY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.ctx = ctx;
        this.image = new Image ();
        this.image.src = "Assets/asteroid-white1x.png";
    }
    
    _drawAsteroid(){
        this.ctx.drawImage(this.image, this.randomX, this.asteroidY, this.width, this.height)
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