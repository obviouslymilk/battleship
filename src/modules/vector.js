export default class Vector {

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculate distance between origin of this vector and point on x and y cooridnates. Will be used to calculate hit position on a ship object.
     * @param {number} x 
     * @param {number} y 
     * @returns {number}
     */
    calculateDistance(x, y) {
        return Math.sqrt(Math.abs(this.y - y) ** 2 + Math.abs(this.x - x) ** 2);
    }
}