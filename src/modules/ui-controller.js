import GameController from './game-controller.js';
import Gameboard from './gameboard.js';

export default class UiController {
    
    #playerBoard = document.querySelector('#player');
    #ai = document.querySelector('#ai');

    #active = false; // is game still on?

    #game = new GameController();

    constructor() {
        this.generateGrid(this.#playerBoard);
        this.generateGrid(this.#ai);
        this.updateGrid(this.#playerBoard, this.#game.players[0].gameboard, false);
        this.updateGrid(this.#ai, this.#game.players[1].gameboard, true);
        this.#active = true;
    }

    cell(x, y) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

        cell.addEventListener('click', e => this.takeTurn(e));
    
        return cell;       
    }

    takeTurn(e) {
        if (!this.#active)
            return;
        if (e.target.parentNode.id === 'player' || e.target.classList.contains('marked'))
            return;
        this.#game.playRound(e.target.dataset.x, e.target.dataset.y);
        this.updateGrid(this.#playerBoard, this.#game.players[0].gameboard, false);
        this.updateGrid(this.#ai, this.#game.players[1].gameboard, true);

        // Check for win
        if (this.#game.isWin()) {
            const winner = this.#game.getWinner();
            this.#active = false;
            console.log(`${winner.name} is the winner!`);
        }
    }

    generateGrid(boardElement) {
        boardElement.innerHTML = '';
        for (let i = 0; i < Gameboard.GRID_SIZE; i++) {
            for (let j = 0; j < Gameboard.GRID_SIZE; j++) {
                boardElement.appendChild(this.cell(i, j));
            }
        }
    }

    updateGrid(boardElement, gameboard, hide = false) {
        for (let i = 0; i < Gameboard.GRID_SIZE; i++) {
            for (let j = 0; j < Gameboard.GRID_SIZE; j++) {
                const cell = document.querySelector(`#${boardElement.id} > .cell[data-x="${i}"][data-y="${j}"]`);
                // fetch marked
                const isMarked = gameboard.isCellMarked(i, j);
                if (isMarked)
                    cell.classList.add('marked');
                
                const ship = gameboard.getShipInCell(i, j);
                if (ship && (!hide || isMarked)) {
                    cell.classList.add('ship');

                    if (ship.isSunk())
                        cell.classList.add('sunk');
                }
            }
        }
    }

}