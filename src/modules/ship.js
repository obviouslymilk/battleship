export default class Ship {
    
    #name
    #maxHits
    #currentHits

    /**
     * @param {string} name Will be used in game messages.
     * @param {number} health Can be in range of 1 to 5. How many hits needed to sunk this ship. It's also the length of a ship.
     */
    constructor(name, health) {
        this.#name = name.toLowerCase();
        this.#currentHits = 0;
        this.#maxHits = Math.min(Math.max(health, 1), 5); // This Math mess just clamp health to 1..5
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
