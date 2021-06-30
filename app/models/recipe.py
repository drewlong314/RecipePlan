from .db import db
from .recipe_meal_plan import recipe_meal_plans
from .recipe_category import recipe_categories
from .recipe_ingredient import recipe_ingredients

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    day = db.Column(db.String)
    planCategory = db.Column(db.String)

    owner = db.relationship("User", back_populates="recipe")

    meal_plans = db.relationship(
        "MealPlan",
        secondary=recipe_meal_plans,
        back_populates="recipes"
    )

    categories = db.relationship(
        "Category",
        secondary=recipe_categories,
        back_populates="recipes"
    )

    ingredients = db.relationship(
        "Ingredient",
        secondary=recipe_ingredients,
        back_populates="recipes"
    )
