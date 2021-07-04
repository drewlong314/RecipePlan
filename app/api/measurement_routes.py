from flask import Blueprint
from app.models import Measurement

measurement_routes = Blueprint('measurements', __name__)


@measurement_routes.route('/')
def get_measurements():
    measurements = Measurement.query.all()
    return {"measurements": [measurement.to_dict() for measurement in measurements]}
