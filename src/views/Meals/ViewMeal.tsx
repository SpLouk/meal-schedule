import * as React from "react";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Row } from "../../lib/Row";
import { Typography } from "../../lib/Typography";
import colour from "../../lib/colour";
import { Button, ButtonLink } from "../../lib/Button";
import path, { editMealPath } from "../../lib/path";
import { media } from "../../lib/media";

const Wrapper = styled.div`
  flex: 1;
  border-left: 1px solid ${colour.lightBlue};
  border-right: 1px solid ${colour.lightBlue};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 64px;

  ${media.lessThan("mobile")`
    padding: 16px;
  `}
`;

const IngredientsWrapper = styled.section`
  max-width: 300px;
`;

const IngredientRow = styled(Row)`
  justify-content: space-between;
`;

const IngredientsTitle = styled.h3`
  border-bottom: 1px solid ${colour.black};
  padding: 16px 0;
`;

const EditLink = styled(ButtonLink)`
  flex-basis: 100px;
`;

const MealName = styled.h2`
  flex: 1;
`;

const DeleteConfirmation = styled(Button)`
  flex: 1;
`;

export const ViewMeal: React.FC = observer(() => {
  const { id } = useParams();
  const mealStore = useContext(MealStoreContext);
  const meal = mealStore.mealsById[id!];
  const ingredients = meal?.ingredients;
  const history = useHistory();

  const [isConfirmingDelete, setConfirmingDelete] = useState(false);

  async function deleteMeal() {
    await mealStore.deleteMeal(meal);
    history.push(path.calendar)
  }

  return (
    <Wrapper>
      <Row>
        <MealName>{meal?.name}</MealName>
        <EditLink to={editMealPath(id!)}>Edit</EditLink>
      </Row>

      <IngredientsWrapper>
        <IngredientsTitle>Ingredients</IngredientsTitle>
        {ingredients?.map((ingredient, index) => (
          <IngredientRow key={index}>
            <Typography>{ingredient.name}</Typography>
            <Typography>
              {ingredient.quantity} {ingredient.unit}
            </Typography>
          </IngredientRow>
        ))}
      </IngredientsWrapper>

      {isConfirmingDelete ? (
        <>
          <h3>Are you sure?</h3>
          <Row>
            <DeleteConfirmation onClick={deleteMeal}>
              Yes
            </DeleteConfirmation>
            <DeleteConfirmation onClick={() => setConfirmingDelete(false)}>
              No
            </DeleteConfirmation>
          </Row>
        </>
      ) : (
        <Button onClick={() => setConfirmingDelete(true)}>Delete</Button>
      )}
    </Wrapper>
  );
});
