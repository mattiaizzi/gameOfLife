import React, { useState } from 'react';
import { Cell, CellStatus } from '../../core/cell';
import { Game } from '../../core/game/Game';
import { InputFile } from '../InputFile';

const Main: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);

  const handleFile = (files: FileList) => {
    const file = files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      if (content) {
        const [generation, dimension, ...initialState] = content.toString().trim().split('\n');
        const g = generation.match(/\d+?/);
        const [rows, columns] = dimension.split(' ');
        const matrix: Cell[][] = [];
        initialState.forEach((l, index) => {
          matrix[index] = [];
          const line = l.trim();
          for (let i = 0; i < line.length; i += 1) {
            matrix[index][i] = new Cell(line[i] === '.' ? CellStatus.DEAD : CellStatus.ALIVE);
          }
        });
        if (g) console.log(g[0], rows, columns, matrix);
      }
    };
    fileReader.readAsText(file);
  };

  return (
    <React.Fragment>
      <div>
        <h1>Game of life</h1>
      </div>
      <div>
        <p>Per iniziare il gioco caricare il file di configurazione</p>
        <InputFile onChange={handleFile}>upload</InputFile>
      </div>
    </React.Fragment>
  );
};

export default Main;
