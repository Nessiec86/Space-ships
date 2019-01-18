
window.onload = function () {
    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");
    const widthCell = 10;
    const lives = 5;
    const points = 0;
    const bullets = [];
    const invaderbullets = [];
    const counter = 0;
    const newcounter = 0;
    const width = 0;
    const height = 0;
    const game = new Game({
        rows: canvas.height / widthCell,
        columns: canvas.width / widthCell,
        ship: new Ship ( canvas.width/*MaxRows*/, canvas.height/*MaxColumns*/,ctx),
        ctx: ctx,
        lives: lives,
        points: points,
        bullets: bullets,
        invaderbullets: invaderbullets,
        counter: counter,
        newcounter: newcounter,
        width: width,
        height: height,
    });
    
    //DOOM
    let btnstart = document.getElementById("btnstart");
    let btnend = document.getElementById("btnend");
    let btnreturn = document.getElementById("btnreturn");
    btnstart.onclick = buttonstart;
    btnend.onclick = buttonend;
    btnreturn.onclick = buttonreturn;
        
    
    //INICIO DE JUEGO !!!
    function init() {
        game.start();
    }
    function stop(){
        game._pause();
    }
    //START
    function buttonstart(){
        let start = document.getElementById("start");
        let game = document.getElementById("game");
        let end = document.getElementById("end");
        end.style.display = "flex";
        game.style.display = "flex";
        start.style.display = "none";
        init();
    }
    function buttonend(){
        let gameover = document.getElementById("gameover");
        let game = document.getElementById("game");
        let end = document.getElementById("end");
        end.style.display = "none";
        gameover.style.display = "flex";
        game.style.display = "none";
        stop();
    }
    
};

function buttonreturn(){
    gameover.style.display = "none";
    start.style.display = "flex";
}
    
