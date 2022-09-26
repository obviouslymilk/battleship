import Gameboard from "../src/modules/gameboard";
import Ship from "../src/modules/ship"

describe('Feature: Gameboard', () => {
    describe('When adding a Ship(5)', () => {
        test('Then at (0, 4) it should throw an error if it is rotated', () => {
            const g = new Gameboard();
            expect(() => { g.addShip(new Ship('ship', 5), 0, 4, true) }).toThrow();
        })
    })

    describe('When adding two ships: 5 and 5 rotated', () => {
        const g = new Gameboard();
        const s1 = new Ship('first', 5);
        const s2 = new Ship('second', 5);
        test('Then adding Ship(5) at (0, 3) should not throw', () => {
            expect(() => { g.addShip(s1, 0, 3, false) }).not.toThrow();
        })

        test('Then adding second Ship(5) at (3, 0) rotated should throw', () => {
            expect(() => { g.addShip(s2, 3, 0, true) }).toThrow();
        })
    })

    test('When adding fake ship it should throw', () => {
        const g = new Gameboard();
        const fakeship = { fakeProperty: false, health: true }
        expect(() => { g.addShip(fakeship, 3, 3, false) }).toThrow();
    })

    describe('When adding one Ship(1) at (2, 5) and hitting it', () => {
        test('Then ship should be sunk', () => {
            const g = new Gameboard();
            const ship = new Ship('small', 1);
            g.addShip(ship, 2, 5, false);
            g.recieveAttack(2, 5);
            expect(ship.isSunk()).toBe(true);
        })
    })

    describe('When adding one Ship(2) at (1, 1) and hitting it two times at one space', () => {
        test('Then ship.isSunk() should return fasle', () => {
            const g = new Gameboard();
            const ship = new Ship('ship', 2);
            g.addShip(ship, 1, 1, false);
            g.recieveAttack(1, 1);
            g.recieveAttack(1, 1);
            expect(ship.isSunk()).toBe(false);
        })
    })

    describe('When adding two Ships (1 and 1) at (1,1) and (7,7) and sunk them', () => {
        test('Then isAllSunk() should return true', () => {
            const g = new Gameboard();
            const ship = new Ship('ship1', 1);
            const ship2 = new Ship('ship2', 1);
            g.addShip(ship, 1, 1, true);
            g.addShip(ship2, 7, 7, true);
            g.recieveAttack(1, 1);
            g.recieveAttack(7, 7);

            expect(g.isAllSunk()).toBe(true);
        })
    })
})