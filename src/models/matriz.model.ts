import Cel from "./cel.model";
import { GRID_SIZE } from "../utils/globals.utils";


export default class Matriz {
    private cols!: Cel[][];

    constructor() {
        this.cols = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            const newCol: Cel[] = [];
            for (let row = 0; row < GRID_SIZE; row++) {
                newCol.push(new Cel(col, row));
            }
            this.cols.push(newCol);
        }
    }

    Update() {
        for (let col = 0; col < GRID_SIZE; col++) {
            for (let row = 0; row < GRID_SIZE; row++) {
                // if (col == 2 && row == 5) {
                //     console.log("asd");
                // }
                const cel = this.cols[col][row];
                cel.Update(this.cols);
            }
        }
        // for (let col = 0; col < GRID_SIZE; col++) {
        //     for (let row = 0; row < GRID_SIZE; row++) {
        //         this.cols[col][row].ResetStatusBeforeCheckNeigthboring();
        //     }
        // }

        console.log(this.cols.flat().filter(x => x.GetStatus() == "alive").length);
    }

    Draw() {
        for (let col = 0; col < GRID_SIZE; col++) {
            for (let row = 0; row < GRID_SIZE; row++) {
                const cel = this.cols[col][row];
                cel.ResetStatusBeforeCheckNeigthboring();
                cel.Draw();
            }
        }
    }
}

