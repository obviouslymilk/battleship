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
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    getMarked(x, y) {
        return this.#array[x][y].marked;
    }

    /**
     * @param {Ship} ship
     * @param {number} x
     * @param {number} y
     */
    addShip(ship, x, y) {
        this.#array[x][y].ship = ship;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Ship} 
     */
    getShip(x, y) {
        return this.#array[x][y].ship;
    }

    print(hide = false) {
        const arrayToPrint = this.#array.map((row) => row.map((cell) => {
            if (cell.ship && cell.marked)
                return '🔥'
            if (cell.ship && !cell.marked && !hide)
                return '⬜️'
            if (!cell.ship && cell.marked) 
                return '💦'
            
            return '🌊'
        }).join(''))
        console.log(arrayToPrint);
    }
}