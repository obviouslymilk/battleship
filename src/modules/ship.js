import Vector from "./vector";

export default class Ship {
    
    #name
    #maxHits
    #currentHits

    /**
     * @param {string} name Will be used in game messages.
     * @param {number} health How many hits needed to sunk this ship. It's also the length of a ship.
     */
    constructor(name = "ship", health) {
        this.#name = name.toLowerCase();
        this.#currentHits = 0;
        this.#maxHits = health;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    getLength() {
        return this.#maxHits;
    }

    /**
     * Hit a ship in one of its parts.
     * @param {number} position Where ship will get hit. Starts from 0 and can't be bigger than ship length - 1.
     */
    hit() {       
        if (this.isSunk()) // He is already dead!!!
            return;
        
        this.#currentHits += 1;
    }

    /**
     * Returns true if ship is sunk and false if it's not.
     * @returns {boolean}
     */
    isSunk() {
        return this.#currentHits === this.#maxHits;
    }
}
