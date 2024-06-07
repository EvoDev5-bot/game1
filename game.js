import { Background } from "./background.js";
import { Input } from "./input.js";
import { Player } from "./player.js";
import { FlyingEnemy, GroundEnemy } from "./enemy.js";
import { displayStatusText } from "./utils.js";
import { DeviceOrientation } from "./mobileSupport.js";

export class Game {
  constructor() {
    this.lastTime = 0;
    this.canvas = canvas;
    if (window.innerWidth >= 1536) {
      this.canvas.width = 1666;
    } else {
      alert("hi");
      this.canvas.width = window.innerWidth;
    }
    this.canvas.height = 500;

    this.ctx = this.canvas.getContext("2d");
    this.input = new Input();
    this.groundLevel = 85;
    this.player = new Player(this);
    this.gameSpeed = 0.4;
    this.background = new Background(this.gameSpeed);
    this.debug = true;
    this.enemies = [];
    this.enemyFrameCounter = 0;
    this.enemyInterval = Math.random() * 1000 + 2000;
    this.flyEnemyFrameCounter = 0;
    this.flyEnemyInterval = Math.random() * 500 + 2000;
    this.explosions = [];
    this.currentTimestamp = 0;
    this.gameOver = false;
    this.deviceOrientation = new DeviceOrientation(this);
  }
  update(timestamp) {
    this.currentTimestamp = timestamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const deltatime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.background.setSpeed(this.gameSpeed);

    if (deltatime <= 0) this.enemies.push(new GroundEnemy(this));

    if (this.gameSpeed > 0) this.enemyFrameCounter += deltatime;
    if (this.enemyFrameCounter >= this.enemyInterval) {
      this.enemyFrameCounter -= this.enemyInterval;
      this.enemies.push(new GroundEnemy(this));
      this.enemyInterval = Math.random() * 1000 + 1000;
    }

    this.flyEnemyFrameCounter += deltatime;
    if (this.flyEnemyFrameCounter >= this.flyEnemyInterval) {
      this.flyEnemyFrameCounter -= this.flyEnemyInterval;
      this.enemies.push(new FlyingEnemy(this));
      this.flyEnemyInterval = Math.random() * 500 + 200;
    }

    this.enemies.forEach((enemy, index, array) => {
      if (enemy.markedForDeletion) {
        array.splice(index, 1);
      }
    });

    const everything = [
      this.background,
      this.player,
      ...this.enemies,
      ...this.explosions,
    ];

    everything.forEach((obj) => {
      obj.update(deltatime);
      obj.draw(this.ctx);
    });

    displayStatusText(this);
  }
  draw() {}
}
