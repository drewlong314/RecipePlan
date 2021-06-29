from .db import db

recipe_meal_plans = db.Table(
    'recipe_meal_plans',
    db.Column(
        "meal_plan_id",
        db.Integer,
        db.ForeignKey("meal_plans.id"),
        primary_key=True
    ),
    db.Column(
        "recipe_id",
        db.Integer,
        db.ForeignKey("recipes.id"),
        primary_key=True
    )
)
