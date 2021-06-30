from .db import db

recipe_ingredients = db.Table(
    'recipe_ingredient',
    db.Column(
        "ingredient_id",
        db.Integer,
        db.ForeignKey("ingredients.id"),
        primary_key=True
    ),
    db.Column(
        "recipe_id",
        db.Integer,
        db.ForeignKey("recipes.id"),
        primary_key=True
    )
)
