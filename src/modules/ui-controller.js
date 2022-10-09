import DragManager from './drag-manager.js';
import GameController from './game-controller.js';
import Gameboard from './gameboard.js';

export default class UiController {
    #prepareScreen = document.querySelector('#prepare-screen');
    #prepareBoard = document.querySelector('#prepare-board');
    #tray = document.querySelector('#ships-tray');
    #trayElements = document.querySelectorAll('.tray-element');
    #startButton = document.querySelector('#start-game');

    #blur = document.querySelector('#blur');
    #victoryScreen = document.querySelector('#victory-screen');
    #victoryTitle = document.querySelector('#victory-title');
    #victoryArt = document.querySelector('#victory-art');

    #gameElement = document.querySelector('#game');
    #playerBoard = document.querySelector('#player');
    #aiBoard = document.querySelector('#ai');

    #active = false; // is game still on?

    game = new GameController();
    dm = new DragManager(this.game.players[0].gameboard);

    constructor() {
        this.#gameElement.style.display = 'none';
        this.#blur.style.display = 'none';
        this.#victoryScreen.style.display = 'none';
        this.generateGrid(this.#playerBoard);
        this.generateGrid(this.#aiBoard);
        this.generateGrid(this.#prepareBoard);

        this.connectEvents();
    }

    start() {
        if (this.#tray.children.length !== 0) return;
        this.#prepareScreen.style.display = 'none';
        this.updateGrid(this.#playerBoard, this.game.players[0].gameboard, false);
        this.updateGrid(this.#aiBoard, this.game.players[1].gameboard, true);
        this.#active = true;
        this.#gameElement.style.display = 'flex';
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
        this.game.playRound(e.target.dataset.x, e.target.dataset.y);
        this.updateGrid(this.#playerBoard, this.game.players[0].gameboard, false);
        this.updateGrid(this.#aiBoard, this.game.players[1].gameboard, true);

        // Check for win
        if (this.game.isWin()) {
            this.win();
        }
    }

    win() {
        const winner = this.game.getWinner();
        this.#active = false;
        this.#blur.style.display = 'block';
        this.#victoryScreen.style.display = 'block';

        this.#victoryTitle.textContent = winner.name + ' wins!';
        this.#victoryArt.src = winner.name === 'Player' ? "./static/images/victory art.svg" : "./static/images/lose art.svg"
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
    
    connectEvents() {
        document.addEventListener("contextmenu", e => e.preventDefault());
        document.addEventListener('keypress', e => this.dm.onKeyPressed(e));
        document.addEventListener('mousemove', e => this.dm.onMouseMove(e));
        document.addEventListener('mousedown', e => this.dm.onMouseClick(e));
        this.#trayElements.forEach(v => v.addEventListener('click', e => this.dm.onShipSelect(e)));
        this.#startButton.addEventListener('click', e => { this.start() });
    }

}