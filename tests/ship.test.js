import Ship from "../src/modules/ship"

describe('Feature: Ship class', () => {
    describe('When a ship with length 1 got hit 1 time', () => {
        test('Then it\'s should be sunk', () => {
            const s = new Ship('small', 1);
            s.hit();
            expect(s.isSunk()).toBe(true);
        })
    })

    describe('When a ship with length 2 got hit', () => {
        const s = new Ship('ship', 2);
        test('Then after one hit it is not sunk', () => {
            s.hit();
            expect(s.isSunk()).toBe(false);
        })

        test('Then after the second hit it is sunk', () => {
            s.hit();
            expect(s.isSunk()).toBe(true);
        })
    })
})