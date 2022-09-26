import Gameboard from './gameboard'

export default class Player {

    #gameboard;

    constructor() {
        
    }

    assignGameboard(gameboard) {
        if (!(gameboard instanceof Gameboard))
            throw new Error('gameboard is not an instance of Gameboard');
        
        this.#gameboard = gameboard;
    }

    isOwnerOf(gameboard) {
        return gameboard === this.#gameboard;
    }

}