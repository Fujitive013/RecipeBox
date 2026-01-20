import { useState, useMemo, useEffect } from "react";
import "./App.css";
import recipesData from "./recipes.json";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import { Toaster } from "@/components/ui/sonner";
import AddRecipeDialog from "./components/AddRecipeDialog";

function App() {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Initialize recipes from localStorage or JSON
    const [recipes, setRecipes] = useState(() => {
        const savedRecipes = localStorage.getItem("myRecipes");
        if (savedRecipes) {
            try {
                return JSON.parse(savedRecipes);
            } catch (e) {
                console.error("Failed to parse recipes", e);
                return recipesData.recipes;
            }
        }
        return recipesData.recipes;
    });

    // Initialize favorites from localStorage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("recipeFavorites");
        if (saved) {
            try {
                return new Set(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites", e);
                return new Set();
            }
        }
        return new Set();
    });

    // Initialize categories
    const categories = useMemo(() => {
        const cats = new Set(recipes.map((r) => r.category));
        return Array.from(cats).sort();
    }, [recipes]);

    // Save recipes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("myRecipes", JSON.stringify(recipes));
    }, [recipes]);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(
            "recipeFavorites",
            JSON.stringify(Array.from(favorites)),
        );
    }, [favorites]);

    const toggleFavorite = (recipeId) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            if (next.has(recipeId)) {
                next.delete(recipeId);
            } else {
                next.add(recipeId);
            }
            return next;
        });
    };

    const handleAddRecipe = (newRecipeData) => {
        const newId = Math.max(...recipes.map((r) => r.id), 0) + 1;
        const newRecipe = { id: newId, ...newRecipeData };
        setRecipes([newRecipe, ...recipes]);
    };

    const handleDeleteRecipe = (recipeId) => {
        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        if (selectedRecipe && selectedRecipe.id === recipeId) {
            setSelectedRecipe(null);
        }
    };

    // Filter recipes based on search, category, and favorites
    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            const matchesSearch =
                recipe.title
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase()) ||
                recipe.ingredients.some((ing) =>
                    ing
                        .toLowerCase()
                        .includes(debouncedSearchTerm.toLowerCase()),
                );
            const matchesCategory =
                selectedCategory === "All" ||
                recipe.category === selectedCategory;

            const matchesFavorite =
                !showFavoritesOnly || favorites.has(recipe.id);

            return matchesSearch && matchesCategory && matchesFavorite;
        });
    }, [
        recipes,
        debouncedSearchTerm,
        selectedCategory,
        showFavoritesOnly,
        favorites,
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                showFavoritesOnly={showFavoritesOnly}
                toggleShowFavorites={() =>
                    setShowFavoritesOnly((prev) => !prev)
                }
                onAddRecipe={handleAddRecipe}
            />

            {selectedRecipe ? (
                <RecipeDetail
                    recipe={selectedRecipe}
                    onBack={() => setSelectedRecipe(null)}
                    isFavorite={favorites.has(selectedRecipe.id)}
                    toggleFavorite={() => toggleFavorite(selectedRecipe.id)}
                    onDelete={() => handleDeleteRecipe(selectedRecipe.id)}
                />
            ) : (
                <RecipeList
                    recipes={filteredRecipes}
                    onSelectRecipe={setSelectedRecipe}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            )}
            <Toaster />
        </div>
    );
}

export default App;
