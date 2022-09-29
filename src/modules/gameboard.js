import Grid from './grid.js';
import Ship from './ship.js';

export default class Gameboard {

    static #GRID_SIZE = 8;

    #ships = [];
    #grid = [];

    constructor() {
        this.#grid = new Grid(Gameboard.#GRID_SIZE, { ship: null, marked: false });
    }

    /**
     * Add a Ship with an origin on a given position.
     * @param {Ship} ship Ship to add.
     * @param {number} x Horizontal position.
     * @param {number} y Vertical position.
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
     * Hit a spot on a grid.
     * @param {number} x Horizontal position.
     * @param {number} y Vertical position.
     */
    recieveAttack(x, y) {
        if (this.isCellMarked(x, y))
            return;

        this.#grid.setMarked(x, y);
        
        const ship = this.getShipInCell(x, y);
        if (ship)
            ship.hit();
    }

    /**
     * Returns a ship on given coordinates.
     * @param {number} x Horizontal position.
     * @param {number} y Vertical position.
     * @returns {Ship} 
     */
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

    /**
     * Returns true if selected spot is marked.
     * @param {number} x Horizontal position.
     * @param {number} y Vertical position
     * @returns {boolean}
     */
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

    print(hide = false) {
        this.#grid.print(hide);
    }
}