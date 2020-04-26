import { Redirect, Route, Switch } from "react-router-dom";
import * as React from "react";
import path from "../../lib/path";
import { AddMeal } from "./AddMeal";
import { ShowMeal } from "./ShowMeal";

export const Meals: React.FC = () => {
  return (
    <Switch>
      <Route path={path.newMeal}>
        <AddMeal />
      </Route>
      <Route path={path.meal}>
        <ShowMeal />
      </Route>
      <Redirect to={path.newMeal} />
    </Switch>
  );
};
