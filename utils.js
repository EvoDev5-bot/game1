export function displayStatusText(game) {
  game.ctx.font = "30px Creepster";

  game.ctx.fillStyle = "gray";
  game.ctx.fillText(`Score: ${game.player.score}`, 5, 30);
  game.ctx.fillText(`Lives: ${game.player.lives}`, 5, 70);
  game.ctx.fillText(`Energy: ${game.player.energy.toFixed(0)}`, 5, 110);
  game.ctx.fillText(
    `Time: ${(game.currentTimestamp / 1000).toFixed(1)}`,
    5,
    150
  );

  game.ctx.fillStyle = "black";
  game.ctx.fillText(`Score: ${game.player.score}`, 7, 32);
  game.ctx.fillText(`Lives: ${game.player.lives}`, 7, 72);
  game.ctx.fillText(`Energy: ${game.player.energy.toFixed(0)}`, 7, 112);
  game.ctx.fillText(
    `Time: ${(game.currentTimestamp / 1000).toFixed(1)}`,
    7,
    152
  );
}
