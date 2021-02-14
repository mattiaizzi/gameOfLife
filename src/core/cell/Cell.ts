import { CellStatus } from './CellStatus';

export class Cell {
  constructor(private status: CellStatus) {}

  getStatus() {
    return this.status;
  }

  setStatus(status: CellStatus) {
    this.status = status;
  }

  isAlive() {
    return this.status === CellStatus.ALIVE;
  }

  isDead() {
    return this.status === CellStatus.DEAD;
  }
}
