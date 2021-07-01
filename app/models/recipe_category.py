from .db import db

recipe_categories = db.Table(
    'recipe_category',
    db.Model.metadata,
    db.Column(
        "category_id",
        db.Integer,
        db.ForeignKey("categories.id"),
        primary_key=True
    ),
    db.Column(
        "recipe_id",
        db.Integer,
        db.ForeignKey("recipes.id"),
        primary_key=True
    )
)
