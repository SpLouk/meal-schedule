const meals = "/meals";

export const mealPath = (id: string) => `${meals}/${id}`;
export const editMealPath = (id: string) => `${mealPath(id)}/edit`;
const mealPathGeneric = mealPath(":id");

const calendar = "/calendar";

const path = {
  home: "/",
  calendar,
  meals,
  meal: mealPathGeneric,
  editMeal: editMealPath(":id"),
  newMeal: `${meals}/new`,
};

export default path;
