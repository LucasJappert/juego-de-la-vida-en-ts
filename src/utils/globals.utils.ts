import * as PIXI from 'pixi.js';
import Game from "../models/game.model";

const GRID_SIZE = 30;

const app = new PIXI.Application({
    background: '#999',
    resizeTo: window,
});


window.addEventListener('blur', () => {
    Game.SetPause(true);
});
window.addEventListener('focus', () => {
    Game.SetPause(false);
});

export { app, GRID_SIZE, PIXI };
