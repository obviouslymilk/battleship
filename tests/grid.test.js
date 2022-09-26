import Grid from "../src/modules/grid";

describe('Feature: Grid', () => {
    describe('When create Grid(8, 0) and add 1 to [3;3]', () => {
        const grid = new Grid(8, 0);
        grid.setMarked(3, 3)
        test('Then getMarked(3, 3) should return true', () => {
            expect(grid.getMarked(3, 3)).toBe(true);
        })

        test('Then getData(0, 0) should return {ship: null, marked: null}', () => {
            expect(grid.getData(0, 0)).toStrictEqual({ship: null, marked: null});
        })

        test('Then setData(8, 8, 1) should throw', () => {
            expect(() => { grid.setData(8, 8, 1) }).toThrow();
        })
    })
})