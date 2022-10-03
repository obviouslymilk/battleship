import Ship from './ship.js';
import Gameboard from './gameboard.js';
export default class AiController {

    #moves = new Set();

    constructor() {
        this.#generateMoves();
    }

    #generateMoves() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++)
                this.#moves.add([i, j]);
        }
    }

    /**
     * Returns free space to hit.
     * @returns {Array.<number>} Coordinates
     */
    getRandomMove() {
        let move = [...this.#moves][Math.floor(Math.random() * this.#moves.size)]
        this.#moves.delete(move);
        return move;
    }

    /**
     * Place a ship on a given gameboard. Function will select random coordinates and rotation.
     * @param {Ship} ship 
     * @param {Gameboard} gameboard 
     */
    placeShip(ship, gameboard) {
        const isRotated = Math.random() < 0.5;
        const spot = this.findSpotToPlace(gameboard, ship.getLength(), isRotated);
        gameboard.addShip(ship, spot.x, spot.y, isRotated);
    }

    /**
     * Find free space to place a ship on a gameboard.
     * @param {Gameobard} gameboard 
     * @param {number} length Ship length
     * @param {boolean} rotate Is ship rotated or not
     * @returns {Object.<number>}
     */
    findSpotToPlace(gameboard, length, rotate) {
        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * 8);
        while (gameboard.isOccupied(x, y, length, rotate)) {
            x = Math.floor(Math.random() * 8);
            y = Math.floor(Math.random() * 8);            
        }
        return { x, y };
    }
}