from app.models import db, recipe_meal_plans


def seed_recipe_meal_plans():
    db.session.execute(recipe_meal_plans.insert().values(meal_plan_id=1,recipe_id=1));
    db.session.execute(recipe_meal_plans.insert().values(meal_plan_id=1,recipe_id=2));
    db.session.commit()


def undo_recipe_meal_plans():
    db.session.execute('TRUNCATE recipe_meal_plans RESTART IDENTITY CASCADE;')
    db.session.commit()
