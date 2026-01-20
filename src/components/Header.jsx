import React from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import AddRecipeDialog from "./AddRecipeDialog";
import { ModeToggle } from "./mode-toggle";

const Header = ({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    showFavoritesOnly,
    toggleShowFavorites,
    onAddRecipe,
}) => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                <div
                    className="cursor-pointer text-2xl font-bold tracking-tight text-primary"
                    onClick={() => window.location.reload()}
                >
                    <img
                        src="/cooking-pot.svg"
                        alt="Cooking Pot"
                        className="inline-block mr-2 h-8 w-8 text-primary"
                    />
                    RecipeBox
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden md:block w-[150px] lg:w-[250px]">
                        <Input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="h-9"
                        />
                    </div>

                    <div className="hidden sm:block w-[140px]">
                        <Select
                            value={selectedCategory}
                            onValueChange={onCategoryChange}
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <AddRecipeDialog
                        onAddRecipe={onAddRecipe}
                        categories={categories}
                    />

                    <Button
                        variant={showFavoritesOnly ? "default" : "outline"}
                        size="icon"
                        onClick={toggleShowFavorites}
                        className="h-9 w-9"
                        title={
                            showFavoritesOnly
                                ? "Show all recipes"
                                : "Show favorites only"
                        }
                    >
                        <Heart
                            className={`h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`}
                        />
                        <span className="sr-only">Toggle favorites</span>
                    </Button>

                    <ModeToggle />
                </div>
            </div>
            {/* Mobile Search Bar - showing below header on small screens if needed, 
          but for now let's keep it simple and assume the desktop one shrinks properly or 
          we rely on the user to scroll. Or add a secondary row.*/}
            <div className="md:hidden px-4 pb-2 border-b bg-background/95">
                <Input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-9 w-full"
                />
            </div>
        </header>
    );
};

export default Header;
