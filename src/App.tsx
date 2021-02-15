import React from 'react';
import { Cell, CellStatus } from './core/cell';
import { Game } from './core/game/Game';
import { Grid } from './components/Grid';
import { Cell as CellComponent } from './components/Cell';

function App() {
  const game: Game = new Game(4, 8);
  const initialState = [
    [
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
    ],
    [
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.ALIVE),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
    ],
    [
      new Cell(CellStatus.ALIVE),
      new Cell(CellStatus.ALIVE),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
    ],
    [
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
      new Cell(CellStatus.DEAD),
    ],
  ];

  game.updateGenerationState(initialState, 3);

  game
    .getGrid()
    .getField()
    .forEach((row) => {
      let string = '';
      for (let i = 0; i < row.length; i++) {
        string += ` - ${row[i].getStatus().toString()}`;
      }
      console.log(string);
    });
  console.log('/n/n********************************/n/n');
  game.updateGenerationState(game.nextGeneration(), game.getCurrentGeneration() + 1);
  game
    .getGrid()
    .getField()
    .forEach((row) => {
      let string = '';
      for (let i = 0; i < row.length; i++) {
        string += ` - ${row[i].getStatus().toString()}`;
      }
      console.log(string);
    });
  return (
    <div>
      <h1>Game of life</h1>
      <Grid
        matrix={game
          .getGrid()
          .getField()
          .map((row, i) => row.map((cell, j) => <CellComponent key={`${i}-${j}`} alive={cell.isAlive()} />))}
      ></Grid>
    </div>
  );
}

export default App;
