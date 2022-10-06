import Gameboard from './gameboard.js';
import Ship from './ship.js';

export default class DragManager {
    
    currentDraggable = null;
    rotate = true;

    #gameboard = null;

    constructor(gameboard) {
        this.#gameboard = gameboard;
    }

    onShipSelect(e) {


        this.currentDraggable = e.target;
    }

    onMouseClick(e) {
        if (!this.currentDraggable) return;
        const cell = e.target.closest('.cell');
        if (!cell) return;

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        const name = this.currentDraggable.dataset.name;
        const length = parseInt(this.currentDraggable.dataset.length);

        this.#gameboard.addShip(new Ship(name, length), x, y, this.rotate);
        this.currentDraggable.style.display = 'none';
        this.currentDraggable = null;
        this.update();
    }

    onMouseMove(e) {
        this.update();
        if (!this.currentDraggable)
            return;
        
        const cell = e.target.closest('.cell');
        if (!cell) return;
        
        const length = this.currentDraggable.dataset.length;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const name = this.currentDraggable.dataset.name;
        if (this.canBePlaced(x, y, length)) {
            this.colorCells(x, y, length);
        }
    }

    canBePlaced(x, y, length) {
        if (x > Gameboard.GRID_SIZE - (this.rotate ? 1 : length) || y > Gameboard.GRID_SIZE - (this.rotate ? length : 1) || x < 0 || y < 0)
            return false;
        let isFree = true;
        for (let i = 0; i < length; i++) {
            if (this.getCell(this.rotate ? x : x + i, this.rotate ? y + i : y).classList.contains('ship'))
                isFree = true;
        }
        return isFree;
    }

    colorCells(x, y, length) {
        for (let i = 0; i < length; i++) {
            this.getCell(this.rotate ? x : x + i, this.rotate ? y + i : y).classList.add('selected');
        }
    }

    update() {
        document.querySelectorAll('#prepare-board > .cell').forEach(cell => {       
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            const ship = this.#gameboard.getShipInCell(x, y);
            if (ship)
                cell.classList.add('ship');
            else
                cell.className = 'cell';
        });
    }

    getCell(x, y) {
        return document.querySelector(`#prepare-board > .cell[data-x="${x}"][data-y="${y}"]`);
    }

}