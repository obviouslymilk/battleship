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

    /**
     * Switch players.
     */
    #switchPlayer() {
        this.#currentPlayer = this.#currentPlayer === this.#players[0] ? this.#players[1] : this.#players[0];
    }

    /**
     * Print player's information and gameboard in the console.
     * @param {Object} player Player object to print.
     * @param {boolean} hide Should ships be hidden or not.
     */
    #printPlayer(player, hide = false) {
        console.log(`${player.name.toUpperCase()}'s BOARD.`);
        player.gameboard.print(hide);
    }

    /**
     * Returns current player.
     * @returns {Object} Current player object.
     */
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