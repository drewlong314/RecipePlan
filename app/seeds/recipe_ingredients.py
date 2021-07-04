from app.models import db, Recipe_Ingredient


def seed_recipe_ingredients():
    demo = Recipe_Ingredient(ingredient_id=1, recipe_id=1, amount=5, measurement_id=1)

    db.session.add(demo)

    db.session.commit()


def undo_recipe_ingredients():
    db.session.execute('TRUNCATE recipe_ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
