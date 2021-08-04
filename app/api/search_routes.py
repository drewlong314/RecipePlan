from flask import Blueprint, jsonify
from app.models import Recipe

search_routes = Blueprint('search', __name__)


@search_routes.route('/<input>')
def user(input):
    splitInput = input.split(' ')
    recipes = []
    
    for word in splitInput:
        results = Recipe.query.filter(Recipe.name.ilike(f"%{word}%") | Recipe.description.ilike(f"%{word}%")).all()
        for recipe in results:
            if recipe not in recipes:
                recipes.append(recipe)
    return {"recipes": [recipe.to_dict() for recipe in recipes]}
