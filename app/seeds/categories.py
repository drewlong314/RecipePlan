from app.models import db, Category


def seed_categories():

    breakfast = Category(name='Breakfast')
    lunch = Category(name='Lunch')
    dinner = Category(name='Dinner')
    dessert = Category(name='Dessert')
    db.session.add(breakfast)
    db.session.add(lunch)
    db.session.add(dinner)
    db.session.add(dessert)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
