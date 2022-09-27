export default class Ship {    
    #name
    #maxHits
    #currentHits

    /**
     * @param {string} name Will be used in game messages.
     * @param {number} health Can be in range of 1 to 5. It's also length of the ship.
     */
    constructor(name, health) {
        this.#name = name.toLowerCase();
        this.#currentHits = 0;
        this.#maxHits = Math.min(Math.max(health, 1), 5); // This Math mess just clamp health to 1..5
    }

    /**
     * Returns ship name.
     * @returns {string}
     */
    getName() {
        return this.#name;
    }

    /**
     * Returns the length of the ship.
     * @returns {number}
     */
    getLength() {
        return this.#maxHits;
    }

    /**
     * Hits the ship.
     */
    hit() {       
        if (this.isSunk())
            return;
        
        this.#currentHits += 1;
    }

    /**
     * Is the ship sunk?
     * @returns {boolean}
     */
    isSunk() {
        return this.#currentHits === this.#maxHits;
    }
}
