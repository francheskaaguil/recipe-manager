
import type { SavedRecipe, NewRecipe, RecipePatch } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  const stored = localStorage.getItem(KEY);
  if (stored === null) return [];

  try {
    const rows: unknown = JSON.parse(stored);
    if (!Array.isArray(rows)) {
      throw new Error("Saved recipes must be a JSON array.");
    }
    return rows as SavedRecipe[];
  } catch (error) {
    console.error("Could not read saved recipes from localStorage; resetting the saved list.", error);
    localStorage.removeItem(KEY);
    return [];
  }
};

const write = (rows: SavedRecipe[]) =>
  localStorage.setItem(KEY, JSON.stringify(rows));

export const getRecipes = async (): Promise<SavedRecipe[]> => read();

export const deleteRecipe = async (id: string): Promise<{ id: string }> => {
  write(read().filter((recipe) => recipe.id !== id));
  return { id };
};

export const createRecipe = async (
  recipe: NewRecipe,
): Promise<SavedRecipe> => {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
};

export const updateRecipe = async ({
  id,
  ...patch
}: RecipePatch): Promise<SavedRecipe> => {
  let updated: SavedRecipe | undefined;
  const rows = read().map((recipe) => {
    if (recipe.id !== id) return recipe;
    updated = { ...recipe, ...patch };
    return updated;
  });

  if (!updated) throw new Error(`Saved recipe "${id}" was not found.`);

  write(rows);
  return updated;
};
