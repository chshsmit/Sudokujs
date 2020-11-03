/**
 * SudokuSolver.tsx
 * @author Christopher Smith
 * @description Helper class to create and solve a Sudoku Puzzle
 * @created 2020-10-30T10:55:26.237Z-07:00
 * @last-modified 2020-11-01T11:14:45.635Z-08:00
 */

import SudokuHelper from "utils/SudokuHelper";
import { shuffle } from "utils/utils";

interface AttemptNumbers {
  [easy: string]: number;
  medium: number;
  hard: number;
}

export default class SudokuSolver {
  grid: Array<Array<number>>;
  counter: number;
  attempts: number;
  difficulty: string | null;
  sudokuHelper: SudokuHelper;
  numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  private attemptNumbers: AttemptNumbers = {
    easy: 2,
    medium: 5,
    hard: 8,
    extreme: 11,
  };

  constructor(difficulty: string) {
    console.log("In the solver");
    this.difficulty = difficulty;
    this.grid = [];
    this.counter = 0;
    this.sudokuHelper = new SudokuHelper();
    this.attempts = this.attemptNumbers[difficulty];
  }

  // New Function
  createEmptyGrid = (): Array<Array<number>> => {
    const grid: Array<Array<number>> = [];
    for (let i = 0; i < 9; i++) grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    return grid;
  };

  valueInRow = (row: Array<number>, value: number): boolean => {
    let valueInRow = false;
    row.forEach((element) => {
      if (element === value) valueInRow = true;
    });

    return valueInRow;
  };

  valueInColumn = (
    grid: Array<Array<number>>,
    value: number,
    columnPosition: number
  ): boolean => {
    let valueInColumn = false;

    grid.forEach((row) => {
      if (row[columnPosition] === value) valueInColumn = true;
    });

    return valueInColumn;
  };

  valueInBox = (
    grid: Array<Array<number>>,
    rowPosition: number,
    columnPosition: number,
    value: number
  ): boolean => {
    let valueInBox = false;

    // Check the box
    const baseRowForBox = rowPosition - (rowPosition % 3);
    const baseColumnForBox = columnPosition - (columnPosition % 3);
    for (let row = baseRowForBox; row < baseRowForBox + 3; row++) {
      for (
        let column = baseColumnForBox;
        column < baseColumnForBox + 3;
        column++
      ) {
        if (grid[row][column] === value) valueInBox = true;
      }
    }

    return valueInBox;
  };

  solveGrid = (grid: Array<Array<number>>): void | boolean => {
    let row = 0;
    let column = 0;

    // Finding the next empty cell
    for (let i = 0; i < 81; i++) {
      row = Math.floor(i / 9);
      column = i % 9;

      if (grid[row][column] === 0) {
        for (let value = 1; value < 10; value++) {
          if (!this.valueInRow(grid[row], value)) {
            if (!this.valueInColumn(grid, value, column)) {
              if (!this.valueInBox(grid, row, column, value)) {
                grid[row][column] = value;
                if (this.sudokuHelper.determineIfGridIsFull(grid)) {
                  this.counter += 1;
                  break;
                } else {
                  if (this.solveGrid(grid)) {
                    return true;
                  }
                }
              }
            }
          }
        }
        break;
      }
    }
    grid[row][column] = 0;
  };

  fillGrid = (): void | boolean => {
    let row = 0;
    let column = 0;

    for (let i = 0; i < 81; i++) {
      row = Math.floor(i / 9);
      column = i % 9;

      if (this.grid[row][column] === 0) {
        shuffle(this.numberList);
        for (const value of this.numberList) {
          if (!this.valueInRow(this.grid[row], value)) {
            if (!this.valueInColumn(this.grid, value, column)) {
              if (!this.valueInBox(this.grid, row, column, value)) {
                this.grid[row][column] = value;
                if (this.sudokuHelper.determineIfGridIsFull(this.grid)) {
                  return true;
                } else {
                  if (this.fillGrid()) return true;
                }
              }
            }
          }
        }
        break;
      }
    }
    this.grid[row][column] = 0;
  };

  createNewGrid = (): Array<Array<number>> => {
    // We need to fill the grid initially
    this.grid = this.createEmptyGrid();
    this.fillGrid();

    let row: number;
    let column: number;
    let backup: number;

    while (this.attempts > 0) {
      row = Math.floor(Math.random() * 9);
      column = Math.floor(Math.random() * 9);

      while (this.grid[row][column] === 0) {
        row = Math.floor(Math.random() * 9);
        column = Math.floor(Math.random() * 9);
      }

      backup = this.grid[row][column];
      this.grid[row][column] = 0;

      this.counter = 0;
      this.solveGrid(this.grid.map((row) => row.slice()));

      if (this.counter !== 1) {
        this.grid[row][column] = backup;
        this.attempts -= 1;
      }
    }

    return this.grid.map((row) => row.slice());
  };
}
