import styled from "styled-components";
import colour from "./colour";

export const Input = styled.input`
  appearance: none;
  -moz-appearance: textfield;
  background: none;
  border: none;
  border-bottom: 1px solid ${colour.stone};
`;

export const Select = styled.select`
  appearance: none;
  background: none;
  border: none;
  border-bottom: 1px solid ${colour.stone};
`;

