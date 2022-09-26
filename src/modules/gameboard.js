import Grid from './grid';
import Ship from './ship';

export default class Gameboard {

    static #GRID_SIZE = 8;

    #ships = [];
    #grid;

    constructor() {
        this.#grid = new Grid(Gameboard.#GRID_SIZE, { ship: null, marked: false });
    }

    addShip(ship, x, y, rotate) {
        if (!ship instanceof Ship)
            throw new Error(`addShip() expected instance of Ship, got ${ship.constructor.name}`);
        
        if ( x > Gameboard.#GRID_SIZE - (rotate ? 1 : ship.getLength()) || y > Gameboard.#GRID_SIZE - (rotate ? ship.getLength() : 1))
            throw new Error('addShip() coordinates are out of bounds.');
    }

    getShipInCell(x, y) {
        return this.#grid.getData(x, y).ship;
    }

    isCellMarked(x, y) {
        return this.#grid.getData(x, y).marked;
    }
}