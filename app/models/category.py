from .db import db
from .recipe_category import recipe_categories


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    recipes = db.relationship(
        "Recipe",
        secondary=recipe_categories,
        back_populates="categories"
    )
