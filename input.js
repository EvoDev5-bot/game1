export class Input {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      if (
        e.key == "ArrowDown" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight" ||
        e.key == "Enter" ||
        e.key == "Escape"
      ) {
        if (!this.keys.includes(e.key)) this.keys.push(e.key);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (
        e.key == "ArrowDown" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight" ||
        e.key == "Enter" ||
        e.key == "Escape"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
