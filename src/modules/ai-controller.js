export default class AiController {

    #movesLeft = [];

    constructor() {
        // generate moves array;
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 8; j++)
                this.#movesLeft.push([i, j]);
    }

    removeMove() {

    }

    getRandomMove() {

    }

}