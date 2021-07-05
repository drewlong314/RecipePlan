from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import RecipeForm
from app.models import Recipe, db, recipe_categories, Category, Ingredient, Recipe_Ingredient, Measurement

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
# @login_required
def get_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/', methods=['POST'])
def post_recipes():
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe(
            name=form.data['name'],
            description=form.data['description'],
            image=form.data['image'],
            servings=form.data['servings'],
            time=form.data['time'],
            instructions=form.data['instructions'],
            user_id=form.data['user_id'],
            day=form.data['day'],
            plan_category=form.data['plan_category'],
        )
        db.session.add(recipe)
        db.session.commit()
        for category in form.data['category']:
            if category != 0:
                recipe.categories.append(
                    Category.query.filter_by(id=category).first())
        for ingredient in form.data['ingredient_list']:
            check_ingredient = Ingredient.query.filter_by(name=ingredient[2]).first()
            if check_ingredient is None:
                check_ingredient = Ingredient(name=ingredient[2])
                db.session.add(check_ingredient)
                db.session.commit()
            measurement_id = Measurement.query.filter_by(name=ingredient[1]).first()
            recipe_ingredients = Recipe_Ingredient(
                ingredient_id=check_ingredient.to_dict()['id'],
                recipe_id=recipe.to_dict()['id'],
                amount=ingredient[0],
                measurement_id=measurement_id.id,)
            db.session.add(recipe_ingredients)
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
    print("********************", recipe.to_dict())
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
        recipe.categories = []
        for category in form.data['category']:
            if category != 0:
                recipe.categories.append(
                    Category.query.filter_by(id=category).first())
        print('###########################', recipe.categories)
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
