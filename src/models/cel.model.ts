import { app, GRID_SIZE, PIXI } from "../utils/globals.utils";
type status = "alive" | "dead";

const deadCellSprite = PIXI.Sprite.from('/images/blackShape.png');
const aliveCellSprite = PIXI.Sprite.from('/images/whiteShape.png');

const aliveCells = [[2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [2, 6]];

export default class Cel extends PIXI.Sprite {
    status: status = "dead";
    statusBeforeCheckNeigthboring: status = "dead";
    rowIndex: number = 0;
    colIndex: number = 0;
    // texture: PIXI.Texture = deadCellSprite.texture;
    // position!: { x: number, y: number; };
    constructor(x: number, y: number) {
        super();

        this.width = (app.screen.width) / GRID_SIZE;
        this.height = (app.screen.height - 50) / GRID_SIZE;

        this.x = x * this.width + this.width / 2;
        this.y = y * this.height + this.height / 2 + 50;
        this.colIndex = x;
        this.rowIndex = y;


        this.texture = deadCellSprite.texture;

        this.anchor.set(0.5);

        // if (Math.random() > 0.9) this.SetStatusToAlive();
        // if (aliveCells.includes([x, y])) this.SetStatusToAlive();
        if (aliveCells.find(item => item[0] == x && item[1] == y)) this.SetStatusToAlive();

        app.stage.addChild(this);

        this.SetCoordinateText();
    }

    private SetCoordinateText() {
        if (this.rowIndex == 0) {
            const text = new PIXI.Text(this.colIndex, {
                fontFamily: 'Arial',
                fontSize: 14,
                fill: 'white', // Color del texto
            });

            // Posicionar el texto en el lienzo
            text.x = this.x - 5;
            text.y = this.y - 9;

            // Agregar el texto al lienzo
            app.stage.addChild(text);
        }
        if (this.colIndex == 0) {
            const text = new PIXI.Text(this.rowIndex, {
                fontFamily: 'Arial',
                fontSize: 14,
                fill: 'white', // Color del texto
            });

            // Posicionar el texto en el lienzo
            text.x = this.x - 5;
            text.y = this.y - 9;

            // Agregar el texto al lienzo
            app.stage.addChild(text);
        }
    }

    SetStatusToAlive = () => {
        this.status = "alive";
        this.texture = aliveCellSprite.texture;
    };
    SetStatusToDead = () => {
        this.status = "dead";
        this.texture = deadCellSprite.texture;
    };
    GetStatus() {
        return this.status;
    }
    ResetStatusBeforeCheckNeigthboring() {
        this.statusBeforeCheckNeigthboring = this.status;
    }
    GetStatusBeforeCheckNeigthboring() {
        return this.statusBeforeCheckNeigthboring;
    }
    AmIAlive() { return this.status == "alive"; }


    Update(cellsMatrix: Cel[][]) {
        // if (this.colIndex == 2 && this.rowIndex == 5) {
        //     console.log("asd");
        // }
        let neigthboringCells = this.GetNeigthboringCells(cellsMatrix);
        // if (this.colIndex == 2 && this.rowIndex == 5) {
        //     const aux = neigthboringCells.map(x => { return { x: x.colIndex, y: x.rowIndex }; });
        // }
        let aliveNeigthboringCells = this.GetAliveCells(neigthboringCells);
        // if (aliveNeigthboringCells > 3) console.log(this.colIndex, this.rowIndex);

        if (this.AmIAlive()) {
            if (![2, 3].includes(aliveNeigthboringCells)) this.SetStatusToDead();
            return;
        }

        if ([3].includes(aliveNeigthboringCells)) this.SetStatusToAlive();

        // if (Math.random() > 0.8) this.SetStatusToAlive();
        // else this.SetStatusToDead();
        // this.rotation += 0.1;
    }

    Draw() {
        // console.log(this.x, this.y);
        // console.log(this);
        // app.stage.addChild(this);
    }

    GetNeigthboringCells(cellsMatrix: Cel[][]) {
        return [
            this.ObtenerCelulaVecinaArribaALaIzquierda(cellsMatrix),
            this.ObtenerCelulaVecinaArribaALaDerecha(cellsMatrix),
            this.ObtenerCelulaVecinaAbajoALaIzquierda(cellsMatrix),
            this.ObtenerCelulaVecinaAbajoALaDerecha(cellsMatrix),
            this.ObtenerCelulaVecinaDeArriba(cellsMatrix),
            this.ObtenerCelulaVecinaDeAbajo(cellsMatrix),
            this.ObtenerCelulaVecinaDeIzquierda(cellsMatrix),
            this.ObtenerCelulaVecinaDeDerecha(cellsMatrix),
        ];
    }
    ObtenerCelulaVecinaArribaALaIzquierda(cellsMatrix: Cel[][]) {
        const leftCol = cellsMatrix[this.colIndex - 1];
        if (leftCol == null) {
            const lastCol = cellsMatrix[GRID_SIZE - 1];
            if (lastCol[this.rowIndex - 1] == null) return lastCol[GRID_SIZE - 1];
            return lastCol[this.rowIndex - 1];
        }

        const rightTopCel = leftCol[this.rowIndex - 1];
        if (rightTopCel == null) return leftCol[GRID_SIZE - 1];

        return rightTopCel;
    }
    ObtenerCelulaVecinaArribaALaDerecha(cellsMatrix: Cel[][]) {
        const rightCol = cellsMatrix[this.colIndex + 1];
        if (rightCol == null) {
            const firstCol = cellsMatrix[0];
            if (firstCol[this.rowIndex - 1] == null) return firstCol[GRID_SIZE - 1];
            return firstCol[this.rowIndex - 1];
        }

        const rightTopCel = rightCol[this.rowIndex - 1];
        if (rightTopCel == null) return rightCol[GRID_SIZE - 1];

        return rightTopCel;
    }
    ObtenerCelulaVecinaAbajoALaIzquierda(cellsMatrix: Cel[][]) {
        const leftCol = cellsMatrix[this.colIndex - 1];
        if (leftCol == null) {
            const lastCol = cellsMatrix[GRID_SIZE - 1];
            if (lastCol[this.rowIndex + 1] == null) return lastCol[0];
            return lastCol[this.rowIndex + 1];
        }

        const bottomLeftCel = leftCol[this.rowIndex + 1];
        if (bottomLeftCel == null) return leftCol[0];

        return bottomLeftCel;
    }
    ObtenerCelulaVecinaAbajoALaDerecha(cellsMatrix: Cel[][]) {
        const rightCol = cellsMatrix[this.colIndex + 1];
        if (rightCol == null) {
            const firstCol = cellsMatrix[0];
            if (firstCol[this.rowIndex + 1] == null) return firstCol[0];
            return firstCol[this.rowIndex + 1];
        }

        const rightBottomCel = rightCol[this.rowIndex + 1];
        if (rightBottomCel == null) return rightCol[0];

        return rightBottomCel;
    }
    ObtenerCelulaVecinaDeArriba(cellsMatrix: Cel[][]) {
        const topCel = cellsMatrix[this.colIndex][this.rowIndex - 1];
        if (topCel == null) return cellsMatrix[this.colIndex][GRID_SIZE - 1];

        return topCel;
    }
    ObtenerCelulaVecinaDeAbajo(cellsMatrix: Cel[][]) {
        const bottomCel = cellsMatrix[this.colIndex][this.rowIndex + 1];
        if (bottomCel == null) return cellsMatrix[this.colIndex][0];

        return bottomCel;
    }
    ObtenerCelulaVecinaDeIzquierda(cellsMatrix: Cel[][]) {
        const leftCol = cellsMatrix[this.colIndex - 1];
        if (leftCol == null) return cellsMatrix[GRID_SIZE - 1][this.rowIndex];

        return leftCol[this.rowIndex];
    }
    ObtenerCelulaVecinaDeDerecha(cellsMatrix: Cel[][]) {
        const rightCel = cellsMatrix[this.colIndex + 1];
        if (rightCel == null) return cellsMatrix[0][this.rowIndex];

        return rightCel[this.rowIndex];
    }
    GetAliveCells(cells: Cel[]) {
        return cells.filter(cell => cell.GetStatusBeforeCheckNeigthboring() == "alive").length;
    }
}
