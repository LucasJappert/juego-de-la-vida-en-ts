import './style.css';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});

// Agregar la vista de la aplicación al DOM
document.body.appendChild(app.view as unknown as Node);

const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

app.stage.addChild(bunny);

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

setInterval(() => {
    bunny.x += 1;
}, 1000);
