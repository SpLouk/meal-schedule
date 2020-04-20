import { IIngredient } from "./IIngredient";

export interface IMeal {
  id: string | undefined;
  name: string | undefined;
  ingredients: IIngredient[] | undefined;
}
