import AiController from './ai-controller.js';
import Gameboard from './gameboard.js'
import Ship from './ship.js';

export default class GameController {
    #aiController = new AiController();
    players = [
        {
            name: 'Player',
            gameboard: new Gameboard()  
        },
        {
            name: 'Computer',
            gameboard: new Gameboard()
        }
    ]
    #currentPlayer = this.players[0];

    constructor() {
        // AI's fake ships
        this.#aiController.placeShip(new Ship('Carrier', 5), this.players[1].gameboard);
        this.#aiController.placeShip(new Ship('Battleship', 4), this.players[1].gameboard);
        this.#aiController.placeShip(new Ship('Cruiser', 3), this.players[1].gameboard);
        this.#aiController.placeShip(new Ship('Submarine', 3), this.players[1].gameboard);
        this.#aiController.placeShip(new Ship('Destroyer', 2), this.players[1].gameboard);
    }

    /**
     * Switch players.
     */
    #switchPlayer() {
        this.#currentPlayer = this.#currentPlayer === this.players[0] ? this.players[1] : this.players[0];
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

    isWin() {
        return this.players[0].gameboard.isAllSunk() || this.players[1].gameboard.isAllSunk();
    }

    getWinner() {
        if (this.players[0].gameboard.isAllSunk())
            return this.players[1];
        if (this.players[1].gameboard.isAllSunk())
            return this.players[0];
        
        return null;
    }

    /**
     * Play full round of the game: player's hit and AI's hit.
     * @param {number} x Vertical position of player's hit.
     * @param {number} y Horizontal position of player's hit.
     */
    playRound(x = 0, y = 0) {
        this.#switchPlayer(); // Need to make it at the beginning to preven clicking spam.
        this.players[1].gameboard.recieveAttack(x, y);

        let aiMove = this.#aiController.getRandomMove();
        this.players[0].gameboard.recieveAttack(aiMove[0], aiMove[1]);

        // this.#printPlayer(this.players[0], false);
        // this.#printPlayer(this.players[1], false); // DONT FORGET TO HIDE LATER

        this.#switchPlayer();
    }
}