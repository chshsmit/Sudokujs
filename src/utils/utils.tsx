/**
 * utils.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T15:46:03.055Z-07:00
 * @last-modified 2020-10-21T12:03:08.542Z-07:00
 */

//--------------------------------------------------------------------------------------

export const createNewGrid = (): Array<Array<number>> => {
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
