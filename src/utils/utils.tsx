/**
 * utils.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T15:46:03.055Z-07:00
 * @last-modified 2020-10-20T15:55:03.625Z-07:00
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

  for (let row = baseRowForBox; row < baseRowForBox + 3; row++) {
    for (
      let column = baseColumnForBox;
      column < baseColumnForBox + 3;
      column++
    ) {
      if (row === checkPositionRow && column === checkPositionColumn)
        return true;
    }
  }

  return false;
};
