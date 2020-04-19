import * as React from "react";
import { useContext } from "react";
import { MealStoreContext } from "./MealStore";
import { observer } from "mobx-react";

export const MealList: React.FC = observer(() => {
  const mealStore = useContext(MealStoreContext);
  const meals = mealStore.meals;

  return (
    <ul>
      {meals.map((meal, index) => (
        <li key={index}>{meal.name}</li>
      ))}
    </ul>
  );
});
