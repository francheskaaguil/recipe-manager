import { useState } from "react";
import { useCategories } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import type { SavedRecipe } from "@/features/recipes/recipes.types";
import CategoryFilter from "@/components/CategoryFilter";
import EditRecipeForm from "@/components/EditRecipeForm";
import RecipeList from "@/components/RecipeList";
import SummaryBar from "@/components/SummaryBar";

export default function SavedPage() {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);
  const { query, saved, favoriteCount, update, remove, toggleFavorite } =
    useSavedRecipes();
  const categories = useCategories();
  const visible =
    filter === "All"
      ? saved
      : saved.filter((recipe) => recipe.category === filter);

  return (
    <>
      <SummaryBar total={saved.length} favorites={favoriteCount} />
      {categories.isError && (
        <div className="alert alert-error">
          <span>Could not load recipe categories. Check your connection.</span>
        </div>
      )}
      <CategoryFilter
        categories={categories.data ?? []}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      {query.isPending && (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
      {query.isError && (
        <div className="alert alert-error">
          <span>Could not load saved recipes from this browser.</span>
        </div>
      )}
      {query.data && (
        <RecipeList
          recipes={visible}
          onToggleFavorite={toggleFavorite}
          onEdit={setEditing}
          onDelete={remove.mutate}
          deletingId={remove.isPending ? (remove.variables ?? null) : null}
        />
      )}
      {editing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <EditRecipeForm
              recipe={editing}
              onSave={(patch) => {
                update.mutate(patch);
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
              isSaving={update.isPending}
            />
          </div>
        </div>
      )}
    </>
  );
}
