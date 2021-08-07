from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import RecipeForm
from app.models import Recipe, db, recipe_categories, Category, Ingredient, Recipe_Ingredient, Measurement

recipe_routes = Blueprint('recipes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@recipe_routes.route('/<id>')
# @login_required
def get_recipes(id):
    recipes = Recipe.query.filter(Recipe.user_id == id).all()
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
            check_ingredient = Ingredient.query.filter_by(
                name=ingredient['ingredient']).first()
            if check_ingredient is None:
                check_ingredient = Ingredient(
                    name=ingredient['ingredient'])
                db.session.add(check_ingredient)
                db.session.commit()
            measurement_id = Measurement.query.filter_by(
                name=ingredient['measurement']).first()
            recipe_ingredients = Recipe_Ingredient(
                ingredient_id=check_ingredient.to_dict()['id'],
                recipe_id=recipe.to_dict()['id'],
                amount=ingredient['quantity'],
                measurement_id=measurement_id.id,)
            db.session.add(recipe_ingredients)
            db.session.commit()
        return recipe.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}


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
        print('This made it in')
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
            if category['id']:
                recipe.categories.append(
                    Category.query.filter_by(id=category['id']).first())
            elif category != 0:
                recipe.categories.append(
                    Category.query.filter_by(id=category).first())
        print(form.data['ingredient_list'], '-------------------------')
        for ingredient in form.data['ingredient_list']:
            check_ingredient = Ingredient.query.filter_by(
                name=ingredient['ingredient']).first()
            if check_ingredient is None:
                check_ingredient = Ingredient(name=ingredient['ingredient'])
                db.session.add(check_ingredient)
                db.session.commit()
            measurement_id = Measurement.query.filter_by(
                name=ingredient['measurement']).first()
            check_recipe_ingredients = Recipe_Ingredient.query.filter_by(
                ingredient_id=check_ingredient.to_dict()['id'], recipe_id=recipe.to_dict()['id']).first()
            if check_recipe_ingredients is None:
                recipe_ingredients = Recipe_Ingredient(
                    ingredient_id=check_ingredient.to_dict()['id'],
                    recipe_id=recipe.to_dict()['id'],
                    amount=ingredient['quantity'],
                    measurement_id=measurement_id.id,)
                db.session.add(recipe_ingredients)
                db.session.commit()
            else:
                check_recipe_ingredients.ingredient_id = check_ingredient.to_dict()['id']
                check_recipe_ingredients.recipe_id = recipe.to_dict()['id']
                check_recipe_ingredients.amount = ingredient['quantity']
                check_recipe_ingredients.measurement_id = measurement_id.id
        db.session.commit()
        return recipe.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}


@recipe_routes.route('/<id>', methods=['DELETE'])
def delete_recipes(id):
    recipe = Recipe.query.get(id)
    recipe_ingredient_to_delete = Recipe_Ingredient.query.filter_by(
        recipe_id=id).all()
    for rec_ing in recipe_ingredient_to_delete:
        db.session.delete(rec_ing)
    db.session.delete(recipe)
    db.session.commit()
    return recipe.to_dict()


@recipe_routes.route('/convert', methods=['POST'])
def convert_recipes():
    requestItems = request.get_json()
    requestItems['amount']
    measurement = Measurement.query.filter_by(
        id=requestItems['measurement']).first()
    ingredient = Ingredient.query.filter_by(
        id=requestItems['ingredient']).first()
    measurement_name = measurement.to_dict()['name']
    ingredient_name = ingredient.to_dict()['name']
    return {'info': [measurement_name, ingredient_name]}
