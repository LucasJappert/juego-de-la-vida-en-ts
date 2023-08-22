import Cel from "./cel.model";
import { GRID_SIZE } from "../utils/globals.utils";


export default class Matriz {
    private rows!: Cel[][];

    constructor() {
        this.rows = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            const newRow: Cel[] = [];
            for (let col = 0; col < GRID_SIZE; col++) {
                newRow.push(new Cel(col, row));
            }
            this.rows.push(newRow);
        }
    }

    Update() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const cel = this.rows[row][col];
                cel.Update();
            }
        }
    }

    Draw() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const cel = this.rows[row][col];
                cel.Draw();
            }
        }
    }
}

