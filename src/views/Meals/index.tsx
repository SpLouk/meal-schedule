import { MealList } from "./MealList";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import * as React from "react";
import path from "../../lib/path";
import { AddMeal } from "./AddMeal";

export const Meals: React.FC = () => {
  return (
    <>
      <MealList />
      <Switch>
        <Route path={path.newMeal}>
          <AddMeal />
        </Route>
        <Redirect to={path.newMeal} />
      </Switch>
    </>
  );
};
