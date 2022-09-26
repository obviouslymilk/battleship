import Grid from './grid';
import Ship from './ship';

export default class Gameboard {

    static #GRID_SIZE = 8;

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
    addShip(ship, x, y, rotate) {
        if (!(ship instanceof Ship))
            throw new Error(`addShip() expected instance of Ship, got ${ship.constructor.name}`);
        if ( x > Gameboard.#GRID_SIZE - (rotate ? 1 : ship.getLength()) || y > Gameboard.#GRID_SIZE - (rotate ? ship.getLength() : 1) || x < 0 || y < 0)
            throw new Error('addShip() coordinates are out of bounds.');
        
        let isOccupied = false;
        for (let i = 0; i < ship.getLength(); i++)
            if (this.#getShipInCell(rotate ? x : x + i, rotate ? y + i : y))
                isOccupied = true;
        if (isOccupied)
            throw new Error('addShip() cannot add a ship on occupied space(s).');
        
        this.#ships.push(ship);
        for (let i = 0; i < ship.getLength(); i++)
            this.#grid.setData(rotate ? x : x + i, rotate ? y + i : y, { ship: ship, marked: false });
    }

    #getShipInCell(x, y) {
        return this.#grid.getData(x, y).ship;
    }

    #isCellMarked(x, y) {
        return this.#grid.getData(x, y).marked;
    }
}