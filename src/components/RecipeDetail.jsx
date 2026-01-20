import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft, Clock, Users, Heart, ImageOff, Trash2 } from "lucide-react";

const RecipeDetail = ({
    recipe,
    onBack,
    isFavorite,
    toggleFavorite,
    onDelete,
}) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-8">
            <div className="mb-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="gap-2 pl-0 hover:bg-transparent hover:pl-2 cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Recipes
                </Button>
                {onDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4 " />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the recipe from your
                                    library.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        onDelete();
                                        toast.success("Recipe deleted");
                                    }}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <Card className="overflow-hidden">
                <div className="relative h-[300px] w-full bg-muted md:h-[400px]">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 h-full w-full" />
                    )}

                    {imageError || !recipe.image ? (
                        <Skeleton className="flex h-full w-full items-center justify-center">
                            <ImageOff className="h-20 w-20 text-muted-foreground/50" />
                        </Skeleton>
                    ) : (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageLoading(false);
                                setImageError(true);
                            }}
                        />
                    )}

                    {!imageLoading && !imageError && recipe.image && (
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    )}

                    <div
                        className={`absolute bottom-0 left-0 p-6 md:p-8 ${imageError || !recipe.image ? "text-foreground" : "text-white"}`}
                    >
                        <Badge
                            className={`mb-2 backdrop-blur-sm ${imageError || !recipe.image ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/20 text-white hover:bg-white/30"}`}
                        >
                            {recipe.category}
                        </Badge>
                        <h1 className="text-3xl font-bold md:text-5xl">
                            {recipe.title}
                        </h1>
                    </div>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
                        onClick={toggleFavorite}
                    >
                        <Heart
                            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                        />
                    </Button>
                </div>

                <div className="p-6 md:p-10">
                    <div className="mb-8 flex flex-wrap gap-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <div>
                                <span className="block text-xs uppercase tracking-wider">
                                    Prep Time
                                </span>
                                <span className="font-semibold text-foreground">
                                    {recipe.cookingTime} mins
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <div>
                                <span className="block text-xs uppercase tracking-wider">
                                    Servings
                                </span>
                                <span className="font-semibold text-foreground">
                                    {recipe.servings} people
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
                        <div>
                            <h3 className="mb-4 text-2xl font-semibold tracking-tight">
                                Ingredients
                            </h3>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start text-sm"
                                    >
                                        <span className="mr-3 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-semibold tracking-tight">
                                Instructions
                            </h3>
                            <ol className="relative space-y-6 border-l border-muted pl-6">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="relative">
                                        <span className="absolute -left-[2.2rem] flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-4 ring-background">
                                            {index + 1}
                                        </span>
                                        <p className="leading-relaxed text-muted-foreground">
                                            {step}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default RecipeDetail;
