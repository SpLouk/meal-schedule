import { computed, observable } from "mobx";
import { Firestore } from "./Firebase";
import { IMeal } from "../types/IMeal";
import { createContext } from "react";
import { keyBy } from "lodash";

type IMealInternal = Omit<IMeal, "id">;

export class MealStore {
  @observable
  collection = Firestore.collection("meals");

  @observable
  meals: IMeal[] = [];

  @computed
  get mealsById() {
    return keyBy(this.meals, "id");
  }

  constructor() {
    this.fetchMeals();
  }

  fetchMeals = async (): Promise<IMeal[]> => {
    const snapshot = await this.collection.get();
    this.meals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as IMealInternal),
    }));
    return this.meals;
  };

  addMeal = async (meal: IMeal): Promise<IMeal> => {
    delete meal.id;
    const res = await this.collection.add(meal);
    const doc = await res.get();
    const newMeal: IMeal = {
      id: doc.id,
      ...(doc.data() as IMealInternal),
    };

    this.meals.push(newMeal);

    return newMeal;
  };

  updateMeal = async (meal: IMeal): Promise<IMeal> => {
    const id = meal.id;
    delete meal.id;
    await this.collection.doc(id).update(meal);
    await this.fetchMeals();
    return this.mealsById[id!];
  };
}

export const MealStoreContext = createContext<MealStore>({} as MealStore);
