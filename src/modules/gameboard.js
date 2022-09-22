import Ship from './ship';

export default class Gameboard {
    
    static #GRID_SIZE = 8;

    #owner
    #ships = [];
    #grid = [];

    // add jsdoc for player class
    constructor() {
        this.#generate()
    }

    /**
     * Generate Gameboard grid of a #GRID_SIZE size.
     */
    #generate() {
        this.#grid.length = 0;
        for (let i = 0; i < Gameboard.#GRID_SIZE; i++) {
            this.#grid.push([]);
            for (let j = 0; j < Gameboard.#GRID_SIZE; j++)
                this.#grid[i].push({ ship: null, marked: false });
        }
    }

    /**
     * Add a ship on the Gameboard.
     * @param {Ship} ship Ship to add.
     * @param {*} x X of ship origin position.
     * @param {*} y Y of ship origin position.
     * @param {*} rotate If ship is rotated (true) it will be position along the vertical axis. If it's not (false) it will be layed horizontal.
     */
    addShip(ship, x, y, rotate = false) {
        if (x < 0 || y < 0 || x >= Gameboard.#GRID_SIZE - (rotate ? ship.getLength() - 1 : 0) ||
            y >= Gameboard.#GRID_SIZE - (rotate ? 0 : ship.getLength() - 1))
            throw new Error('Tring to add a ship out of gameboard bounds.');
        
        let isOccupied = false;
        for (let i = 0; i < ship.getLength(); i++)
            if (this.#grid[rotate ? x + i : 0][rotate ? 0 : y + i].ship)
                isOccupied = true;
        
        if (isOccupied)
            throw new Error('Tring to add a ship on top of another one.');
        
        this.#ships.push(ship);

        for (let i = 0; i < ship.getLength(); i++)
            this.#grid[rotate ? x + i : 0][rotate ? 0 : y + i].ship = ship;
    }
}