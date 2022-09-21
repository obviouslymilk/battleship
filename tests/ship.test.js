import Ship from "../src/modules/ship"
import Vector from "../src/modules/vector"

describe('Feature: Ship class', () => {
    describe('When accessing ship origin with getOrigin()', () => {
        test('Then it\'s should return origin value', () => {
            expect(new Ship('ship', new Vector(2, 3), 3).getOrigin()).toStrictEqual(new Vector(2, 3))
        })
    })

    describe('When hit a 1 length ship in position 1', () => {
        test('Then it\'s should not be sunk if isSunk() is called', () => {
            const ship = new Ship('smol dude', new Vector(0, 0), 1);
            ship.hit(1);
            expect(ship.isSunk()).toBe(false);
        })
    })

    describe('When ship with length of 2 got hit two times', () => {
        test('Then it\'s should be sunk', () => {
            const ship = new Ship('ship', new Vector(0, 0), 2);
            ship.hit(1);
            ship.hit(0);
            expect(ship.isSunk()).toBe(true);
        })
    })
})