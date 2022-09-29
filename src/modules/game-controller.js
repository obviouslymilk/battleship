import Gameboard from './gameboard.js'
import Ship from './ship.js';

export default class GameController {
    #players = [
        {
            name: 'Player',
            gameboard: new Gameboard()  
        },
        {
            name: 'Computer',
            gameboard: new Gameboard()
        }
    ]
    #currentPlayer = this.#players[0];

    constructor() {
        // add ships to gameboards
        this.#players[1].gameboard.addShip(new Ship('dude', 2), 1, 2);
        this.#players[1].gameboard.addShip(new Ship('dude', 2), 4, 1, true);
    }

    #switchPlayer() {
        this.#currentPlayer = this.#currentPlayer === this.#players[0] ? this.#players[1] : this.#players[0];
    }

    #printPlayer(player, hide = false) {
        console.log(`${player.name.toUpperCase()}'s BOARD.`);
        player.gameboard.print(hide);
        console.log('===========================')
    }

    getCurrentPlayer() {
        return this.#currentPlayer;
    }

    playRound(x = 0, y = 0) {
        this.#players[1].gameboard.recieveAttack(x, y);
        this.#printPlayer(this.#players[1], true);
    }
}