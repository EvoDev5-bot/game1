export function displayStatusText(game) {
  game.ctx.font = "30px Creepster";

  game.ctx.fillStyle = "gray";
  game.ctx.fillText(`Score: ${game.player.score}`, 5, 70);
  game.ctx.fillText(`Energy: ${game.player.energy.toFixed(0)}`, 5, 110);
  game.ctx.fillText(
    `Time: ${(game.currentTimestamp / 1000).toFixed(1)}`,
    5,
    150
  );

  game.ctx.fillStyle = "black";
  game.ctx.fillText(`Score: ${game.player.score}`, 7, 72);
  game.ctx.fillText(`Energy: ${game.player.energy.toFixed(0)}`, 7, 112);
  game.ctx.fillText(
    `Time: ${(game.currentTimestamp / 1000).toFixed(1)}`,
    7,
    152
  );
  Array(game.player.lives)
    .fill()
    .forEach((_, i) => {
      game.ctx.drawImage(heart, i * 40 + 5, 5, 35, 35);
    });
}
