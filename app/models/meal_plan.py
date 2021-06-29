from .db import db
from .recipe_meal_plan import recipe_meal_plans

class MealPlan(db.Model):
    __tablename__ = 'meal_plans'

    id = db.Column(db.Integer, primary_key=True)
    start_day = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    owner = db.relationship("User", back_populates="meal_plan")

    recipes = db.relationship(
        "Recipe",
        secondary=recipe_meal_plans,
        back_populates="meal_plans"
    )
