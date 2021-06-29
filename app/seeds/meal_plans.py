from app.models import db, MealPlan


def seed_meal_plans():

    demo = MealPlan(start_day='Monday', user_id=1)

    db.session.add(demo)

    db.session.commit()


def undo_meal_plans():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
