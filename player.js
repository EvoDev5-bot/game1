import { Explosion } from "./explosion.js";
import { Dust, Fire, FireDive } from "./particle.js";
import {
  Diving,
  Dizzy,
  Falling,
  Hit,
  Jumping,
  Rolling,
  Running,
  Sitting,
} from "./states.js";

export class Player {
  constructor(game) {
    this.hitEnemy = null;
    this.image = dog;
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.canvas.height - this.height - this.game.groundLevel;
    this.frameX = 0;
    this.frameY = 3;
    this.maxFrame = 8;
    this.vx = 0;
    this.vy = 0;
    this.weight = 0.1;
    this.fps = 20;
    this.frameCounter = 0;
    this.frameInterval = 1000 / this.fps;
    this.states = [
      new Running(this),
      new Jumping(this),
      new Falling(this),
      new Sitting(this),
      new Rolling(this),
      new Hit(this),
      new Dizzy(this),
      new Diving(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.particles = [];
    this.particleCounter = 0;
    this.particleInterval = this.game.gameSpeed * 100;
    this.score = 0;
    this.lives = 20;
    this.energy = 20;
    this.rollingCounter = 0;
    this.rollingInterval = 7000;
  }
  update(deltatime) {
    if (this.currentState.state == "ROLLING") this.rollingCounter += deltatime;
    if (this.rollingCounter >= this.rollingInterval) {
      this.rollingCounter = 0;
      this.setState(0, 0.4);
    }
    if (this.currentState.state != "ROLLING")
      this.energy += this.game.gameSpeed * 0.003 * deltatime;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.canvas.width - this.width)
      this.x = this.game.canvas.width - this.width;

    if (
      this.currentState.state != "ROLLING" &&
      this.currentState.state != "DIVING" &&
      this.onGround() &&
      this.game.gameSpeed > 0
    ) {
      this.particles.push(
        new Dust(this.x + this.width / 2 + 15, this.y + this.height - 3)
      );
    }

    if (this.currentState.state == "ROLLING") {
      this.particles.push(
        new Fire(this.x + this.width / 2 + 15, this.y + this.height - 50)
      );
    }

    if (this.currentState.state == "DIVING") {
      this.particles.push(new FireDive(this.x + this.width / 2, this.y));
      this.particles.push(new FireDive(this.x + this.width / 2, this.y));
      this.particles.push(new FireDive(this.x + this.width / 2, this.y));
      this.particles.push(new FireDive(this.x + this.width / 2, this.y));
      this.particles.push(new FireDive(this.x + this.width / 2, this.y));
    }

    if (!this.onGround()) this.vy += this.weight;
    if (this.onGround()) {
      this.vy = 0;
      this.y = this.game.canvas.height - this.height - this.game.groundLevel;
    }
    this.frameCounter += deltatime;

    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter -= this.frameInterval;
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
    }

    this.currentState.handleInput(this.game.input.keys);

    this.x += this.vx * deltatime;
    this.y += this.vy * deltatime;

    this.particles.forEach((particle) => {
      particle.update(deltatime, this.game.gameSpeed);
    });

    this.particles.forEach((particle, index, array) => {
      if (particle.markedForDeletion) {
        array.splice(index, 1);
      }
    });

    this.game.enemies.forEach((enemy) => {
      if (
        this.currentState.state == "HIT" ||
        this.currentState.state == "DIZZY"
      )
        return;
      else {
        if (
          this.x + this.width < enemy.x ||
          this.x > enemy.x + enemy.width ||
          this.y > enemy.y + enemy.height ||
          this.y + this.height < enemy.y
        ) {
        } else {
          if (
            this.currentState.state == "ROLLING" ||
            this.currentState.state == "DIVING"
          ) {
            enemy.markedForDeletion = true;
            this.game.explosions.push(
              new Explosion(enemy.x - enemy.width, enemy.y)
            );
            this.score++;
          } else {
            if (!enemy.markedForDeletion) {
              this.setState(5, 0);
              this.hitEnemy = enemy;
              this.lives--;
              if (this.lives <= 0) this.game.gameOver = true;
            }
          }
        }
      }
    });
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.particles.forEach((particle) => {
      particle.draw(ctx);
    });
  }
  setState(state, speed) {
    this.currentState = this.states[state];
    this.currentState.enter();
    this.game.gameSpeed = speed;
  }
  onGround() {
    return (
      this.y >= this.game.canvas.height - this.height - this.game.groundLevel
    );
  }
}
