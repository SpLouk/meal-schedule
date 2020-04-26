import * as React from "react";
import { useContext } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import path, { mealPath } from "../../lib/path";
import colour from "../../lib/colour";

const MealList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  display: block;
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid ${colour.lightBlue};
  ${(props) => props.active && `background: ${colour.lightBlue}`};
`;

export const MealNav: React.FC = observer(() => {
  const mealStore = useContext(MealStoreContext);
  const meals = mealStore.meals;

  const location = useLocation();

  return (
    <MealList>
      {meals.map((meal, index) => (
        <li key={index}>
          <NavLink
            active={location.pathname === mealPath(meal.id!)}
            to={mealPath(meal.id!)}
          >
            {meal.name}
          </NavLink>
        </li>
      ))}
      <li>
        <NavLink active={location.pathname === path.newMeal} to={path.newMeal}>
          + New Meal
        </NavLink>
      </li>
    </MealList>
  );
});
