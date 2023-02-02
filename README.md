# Recipe Plan Overview
![Splash Page](https://i.imgur.com/B9O8AKJ.png)
## [Recipe Plan](https://recipeplan.herokuapp.com/) is a full stack app that lets users create recipes and make meal plans using those recipes.
  * User Authentication
  * The user can create, update, and delete recipes.
  * The user can create, update, and delete ingredients.
  * The user can search all recipes by using the search bar.
  * The user can create a calendar with chosen recipes scheduled on it.


![Home Page](recipe-plan-home.PNG)

## Database Schema
[Recipe Plan](https://recipeplan.herokuapp.com/) uses a Flask-SQLAlchemy backend to store its data. Then the information that is stored is passed to the Redux store in the frontend.

![Database Schema](https://user-images.githubusercontent.com/78223925/123858225-defbfa80-d8e8-11eb-95fd-90b6ae6198a6.png)

## Frontend Overview
Recipe Plan uses React and Redux to handle the front end. React is utlized so that the user can make changes on the page and see the changes without having to herd refresh the page. The Redux store is used to reduce the total amount of requests to the backend by storing previous data recieved from requests into the Redux store.

## Technologies Used
* React
* Redux
* Flask
* SQLAlchemy
* PostgreSQL
* Docker
* HTML
* CSS

## Future Features
* A grocery list that is made based off the ingredients in your current meal plan.
* Profile Page
* Share recipes with other users
