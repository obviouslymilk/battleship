import Vector from "../src/modules/vector"

describe('Create Vector on coordinates of {3, 4}', () => {
    describe('When calculate distance to {5, 4}', () => {
        test('Then it\'s should return 2', () => {
            expect(new Vector(3, 4).calculateDistance(5, 4)).toBe(2);
        })
    })
})