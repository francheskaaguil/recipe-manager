import type { Recipe } from "@/features/meals/meals.types";

/** A recipe stored in the browser's local collection. */
export interface SavedRecipe extends Recipe {
  id: string;
}

/** What we send to create one: everything except the id. */
export type NewRecipe = Recipe;

/** The id selects a row; the rest are only the fields that changed. */
export type RecipePatch = { id: string } & Partial<Omit<SavedRecipe, "id">>;
