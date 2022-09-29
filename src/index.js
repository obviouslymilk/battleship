import GameController from "./modules/game-controller.js";

const game = new GameController();
game.playRound(1, 2);
window.game = game;