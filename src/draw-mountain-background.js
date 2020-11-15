export default class DrawMountainBackground {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.lastUpdated = 0;
    this.radiusLastUpdated = 0;

    this.radians = 0;
    this.radius = this.height / 2;

    this.heights = [];
    for (let i = 0; i < this.width; i++) {
      this.heights[i] = 0;
    }
  }

  draw() {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;

    ctx.save();
    for (let i = 0; i < width; i++) {
      ctx.fillStyle = 'lightgray';
      ctx.fillRect(i, height - this.heights[i], 1, height);
      ctx.fillStyle = 'white';
      ctx.fillRect(i, height - this.heights[i], 1, 12);
      ctx.fillStyle = 'gray';
      ctx.fillRect(i, height - this.heights[i], 1, 5);
    }
    ctx.restore();
  }

  update(now) {
    if (now - this.lastUpdated > 10) {
      // scroll to the left
      this.heights.shift();

      // add new section on the right
      const nextHeight = Math.sin(this.radians) * this.radius;

      if (this.radians > Math.PI) {
        this.radius = getRandomInt(0.6 * this.height);
        this.radians = 0;
      }
      this.heights[this.width] = nextHeight;
      this.radians += 0.01;
      // this.radians += 0.04 * Math.random(); //0.01;

      this.lastUpdated = now;
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Mountain {
  constructor({ radius, radianIncrement }) {}
}
