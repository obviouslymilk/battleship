import Ship from './ship';

export default class Gameboard {
    
    static #GRID_SIZE = 8;

    /**
     * 
     */
    #owner
    /**
     * @type {Ship[]}
     */
    #ships
    /**
     * @type {Object[][]}
     */
    #grid

    // add jsdoc for player class
    constructor(player) {
        this.generate()
    }

    /**
     * Generate Gameboard grid of a #GRID_SIZE size.
     */
    generate() {
        this.#grid.length = 0;
        for (let i = 0; i < Gameboard.#GRID_SIZE; i++) {
            this.#grid.push([]);
            for (let j = 0; j < Gameboard.#GRID_SIZE; j++)
                this.#grid[i].push({ ship: null, marked: false });
        }
    }
}