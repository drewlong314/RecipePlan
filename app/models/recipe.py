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
    plan_category = db.Column(db.String)

    owner = db.relationship("User", back_populates="recipe")
    recipe_ingredients = db.relationship(
        "Recipe_Ingredients", back_populates="recipes")
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

    # ingredients = db.relationship(
    #     "Ingredient",
    #     secondary=recipe_ingredients,
    #     back_populates="recipes"
    # )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
            "servings": self.servings,
            "time": self.time,
            "instructions": self.instructions,
            "user_id": self.user_id,
            "day": self.day,
            "plan_category": self.plan_category,
            "categories": [category.to_dict() for category in self.categories]
        }
