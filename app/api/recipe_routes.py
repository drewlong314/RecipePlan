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
    print('--------------', form.data)
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

# @user_routes.route('/<int:id>')
# # @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
