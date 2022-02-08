"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Favorite
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    user = User(email="my_super1@email.com", password="blahblah", gender="male")
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize())

@api.route('/character', methods=['GET'])
def get_character():
    character_query = Character.query.all()
    all_serialized_characters = list(map(lambda item:item.serialize(), character_query))
    return jsonify(all_serialized_characters)

@api.route('/planet', methods=['GET'])
def get_planet():
    planet_query = Planet.query.all()
    all_serialized_planets = list(map(lambda item:item.serialize(), planet_query))
    return jsonify(all_serialized_planets)

@api.route('/favorite', methods=['GET'])
def get_favorite():
    favorite_query = Favorite.query.all()
    all_serialized_favorite = list(map(lambda item:item.serialize(), favorite_query))
    return jsonify(all_serialized_favorite)