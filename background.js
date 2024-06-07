class Layer {
  constructor(image) {
    this.image = image;
    this.height = 500;
    this.width = 1667;
    this.x = 0;
    this.y = 0;
    this.x2 = 1666;
  }
  update(speed, deltatime) {
    this.x -= speed * deltatime;
    this.x2 -= speed * deltatime;

    if (this.x2 <= 0 && this.x < this.x2) this.x = 1666;
    if (this.x <= 0 && this.x2 < this.x) this.x2 = 1666;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

export class Background {
  constructor(speed) {
    this.speed = speed;
    this.layers = [
      new Layer(bg1),
      new Layer(bg2),
      new Layer(bg3),
      new Layer(bg4),
      new Layer(bg5),
    ];
  }

  update(deltatime) {
    this.layers.forEach((layer, index) => {
      layer.update(this.speed * ((index + 1) * 0.5), deltatime);
    });
  }

  draw(ctx) {
    this.layers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
  setSpeed(speed) {
    this.speed = speed;
  }
}
