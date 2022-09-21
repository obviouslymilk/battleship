import Vector from "./vector";

export default class Ship {
    
    #name
    #origin
    #hitpoints

    /**
     * 
     * @param {string} name Will be used in game messages.
     * @param {Vector} origin Origin of the ship on a gameboard.
     * @param {number} length Ship length. Minimum: 1, Maximum: 5.
     */
    constructor(name = "ship", origin = null, length = 1) {
        this.#name = name.toLowerCase();
        this.#origin = origin;
        this.#hitpoints = Array(Math.min(Math.max(length, 1), 5)).fill(false); // This Math mess just clamp length between 1 and 5.
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    /**
     * @returns {Vector}
     */
    getOrigin() {
        return this.#origin;
    }

    /**
     * Hit a ship in one of its parts.
     * @param {number} position Where ship will get hit. Starts from 0 and can't be bigger than ship length - 1.
     */
    hit(position) {
        if (position < 0 || position >= this.#hitpoints.length)
            return;
        
        this.#hitpoints[position] = true;
    }

    /**
     * Returns true if ship is sunk and false if it's not.
     * @returns {boolean}
     */
    isSunk() {
        return this.#hitpoints.every(point => point === true);
    }
}
