import { Cell, CellStatus } from '../core/cell';

export const handleFile = (files: FileList, callback: (matrix: Cell[][], generation: number) => void) => {
  const file = files[0];
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    const content = fileReader.result;
    if (content && typeof content === 'string') {
      const { matrix, generation } = parseContent(content);
      callback(matrix, generation);
    }
  };
  fileReader.readAsText(file);
};

const parseContent = (content: string) => {
  const [firstLine, secondLine, ...rest] = content.toString().trim().split('\n');
  const generation = extractGeneration(firstLine);
  const [rows, columns] = extractDimension(secondLine);
  const matrix = getInitialState(rest, rows, columns);
  return { matrix, generation };
};

const extractGeneration = (line: string) => {
  const generation = line.match(/\d+?/);
  if (!generation) {
    throw new Error('Undefined generation');
  }
  return parseInt(generation[0]);
};

const extractDimension = (line: string) => {
  const [rows, columns] = line.split(' ');
  return [parseInt(rows, 10), parseInt(columns, 10)];
};

const getInitialState = (configuration: string[], rows: number, columns: number) => {
  const matrix: Cell[][] = [];
  if (configuration.length !== rows) {
    throw new Error('Invalid rows dimension');
  }
  configuration.forEach((l, index) => {
    matrix[index] = [];
    const line = l.trim();
    if (columns !== line.length) {
      throw new Error('Invalid columns dimension');
    }
    for (let i = 0; i < line.length; i += 1) {
      matrix[index][i] = new Cell(line[i] === '.' ? CellStatus.DEAD : CellStatus.ALIVE);
    }
  });
  return matrix;
};
