const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const ufo = document.getElementById('ufo-spritesheet');
const MAX_POSITION_CHANGE = 4;
const backgroundColor = 'white';
const SCALE = 2;

const entities = [];

class Drawable {
  constructor({ canvasContext, x = 0, y = 0, spriteSheet, totalFrames, spriteWidth = 32, spriteHeight = 32 }) {
    this.spriteSheet = spriteSheet;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    // start on a random frame
    this.frame = Math.floor(Math.random() * Math.floor(totalFrames));
    this.totalFrames = totalFrames;

    this.width = 10;
    this.height = 10;
    this.ctx = canvasContext;
    this.startX = x;
    this.startY = y;
    this.endX = x;
    this.endY = y;
    this.x = x;
    this.y = y;
    this.fraction = 0;

    this.lastFrameUpdated = 0;
    this.lastUpdated = 0;
    this.lastFractionUpdated = 0;
  }

  update(now) {
    // every 10 seconds, pick a new destination
    if (now - this.lastUpdated > 5000) {
      this.startX = this.x;
      this.startY = this.y;
      this.endX = Math.floor(
        Math.random() * Math.floor(canvas.width / SCALE - this.width / SCALE)
      );
      this.endY = Math.floor(
        Math.random() * Math.floor(canvas.height / SCALE - this.height / SCALE)
      );
      this.fraction = 0;
      this.lastUpdated = now;
    }
    if (now - this.lastFractionUpdated > 100) {
      if (this.fraction < 1) {
        this.fraction += 0.01;
        this.x = this.lerp(this.startX, this.endX, this.fraction);
        this.y = this.lerp(this.startY, this.endY, this.fraction);
      }
      this.lastFractionUpdated = now;
    }
  }

  draw(now) {
    this.ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.setLineDash([2, 2]);


    ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.closePath();

    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(this.x - this.spriteWidth / 2, this.y - this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
    this.ctx.strokeRect(this.x - this.spriteWidth / 2, this.y - this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);

    // plot destination
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.endX - 3, this.endY - 3, 6, 6);

    ctx.drawImage(
      this.spriteSheet,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.spriteWidth / 2,
      this.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );

    // update animation frames
    if (!this.lastFrameUpdated || now - this.lastFrameUpdated >= 100) {
      this.frame++;
      if (this.frame === this.totalFrames) {
        this.frame = 0;
      }
      this.x +=
        Math.random() * Math.floor(MAX_POSITION_CHANGE) -
        MAX_POSITION_CHANGE / 2;
      this.y +=
        Math.random() * Math.floor(MAX_POSITION_CHANGE) -
        MAX_POSITION_CHANGE / 2;
      this.lastFrameUpdated = now;
    }
    this.ctx.restore();
  }

  lerp(min, max, fraction) {
    return (max - min) * fraction + min;
  }
}

function init() {
  for (let i = 0; i < 5; i++) {
    entities.push(
      new Drawable({
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
