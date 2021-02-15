import React from 'react';
import styled from 'styled-components';

interface StyledGridProps {
  maxWidth?: string;
  cols: number;
}

const StyledGrid = styled.div<StyledGridProps>`
  max-width: ${(props) => props.maxWidth || '100%'};
  display: grid;
  grid-template-columns: ${(props) => new Array(props.cols + 1).join('1fr ')};
`;

interface GridProps {
  matrix: any[][];
  maxWidth?: string;
}

const Grid: React.FC<GridProps> = ({ matrix, maxWidth }) => {
  const rows = matrix.length || 0;
  const cols = matrix[0]?.length || 0;
  return (
    <StyledGrid cols={cols} maxWidth={maxWidth}>
      {matrix.map((row) => row.map((col) => col))}
    </StyledGrid>
  );
};

export default Grid;
