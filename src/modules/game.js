import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

export const players = {
    player: null,
    ai: null
}

export const gameboard = {
    player: null,
    ai: null
}
let currentPlayer = null;

export function init() {
    players.player = new Player('Player');
    players.ai = new Player('AI');

    gameboard.player = new Gameboard();
    gameboard.player.assignOwner(players.player);

    gameboard.ai = new Gameboard();
    gameboard.ai.assignOwner(players.ai);

    //manula ships
    gameboard.player.addShip(new Ship('ship', 3), 1, 2);
    gameboard.ai.addShip(new Ship('ship', 2), 0, 0, true);

    currentPlayer = players.player;
}

function changeCurrentPlayer() {
    if (currentPlayer === players.player) {
        currentPlayer = players.ai;
        makeAiTurn();
    }
    else
        currentPlayer = players.player;
}

export function makePlayerTurn(x, y) {
    gameboard.player.recieveAttack(x, y);
    changeCurrentPlayer();
}

function makeAiTurn() {
    console.log('ai!');
}