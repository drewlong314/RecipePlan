from app.models import db, recipe_ingredients


def seed_recipe_ingredients():
    db.session.execute(recipe_ingredients.insert().values(ingredient_id=1,recipe_id=1));
    db.session.execute(recipe_ingredients.insert().values(ingredient_id=2,recipe_id=1));
    db.session.commit()


def undo_recipe_ingredients():
    db.session.execute('TRUNCATE recipe_ingredient RESTART IDENTITY CASCADE;')
    db.session.commit()
