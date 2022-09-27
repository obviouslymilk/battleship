export default class Player {

    #name
    #isAi

    constructor(name, isAi = false) {
        this.#name = name;
        this.#isAi = isAi;
    }

}