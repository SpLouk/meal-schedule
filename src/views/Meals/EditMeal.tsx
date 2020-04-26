import * as React from "react";
import { observer } from "mobx-react";
import { useContext } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { useParams, useHistory } from "react-router-dom";
import { mealPath } from "../../lib/path";
import { MealForm } from "./MealForm";
import { IMeal } from "../../types/IMeal";

export const EditMeal: React.FC = observer(() => {
  const { id } = useParams();
  const history = useHistory();
  const mealStore = useContext(MealStoreContext);
  const meal = mealStore.mealsById[id!];

  function handleAddMeal(meal: IMeal) {
    history.push(mealPath(meal.id!));
  }

  if (!meal) {
    return null;
  } else {
    return <MealForm meal={meal} onSave={handleAddMeal} />;
  }
});
