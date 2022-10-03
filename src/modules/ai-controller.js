export default class AiController {

    #moves = new Set();

    constructor() {
        this.#generateMoves();
    }

    #generateMoves() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++)
                this.#moves.add([i, j]);
        }
    }

    getRandomMove() {
        let move = [...this.#moves][Math.floor(Math.random() * this.#moves.size)]
        this.#moves.delete(move);
        return move;
    }

}