from app.models import db, recipe_categories


def seed_recipe_categories():
    db.session.execute(recipe_categories.insert().values(category_id=3, recipe_id=1));
    db.session.execute(recipe_categories.insert().values(category_id=1,recipe_id=2));
    db.session.commit()

    # new_recipe = recipe_categories(
    #     category_id=4,
    #     recipe_id=1
    # )


def undo_recipe_categories():
    db.session.execute('TRUNCATE recipe_category RESTART IDENTITY CASCADE;')
    db.session.commit()
