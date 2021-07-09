from app.models import db, Recipe


def seed_recipes():

    a = Recipe(name='Chicken Alfredo',
                  description="Chicken alfredo combines a creamy pasta sauce with tender slices of lean protein. The white meat is butterflied for quick cooking and seasoned for maximum flavor. The heavy cream reduces until a smooth and velvety sauce is able to cling to the fettuccine noodles.",
                  image='https://www.jessicagavin.com/wp-content/uploads/2019/08/chicken-alfredo-8-1200.jpg',
                  servings=4,
                  time=50,
                  instructions="""Cut each chicken breast in half through the center to create two cutlets, four total.
                                Lightly season both sides with salt, pepper, and paprika.
                                Heat a large skillet over medium heat, once the pan is hot add the olive oil.
                                Add the chicken and cook for 6 minutes. Flip over and cook until the internal temperature reaches 160 to 165ºF (71 to 74ºC), about 5 to 7 minutes, turn off the heat.
                                Rest the chicken for 5 minutes and then slice into ½-inch thick pieces.
                                Wash and dry the pan to use for making the alfredo sauce.
                                Pasta
                                Bring 3 quarts of water and 1 ½ teaspoon salt to a boil in a large pot.
                                Add the noodles and cook until al dente, about 10 to 12 minutes, or according to manufacturers directions.
                                Place noodles in a colander and do not discard water.
                                While the noodles are cooking, make the alfredo sauce.
                                Heat a large skillet over medium-low heat.
                                Add the butter, once melted add the garlic and saute until fragrant, 30 to 60 seconds. Do not brown the butter or garlic.
                                Add the cream, ½ teaspoon salt, and pepper, stir to combine.
                                Bring the cream to a simmer over medium heat. Cook, stirring frequently, scraping the sides and bottom of the pan to make sure the cream does not curdle.
                                Reduce the sauce to about 1 cup, about 10 to 12 minutes. The sauce should be slightly thickened, coating the back of a spoon.
                                Turn off the heat and stir in the parmesan cheese and nutmeg. If the sauce is too thick, add in some of the pasta water or more cream, a few tablespoons at a time until the desired consistency is reached.
                                Add the pasta to the sauce, gently tossing to combine.
                                Divide the pasta among bowls, top with sliced chicken and chopped parsley.""",
                  user_id=1,
                  day="Monday",
                  plan_category="Dinner",
                  )
    b = Recipe(name='Teriyaki chicken',
                  description="Teriyaki chicken is an easy weeknight dinner ready in 30 minutes! Tender pieces of lean white meat stir-fry until lightly brown and juicy, then simmer in a flavorful sauce. This recipe is excellent for meal prep or for merely just enjoying leftovers the next day.",
                  image='https://www.jessicagavin.com/wp-content/uploads/2021/02/teriyaki-chicken-17-1200.jpg',
                  servings=2,
                  time=30,
                  instructions="""In a medium-sized bowl, combine chicken, 4 teaspoons soy sauce, ½ teaspoon sesame oil, salt, and black pepper. Allow it to marinate while preparing the sauce.
                                In a medium bowl, whisk together ¾ cup water, ⅓ cup soy sauce, honey, rice vinegar, rice wine, garlic, ginger, and ½ teaspoon sesame oil. Set aside.
                                In a small bowl, mix cornstarch and 2 tablespoons of water. Set aside.
                                Heat a wok or large skillet over high heat. Add oil. Once hot, add the chicken in a single layer. Without moving, cook until browned, about 3 minutes. Flip and stir-fry until no longer pink, about 2 minutes. Cook for 4 minutes if using thighs, draining any excess grease.
                                Add the teriyaki sauce mixture to the wok. Heat over high heat. Once the liquid begins to simmer, cook for 1 minute. Some bubbles should break the surface.
                                Stir the cornstarch slurry, then add to the sauce, quickly stir to combine. Continuously stir until it thickens and lightly coats the back of a spoon, about 60 seconds. The sauce will thicken more as it cools.
                                Garnish the chicken with sauce, sesame seeds, and green onions.""",
                  user_id=1,
                  day="Tuesday",
                  plan_category="Dinner",
                  )
    c = Recipe(name='Chicken Tomatillo Quinoa Bowls',
                  description="For a satisfying meal try these healthy chicken tomatillo quinoa bowls loaded with wholesome ingredients! Tender chicken is tossed in a spicy and creamy roasted tomatillo sauce for a flavor kick!",
                  image='https://www.jessicagavin.com/wp-content/uploads/2016/10/healthy-chicken-tomatillo-black-bean-and-quinoa-bowl-1200.jpg',
                  servings=2,
                  time=30,
                  instructions="""Pre-heat oven to 425°F. Remove the paper off of the tomatillos and place them on a large baking pan. Add jalapeño peppers, pasilla chilies and cut red onion to the same pan.
                                Drizzle the chilies with one tablespoon olive oil and sprinkle with salt and pepper.
                                Place the peeled garlic in foil, lightly drizzle with oil and wrap into a packet that is open from the top, place on the corner of the baking pan. Roast chilies, onion, and garlic for 40 minutes stirring chilies after 20 minutes. Meanwhile, prepare the quinoa and chicken.
                                Transfer the roasted chilies, onions, garlic and any juice on the pan to a blender or food processor. Add chicken broth, one teaspoon salt, and cilantro to the blender. Pulse on medium speed for about 30 seconds, or until the sauce is smooth.
                                Add 2 cups of sauce to a large saute pan and set aside. This recipe makes about 5 cups of sauce. You only need 2 cups. Save the extra sauce in the refrigerator for five days, or freeze.
                                Add 1 cup quinoa to a fine-mesh strainer. Rinse well with running water. Transfer to a pot with lid. Add 2 cups water and ½ teaspoon salt.
                                Bring to a boil, put a lid on then reduce to a simmer, over medium-low heat. Allow it to cook for 20 to 25 minutes, or until water is absorbed, then turn off the heat. Allow it to sit with the lid on for at least 5 minutes. Fluff quinoa with a fork when ready to serve.
                                Evenly season the chicken breasts with salt, pepper, and paprika on both sides. Heat 1 tablespoon oil in a large saute pan over medium-high heat. Once hot, add the chicken breasts to the pan. Reduce heat to medium and cook for 5 minutes. Flip and cook another 5 minutes on the other side, or until chicken is no longer pink. Transfer to a clean plate.
                                Once slightly cooled shred chicken into smaller pieces. Transfer to the saute pan that has 2 cups of tomatillo sauce. Turn heat to medium and warm chicken and sauce until hot. Turn off the heat and stir in 2 tablespoons yogurt. Taste season with more salt and pepper as desired.
                                Assemble bowls with quinoa, add tomatillo chicken and other desired toppings.""",
                  user_id=1,
                  day="Wednesday",
                  plan_category="Dinner",
                  )
    d = Recipe(name='Sesame Crusted Hamachi (Yellowtail)',
                  description="Sesame crusted hamachi sashimi (yellowtail) with edamame soba noodle salad is a simple yet elegant meal! Served with savory noodles and crisp vegetables. This post is sponsored by Luxe Gourmets.",
                  image='https://www.jessicagavin.com/wp-content/uploads/2016/07/sesame-crusted-hamachi-with-edamame-soba-noodle-salad-1200.jpg',
                  servings=2,
                  time=30,
                  instructions="""Prepare hamachi by ensuring that the fish is completely defrosted in the refrigerator (if frozen). Gently dry between two paper towels. Transfer to a sheet pan and set aside.
                                Add sesame seeds to a small pan and heat over medium-high heat. Toast for about 5 minutes, or until white sesame seeds, are lightly golden in color and fragrant. Move them around every minute to get even toasting with no burning. Transfer to a small bowl.
                                Lightly brush the hamachi with grapeseed oil on each side. Lightly season each side with salt and pepper.
                                Generously sprinkle the toasted sesame seeds on all 4 sides of the fish, until the surface is completely covered. Lightly press the seeds onto the surface. Lightly cover with plastic wrap and transfer to the refrigerator while you make the salad.
                                Cook soba noodles according to package directions. Drain noodles and rinse with cool water until no longer hot, and then allow the water to drain again. Transfer to a large bowl.
                                In a medium-sized bowl whisk together soy sauce, rice vinegar, sesame oil, and honey.
                                In a large bowl toss together cooled noodles and dressing. Portion noodles into serving bowls and top with edamame beans, cucumber, carrots, bell pepper, red cabbage, and peas.
                                Take the sesame-crusted hamachi out of the refrigerator. Carefully transfer it to a clean cutting board. Using a sharp chef's knife, slice about ¼-inch wide pieces against the grain (try to use only 1 to 2 cutting motions). Add even portions of the fish to each bowl, laying in a fan shape. Serve with additional soy sauce and lime wedges if desired.""",
                  user_id=1,
                  day="Thursday",
                  plan_category="Dinner",
                  )
    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)

    db.session.commit()


def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
