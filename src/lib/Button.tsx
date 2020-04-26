import styled, { css } from "styled-components";
import colour from "./colour";
import { Link } from "react-router-dom";

const ButtonStyles = css`
  border: 1px solid ${colour.slate};
  background: ${colour.white};
  padding: 16px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${colour.black};
    color: ${colour.white};
  }
`;

export const Button = styled.button`
  ${ButtonStyles};
`;

export const ButtonLink = styled(Link)`
  ${ButtonStyles};
`;
