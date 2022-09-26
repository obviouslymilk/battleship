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

    addShip(ship, x, y) {
        this.#array[x][y].ship = ship;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {any} Data in a given cell.
     */
    getData(x, y) {
        return this.#array[x][y];
    }
}