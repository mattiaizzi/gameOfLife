import React from 'react';
import styled from 'styled-components';

const Square = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div<{ alive: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${(props) => (props.alive ? 'green' : 'black')};
`;

const Cell: React.FC<{ alive: boolean }> = ({ alive }) => {
  return (
    <Square>
      <Circle alive={alive} />
    </Square>
  );
};

export default Cell;
