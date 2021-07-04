from app.models import db, Measurement


def seed_measurements():
    demo = Measurement(name='lbs')

    db.session.add(demo)

    db.session.commit()


def undo_measurements():
    db.session.execute('TRUNCATE measurements RESTART IDENTITY CASCADE;')
    db.session.commit()
