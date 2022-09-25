import Grid from "../src/modules/grid";

describe('Feature: Grid', () => {
    describe('When create Grid(8, 0) and add 1 to [3;3]', () => {
        const grid = new Grid(8, 0);
        grid.setData(3, 3, 1)
        test('Then getData(3, 3) should return 1', () => {
            expect(grid.getData(3, 3)).toBe(1);
        })

        test('Then getData(0, 0) should return 0', () => {
            expect(grid.getData(0, 0)).toBe(0);
        })
    })
})