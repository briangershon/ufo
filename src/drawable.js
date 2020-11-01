const MAX_POSITION_CHANGE = 4;

class Drawable {
  constructor({
    backgroundColor = 'white',
    canvasContext,
    canvasWidth = 100,
    canvasHeight = 100,
    scale = 1,
    x = 0,
    y = 0,
    spriteSheet,
    totalFrames,
    spriteWidth = 32,
    spriteHeight = 32,
  }) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.backgroundColor = backgroundColor;
    this.scale = scale;
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
        Math.random() *
          Math.floor(this.canvasWidth / this.scale - this.width / this.scale)
      );
      this.endY = Math.floor(
        Math.random() *
          Math.floor(this.canvasHeight / this.scale - this.height / this.scale)
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
    const ctx = this.ctx;
    ctx.save();
    ctx.scale(this.scale, this.scale);
    ctx.setLineDash([2, 2]);

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = 'black';
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
      this.x - this.spriteWidth / 2,
      this.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );
    ctx.strokeRect(
      this.x - this.spriteWidth / 2,
      this.y - this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );

    // plot destination
    ctx.fillStyle = 'black';
    ctx.fillRect(this.endX - 3, this.endY - 3, 6, 6);

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
    ctx.restore();
  }

  lerp(min, max, fraction) {
    return (max - min) * fraction + min;
  }
}

export default Drawable;
