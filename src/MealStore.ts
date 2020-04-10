import { singletonGetter } from "./singletonGetter";
import { observable } from "mobx";
import { getFirebase } from "./Firebase";
import {Meal} from "./types/Meal";

class MealStore {
  @observable
  firestore = getFirebase().firestore;

  @observable
  meals: Meal[] = [];

  constructor() {
    this.fetchMeals();
  }

  fetchMeals = async () => {
    const snapshot = await this.firestore.collection("meals").get();
    this.meals = snapshot.docs.map(doc => doc.data() as Meal);
    return this.meals;
  };
}

export const getMealStore = singletonGetter(MealStore);
