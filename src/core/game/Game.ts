import { Cell, CellStatus } from '../cell';
import { Grid } from '../grid';

export class Game {
  private grid: Grid;
  private currentGeneration: number;

  constructor(rows: number, columns: number) {
    this.grid = new Grid(rows, columns);
    this.currentGeneration = 0;
  }

  getCurrentGeneration() {
    return this.currentGeneration;
  }

  getGrid() {
    return this.grid;
  }

  updateGenerationState(currentState: Cell[][], generation: number) {
    this.grid.setField(currentState);
    this.currentGeneration = generation;
  }

  nextGeneration() {
    const newGeneration = this.grid.initField();
    for (let i = 0; i < this.grid.getRows(); i += 1) {
      for (let j = 0; j < this.grid.getColumns(); j += 1) {
        const aliveNeighbours = this.countAliveNeighbours(i, j);
        if (
          this.grid.getField()[i][j].getStatus() === CellStatus.ALIVE &&
          (aliveNeighbours === 2 || aliveNeighbours === 3)
        ) {
          newGeneration[i][j] = new Cell(CellStatus.ALIVE);
        } else if (this.grid.getField()[i][j].getStatus() === CellStatus.DEAD && aliveNeighbours === 3) {
          newGeneration[i][j] = new Cell(CellStatus.ALIVE);
        }
      }
    }
    return newGeneration;
  }

  private countAliveNeighbours(rowIndex: number, columnIndex: number) {
    let aliveNeighbours = 0;
    for (let i = 0; i < 3; i += 1) {
      const neighbourRowIndex = i - 1 + rowIndex;
      const rowIndexInRange = 0 <= neighbourRowIndex && neighbourRowIndex < this.grid.getRows();
      if (rowIndexInRange) {
        for (let j = 0; j < 3; j += 1) {
          const neighbourColIndex = j - 1 + columnIndex;
          const colIndexInRange = 0 <= neighbourColIndex && neighbourColIndex < this.grid.getColumns();
          const notCheckedCell = !(rowIndex === neighbourRowIndex && columnIndex === neighbourColIndex);
          if (colIndexInRange && notCheckedCell) {
            if (this.grid.getField()[neighbourRowIndex][neighbourColIndex].isAlive()) {
              aliveNeighbours += 1;
            }
          }
        }
      }
    }
    return aliveNeighbours;
  }
}
