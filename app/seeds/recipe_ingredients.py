from app.models import db, Recipe_Ingredient


def seed_recipe_ingredients():
    a = Recipe_Ingredient(ingredient_id=1, recipe_id=1, amount=1, measurement_id=13)
    b = Recipe_Ingredient(ingredient_id=2, recipe_id=1, amount=2, measurement_id=2)
    c = Recipe_Ingredient(ingredient_id=3, recipe_id=1, amount=1, measurement_id=2)
    d = Recipe_Ingredient(ingredient_id=4, recipe_id=1, amount=1, measurement_id=1)
    e = Recipe_Ingredient(ingredient_id=5, recipe_id=1, amount=3, measurement_id=10)
    f = Recipe_Ingredient(ingredient_id=6, recipe_id=1, amount=8, measurement_id=16)
    g = Recipe_Ingredient(ingredient_id=7, recipe_id=1, amount=1, measurement_id=3)
    h = Recipe_Ingredient(ingredient_id=8, recipe_id=1, amount=2, measurement_id=2)
    i = Recipe_Ingredient(ingredient_id=9, recipe_id=1, amount=2, measurement_id=3)
    j = Recipe_Ingredient(ingredient_id=10, recipe_id=1, amount=1, measurement_id=4)
    k = Recipe_Ingredient(ingredient_id=11, recipe_id=1, amount=1, measurement_id=4)
    l = Recipe_Ingredient(ingredient_id=12, recipe_id=1, amount=1, measurement_id=1)
    m = Recipe_Ingredient(ingredient_id=13, recipe_id=1, amount=1, measurement_id=3)

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


def undo_recipe_ingredients():
    db.session.execute('TRUNCATE recipe_ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
