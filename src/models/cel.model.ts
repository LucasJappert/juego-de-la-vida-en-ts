import { app, GRID_SIZE, PIXI } from "../utils/globals.utils";
type status = "alive" | "dead";

const deadCellSprite = PIXI.Sprite.from('/images/blackShape.png');
const aliveCellSprite = PIXI.Sprite.from('/images/whiteShape.png');

export default class Cel extends PIXI.Sprite {
    status: status = "dead";
    // texture: PIXI.Texture = deadCellSprite.texture;
    // position!: { x: number, y: number; };
    constructor(x: number, y: number) {
        super();

        this.width = app.screen.width / GRID_SIZE;
        this.height = app.screen.height / GRID_SIZE;

        this.x = x * this.width + this.width / 2;
        this.y = y * this.height + this.height / 2;

        this.texture = deadCellSprite.texture;

        this.anchor.set(0.5);
        app.stage.addChild(this);
    }

    SetStatusToAlive = () => {
        this.status = "alive";
        this.texture = aliveCellSprite.texture;
    };
    SetStatusToDead = () => {
        this.status = "dead";
        this.texture = deadCellSprite.texture;
    };


    Update() {
        if (Math.random() > 0.8) this.SetStatusToAlive();
        else  this.SetStatusToDead();
        // this.rotation += 0.1;
    }

    Draw() {
        // console.log(this.x, this.y);
        // console.log(this);
        // app.stage.addChild(this);
    }
}
