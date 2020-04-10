import * as React from "react";
import styled from "styled-components";
import Colours from "./lib/Colours";
import { getMealStore } from "./MealStore";
import { observer } from "mobx-react";
import "./App.css";

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

const Content = styled.main`
  display: flex;
`;

const Title = styled.h1`
  font-family: sans-serif;
  font-weight: 200;
`;

export const App: React.FC = observer(() => {
  const meals = getMealStore().meals;
  return (
    <ViewportWrapper>
      <Header>
        <Title>Fridgefort Meal Schedule</Title>
      </Header>
      <Content>
        <ul>
          {meals.map((meal) => (
            <li>{meal.name}</li>
          ))}
        </ul>
      </Content>
    </ViewportWrapper>
  );
});
