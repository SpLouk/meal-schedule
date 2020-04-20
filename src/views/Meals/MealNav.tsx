import * as React from "react";
import { useContext } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import path, { mealPath } from "../../lib/path";

const Nav = styled.nav`
  min-width: 150px;
  position: sticky;
  top: 0;
`;

export const MealNav: React.FC = observer(() => {
  const mealStore = useContext(MealStoreContext);
  const meals = mealStore.meals;

  return (
    <Nav>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>
            <Link to={mealPath(meal.id!)}>{meal.name}</Link>
          </li>
        ))}
        <li>
          <Link to={path.newMeal}>+ New Meal</Link>
        </li>
      </ul>
    </Nav>
  );
});
