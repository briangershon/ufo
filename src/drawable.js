class Drawable {
  constructor({
    debug = false,
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
    this.debug = debug;
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
    // every n seconds, pick a new destination for 60%
    if (now - this.lastUpdated > 6000) {
      if (Math.random() < 0.6) {
        this.startX = this.x;
        this.startY = this.y;
        this.endX =
          Math.floor(
            Math.random() *
              Math.floor((this.canvasWidth - this.spriteWidth) / this.scale)
          ) +
          this.spriteWidth / 2 / this.scale;
        this.endY =
          Math.floor(
            Math.random() *
              Math.floor((this.canvasHeight - this.spriteHeight) / this.scale)
          ) +
          this.spriteHeight / 2 / this.scale;
        this.fraction = 0;
      }
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

    if (this.debug) {
      ctx.setLineDash([2, 2]);

      ctx.beginPath();
      ctx.strokeStyle = 'lightgray';
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
      ctx.fillStyle = 'lightgray';
      ctx.fillRect(this.endX - 3, this.endY - 3, 6, 6);
    }

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
    if (!this.lastFrameUpdated || now - this.lastFrameUpdated > 100) {
      this.frame++;
      if (this.frame === this.totalFrames) {
        this.frame = 0;
      }
      this.lastFrameUpdated = now;
    }
    ctx.restore();
  }

  lerp(min, max, fraction) {
    return (max - min) * fraction + min;
  }
}

export default Drawable;
