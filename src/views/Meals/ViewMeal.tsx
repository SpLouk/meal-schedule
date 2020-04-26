import * as React from "react";
import { observer } from "mobx-react";
import { useContext } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Row } from "../../lib/Row";
import { Typography } from "../../lib/Typography";
import colour from "../../lib/colour";

const Wrapper = styled.div`
  flex: 1;
  border-left: 1px solid ${colour.lightBlue};
  border-right: 1px solid ${colour.lightBlue};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 32px;
`;

const IngredientsWrapper = styled.div`
  overflow: auto;
  height: 300px;
`;

const IngredientRow = styled(Row)`
  justify-content: space-between;
  width: 50%;
`;

export const ViewMeal: React.FC = observer(() => {
  const { id } = useParams();
  const mealStore = useContext(MealStoreContext);
  const meal = mealStore.getMeal(id!);
  const ingredients = meal?.ingredients;

  return (
    <Wrapper>
      <h2>{meal?.name}</h2>

      <h3>Ingredients</h3>
      <IngredientsWrapper>
        {ingredients?.map((ingredient, index) => (
          <IngredientRow key={index}>
            <Typography>{ingredient.name}</Typography>
            <Typography>
              {ingredient.quantity} {ingredient.unit}
            </Typography>
          </IngredientRow>
        ))}
      </IngredientsWrapper>
    </Wrapper>
  );
});
