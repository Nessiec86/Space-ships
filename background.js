class Background {
    constructor (){
        this.img = new Image (800, 400);
        this.img.src = 'img/AMS_img2.png';
        this.x = 0;
        this.width = 800;
        this.speed = -0.5;
      }
};
/*
//========== GAME ================

drawBackground (){
    this.ctx.drawImage(this.background.img, this.background.x, 0);
    if (this.background.speed < 0) {
      this.ctx.drawImage(this.background.img, this.background.x + this.background.width, 0);
    } else {
      this.ctx.drawImage(this.background.img, this.background.x - this.background.width, 0);
    }
  };

  moveBackground(){
    // Infinite backgroun loop
    this.background.x += this.background.speed; 
    this.background.x %= this.background.width;
  };
  */