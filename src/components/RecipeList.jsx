import React, { useState } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Users, Heart, ImageOff } from "lucide-react";

/**
 * Individual Recipe Card Component
 * Handles its own image loading state
 */
const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <Card
            className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            onClick={() => onSelect(recipe)}
        >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {imageLoading && (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                )}
                {imageError || !recipe.image ? (
                    <Skeleton className="flex h-full w-full items-center justify-center">
                        <ImageOff className="h-10 w-10 text-muted-foreground/50" />
                    </Skeleton>
                ) : (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                        loading="lazy"
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                        }}
                    />
                )}

                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe.id);
                    }}
                >
                    <Heart
                        className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                </Button>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 text-lg font-semibold leading-tight">
                        {recipe.title}
                    </h3>
                </div>
                <Badge variant="secondary" className="w-fit">
                    {recipe.category}
                </Badge>
            </CardHeader>

            <CardFooter className="flex justify-between p-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookingTime} mins</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} serves</span>
                </div>
            </CardFooter>
        </Card>
    );
};

const RecipeList = ({ recipes, onSelectRecipe, favorites, toggleFavorite }) => {
    if (recipes.length === 0) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-muted-foreground">
                <h2 className="text-xl font-semibold">No recipes found</h2>
                <p>Try adjusting your search or category filters.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:px-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onSelect={onSelectRecipe}
                        isFavorite={favorites.has(recipe.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
