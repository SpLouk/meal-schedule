import * as React from "react";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { MealStoreContext } from "../../stores/MealStore";
import { IMeal } from "../../types/IMeal";
import styled from "styled-components";
import { IIngredient } from "../../types/IIngredient";
import { Row } from "../../lib/Row";
import { Typography } from "../../lib/Typography";
import { Column } from "../../lib/Column";
import { Input } from "../../lib/Input";
import colour from "../../lib/colour";

const Form = styled.form`
  flex: 1;
  background-color: ${colour.lightBlue};
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 64px;
  justify-content: space-between;
  align-items: start;
`;

const IngredientRow = styled(Row)`
  justify-content: space-evenly;
  width: 100%;
`;

function newIngredient(): IIngredient {
  return {
    name: "",
    quantity: 1,
    unit: "",
  };
}

export const AddMeal: React.FC = observer(() => {
  const mealStore = useContext(MealStoreContext);

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<IIngredient[]>([
    newIngredient(),
    newIngredient(),
    newIngredient(),
  ]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    const meal: IMeal = {
      name,
      ingredients,
    };

    mealStore.addMeal(meal);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const target: HTMLInputElement = e.target;
    setName(target.value);
  }

  function handleChangeIngredient(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const [index, field] = name.split(".");
    setIngredients((prevState) => {
      const newState = prevState.slice();
      newState.splice(Number(index), 1, {
        ...newState[Number(index)],
        [field]: value,
      });
      return newState;
    });
  }

  function addIngredient() {
    setIngredients((prevState) => [...prevState, newIngredient()]);
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Add a new meal</h2>

      <Column>
        <label htmlFor="name">
          <Typography>Name</Typography>
        </label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
        />
      </Column>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <IngredientRow key={index}>
          <Column>
            <label htmlFor={`${index}.name`}>
              <Typography>Name</Typography>
            </label>
            <Input
              type="text"
              name={`${index}.name`}
              value={ingredient.name}
              onChange={handleChangeIngredient}
            />
          </Column>
          <Column>
            <label htmlFor={`${index}.quantity`}>
              <Typography>Quantity</Typography>
            </label>
            <Input
              type="number"
              name={`${index}.quantity`}
              value={ingredient.quantity}
              onChange={handleChangeIngredient}
            />
          </Column>
          <Column>
            <label htmlFor={`${index}.unit`}>
              <Typography>Unit</Typography>
            </label>
            <Input
              type="text"
              name={`${index}.unit`}
              value={ingredient.unit}
              onChange={handleChangeIngredient}
            />
          </Column>
        </IngredientRow>
      ))}
      <button type="button" onClick={addIngredient}>
        + add ingredient
      </button>
      <button>submit</button>
    </Form>
  );
});
