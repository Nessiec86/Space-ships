
window.onload = function () {
    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");
    const widthCell = 10;
    const game = new Game({
        rows: canvas.height / widthCell,
        columns: canvas.width / widthCell,
        ship: new Ship(canvas.height / widthCell/*MaxRows*/, canvas.width / widthCell/*MaxColumns*/),
        ctx: ctx,
    });

    game.start();
}

