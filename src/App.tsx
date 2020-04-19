import * as React from "react";
import styled from "styled-components";
import Colours from "./lib/Colours";
import { MealStore, MealStoreContext } from "./MealStore";
import { observer } from "mobx-react";
import "./App.css";
import { MealList } from "./MealList";
import { AddMeal } from "./AddMeal";

const ViewportWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  border-bottom: 1px solid ${Colours.lightBlue};
  color: ${Colours.slate};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const Content = styled.main`
  display: flex;
  flex: 1;
`;

const Title = styled.h1`
  font-family: sans-serif;
  font-weight: 200;
`;

export const App: React.FC = observer(() => {
  const mealStore = new MealStore();
  return (
    <MealStoreContext.Provider value={mealStore}>
      <ViewportWrapper>
        <Header>
          <img src="fridge.svg" alt="" height={40} color={Colours.slate} />
          <Title>Fridgefort Meal Schedule</Title>
        </Header>
        <Content>
          <MealList />
          <AddMeal />
        </Content>
      </ViewportWrapper>
    </MealStoreContext.Provider>
  );
});
