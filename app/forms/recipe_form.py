from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe


class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    servings = IntegerField('servings', validators=[DataRequired()])
    time = IntegerField('time', validators=[DataRequired()])
    instructions = StringField('instructions', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    day = StringField('day')
    plan_category = StringField('plan_category')
    category = StringField('category', validators=[DataRequired()])
    ingredient_list = StringField('ingredient_list', validators=[DataRequired()])
