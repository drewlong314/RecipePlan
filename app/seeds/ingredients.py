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
    n = Ingredient(name='soy sauce')
    o = Ingredient(name='sesame oil')
    p = Ingredient(name='vegetable oil')
    q = Ingredient(name='quinoa')
    r = Ingredient(name='hamachi')
    s = Ingredient(name='grapeseed oil')
    t = Ingredient(name='sesame seeds')

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
    db.session.add(n)
    db.session.add(o)
    db.session.add(p)
    db.session.add(q)
    db.session.add(r)
    db.session.add(s)
    db.session.add(t)

    db.session.commit()


def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
