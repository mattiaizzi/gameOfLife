import React, { useContext, useReducer, useRef, useState } from 'react';
import { Cell } from '../../core/cell';
import { Game } from '../../core/game/Game';
import { handleFile } from '../../utils/handleFile';
import { Grid } from '../Grid';
import { Cell as CellComponent } from '../Cell';
import { InputFile } from '../InputFile';
import './style.css';
import { Button } from '../Button';
import { ErrorContext } from '../../context/ErrorContext/ErrorContext';

type ButtonState = {
  isOneStepEnabled: boolean;
  isPlayEnabled: boolean;
  isStopEnabled: boolean;
  isUploadEnabled: boolean;
};

type Action = { type: 'oneStep' } | { type: 'play' } | { type: 'stop' };

const reducer = (state: ButtonState, action: Action): ButtonState => {
  switch (action.type) {
    case 'oneStep':
      return {
        isOneStepEnabled: true,
        isPlayEnabled: true,
        isStopEnabled: false,
        isUploadEnabled: true,
      };
    case 'play':
      return {
        isOneStepEnabled: false,
        isPlayEnabled: true,
        isStopEnabled: true,
        isUploadEnabled: false,
      };
    case 'stop':
      return {
        isOneStepEnabled: true,
        isPlayEnabled: true,
        isStopEnabled: false,
        isUploadEnabled: true,
      };
  }
};

const Main: React.FC = () => {
  const [{ isOneStepEnabled, isUploadEnabled, isStopEnabled, isPlayEnabled }, dispatch] = useReducer(reducer, {
    isOneStepEnabled: true,
    isPlayEnabled: true,
    isStopEnabled: false,
    isUploadEnabled: true,
  });
  const { setError } = useContext(ErrorContext);
  const [game, setGame] = useState<Game | null>(null);
  const playID = useRef<any>(null);

  const onFileChange = (files: FileList) => {
    let generation: number;
    let matrix: Cell[][];
    handleFile(
      files,
      (m, g) => {
        generation = g;
        matrix = m;
        setGame(() => {
          const newGame: Game = new Game(4, 8);
          newGame.updateGenerationState(matrix, 3);
          return newGame;
        });
      },
      (e) => {
        if (setError) {
          setError(e);
        }
      },
    );
  };

  const onNextGenerationClick = () => {
    dispatch({ type: 'oneStep' });
    makeOneStep();
  };

  const makeOneStep = () => {
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
    dispatch({ type: 'play' });
    playID.current = setInterval(makeOneStep, 1000);
  };

  const stop = () => {
    dispatch({ type: 'stop' });
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
          <div className="content">
            <h3>Current generation: {game.getCurrentGeneration()}</h3>
            <div className="buttons">
              <Button disabled={!isOneStepEnabled} onClick={onNextGenerationClick}>
                one step
              </Button>
              <Button disabled={!isPlayEnabled} onClick={play}>
                play
              </Button>
              <Button disabled={!isStopEnabled} onClick={stop}>
                stop
              </Button>
              <InputFile disabled={!isUploadEnabled} onChange={onFileChange}>
                upload
              </InputFile>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Main;
