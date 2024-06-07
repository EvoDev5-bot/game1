export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 90;
    this.image = boom;
    this.frameX = 0;
    this.maxFrame = 5;
    this.fps = 10;
    this.frameInterval = 1000 / this.fps;
    this.frameCounter = 0;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter -= this.frameInterval;
      if (this.frameX == this.maxFrame) this.markedForDeletion = true;
      else this.frameX++;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
