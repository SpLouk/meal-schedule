import {IIngredient} from "./IIngredient";

export interface IMeal {
  name: string | undefined;
  ingredients: IIngredient[] | undefined;
}