import Gameboard from "../src/modules/gameboard"
import Ship from "../src/modules/ship"

describe('Feature: Gameboard class', () => {
    describe('When adding a Ship(2) at (3, 4)', () => {
        test('Then adding a ship(1) at (4, 4) should throw', () => {
            const g = new Gameboard();
            g.addShip(new Ship('ship', 2), 3, 4, false);
            expect(() => { g.addShip(new Ship('ship', 1), 4, 4) }).toThrow();
        })
    })

    describe('When adding a rotated Ship(1) at (7, 7)', () => {
        test('Then it should not throw', () => {
            const g = new Gameboard();
            expect(() => { g.addShip(new Ship('s', 1), 7, 7, true) }).not.toThrow();
        })
    })

    describe('When adding a Ship(5) at (7, 3)', () => {
        test('Then it should not throw', () => {
            const g = new Gameboard();
            expect(() => { g.addShip(new Ship('s', 5), 7, 3, false) }).not.toThrow();
        })
    })
})