import { app } from "../utils/globals.utils";
import Matriz from "./matriz.model";

export default class Game {
    private matriz: Matriz = new Matriz();

    constructor() {
        document.body.appendChild(app.view as unknown as Node);
    }

    StartGame() {
        app.ticker.maxFPS = 1;
        app.ticker.minFPS = 1;
        console.log(app.ticker.FPS);

        app.ticker.add(() => {
            this.GameLoop();
        });
    }

    private GameLoop() {
        this.Update();
        this.Draw();
    }

    private Update() {
        this.matriz.Update();
    }

    private Draw() {
        // const deletedChildren = app.stage.removeChildren().length;
        // console.log(deletedChildren);

        console.log(app.stage.children.length);
        this.matriz.Draw();
    }
}
