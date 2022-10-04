import GameController from './game-controller.js';
import Gameboard from './gameboard.js';

export default class UiController {
    
    #playerBoard = document.querySelector('#player');
    #ai = document.querySelector('#ai');

    #game = new GameController();

    constructor() {
        this.generateGrid(this.#playerBoard);
        this.generateGrid(this.#ai);
        this.updateGrid(this.#playerBoard, this.#game.players[0].gameboard, false);
        this.updateGrid(this.#ai, this.#game.players[1].gameboard, false);
    }

    cell(x, y) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

    
        return cell;       
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
                if (ship && !hide) {
                    cell.classList.add('ship');

                    if (ship.isSunk())
                        cell.classList.add('sunk');
                }
            }
        }
    }

}