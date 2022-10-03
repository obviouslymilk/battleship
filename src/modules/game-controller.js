import AiController from './ai-controller.js';
import Gameboard from './gameboard.js'
import Ship from './ship.js';

export default class GameController {
    #aiController = new AiController();
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
        // Player's fake ships
        this.#players[0].gameboard.addShip(new Ship('Big', 5), 1, 0);
        this.#players[0].gameboard.addShip(new Ship('Big', 4), 0, 2, true);
        this.#players[0].gameboard.addShip(new Ship('Big', 3), 3, 4, false);
        this.#players[0].gameboard.addShip(new Ship('Big', 3), 3, 2, false);
        this.#players[0].gameboard.addShip(new Ship('Big', 2), 7, 6, true);
        // AI's fake ships
        this.#players[1].gameboard.addShip(new Ship('Big', 3), 3, 2, false);
        this.#players[1].gameboard.addShip(new Ship('Big', 2), 7, 6, true);
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
        this.#switchPlayer(); // Need to make it at the beginning to preven clicking spam.
        this.#players[1].gameboard.recieveAttack(x, y);

        let aiMove = this.#aiController.getRandomMove();
        this.#players[0].gameboard.recieveAttack(aiMove[0], aiMove[1]);

        this.#printPlayer(this.#players[0], false);
        this.#printPlayer(this.#players[1], false); // DONT FORGET TO HIDE LATER

        this.#switchPlayer();
    }
}