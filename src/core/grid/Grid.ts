import { Cell, CellStatus } from '../cell';

export class Grid {
  private field: Cell[][];

  constructor(private rows: number, private columns: number) {
    this.setColumns(columns);
    this.setRows(rows);
    this.field = this.initField();
  }

  getRows() {
    return this.rows;
  }

  setRows(rows: number) {
    if (rows < 0) {
      throw new Error('Invalid rows number');
    }
    this.rows = rows;
  }

  getColumns() {
    return this.columns;
  }

  setColumns(columns: number) {
    if (columns < 0) {
      throw new Error('Invalid columns number');
    }
    this.columns = columns;
  }

  getField() {
    return this.field;
  }

  setField(field: Cell[][]) {
    if (field.length === this.rows && field[0]?.length === this.columns) {
      this.field = field;
    } else {
      throw new Error('Invalid field');
    }
  }

  initField() {
    const field: Cell[][] = [];
    for (let i = 0; i < this.rows; i += 1) {
      field[i] = [];
      for (let j = 0; j < this.columns; j += 1) {
        field[i][j] = new Cell(CellStatus.DEAD);
      }
    }
    return field;
  }
}
