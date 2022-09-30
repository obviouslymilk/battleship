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
        // add ships to player
        // add ships to ai
    }

    #switchPlayer() {
        this.#currentPlayer = this.#currentPlayer === this.#players[0] ? this.#players[1] : this.#players[0];
    }

    #printPlayer(player, hide = false) {
        console.log(`${player.name.toUpperCase()}'s BOARD.`);
        player.gameboard.print(hide);
    }

    getCurrentPlayer() {
        return this.#currentPlayer;
    }

    playRound(x = 0, y = 0) {
        this.#switchPlayer(); // Need to make it at a beginning to preven clicking spam.
        this.#players[1].gameboard.recieveAttack(x, y);
        this.#printPlayer(this.#players[0], true);
        this.#printPlayer(this.#players[1], true);
        // make ai move
        // check win conditions
        // switch player again
    }
}