from flask import Blueprint
from app.models import Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


@ingredient_routes.route('/')
def get_ingredients():
    ingredients = Ingredient.query.all()
    return {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}
