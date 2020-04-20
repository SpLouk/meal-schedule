import * as React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MealStoreContext } from "../../stores/MealStore";

export const ShowMeal: React.FC = () => {
  const { id } = useParams();
  const mealStore = useContext(MealStoreContext);
  const meal = mealStore.getMeal(id!);
  return <div>{meal?.name}</div>;
};
