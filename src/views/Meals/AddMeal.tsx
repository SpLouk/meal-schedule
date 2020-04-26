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
import {Input, Select} from "../../lib/Input";
import colour from "../../lib/colour";
import { Button } from "../../lib/Button";
import { INGREDIENT_UNITS } from "../../lib/consts";

const Form = styled.form`
  flex: 1;
  background-color: ${colour.lightBlue};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 64px;
  justify-content: space-between;
  align-items: stretch;
`;

const IngredientsWrapper = styled.div`
  overflow: auto;
  height: 300px;
`;

const IngredientColumn = styled(Column)`
  flex: 1;
  padding: 0 8px;
`;

const NameColumn = styled(IngredientColumn)`
  flex: 2;
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
      id: undefined,
      name,
      ingredients,
    };

    mealStore.addMeal(meal);
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const target: HTMLInputElement = e.target;
    setName(target.value);
  }

  function handleChangeIngredient(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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
      <IngredientsWrapper>
        {ingredients.map((ingredient, index) => (
          <IngredientRow key={index}>
            <NameColumn>
              <label htmlFor={`${index}.name`}>
                <Typography>Name</Typography>
              </label>
              <Input
                type="text"
                name={`${index}.name`}
                value={ingredient.name}
                onChange={handleChangeIngredient}
              />
            </NameColumn>
            <IngredientColumn>
              <label htmlFor={`${index}.quantity`}>
                <Typography>Quantity</Typography>
              </label>
              <Input
                type="number"
                step="0.01"
                name={`${index}.quantity`}
                value={ingredient.quantity}
                onChange={handleChangeIngredient}
              />
            </IngredientColumn>
            <IngredientColumn>
              <label htmlFor={`${index}.unit`}>
                <Typography>Unit</Typography>
              </label>
              <Select name={`${index}.unit`} onChange={handleChangeIngredient}>
                <option value=""></option>
                {INGREDIENT_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </IngredientColumn>
          </IngredientRow>
        ))}
      </IngredientsWrapper>

      <Button type="button" onClick={addIngredient}>
        + add ingredient
      </Button>
      <Button>submit</Button>
    </Form>
  );
});
