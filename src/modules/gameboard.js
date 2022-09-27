import Grid from './grid.js';
import Ship from './ship.js';
import Player from './player.js';

export default class Gameboard {

    static #GRID_SIZE = 8;

    #owner;
    #ships = [];
    #grid;

    constructor() {
        this.#grid = new Grid(Gameboard.#GRID_SIZE, { ship: null, marked: false });
    }

    /**
     * Add a Ship with origin on a current position.
     * @param {Ship} ship Ship to add.
     * @param {number} x Vertical position of a ship.
     * @param {number} y Horizontal position of a ship.
     * @param {boolean} rotate Is ship rotated (placed horizontal) or not (place vertical).
     */
    addShip(ship, x, y, rotate = false) {
        if (!(ship instanceof Ship))
            throw new Error(`addShip() expected instance of Ship, got ${ship.constructor.name}`);
        if ( x > Gameboard.#GRID_SIZE - (rotate ? 1 : ship.getLength()) || y > Gameboard.#GRID_SIZE - (rotate ? ship.getLength() : 1) || x < 0 || y < 0)
            throw new Error('addShip() coordinates are out of bounds.');
        
        let isOccupied = false;
        for (let i = 0; i < ship.getLength(); i++)
            if (this.getShipInCell(rotate ? x : x + i, rotate ? y + i : y))
                isOccupied = true;
        if (isOccupied)
            throw new Error('addShip() cannot add a ship on occupied space(s).');
        
        this.#ships.push(ship);
        for (let i = 0; i < ship.getLength(); i++)
            this.#grid.addShip(ship, rotate ? x : x + i, rotate ? y + i : y);
    }

    /**
     * Assign a player as an owner of this gameboard.
     * @param {Player} player 
     */
    assignOwner(player) {
        this.#owner = player;
    }

    /**
     * Returns true if given player is the owner and false if they are not.
     * @param {Player} player Player to check.
     * @returns {boolean} Is this player an owner of the gameboard
     */
    isOwner(player) {
        return this.#owner === player;
    }

    /**
     * Hit a spot on a grid.
     * @param {number} x Vertical position of a hit.
     * @param {number} y Horizontal position of a hit.
     */
    recieveAttack(x, y) {
        if (this.isCellMarked(x, y))
            return;

        this.#grid.setMarked(x, y);
        
        const ship = this.getShipInCell(x, y);
        if (ship)
            ship.hit();
    }

    getShipInCell(x, y) {
        return this.#grid.getShip(x, y);
    }

    /**
     * Returns gameboard grid.
     * @returns {Array.<Array>}
     */
    getGrid() {
        return this.#grid;
    }

    isCellMarked(x, y) {
        return this.#grid.getMarked(x, y);
    }

    /**
     * Returns true if all ships of the gameboard are sunk.
     * @returns {boolean}
     */
    isAllSunk() {
        return this.#ships.every(s => s.isSunk() === true);
    }
}