export class Input {
  constructor(game) {
    this.keys = [];
    document.addEventListener("mousedown", (e) => {
      if (e.button == 0) {
        if (!this.keys.includes("Enter")) this.keys.push("Enter");
      }
    });
    document.addEventListener("mouseup", (e) => {
      if (e.button == 0) this.keys.splice(this.keys.indexOf("Enter"), 1);
    });
    document.addEventListener("keydown", (e) => {
      if (
        e.key == "ArrowDown" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight" ||
        e.key == "Escape"
      ) {
        if (!this.keys.includes(e.key)) this.keys.push(e.key);
      }

      if (e.code == "Space" && game.player.energy >= 5) {
        game.player.energy -= 5;
        game.player.lives++;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (
        e.key == "ArrowDown" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight" ||
        e.key == "Escape"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
