import { MealNav } from "./MealNav";
import { Redirect, Route, Switch } from "react-router-dom";
import * as React from "react";
import path from "../../lib/path";
import { AddMeal } from "./AddMeal";
import styled from "styled-components";
import { Row } from "../../lib/Row";
import {ShowMeal} from "./ShowMeal";

const ContentWrapper = styled(Row)`
  flex: 1;
  justify-content: center;
`;

export const Meals: React.FC = () => {
  return (
    <>
      <MealNav />
      <ContentWrapper>
        <Switch>
          <Route path={path.newMeal}>
            <AddMeal />
          </Route>
          <Route path={path.meal}>
            <ShowMeal />
          </Route>
          <Redirect to={path.newMeal} />
        </Switch>
      </ContentWrapper>
    </>
  );
};
