from .db import db
from .recipe_ingredient import Recipe_Ingredient


class Measurement(db.Model):
    __tablename__ = 'measurements'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    recipe_ingredients = db.relationship("Recipe_Ingredient")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
