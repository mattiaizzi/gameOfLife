import styled from 'styled-components';
import { hexToRgba } from '../../utils/hexToRgba';

interface ButtonProps {
  backgroundColor?: string;
  color?: string;
  margin?: string;
}

export default styled.button<ButtonProps>`
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  padding: 0.5em 1em;
  border-radius: 2px;
  border: 0;
  transition: 0.2s ease-out;
  color: ${(props) => props.color || '#FFF'};
  background-color: ${(props) => props.backgroundColor || '#0275d8'};
  margin: ${(props) => props.margin || '0'};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    background-color: ${(props) => hexToRgba(props.backgroundColor || '#0275d8', 0.7)};
  }
  &:focus {
    outline: none;
  }
  &:active,
  &:focus {
    outline: 0;
  }
`;
