import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import * as React from "react";
import path, { mealPath } from "../../lib/path";
import { ViewMeal } from "./ViewMeal";
import { EditMeal } from "./EditMeal";
import { MealForm } from "./MealForm";
import { IMeal } from "../../types/IMeal";

export const Meals: React.FC = () => {
  const history = useHistory();

  function handleAddMeal(meal: IMeal) {
    history.push(mealPath(meal.id!));
  }

  return (
    <Switch>
      <Route path={path.newMeal}>
        <MealForm meal={undefined} onSave={handleAddMeal} />
      </Route>
      <Route path={path.editMeal}>
        <EditMeal />
      </Route>
      <Route path={path.meal}>
        <ViewMeal />
      </Route>
      <Redirect to={path.newMeal} />
    </Switch>
  );
};
