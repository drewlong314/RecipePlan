from .db import db
from .recipe_ingredient import recipe_ingredients


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    recipes = db.relationship(
        "Recipe",
        secondary=recipe_ingredients,
        back_populates="ingredients"
    )
