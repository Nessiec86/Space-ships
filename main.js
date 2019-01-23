
window.onload = function () {
    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");
    const widthCell = 10;
    const lives = 5;
    const points = 0;
    const game = new Game({
        rows: canvas.height / widthCell,
        columns: canvas.width / widthCell,
        ship: new Ship ( canvas.width/*MaxRows*/, canvas.height/*MaxColumns*/,ctx),
        ctx: ctx,
        lives: lives,
        points: points,
    });
    
    //DOOM
    let btnstart = document.getElementById("btnstart");
    let btnend = document.getElementById("btnend");
    btnstart.onclick = buttonstart;
    btnend.onclick = buttonend;
        
    
    //INICIO DE JUEGO !!!
    function init() {
        game.start();
    }
    function stop(){
        game._stop();
        window.location.reload();
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
        let game = document.getElementById("game");
        let end = document.getElementById("end");
        end.style.display = "none";
        game.style.display = "none";
        stop();
    }
};

    
