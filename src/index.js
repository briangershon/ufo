import Drawable from './drawable';

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const ufo = new Image();
// ufo.png base64 via https://onlinepngtools.com/convert-png-to-base64
ufo.src = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAASAAAAAgCAYAAACy9KU0AAABfElEQVR4nO3aXWqDQBiGUa/ckHtycbPDXE0vipAMatQ4M8J3HhjoX3re2hAsdBgkSZIkSZIkSXpir3HM/L713hDdf8KGsH7YH/wh/hM2RPefsCGk/xrHvJyUUvMB0f1yA799KaXcc0NkP+8cPp/Pr4r/8nk+n8+vgtcewefzA/pXbq/uvCXj8/kB/b2/9c4ePp/PP45O03TbOTGGz+cH9W9Fv4zh8/n8tvjOCD6fH9TP0zTl1zj2GvHx8eUfm3r5a1tq7Dni19xzxV/b09P/5brc6V/ZU9Pf2tPLX3vOvL8IfXwipZRTSh9v771/9OvKx5QXYPn4+8Xq4b9/bflEau2X32dtT0t/bU9P/8zvqaZ/5PfU0t/a08tfe85svgC1Ou6A3AG5A3IHNPQYUeJ8Pj+0327EFs7n80P7/yOWUwHNwzDkeZ7zPM+bF4HP54f118f8eha0PHw+n7/Z1gPvOF9xPp8f2r99wCGUz+fzJUmSJEmSJEmSJEnSmf4AQ0vgn4OEFSIAAAAASUVORK5CYIIA';

const backgroundColor = '#0A9DF8';
const SCALE = 1;
const NUMBER_OF_ENTITIES = 22;

const entities = [];

function init() {
  for (let i = 0; i < NUMBER_OF_ENTITIES; i++) {
    entities.push(
      new Drawable({
        debug: false,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        backgroundColor,
        scale: SCALE,
        x: canvas.width / 2 / SCALE,
        y: canvas.height / 2 / SCALE,
        canvasContext: ctx,
        spriteSheet: ufo,
        totalFrames: 9,
      })
    );
  }
  window.requestAnimationFrame(drawAll);
}

function drawAll(now) {
  ctx.save();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'darkgray';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  entities.forEach((e) => {
    e.draw(now);
    e.update(now);
  });
  window.requestAnimationFrame(drawAll);
}

init();
