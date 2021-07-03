from .db import db


class Recipe_Ingredient(db.Model):
    __tablename__ = 'recipe_ingredients'
    ingredient_id = db.Column(db.Integer, db.ForeignKey(
        'ingredients.id'), primary_key=True, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(
        'recipes.id'), primary_key=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    measurement_id = db.Column(db.Integer, db.ForeignKey('measurements.id'))
    recipes = db.relationship("Recipe", back_populates="recipe_ingredients")
    ingredients = db.relationship("Ingredient", back_populates="recipe_ingredients")
# recipe_ingredients = db.Table(
#     'recipe_ingredient',
#     db.Column(
#         "ingredient_id",
#         db.Integer,
#         db.ForeignKey("ingredients.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "recipe_id",
#         db.Integer,
#         db.ForeignKey("recipes.id"),
#         primary_key=True
#     )
# )
