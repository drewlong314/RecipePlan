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

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    # This is for listing all recipes that have the same category,
    # without this there will be an infinite loop
    def to_other_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
