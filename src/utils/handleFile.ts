import { Cell, CellStatus } from '../core/cell';

export const handleFile = (
  files: FileList,
  callback: (matrix: Cell[][], generation: number) => void,
  errorCallback: (error: Error) => void,
) => {
  const file = files[0];
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    try {
      const content = fileReader.result;
      if (content && typeof content === 'string') {
        const { matrix, generation } = parseContent(content);
        callback(matrix, generation);
      }
    } catch (error) {
      errorCallback(error);
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
  for (let i = 0; i < configuration.length; i += 1) {
    matrix[i] = [];
    const line = configuration[i].trim();
    if (columns !== line.length) {
      throw new Error('Invalid columns dimension');
    }
    for (let j = 0; j < line.length; j += 1) {
      matrix[i][j] = new Cell(line[j] === '.' ? CellStatus.DEAD : CellStatus.ALIVE);
    }
  }
  return matrix;
};
