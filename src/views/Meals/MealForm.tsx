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
import { Input, Select } from "../../lib/Input";
import colour from "../../lib/colour";
import { Button } from "../../lib/Button";
import { INGREDIENT_UNITS } from "../../lib/consts";
import { media } from "../../lib/media";

const Form = styled.form`
  flex: 1;
  background-color: ${colour.lightBlue};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 64px;
  justify-content: space-between;
  align-items: stretch;

  ${media.lessThan("mobile")`
    padding: 16px;
  `}
`;

const IngredientsWrapper = styled.div`
  overflow: auto;
  height: 300px;

  ${media.lessThan("mobile")`
    height: unset;
  `}
`;

const IngredientColumn = styled(Column)`
  flex: 1;
  margin: 0 8px;
  width: 100%;
`;

const NameColumn = styled(IngredientColumn)`
  flex: 2;
`;

const IngredientRow = styled(Row)`
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  ${media.lessThan("mobile")`
    flex-direction: column;
    margin-bottom: 32px;
  `}
`;

const RemoveIngredientButton = styled.button`
  background: none;
  border: none;
  border-bottom: 1px solid ${colour.slate};
  padding: 0;
  margin: 0 16px;
  height: min-content;
  
  ${media.lessThan("mobile")`
    margin: 16px;
  `}
`;

function newIngredient(): IIngredient {
  return {
    name: "",
    quantity: 1,
    unit: "",
  };
}

interface IProps {
  meal: IMeal | undefined;
  onSave: (meal: IMeal) => void | undefined;
}

export const MealForm: React.FC<IProps> = observer(({ meal, onSave }) => {
  const mealStore = useContext(MealStoreContext);

  const [name, setName] = useState(meal?.name ?? "");
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    meal?.ingredients ?? [newIngredient(), newIngredient(), newIngredient()]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (meal === undefined) {
      const newMeal: IMeal = {
        id: undefined,
        name,
        ingredients,
      };
      const result = await mealStore.addMeal(newMeal);
      onSave(result);
    } else {
      const result = await mealStore.updateMeal({
        ...meal,
        name,
        ingredients,
      });
      onSave(result);
    }
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

  function removeIngredient(index: number) {
    setIngredients((prevState) => {
      const newState = prevState.slice();
      newState.splice(index, 1);
      return newState;
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      {meal === undefined ? <h2>Add a new meal</h2> : <h2>Edit {name}</h2>}

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
                step="0.1"
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
                  <option
                    key={unit}
                    value={unit}
                    selected={ingredient.unit === unit}
                  >
                    {unit}
                  </option>
                ))}
              </Select>
            </IngredientColumn>
            <RemoveIngredientButton
              type="button"
              onClick={() => removeIngredient(index)}
            >
              Remove Ingredient
            </RemoveIngredientButton>
          </IngredientRow>
        ))}
      </IngredientsWrapper>

      <Button type="button" onClick={addIngredient}>
        + Add Ingredient
      </Button>
      <Button>Save</Button>
    </Form>
  );
});
