/**
 * SudokuGrid.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T14:24:43.535Z-07:00
 * @last-modified 2020-10-20T14:46:31.293Z-07:00
 */

class SudokuGrid {
  grid: Array<Array<number>>;

  constructor() {
    this.grid = [
      [0, 0, 0, 2, 4, 9, 1, 0, 0],
      [0, 1, 0, 5, 8, 0, 0, 0, 6],
      [0, 0, 7, 0, 3, 0, 2, 0, 5],
      [1, 7, 0, 0, 0, 4, 6, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 4, 9, 0, 0, 0, 7, 3],
      [3, 0, 8, 0, 1, 0, 7, 0, 0],
      [2, 0, 0, 0, 9, 3, 0, 5, 0],
      [0, 0, 5, 4, 2, 8, 0, 0, 0],
    ];
  }

  updateGrid = (posX: number, posY: number, value: number): void => {
    this.grid[posX][posY] = value;
  };
}

export default SudokuGrid;
