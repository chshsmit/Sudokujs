/**
 * utils.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T15:46:03.055Z-07:00
 * @last-modified 2020-10-30T10:58:11.064Z-07:00
 */

//--------------------------------------------------------------------------------------

/**
 * Create a new sudoku grid
 */

export const createNewGrid = (
  difficulty: string | null
): Array<Array<number>> => {
  console.log(difficulty);

  return [
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
};

//--------------------------------------------------------------------------------------

/**
 * returns a list of all points in the grid that are uneditable
 *
 * @param grid The current sudoku grid
 */
export const determineUneditableCells = (
  grid: Array<Array<number>>
): Array<string> => {
  const uneditableIndexes: string[] = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value !== 0) uneditableIndexes.push(`${rowIndex}-${columnIndex}`);
    });
  });

  return uneditableIndexes;
};

//--------------------------------------------------------------------------------------

export interface CellNotes {
  [index: string]: Array<boolean>;
}

export const createInitialCellNotes = (
  grid: Array<Array<number>>
): CellNotes => {
  const cellNotes: CellNotes = {};
  grid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0)
        cellNotes[`${rowIndex}-${columnIndex}`] = new Array(9).fill(false);
    });
  });

  return cellNotes;
};

//--------------------------------------------------------------------------------------

/**
 * Determining if the current grid is full
 * @param grid The current sudoku grid
 */
export const determineIfGridIsFull = (grid: Array<Array<number>>): boolean => {
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

export const checkIfIndexInBox = (
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

export const shuffle = (
  array: Array<number | string>
): Array<number | string> => {
  let currentIndex = array.length;
  let temporaryValue: number | string;
  let randomIndex: number;

  // While there are still elements available to shuffle
  while (currentIndex !== 0) {
    //Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap with the current
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
