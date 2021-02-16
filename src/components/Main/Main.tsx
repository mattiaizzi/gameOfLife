import React, { useEffect, useRef, useState } from 'react';
import { Cell, CellStatus } from '../../core/cell';
import { Game } from '../../core/game/Game';
import { handleFile } from '../../utils/handleFile';
import { Grid } from '../Grid';
import { Cell as CellComponent } from '../Cell';
import { InputFile } from '../InputFile';
import './style.css';
import { Button } from '../Button';

const Main: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const playID = useRef<any>(null);

  const onFileChange = (files: FileList) => {
    let generation: number;
    let matrix: Cell[][];
    handleFile(files, (m, g) => {
      generation = g;
      matrix = m;
      setGame(() => {
        const newGame: Game = new Game(4, 8);
        newGame.updateGenerationState(matrix, 3);
        return newGame;
      });
    });
  };

  const onNextGenerationClick = () => {
    if (game) {
      setGame((oldGame) => {
        if (oldGame) {
          const newGame: Game = new Game(4, 8);
          newGame.updateGenerationState(oldGame.nextGeneration(), oldGame.getCurrentGeneration() + 1);
          return newGame;
        }
        return oldGame;
      });
    }
  };

  const play = () => {
    playID.current = setInterval(onNextGenerationClick, 1000);
  };

  const stop = () => {
    clearInterval(playID.current);
  };

  return (
    <React.Fragment>
      <div>
        <h1>Game of life</h1>
      </div>
      {!game ? (
        <div>
          <p>Per iniziare il gioco caricare il file di configurazione</p>
          <InputFile onChange={onFileChange}>upload</InputFile>
        </div>
      ) : (
        <div>
          <div className="gridContainer">
            <Grid
              matrix={game
                .getGrid()
                .getField()
                .map((row, i) => row.map((cell, j) => <CellComponent key={`${i}-${j}`} alive={cell.isAlive()} />))}
            ></Grid>
          </div>
          <div>
            <h3>Current generation: {game.getCurrentGeneration()}</h3>
            <Button onClick={onNextGenerationClick}>one step</Button>
            <Button onClick={play}>play</Button>
            <Button onClick={stop}>stop</Button>
            <InputFile onChange={onFileChange}>upload</InputFile>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Main;
