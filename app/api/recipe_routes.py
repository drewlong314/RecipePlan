from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import RecipeForm
from app.models import Recipe, db, recipe_categories, Category, Ingredient, Recipe_Ingredient

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
        # for ingredient in form.data['ingredient']:
        # ingredinet = Ingredient.query.filter_by(name=form.data['ingredient']).first()
        # if ingredinet is None:
        #     ingredient_add = Ingredient(name=form.data['ingredient'])
        #     db.session.add(ingredient_add)
        #     # MAYBE ADD A DB.SESSION.COMMIT HERE
        #     e = recipe.to_dict()
        #     print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', e)
        #     recipe['ingredients'].append(ingredient_add)
        #     print('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', ingredient_add)
        ingredient_add = Ingredient(name=form.data['ingredient'])
        db.session.add(ingredient_add)
        db.session.commit()
        print('==============================', ingredient_add.to_dict()['id'])
        recipe_ingredients = Recipe_Ingredient(
            ingredient_id=ingredient_add.to_dict()['id'],
            recipe_id=recipe.to_dict()['id'],
            amount=3,
            measurement_id=1,)
        db.session.add(recipe_ingredients)
        db.session.commit()

        e = recipe.to_dict()
        print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', e)

        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", recipe.recipe_ingredients)
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
