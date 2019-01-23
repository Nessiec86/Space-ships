class Background {
    constructor (ctx){
      this.ctx = ctx;
      this.img = new Image ();
      this.img.src = "Assets/space.png";
      this.x = 0;
      this.y = 0;
      this.height = this.img.height;
      this.width = this.img.width;
      this.speed = 1;
      
    };
     
    _drawBoard(img,i,array){
      this.ctx.drawImage(img.img, img.x, img.y);
      if (img.speed < 0) {
        this.ctx.drawImage(img.img, 0, img.y + img.height);
        } else {
      this.ctx.drawImage(img.img, 0, img.y - img.height);
    }
    };
   
    _clearScreen(imageBackground, i, array){
      
    };
  
    _update(image, i, array){
      image.y += image.speed; 
      image.y %= image.height;
      
      if (image.y === 600){
       // array.splice(i, 1);
      image.y = 0;  
      }
      
      };
};

//========== GAME ================
/*
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