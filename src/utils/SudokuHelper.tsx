/**
 * SudokuHelper.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-22T16:18:39.205Z-07:00
 * @last-modified 2020-10-22T16:41:41.339Z-07:00
 */

export default class SudokuHelper {
  /**
   * Determining if the current grid is full
   * @param grid The current sudoku grid
   */
  determineIfGridIsFull = (grid: Array<Array<number>>): boolean => {
    let gridIsFull = true;
    grid.forEach((row) => {
      row.forEach((value) => {
        if (value === 0) gridIsFull = false;
      });
    });
    return gridIsFull;
  };

  //--------------------------------------------------------------------------------------

  /**
   * Function is used to check if the cell is in the same 3X3 box of the selected cell.
   * Mainly used for highlighting the cells that are constraining the selected cell
   *
   * @param selectedRowPosition The row index that is selected
   * @param selectedColumnPosition The column index that is selected
   * @param checkPositionRow The position in the row of the cell we are checking
   * @param checkPositionColumn The column index of the cell we are checking
   */

  checkIfIndexInBox = (
    selectedRowPosition: number,
    selectedColumnPosition: number,
    checkPositionRow: number,
    checkPositionColumn: number
  ): boolean => {
    const baseRowForBox = selectedRowPosition - (selectedRowPosition % 3);
    const baseColumnForBox =
      selectedColumnPosition - (selectedColumnPosition % 3);

    return (
      checkPositionRow <= baseRowForBox + 2 &&
      checkPositionRow >= baseRowForBox &&
      checkPositionColumn <= baseColumnForBox + 2 &&
      checkPositionColumn >= baseColumnForBox
    );
  };

  //--------------------------------------------------------------------------------------

  boardIsValid = (grid: Array<Array<number>>): boolean => {
    for (let i = 0; i < 9; i++) {
      const row = new Set(),
        col = new Set(),
        sqr = new Set();
      for (let j = 0; j < 9; j++) {
        const rowc = grid[i][j];
        const colc = grid[j][i];
        const sqrc =
          grid[Math.floor(i / 3) * 3 + Math.floor(j / 3)][
            (i % 3) * 3 + (j % 3)
          ];
        if (row.has(rowc) || col.has(colc) || sqr.has(sqrc)) return false;
        if (rowc !== 0) row.add(rowc);
        if (colc !== 0) col.add(colc);
        if (sqrc !== 0) sqr.add(sqrc);
      }
    }
    return true;
  };

  hasDuplicates = (arr: Array<number>): boolean => {
    return new Set(arr).size !== arr.length;
  };
}
