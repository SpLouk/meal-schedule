const meals = "/meals";

export const mealPath = (id: string) => `${meals}/${id}`;
const mealPathGeneric = mealPath(":id");

const path = {
  home: "/",
  meals,
  meal: mealPathGeneric,
  newMeal: `${meals}/new`,
};

export default path;
