import * as PIXI from 'pixi.js';

const GRID_SIZE = 30;

const app = new PIXI.Application({
    background: '#999',
    resizeTo: window,
});

export { app, GRID_SIZE, PIXI };
