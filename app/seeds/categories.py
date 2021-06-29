from app.models import db, Category


def seed_categories():

    demo = Category(name='Breakfast')

    db.session.add(demo)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
