
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Clock, Users, Flame } from "lucide-react";
import { toast } from "sonner";

interface Recipe {
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
}

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error("Please add at least one ingredient!");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI recipe generation
    setTimeout(() => {
      const sampleRecipes = [
        {
          title: "Mediterranean Pasta Bowl",
          description: "A fresh and healthy pasta dish combining the best Mediterranean flavors",
          cookTime: "25 minutes",
          servings: 4,
          difficulty: "Easy",
          ingredients: [
            ...ingredients,
            "Olive oil",
            "Garlic",
            "Cherry tomatoes",
            "Fresh basil",
            "Parmesan cheese"
          ],
          instructions: [
            "Bring a large pot of salted water to boil and cook pasta according to package instructions",
            "Heat olive oil in a large pan and sauté minced garlic until fragrant",
            "Add cherry tomatoes and cook until they start to burst",
            "Add your main ingredients and cook for 5-7 minutes",
            "Toss with cooked pasta and fresh basil",
            "Serve with grated Parmesan cheese"
          ],
          tips: [
            "Use high-quality olive oil for the best flavor",
            "Don't overcook the vegetables to maintain their texture",
            "Add pasta water if the dish seems too dry"
          ]
        },
        {
          title: "Hearty Comfort Skillet",
          description: "A one-pan wonder that brings together your ingredients in perfect harmony",
          cookTime: "35 minutes",
          servings: 6,
          difficulty: "Medium",
          ingredients: [
            ...ingredients,
            "Onions",
            "Bell peppers",
            "Garlic powder",
            "Paprika",
            "Chicken broth"
          ],
          instructions: [
            "Preheat your oven to 375°F (190°C)",
            "Heat oil in an oven-safe skillet over medium-high heat",
            "Sauté onions and peppers until softened",
            "Add your main ingredients and season with spices",
            "Pour in chicken broth and bring to a simmer",
            "Transfer to oven and bake for 20-25 minutes"
          ],
          tips: [
            "Let the dish rest for 5 minutes before serving",
            "Garnish with fresh herbs for added flavor",
            "This recipe freezes well for meal prep"
          ]
        }
      ];

      const randomRecipe = sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)];
      setGeneratedRecipe(randomRecipe);
      setIsGenerating(false);
      toast.success("Recipe generated successfully!");
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <ChefHat className="w-5 h-5" />
            AI Recipe Generator
          </CardTitle>
          <CardDescription className="text-orange-700">
            Enter your available ingredients and let AI create a delicious recipe for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter an ingredient (e.g., chicken, tomatoes, rice)"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addIngredient} variant="outline">
              Add
            </Button>
          </div>
          
          {ingredients.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-orange-800">Your Ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient} ×
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            onClick={generateRecipe} 
            disabled={isGenerating || ingredients.length === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            {isGenerating ? "Generating Recipe..." : "Generate Recipe"}
          </Button>
        </CardContent>
      </Card>

      {generatedRecipe && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{generatedRecipe.title}</CardTitle>
            <CardDescription className="text-lg">{generatedRecipe.description}</CardDescription>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {generatedRecipe.cookTime}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {generatedRecipe.servings} servings
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Flame className="w-4 h-4" />
                {generatedRecipe.difficulty}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Ingredients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Instructions</h3>
              <ol className="space-y-3">
                {generatedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3">Chef's Tips</h3>
              <div className="space-y-2">
                {generatedRecipe.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                    <ChefHat className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-orange-800">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipeGenerator;
