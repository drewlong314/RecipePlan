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
            plan_category=form.data['plan_category'],
        )
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict()
    else:
        return form.errors


@recipe_routes.route('/<id>')
def get_specific_recipes(id):
    recipe = Recipe.query.get(id)
    return recipe.to_dict()


@recipe_routes.route('/<id>', methods=['PUT'])
def edit_recipes(id):
    recipe = Recipe.query.get(id)
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe.name = form.data['name']
        recipe.description = form.data['description']
        recipe.image = form.data['image']
        recipe.servings = form.data['servings']
        recipe.time = form.data['time']
        recipe.instructions = form.data['instructions']
        recipe.user_id = form.data['user_id']
        recipe.day = form.data['day']
        recipe.plan_category = form.data['plan_category']
        db.session.commit()
        return recipe.to_dict()
    else:
        return form.errors


@recipe_routes.route('/<id>', methods=['DELETE'])
def delete_recipes(id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    return recipe.to_dict()
