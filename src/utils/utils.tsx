/**
 * utils.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-20T15:46:03.055Z-07:00
 * @last-modified 2020-10-20T16:04:35.694Z-07:00
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
