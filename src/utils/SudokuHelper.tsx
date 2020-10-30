/**
 * SudokuHelper.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-22T16:18:39.205Z-07:00
 * @last-modified 2020-10-30T11:33:41.970Z-07:00
 */

export default class SudokuHelper {
  readonly NUMBER_KEYS = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
  ];

  readonly NAVIGATION_KEYS = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  constructor() {
    console.log("in the helper");
  }

  //--------------------------------------------------------------------------------------

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

  /**
   * Checking whether or not the solution provided is valid
   *
   * @param grid The current grid
   */

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

  //--------------------------------------------------------------------------------------

  /**
   * Determining if the value in the current row and column is causing an error anywhere in the grid
   *
   * @param grid The current state of the grid
   * @param rowPosition The row position of the value we are checking
   * @param columnPosition The column position of the value we are checking
   */

  determineIfCellCausingError = (
    grid: Array<Array<number>>,
    rowPosition: number,
    columnPosition: number
  ): boolean => {
    let cellCausingError = false;

    // Check the row
    if (this.valueInRow(grid[rowPosition], columnPosition))
      cellCausingError = true;

    // Check the column
    if (this.valueInColumn(grid, rowPosition, columnPosition))
      cellCausingError = true;

    // Check the box
    if (this.valueInBox(grid, rowPosition, columnPosition))
      cellCausingError = true;

    return cellCausingError;
  };

  //--------------------------------------------------------------------------------------

  /**
   * Checking if the value causes an error with the row it is in
   *
   * @param row The row we need to check
   * @param columnPosition The position the current value was put in
   */

  valueInRow = (row: Array<number>, columnPosition: number): boolean => {
    let errorInRow = false;
    row.forEach((element, index) => {
      if (element === row[columnPosition] && index !== columnPosition)
        errorInRow = true;
    });

    return errorInRow;
  };

  //--------------------------------------------------------------------------------------

  /**
   * Checking if the value causes an error with the column it is in
   *
   * @param grid The current state of the grid
   * @param rowPosition The row position of the value we are checking
   * @param columnPosition The column position of the value we are checking
   */

  valueInColumn = (
    grid: Array<Array<number>>,
    rowPosition: number,
    columnPosition: number
  ): boolean => {
    let errorInColumn = false;

    grid.forEach((row, index) => {
      if (
        row[columnPosition] === grid[rowPosition][columnPosition] &&
        rowPosition !== index
      )
        errorInColumn = true;
    });

    return errorInColumn;
  };

  //--------------------------------------------------------------------------------------

  /**
   * Checking if the value causes an error with the 3x3 box it is in
   *
   * @param grid The current state of the grid
   * @param rowPosition The row position of the value we are checking
   * @param columnPosition The column position of the value we are checking
   */

  valueInBox = (
    grid: Array<Array<number>>,
    rowPosition: number,
    columnPosition: number
  ): boolean => {
    let errorInBox = false;

    // Check the box
    const baseRowForBox = rowPosition - (rowPosition % 3);
    const baseColumnForBox = columnPosition - (columnPosition % 3);
    for (let row = baseRowForBox; row < baseRowForBox + 3; row++) {
      for (
        let column = baseColumnForBox;
        column < baseColumnForBox + 3;
        column++
      ) {
        if (
          grid[row][column] === grid[rowPosition][columnPosition] &&
          row !== rowPosition &&
          column !== columnPosition
        )
          errorInBox = true;
      }
    }

    return errorInBox;
  };
}
