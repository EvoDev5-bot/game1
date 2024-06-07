import { Game } from "./game.js";

window.addEventListener("load", function () {
  let game = new Game();

  function animate(timeStamp) {
    game.update(timeStamp);

    if (!game.gameOver) requestAnimationFrame(animate);
    else {
      game.ctx.font = "50px Creepster";
      game.ctx.fillStyle = "gray";
      game.ctx.textAlign = "center";
      game.ctx.fillText(
        `GAME OVER!`,
        game.canvas.width / 2,
        game.canvas.height / 2 - 60
      );

      game.ctx.fillText(
        `YOUR SCORE IS ${game.player.score} AFTER PLAYING FOR ${(
          game.currentTimestamp / 1000
        ).toFixed(1)} SECONDS`,
        game.canvas.width / 2,
        game.canvas.height / 2
      );

      game.ctx.fillText(
        `PRESS ENTER TO RESTART`,
        game.canvas.width / 2,
        game.canvas.height / 2 + 60
      );
      game.ctx.fillStyle = "black";

      game.ctx.fillText(
        `GAME OVER!`,
        game.canvas.width / 2 + 2,
        game.canvas.height / 2 - 58
      );

      game.ctx.fillText(
        `YOUR SCORE IS ${game.player.score} AFTER PLAYING FOR ${(
          game.currentTimestamp / 1000
        ).toFixed(1)} SECONDS`,
        game.canvas.width / 2 + 2,
        game.canvas.height / 2 + 2
      );

      game.ctx.fillText(
        `PRESS ENTER TO RESTART`,
        game.canvas.width / 2 + 2,
        game.canvas.height / 2 + 62
      );
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && game.gameOver) location.reload();
  });

  animate(0);
});
