import './style.css';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

// Agregar la vista de la aplicación al DOM
document.body.appendChild(app.view as unknown as Node);

const deadCellSprite = PIXI.Sprite.from('/images/blackShape.png');

app.stage.addChild(deadCellSprite);

// center the sprite's anchor point
deadCellSprite.anchor.set(0.5);
deadCellSprite.width = app.screen.width / 30;
deadCellSprite.height = app.screen.height / 30;

// move the sprite to the center of the screen
// deadCellSprite.x = app.screen.width / 2;
// deadCellSprite.y = app.screen.height / 2;
deadCellSprite.x = 0;
deadCellSprite.y = 0;

setInterval(() => {
    // deadCellSprite.x += 5;
}, 1000);
