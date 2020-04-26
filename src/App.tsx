import * as React from "react";
import styled from "styled-components";
import colour from "./lib/colour";
import { MealStore, MealStoreContext } from "./stores/MealStore";
import { observer } from "mobx-react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import path from "./lib/path";
import { createBrowserHistory } from "history";
import { Meals } from "./views/Meals";
import { MealNav } from "./views/Meals/MealNav";
import { Row } from "./lib/Row";
import { media } from "./lib/media";

const ViewportWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Header = styled.header`
  border-bottom: 1px solid ${colour.lightBlue};
  color: ${colour.slate};
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

const Nav = styled.nav`
  position: sticky;
  top: 0;
  min-width: 300px;
  border-right: 1px solid ${colour.lightBlue};
  ${media.lessThan("tablet")`
    display: none;
  `}
`;

const ContentWrapper = styled(Row)`
  flex: 1;
  justify-content: center;
`;

export const App: React.FC = observer(() => {
  const mealStore = new MealStore();
  const history = createBrowserHistory();
  return (
    <MealStoreContext.Provider value={mealStore}>
      <Router history={history}>
        <ViewportWrapper>
          <Header>
            <img src="/fridge.svg" alt="" height={40} color={colour.slate} />
            <Title>Fridgefort Meal Schedule</Title>
          </Header>
          <Content>
            <Nav>
              <MealNav />
            </Nav>
            <ContentWrapper>
              <Switch>
                <Route path={path.meals}>
                  <Meals />
                </Route>
                <Redirect to={path.meals} />
              </Switch>
            </ContentWrapper>
          </Content>
        </ViewportWrapper>
      </Router>
    </MealStoreContext.Provider>
  );
});
