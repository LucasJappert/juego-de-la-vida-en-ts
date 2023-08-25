import { app, GRID_SIZE, PIXI } from "../utils/globals.utils";
import Game from "../models/game.model";
type status = "alive" | "dead";

const deadCellSprite = PIXI.Sprite.from('/images/blackShape.png');
const aliveCellSprite = PIXI.Sprite.from('/images/whiteShape.png');

const aliveCells = [[2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [2, 6]];

// Set up Glider Gun pattern
const gliderGunPattern = [
    [24, 1], [22, 2], [24, 2], [12, 3], [13, 3], [20, 3], [21, 3], [34, 3], [35, 3],
    [11, 4], [15, 4], [20, 4], [21, 4], [34, 4], [35, 4], [0, 5], [1, 5], [10, 5],
    [16, 5], [20, 5], [21, 5], [0, 6], [1, 6], [10, 6], [14, 6], [16, 6], [17, 6],
    [22, 6], [24, 6], [10, 7], [16, 7], [24, 7], [11, 8], [15, 8], [12, 9], [13, 9],
];

const pulsarPattern = [
    [2, 1], [3, 1], [4, 1], [8, 1], [9, 1], [10, 1],
    [1, 2], [6, 2], [8, 2], [13, 2],
    [1, 3], [6, 3], [8, 3], [13, 3],
    [1, 4], [6, 4], [8, 4], [13, 4],
    [2, 6], [3, 6], [4, 6], [8, 6], [9, 6], [10, 6],
];


const lwssPattern = [
    [1, 0], [4, 0],
    [0, 1],
    [0, 2], [4, 2],
    [0, 3], [1, 3], [2, 3], [3, 3],
];
const beaconPattern = [
    [1, 1], [2, 1],
    [1, 2],
    [4, 3], [3, 4], [4, 4],
];
const pentaDecathlonPattern = [
    [7, 6], [8, 6], [9, 6],
    [7, 7], [9, 7],
    [7, 8], [8, 8], [9, 8],
    [7, 9], [8, 9], [9, 9],
    [7, 10], [9, 10],
    [7, 11], [8, 11], [9, 11],
];
const toadPattern = [
    [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3],
];
const blockLayingPattern = [
    [2, 0], [3, 0], [2, 1],
    [5, 2], [6, 2], [5, 3],
    [0, 4], [3, 4], [4, 4], [7, 4],
];


export default class Cel extends PIXI.Sprite {
    private status: status = "dead";
    private statusBeforeCheckNeigthboring: status = "dead";
    private rowIndex: number = 0;
    private colIndex: number = 0;
    // texture: PIXI.Texture = deadCellSprite.texture;
    // position!: { x: number, y: number; };
    constructor(x: number, y: number) {
        super();

        this.width = (app.screen.width) / GRID_SIZE;
        this.height = (app.screen.height) / GRID_SIZE;

        this.x = x * this.width + this.width / 2;
        this.y = y * this.height + this.height / 2;
        this.colIndex = x;
        this.rowIndex = y;


        this.texture = deadCellSprite.texture;

        this.anchor.set(0.5);

        // if (Math.random() > 0.9) this.SetStatusToAlive();
        // if (aliveCells.find(item => item[0] == x && item[1] == y)) this.SetStatusToAlive();
        if (gliderGunPattern.find(item => item[0] == x && item[1] == y)) {
            this.SetStatusToAlive();
            this.ResetStatusBeforeCheckNeigthboring();
        };

        app.stage.addChild(this);

        // this.SetCoordinateText();
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
        //TODO: Agregar test para chequear este metodo
        const neigthboringCells = this.GetNeigthboringCells(cellsMatrix);
        let aliveNeigthboringCells = 0;

        for (let i = 0; i < neigthboringCells.length; i++) {
            const cell = neigthboringCells[i];
            if (cell?.GetStatusBeforeCheckNeigthboring() == "alive") aliveNeigthboringCells += 1;
        }

        if (this.AmIAlive()) {
            if (![2, 3].includes(aliveNeigthboringCells)) return this.SetStatusToDead();
        }

        if (!this.AmIAlive()) {
            if ([3].includes(aliveNeigthboringCells)) this.SetStatusToAlive();
        }

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
            if (!Game.GetInfinityWorld()) return null;
            const lastCol = cellsMatrix[GRID_SIZE - 1];
            if (lastCol[this.rowIndex - 1] == null) return lastCol[GRID_SIZE - 1];
            return lastCol[this.rowIndex - 1];
        }

        const rightTopCel = leftCol[this.rowIndex - 1];
        if (rightTopCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return leftCol[GRID_SIZE - 1];
        }

        return rightTopCel;
    }
    ObtenerCelulaVecinaArribaALaDerecha(cellsMatrix: Cel[][]) {
        const rightCol = cellsMatrix[this.colIndex + 1];
        if (rightCol == null) {
            if (!Game.GetInfinityWorld()) return null;
            const firstCol = cellsMatrix[0];
            if (firstCol[this.rowIndex - 1] == null) return firstCol[GRID_SIZE - 1];
            return firstCol[this.rowIndex - 1];
        }

        const rightTopCel = rightCol[this.rowIndex - 1];
        if (rightTopCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return rightCol[GRID_SIZE - 1];
        }

        return rightTopCel;
    }
    ObtenerCelulaVecinaAbajoALaIzquierda(cellsMatrix: Cel[][]) {
        const leftCol = cellsMatrix[this.colIndex - 1];
        if (leftCol == null) {
            if (!Game.GetInfinityWorld()) return null;
            const lastCol = cellsMatrix[GRID_SIZE - 1];
            if (lastCol[this.rowIndex + 1] == null) return lastCol[0];
            return lastCol[this.rowIndex + 1];
        }

        const bottomLeftCel = leftCol[this.rowIndex + 1];
        if (bottomLeftCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return leftCol[0];
        }

        return bottomLeftCel;
    }
    ObtenerCelulaVecinaAbajoALaDerecha(cellsMatrix: Cel[][]) {
        const rightCol = cellsMatrix[this.colIndex + 1];
        if (rightCol == null) {
            if (!Game.GetInfinityWorld()) return null;
            const firstCol = cellsMatrix[0];
            if (firstCol[this.rowIndex + 1] == null) return firstCol[0];
            return firstCol[this.rowIndex + 1];
        }

        const rightBottomCel = rightCol[this.rowIndex + 1];
        if (rightBottomCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return rightCol[0];
        }

        return rightBottomCel;
    }
    ObtenerCelulaVecinaDeArriba(cellsMatrix: Cel[][]) {
        const topCel = cellsMatrix[this.colIndex][this.rowIndex - 1];
        if (topCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return cellsMatrix[this.colIndex][GRID_SIZE - 1];
        }

        return topCel;
    }
    ObtenerCelulaVecinaDeAbajo(cellsMatrix: Cel[][]) {
        const bottomCel = cellsMatrix[this.colIndex][this.rowIndex + 1];
        if (bottomCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return cellsMatrix[this.colIndex][0];
        }

        return bottomCel;
    }
    ObtenerCelulaVecinaDeIzquierda(cellsMatrix: Cel[][]) {
        const leftCol = cellsMatrix[this.colIndex - 1];
        if (leftCol == null) {
            if (!Game.GetInfinityWorld()) return null;
            return cellsMatrix[GRID_SIZE - 1][this.rowIndex];
        }

        return leftCol[this.rowIndex];
    }
    ObtenerCelulaVecinaDeDerecha(cellsMatrix: Cel[][]) {
        const rightCel = cellsMatrix[this.colIndex + 1];
        if (rightCel == null) {
            if (!Game.GetInfinityWorld()) return null;
            return cellsMatrix[0][this.rowIndex];
        }

        return rightCel[this.rowIndex];
    }
}
