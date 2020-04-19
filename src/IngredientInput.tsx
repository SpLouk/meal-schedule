import * as React from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import { IIngredient } from "./types/IIngredient";

export const IngredientInput: React.FC = observer(() => {
  const [ingredient, changeIngredient] = useState<IIngredient>({
    name: "",
    quantity: 0,
    unit: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    changeIngredient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <h3>Ingredient</h3>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={ingredient.name}
        onChange={handleChange}
      />
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        name="quantity"
        value={ingredient.quantity}
        onChange={handleChange}
      />
      <label htmlFor="unit">Unit of measurement</label>
      <input
        type="text"
        name="unit"
        value={ingredient.unit}
        onChange={handleChange}
      />
    </>
  );
});
