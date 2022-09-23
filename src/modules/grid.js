export default class Grid {
    #array = [];

    constructor(size = 8, defaultElement = null) {
        this.#array.length = 0;
        for (let i = 0; i <= size; i++) {
            this.#array.push([]);
            for (let j = 0; j <= size; j++)
                this.#array[i].push(defaultElement);
        }
    }

    getData(x, y) {
        return this.#array[x][y]
    }
}