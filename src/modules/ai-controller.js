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

    placeShip(ship, gameboard) {
        const isRotated = Math.random() < 0.5;
        const spot = this.findSpotToPlace(gameboard, ship.getLength(), isRotated);
        gameboard.addShip(ship, spot.x, spot.y, isRotated);
    }

    findSpotToPlace(gameboard, length, rotate) {
        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * 8);
        while (gameboard.isOccupied(x, y, length, rotate)) {
            x = Math.floor(Math.random() * 8);
            y = Math.floor(Math.random() * 8);            
        }
        return { x, y };
    }
}