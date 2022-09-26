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
})