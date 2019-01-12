
window.onload = function () {
    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");
    const widthCell = 10;
    const lives = 5;
    const points = 0;
    const bullets = [];
    const game = new Game({
        rows: canvas.height / widthCell,
        columns: canvas.width / widthCell,
        ship: new Ship ( canvas.height / widthCell/*MaxRows*/, canvas.width / widthCell/*MaxColumns*/,ctx),
        ctx: ctx,
        lives: lives,
        points: points,
        bullets: bullets,
    });
    
    //DOOM
    let btnstart = document.getElementById("btnstart");
    let btnend = document.getElementById("btnend");
    let btnreturn = document.getElementById("btnreturn");
    btnstart.onclick = buttonstart;
    btnend.onclick = buttonend;
    btnreturn.onclick = buttonreturn;
        
    
    //INICIO DE JUEGO !!!
    
  game.start();
    
}

//START
function buttonstart(){
    let start = document.getElementById("start");
    let game = document.getElementById("game");
    let end = document.getElementById("end");
    end.style.display = "flex";
    game.style.display = "flex";
    start.style.display = "none";
}

function buttonend(){
    let gameover = document.getElementById("gameover");
    end.style.display = "none";
    gameover.style.display = "flex";
    game.style.display = "none";
    
}

function buttonreturn(){
    gameover.style.display = "none";
    start.style.display = "flex";
}