
import { mealdb } from "@/lib/api";
import type {
  Meal,
  Recipe,
  SearchResponse,
  CategoriesResponse,
} from "./meals.types";

export function toRecipe(meal: Meal): Recipe {
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    return meal[`strIngredient${index + 1}`];
  }).filter((x): x is string => Boolean(x && x.trim()));

  return {
    mealId: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    thumb: meal.strMealThumb,
    ingredients,
    time: 0,
    notes: "",
    favorite: false,
  };
}

export async function searchMeals(query: string): Promise<Recipe[]> {
  const response = await mealdb.get<SearchResponse>("/search.php", {
    params: { s: query },
  });

  return (response.data.meals ?? []).map(toRecipe);
}

export async function getCategories(): Promise<string[]> {
  const response = await mealdb.get<CategoriesResponse>("/categories.php");

  return (response.data.categories ?? []).map(
    (category) => category.strCategory,
  );
}
