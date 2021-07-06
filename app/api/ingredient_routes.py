from flask import Blueprint, request
from app.models import db, Ingredient, Recipe_Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


@ingredient_routes.route('/')
def get_ingredients():
    ingredients = Ingredient.query.all()
    return {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}


@ingredient_routes.route('/delete', methods=['DELETE'])
def delete_recipe_ingredient():
    r = request.get_json()
    recipe_ingredient_to_delete = Recipe_Ingredient.query.filter_by(ingredient_id=r['ingredient_id'], recipe_id=r['recipe_id']).first()
    db.session.delete(recipe_ingredient_to_delete)
    db.session.commit()
    return request.get_json()
