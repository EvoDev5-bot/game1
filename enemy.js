class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.canvas.width;
    this.markedForDeletion = false;
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = plantEnemy;
    this.width = 60;
    this.height = 80;
    this.frameX = 0;
    this.maxFrame = 1;
    this.y = this.game.canvas.height - this.height - this.game.groundLevel;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameCounter = 0;
  }
  update(deltatime) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter -= this.frameInterval;
      if (this.frameX === this.maxFrame) this.frameX = 0;
      else this.frameX++;
    }
    this.x -= deltatime * this.game.gameSpeed;

    if (this.x + this.width < 0) this.markedForDeletion = true;
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

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.image = flyingEnemy;
    this.width = 60;
    this.height = 44;
    this.frameX = 0;
    this.maxFrame = 5;
    this.y = Math.random() * 100 + 100;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameCounter = 0;
    this.angle = 0;
    this.angleSpeed = Math.random() * 5 + 15;
    this.curve = Math.random() * 0.3 + 1;
  }
  update(deltatime) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter -= this.frameInterval;
      if (this.frameX === this.maxFrame) this.frameX = 0;
      else this.frameX++;
    }
    this.x -= deltatime * 0.5;

    this.y += Math.sin(this.angle) * this.curve * deltatime * 0.33;
    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) this.markedForDeletion = true;
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
