from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .meal_plans import seed_meal_plans, undo_meal_plans
from .recipe_meal_plans import seed_recipe_meal_plans, undo_recipe_meal_plans
from .categories import seed_categories, undo_categories
from .recipe_categories import seed_recipe_categories, undo_recipe_categories
from .ingredients import seed_ingredients, undo_ingredients
from .recipe_ingredients import seed_recipe_ingredients, undo_recipe_ingredients
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_recipes()
    seed_meal_plans()
    seed_recipe_meal_plans()
    seed_categories()
    seed_recipe_categories()
    seed_ingredients()
    seed_recipe_ingredients()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipes()
    undo_meal_plans()
    undo_recipe_meal_plans()
    undo_categories()
    undo_recipe_categories()
    undo_ingredients()
    undo_recipe_ingredients()
    # Add other undo functions here
