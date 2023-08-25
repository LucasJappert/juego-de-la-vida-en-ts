import { app, LOOP_UPDATE_TIME_IN_MILLISECONDS } from "../utils/globals.utils";
import Matriz from "./matriz.model";


export default class Game {
    private matriz: Matriz = new Matriz();
    private static pause: boolean = false;
    private static infinityWorld = false;
    private lastUpdate: Date = new Date();

    constructor() {
        document.body.appendChild(app.view as unknown as Node);
    }
    static SetPause(value: boolean) {
        Game.pause = value;
    }
    static GetInfinityWorld() {
        return Game.infinityWorld;
    }

    StartGame() {
        // app.ticker.maxFPS = 1;
        // app.ticker.minFPS = 1;
        console.log(app.ticker.FPS);

        app.ticker.add(() => {
            this.GameLoop();
        });
    }

    private GameLoop() {
        if (Game.pause) return;

        this.Update();
        this.Draw();
    }

    
    private Update() {
        const diffInMilliseconds = new Date().getTime() - this.lastUpdate.getTime();
        if (diffInMilliseconds > LOOP_UPDATE_TIME_IN_MILLISECONDS) {
            this.matriz.Update();
            this.lastUpdate = new Date();
        }
    }

    private Draw() {
        // const deletedChildren = app.stage.removeChildren().length;
        // console.log(deletedChildren);

        // console.log(app.stage.children.length);
        this.matriz.Draw();
    }
}
