import { Explosion } from "./explosion.js";
import { splash } from "./particle.js";

const states = {
  RUNNING: 0,
  JUMPING: 1,
  FALLING: 2,
  SITTING: 3,
  ROLLING: 4,
  HIT: 5,
  DIZZY: 6,
  DIVING: 7,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 3;
    this.player.maxFrame = 8;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft")) {
      if (this.player.vx >= 0) this.player.vx -= 0.5;
    } else if (input.includes("ArrowRight")) {
      if (this.player.vx <= 0) this.player.vx += 0.5;
    } else this.player.vx = 0;
    if (input.includes("ArrowUp")) this.player.setState(states.JUMPING, 0.4);
    if (input.includes("ArrowDown")) this.player.setState(states.SITTING, 0);
    if (this.player.energy >= 7)
      if (input.includes("Enter")) this.player.setState(states.ROLLING, 0.7);
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 1;
    this.player.maxFrame = 6;
    this.player.vy -= 2;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft")) {
      if (this.player.vx >= 0) this.player.vx -= 0.5;
    } else if (input.includes("ArrowRight")) {
      if (this.player.vx <= 0) this.player.vx += 0.5;
    }
    if (this.player.vy >= 0) this.player.setState(states.FALLING, 0.4);
    if (this.player.energy >= 7)
      if (input.includes("Enter")) this.player.setState(states.ROLLING, 0.7);

    if (input.includes("ArrowDown")) this.player.setState(states.DIVING, 0.7);
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 2;
    this.player.maxFrame = 6;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft")) {
      if (this.player.vx >= 0) this.player.vx -= 0.5;
    } else if (input.includes("ArrowRight")) {
      if (this.player.vx <= 0) this.player.vx += 0.5;
    }
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 0.4);
    }
    if (this.player.energy >= 7)
      if (input.includes("Enter")) this.player.setState(states.ROLLING, 0.7);

    if (input.includes("ArrowDown")) this.player.setState(states.DIVING, 0.7);
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 5;
    this.player.maxFrame = 4;
    this.player.vx = 0;
  }
  handleInput(input) {
    if (!input.includes("ArrowDown")) this.player.setState(states.RUNNING, 0.4);
  }
}

export class Rolling extends State {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }
  enter() {
    this.player.energy -= 7;
    this.player.frameX = 0;
    this.player.frameY = 6;
    this.player.maxFrame = 6;
  }
  handleInput(input) {
    if (input.includes("ArrowLeft")) {
      if (this.player.vx >= 0) this.player.vx -= 0.5;
    } else if (input.includes("ArrowRight")) {
      if (this.player.vx <= 0) this.player.vx += 0.5;
    } else this.player.vx = 0;
    if (input.includes("ArrowUp") && this.player.onGround())
      this.player.vy -= 2;
    if (input.includes("Escape") && this.player.onGround())
      this.player.setState(states.RUNNING, 0.4);
  }
}

export class Hit extends State {
  constructor(player) {
    super("HIT");
    this.player = player;
  }
  enter() {
    this.player.vx = 0;
    this.player.frameX = 0;
    this.player.frameY = 9;
    this.player.maxFrame = 3;
    this.player.vy = 0;
  }
  handleInput(input) {
    if (this.player.frameX == this.player.maxFrame)
      this.player.setState(states.DIZZY, 0);
  }
}

export class Dizzy extends State {
  constructor(player) {
    super("DIZZY");
    this.player = player;
    this.counter = 0;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 4;
    this.player.maxFrame = 10;
    this.player.vx = 0;
  }
  handleInput(input) {
    if (this.player.frameX == 0) this.counter++;
    if (this.counter >= 5) {
      this.player.hitEnemy.markedForDeletion = true;
      this.player.game.explosions.push(
        new Explosion(
          this.player.hitEnemy.x - this.player.hitEnemy.width,
          this.player.hitEnemy.y
        )
      );
      this.player.setState(states.RUNNING, 0.4);
      this.counter = 0;
      this.player.hitEnemy = null;
    }
  }
}

export class Diving extends State {
  constructor(player) {
    super("DIVING");
    this.player = player;
  }
  enter() {
    this.player.frameX = 0;
    this.player.frameY = 6;
    this.player.maxFrame = 6;
    this.player.vx = 0;
    this.player.vy += 2;
  }
  handleInput(input) {
    if (this.player.onGround()) {
      const theParts = splash(
        this.player.x + this.player.width / 2,
        this.player.y + this.player.height
      );
      theParts.forEach((particle) => {
        this.player.particles.push(particle);
      });

      this.player.setState(states.RUNNING, 0.4);
    }
  }
}
