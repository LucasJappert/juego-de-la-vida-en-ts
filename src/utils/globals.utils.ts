import * as PIXI from 'pixi.js';
import Game from "../models/game.model";

const GRID_SIZE = 40;
const LOOP_UPDATE_TIME_IN_MILLISECONDS = 100;

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

export { app, GRID_SIZE, PIXI, LOOP_UPDATE_TIME_IN_MILLISECONDS };
