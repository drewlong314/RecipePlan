from app.models import db, Ingredient


def seed_ingredients():

    a = Ingredient(name='boneless skinless chicken breast')
    b = Ingredient(name='kosher salt')
    c = Ingredient(name='black pepper')
    d = Ingredient(name='paprika')
    e = Ingredient(name='water')
    f = Ingredient(name='fettuccine')
    g = Ingredient(name='olive oil')
    h = Ingredient(name='minced garlic')
    i = Ingredient(name='unsalted butter')
    j = Ingredient(name='heavy cream')
    k = Ingredient(name='parmesan cheese')
    l = Ingredient(name='nutmeg')
    m = Ingredient(name='chopped parsley')

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)
    db.session.add(e)
    db.session.add(f)
    db.session.add(g)
    db.session.add(h)
    db.session.add(i)
    db.session.add(j)
    db.session.add(k)
    db.session.add(l)
    db.session.add(m)

    db.session.commit()


def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
