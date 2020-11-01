import Drawable from './drawable';

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const ufo = document.getElementById('ufo-spritesheet');
const backgroundColor = 'white';
const SCALE = 2;

const entities = [];

function init() {
  for (let i = 0; i < 5; i++) {
    entities.push(
      new Drawable({
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        backgroundColor,
        scale: SCALE,
        x: canvas.width / 2 / SCALE,
        y: canvas.height / 2 / SCALE,
        canvasContext: ctx,
        spriteSheet: ufo,
        totalFrames: 11,
      })
    );
  }
  window.requestAnimationFrame(drawAll);
}

function drawAll(now) {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  entities.forEach((e) => {
    e.draw(now);
    e.update(now);
  });
  window.requestAnimationFrame(drawAll);
}

init();
