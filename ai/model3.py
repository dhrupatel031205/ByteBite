import pandas as pd
import pulp
import gradio as gr
from datasets import load_dataset

# Load a public food recipe dataset from Hugging Face
dataset = load_dataset("food101")
recipes_df = pd.DataFrame(dataset['train'])
   
def generate_recipe(available_ingredients):
    """Filters a dataset for recipes using available ingredients."""
    for index, row in recipes_df.iterrows():
        recipe_ingredients = row['ingredients'].split(', ')
        if all(ingredient.lower() in recipe_ingredients for ingredient in available_ingredients):
            return row['title'], row['instructions']
    return "No matching recipe found!", ""

def optimize_menu_cost(dishes, ingredient_costs, target_profit=20):
    """Uses Linear Programming to optimize dish pricing."""
    model = pulp.LpProblem("Menu_Cost_Optimization", pulp.LpMaximize)
    dish_prices = {dish: pulp.LpVariable(dish, lowBound=0) for dish in dishes}
    
    # Objective: Maximize Profit
    model += pulp.lpSum([dish_prices[dish] - sum(ingredient_costs[dish]) for dish in dishes])
    
    # Constraints: Ensure minimum profit margin
    for dish in dishes:
        model += dish_prices[dish] >= sum(ingredient_costs[dish]) * (1 + target_profit / 100)
    
    model.solve()
    
    return {dish: pulp.value(dish_prices[dish]) for dish in dishes}

def custom_dish_creator(available_ingredients):
    """Generates a custom dish by searching dataset."""
    return generate_recipe(available_ingredients)

def gradio_interface(ingredients):
    """Gradio UI to interact with AI-driven menu optimization."""
    ingredients_list = [ingredient.strip().lower() for ingredient in ingredients.split(",")]
    recipe_title, recipe_instructions = generate_recipe(ingredients_list)
    custom_dish = custom_dish_creator(ingredients_list)
    optimized_costs = optimize_menu_cost({"Example Dish": ingredients_list}, {"Example Dish": [0.5, 1.2]})
    
    return recipe_title, recipe_instructions, custom_dish, optimized_costs

gr.Interface(
    fn=gradio_interface,
    inputs=[gr.Textbox(label="Available Ingredients (comma separated)")],
    outputs=[gr.Textbox(label="Recipe Title"),
             gr.Textbox(label="Recipe Instructions"),
             gr.Textbox(label="Custom Dish"),
             gr.JSON(label="Optimized Pricing")]
).launch(server_name="0.0.0.0",server_port=7862)
