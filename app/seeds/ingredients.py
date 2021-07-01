from app.models import db, Ingredient


def seed_ingredients():

    demo1 = Ingredient(name='Egg')
    demo2 = Ingredient(name='Bacon')

    db.session.add(demo1)
    db.session.add(demo2)

    db.session.commit()


def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
