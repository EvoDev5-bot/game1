class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
  }
}

export class Dust extends Particle {
  constructor(x, y) {
    super(x, y);
    this.size = Math.random() * 10 + 5;
  }
  update(deltatime, speed) {
    this.size -= 0.05 * deltatime;
    if (this.size <= 0) {
      this.size = 0.00001;
      this.markedForDeletion = true;
    }
    this.x -= speed * deltatime;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#1e1e1e";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Fire extends Particle {
  constructor(x, y) {
    super(x, y);
    this.width = 100;
    this.height = 90;
    this.image = fire;
    this.vy = 0.05;
    this.angle = Math.random() * 1.1 + 1;
    this.frameCounter = 0;
    this.endTime = Math.random() * 100 + 200;
  }
  update(deltatime, speed) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.endTime) this.markedForDeletion = true;
    this.width -= 0.05 * deltatime;
    this.height = this.width * (90 / 100);
    this.y -= this.vy * deltatime;
    this.vy += 0.01;
    this.x -= speed * deltatime;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, 0, 0);
    ctx.restore();
  }
}

export class FireDive extends Particle {
  constructor(x, y) {
    super(x, y);
    this.size = 14;
    this.vy = -0.1;
    this.frameCounter = 0;
    this.endTime = Math.random() * 100 + 500;
    this.vx = 0;
  }
  update(deltatime, speed) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.endTime) this.markedForDeletion = true;
    this.width -= 0.05 * deltatime;
    this.height = this.width * (90 / 100);
    this.y -= this.vy * deltatime;
    Math.random() >= 0.5 ? (this.vx += 0.1) : (this.vx -= 0.1);
    this.x += this.vx * deltatime;
    this.size -= 0.1 * deltatime;
    if (this.size < 0) {
      this.size = 0;
      this.markedForDeletion = true;
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class SplashParticle extends Particle {
  constructor(x, y, goesLeft) {
    super(x, y);
    this.width = 100;
    this.height = 90;
    this.image = fire;
    this.vy = 0.05;
    this.angle = Math.random() * 1.1 + 1;
    this.frameCounter = 0;
    this.endTime = Math.random() * 300 + 100;
    this.goesLeft = goesLeft;
  }
  update(deltatime, speed) {
    this.frameCounter += deltatime;
    if (this.frameCounter >= this.endTime) this.markedForDeletion = true;
    this.width -= 0.05 * deltatime;
    this.height = this.width * (90 / 100);
    this.y -= this.vy * deltatime;
    this.vy += 0.003 * deltatime;

    this.goesLeft ? (this.x -= 0.1 * deltatime) : (this.x += deltatime);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, 0, 0);
    ctx.restore();
  }
}

export function splash(x, y) {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push(new SplashParticle(x, y - 40, i % 2 == 0));
  }

  return particles;
}
