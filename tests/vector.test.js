import Vector from "../src/modules/vector"

describe('Create Vector on coordinates of {3, 4}', () => {
    const vector = new Vector(3, 4);

    describe('When calculate distance to {5, 4}', () => {
        test('Then it\'s should return 2', () => {
            expect(vector.calculateDistance(5, 4)).toBe(2);
        })
    })

    describe('When calculate distance to {3, 4}', () => {
        test('Then it\'s should return 0', () => {
            expect(vector.calculateDistance(3, 4)).toBe(0);
        })
    })

    describe('When calculate distance to {3, 3}', () => {
        test('Then it\'s should return 1', () => {
            expect(vector.calculateDistance(3, 3)).toBe(1);
        })
    })
})