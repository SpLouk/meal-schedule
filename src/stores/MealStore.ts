import { observable } from "mobx";
import { Firestore } from "./Firebase";
import { IMeal } from "../types/IMeal";
import { createContext } from "react";

export class MealStore {
  @observable
  collection = Firestore.collection("meals");

  @observable
  meals: IMeal[] = [];

  constructor() {
    this.fetchMeals();
  }

  fetchMeals = async () => {
    const snapshot = await this.collection.get();
    this.meals = snapshot.docs.map((doc) => doc.data() as IMeal);
    return this.meals;
  };

  addMeal = async (meal: IMeal) => {
    const res = await this.collection.add(meal);

    return res;
  };
}

export const MealStoreContext = createContext<MealStore>({} as MealStore);
