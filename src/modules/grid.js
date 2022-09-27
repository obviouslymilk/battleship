import Ship from "./ship.js";

export default class Grid {
    #array = [];

    constructor(size = 8) {
        this.#array.length = 0;
        for (let i = 0; i < size; i++) {
            this.#array.push([]);
            for (let j = 0; j < size; j++)
                this.#array[i].push({ship : null, marked : null});
        }
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {any} data 
     */
    setMarked(x, y) {
        this.#array[x][y].marked = true;
    }

    /**
     * Returns true if spot is marked and false if it is not.
     * @param {number} x Vertical position of marked spot.
     * @param {number} y Horizontal position of marked spot.
     * @returns {boolean} is spot marked or not.
     */
    getMarked(x, y) {
        return this.#array[x][y].marked;
    }

    /**
     * Add a ship.
     * @param {Ship} ship Ship to add.
     * @param {number} x Vertical position.
     * @param {number} y Horizontal position
     */
    addShip(ship, x, y) {
        this.#array[x][y].ship = ship;
    }

    /**
     * Returns a ship on given coordinates.
     * @param {number} x Vertical position
     * @param {number} y Horizontal position
     * @returns {Ship} 
     */
    getShip(x, y) {
        return this.#array[x][y].ship;
    }
}