import Gameboard from './gameboard.js';
import Ship from './ship.js';

export default class DragManager {
    
    currentDraggable = null;
    currentCell = null;
    rotate = true;

    #gameboard = null;

    constructor(gameboard) {
        this.#gameboard = gameboard;
    }

    onKeyPressed(e) {
        if (e.code === 'KeyR') {
            this.rotate = !this.rotate;
            this.#update();
            this.#showPlace(this.currentCell);
        }
    }

    onShipSelect(e) {
        this.currentDraggable = e.target;
    }

    onMouseClick(e) {
        if (e.button === 2) {
            this.currentDraggable = null;
            this.#update();
        }

        if (!this.currentDraggable) return;
        const cell = e.target.closest('.cell');
        if (!cell) return;

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const name = this.currentDraggable.dataset.name;
        const length = parseInt(this.currentDraggable.dataset.length);

        if (!this.#canBePlaced(x, y, length)) return;

        this.#gameboard.addShip(new Ship(name, length), x, y, this.rotate);
        this.currentDraggable.remove();
        this.currentDraggable = null;
        this.#update();
    }

    onMouseMove(e) {
        this.#update();
        if (!this.currentDraggable)
            return;
        
        const cell = e.target.closest('.cell');
        if (!cell) return;
        if (this.currentCell !== cell) this.currentCell = cell;
        this.#showPlace(this.currentCell);
    }

    #canBePlaced(x, y, length) {
        if (x > Gameboard.GRID_SIZE - (this.rotate ? 1 : length) || y > Gameboard.GRID_SIZE - (this.rotate ? length : 1) || x < 0 || y < 0)
            return false;
        let isFree = true;
        for (let i = 0; i < length; i++) {
            if (this.#getCell(this.rotate ? x : x + i, this.rotate ? y + i : y).classList.contains('ship'))
                isFree = false;
        }
        return isFree;
    }

    #colorCells(x, y, length, classToColor) {
        for (let i = 0; i < length; i++) {
            const cell = this.#getCell(this.rotate ? x : x + i, this.rotate ? y + i : y)
            if (cell)
                this.#getCell(this.rotate ? x : x + i, this.rotate ? y + i : y).classList.add(classToColor);
        }
    }

    #showPlace(cell) {
        if (!this.currentDraggable) return;
        const length = this.currentDraggable.dataset.length;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const name = this.currentDraggable.dataset.name;
        if (this.#canBePlaced(x, y, length)) {
            this.#colorCells(x, y, length, 'can-place');
        } else {
            this.#colorCells(x, y, length, 'cant-place');
        }
    }

    #update() {
        document.querySelectorAll('#prepare-board > .cell').forEach(cell => {       
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            const ship = this.#gameboard.getShipInCell(x, y);
            cell.className = 'cell';
            if (ship)
                cell.classList.add('ship');
        });
    }

    #getCell(x, y) {
        return document.querySelector(`#prepare-board > .cell[data-x="${x}"][data-y="${y}"]`);
    }
}