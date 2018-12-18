class Ship {
    constructor(maxRows, maxColumns) {
        this.direction = "north";
        this.body = [
          { row: 50, column: 25 },
          ];
        this.maxRows = maxRows;
        this.maxColumns = maxColumns;
    }
};

console.log("dentro de Ship");
console.log(this.body, this.maxRows, this.maxColumns);