const meals = "/meals";

export const mealPath = (id: string) => `${meals}/${id}`;
export const editMealPath = (id: string) => `${mealPath(id)}/edit`;
const mealPathGeneric = mealPath(":id");

const path = {
  home: "/",
  meals,
  meal: mealPathGeneric,
  editMeal: editMealPath(":id"),
  newMeal: `${meals}/new`,
};

export default path;
