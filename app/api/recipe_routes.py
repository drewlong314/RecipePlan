from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import RecipeForm
from app.models import Recipe, db, recipe_categories, Category

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
# @login_required
def get_recipes():
    recipes = Recipe.query.all()
    # print('**********', recipes)
    # recipe_category = recipe_categories.query.all()
    # recipe_category = db.session.execute(
    #     f"SELECT recipes.id, recipe_category.category_id FROM recipes JOIN recipe_category ON recipe_category.recipe_id=recipes.id JOIN categories ON categories.id=recipe_category.category_id")
    # print('___________________', recipe_category.fetchall())
    # recipe_category = Recipe.query.join(recipe_categories).join(Category).filter((recipe_categories.c.recipe_id == Recipe.id) & (recipe_categories.c.category_id == Category.id)).all()
    # recipe_category = Recipe.query.join(recipe_categories).join(Category).all()
    # print('this is the recipe category table', recipe_category)
    # for recipe in recipe_category:
        # print(recipe)
        # return_this = recipe.to_dict()
        # print("-----------------", return_this)
        # print('--------------', recipe.to_dict())
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

        category = Category.query.filter_by(id=form.data['category']).first()
        recipe.categories.append(category)
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
