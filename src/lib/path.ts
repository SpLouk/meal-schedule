const meals = "/meals";

export const mealPath = (id: string) => `${meals}/${id}`;
const mealPathGeneric = mealPath(":id");

const path = {
  meals,
  meal: mealPathGeneric,
  newMeal: `${meals}/new`,
};

export default path;
