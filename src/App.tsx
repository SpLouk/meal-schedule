import * as React from "react";
import styled from "styled-components";
import Colours from "./lib/Colours";

const ViewportWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${Colours.lightBlue};
  color: ${Colours.slate};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: sans-serif;
`;

export const App: React.FC = () => {
  return (
    <ViewportWrapper>
      <Header>
        <Title>Fridgefort Meal Schedule</Title>
      </Header>
    </ViewportWrapper>
  );
};
