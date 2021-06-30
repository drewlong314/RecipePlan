from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.forms import RecipeForm
from app.models import Recipe, db

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
# @login_required
def get_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/', methods=['POST'])
def post_recipes():
    # add a way to get the user id
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe(
            name=form.data['name'],
            description=form.data['description'],
            image=form.data['image'],  # change this
            servings=form.data['servings'],
            time=form.data['time'],
            instructions=form.data['instructions'],
            user_id=form.data['user_id'],
            # user_id=,
            day=form.data['day'],
            planCategory=form.data['planCategory'],
            )
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()
    else:
        return form.errors


@recipe_routes.route('/<id>', methods=['PUT'])
def put_recipes(id):
    recipe = Recipe.query.get(id)
    if request.get_json()['name']:
        recipe.name = request.get_json()['name']
    if request.get_json()['description']:
        recipe.description = request.get_json()['description']
    if request.get_json()['image']:
        recipe.image = request.get_json()['image']
    if request.get_json()['servings']:
        recipe.servings = request.get_json()['servings']
    if request.get_json()['time']:
        recipe.time = request.get_json()['time']
    if request.get_json()['instructions']:
        recipe.instructions = request.get_json()['instructions']

    db.session.commit()
    return "Put Request"


@recipe_routes.route('/<id>', methods=['DELETE'])
def delete_recipes(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    return "Delete Request"
