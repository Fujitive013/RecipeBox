import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddRecipeDialog = ({ onAddRecipe, categories }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        cookingTime: "",
        servings: "",
        category: "",
        ingredients: "",
        instructions: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.category) {
            toast.error("Please select a category");
            return;
        }

        // Process form data
        const newRecipe = {
            title: formData.title,
            image: formData.image,
            cookingTime: Math.max(1, parseInt(formData.cookingTime)),
            servings: Math.max(1, parseInt(formData.servings)),
            category: formData.category,
            ingredients: formData.ingredients
                .split("\n")
                .filter((i) => i.trim()),
            instructions: formData.instructions
                .split("\n")
                .filter((i) => i.trim()),
        };

        onAddRecipe(newRecipe);
        toast.success("Recipe added successfully!");

        // Reset and close
        setFormData({
            title: "",
            image: "",
            cookingTime: "",
            servings: "",
            category: "",
            ingredients: "",
            instructions: "",
        });
        setOpen(false);
    };

    // Get unique categories for the dropdown (excluding "All")
    const categoryOptions = categories.filter((c) => c !== "All");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Recipe</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Recipe</DialogTitle>
                    <DialogDescription>
                        Create a new recipe to add to your collection.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Recipe Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Sinigang Mix"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image URL (Optional)</Label>
                        <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cookingTime">Time (mins)</Label>
                            <Input
                                id="cookingTime"
                                name="cookingTime"
                                type="number"
                                min="1"
                                value={formData.cookingTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="servings">Servings</Label>
                            <Input
                                id="servings"
                                name="servings"
                                type="number"
                                min="1"
                                value={formData.servings}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            required
                            onValueChange={handleCategoryChange}
                            value={formData.category}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOptions.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="ingredients">
                            Ingredients (one per line)
                        </Label>
                        <Textarea
                            id="ingredients"
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            placeholder="1 cup magic sarap&#10;5 pcs salt&#10;..."
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="instructions">
                            Instructions (one per line)
                        </Label>
                        <Textarea
                            id="instructions"
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            placeholder="Preheat pot...&#10;Mix ingredients...&#10;..."
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save Recipe</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRecipeDialog;
