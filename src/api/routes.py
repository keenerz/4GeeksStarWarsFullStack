"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Favorite
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    gender = request.json.get('gender')
    user = User(email=email, password=password, gender=gender)
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
@jwt_required()
def get_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg": "User Not Found"}), 403
    favorite_query = Favorite.query.filter_by(user_id=current_user_id)
    all_serialized_favorite = list(map(lambda item:item.serialize(), favorite_query))
    return jsonify(all_serialized_favorite)

@api.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_id = request.json.get('user')
    character_id = request.json.get('character')
    planets_id = request.json.get('planet')
    if user is None:
        return jsonify({"msg": "User Not Found"}), 403
    favorite = Favorite(user_id = user.id, character_id = character_id, planets_id = planets_id)
    duplicate = Favorite.query.filter_by(user_id=user_id,planets_id=planets_id,character_id=character_id).first()
    if duplicate is None:
        db.session.add(favorite)
        db.session.commit()
        return jsonify(favorite.serialize())
    else:
        return jsonify({"msg": "Duplicate"}), 400
    

@api.route('/favorite', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_id = request.json.get('user')
    character_id_get = request.json.get('character_id')
    planet_id_get = request.json.get('planet_id')
    target_favorite = Favorite.query.filter_by(user_id=user_id, planets_id=planet_id_get, character_id=character_id_get).first()
    if target_favorite is None: 
        return jsonify({"msg": "Invalid favorite"}), 400
    db.session.delete(target_favorite)
    db.session.commit()
    return jsonify({ "msg": "Favorite Deleted"}), 200

@api.route('/token', methods=['POST'])
def create_token():
    if request.json is None:
        return jsonify({"msg":"Missing the payload"}), 400
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Missing email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/character/<character_id>', methods=['DELETE'])
@jwt_required()
def delete_character(character_id):
    target_character = Character.query.filter_by(id=character_id).first()
    if target_character is None: 
        return jsonify({"msg": "Invalid character"}), 400
    db.session.delete(target_character)
    db.session.commit()
    return jsonify({ "msg": "Character Deleted"}), 200

@api.route('/planet/<planet_id>', methods=['DELETE'])
@jwt_required()
def delete_planet(planet_id):
    target_planet = Planet.query.filter_by(id=planet_id).first()
    if target_planet is None: 
        return jsonify({"msg": "Invalid planet"}), 400
    db.session.delete(target_planet)
    db.session.commit()
    return jsonify({ "msg": "Planet Deleted"}), 200

@api.route('/planet', methods=['POST'])
@jwt_required()
def create_planet():
    name = request.json.get('name', None)
    climate = request.json.get('climate', None)
    rotation_period = request.json.get('rotation_period', None)
    orbital_period = request.json.get('orbital_period', None)
    diameter = request.json.get('diameter', None)
    terrain = request.json.get('terrain', None)
    population = request.json.get('population', None)
    img_url = request.json.get('img_url', None)
    
    planet = Planet(name=name,
                    climate=climate,
                    rotation_period=rotation_period,
                    orbital_period=orbital_period,
                    diameter=diameter,
                    terrain=terrain,
                    population=population, 
                    img_url=img_url)
    db.session.add(planet)
    db.session.commit()
    return jsonify(planet.serialize())

@api.route('/character', methods=['POST'])
@jwt_required()
def create_character():
    name = request.json.get('name', None)
    height = request.json.get('height', None)
    hair_color = request.json.get('hair_color', None)
    eye_color = request.json.get('eye_color', None)
    birth_year = request.json.get('birth_year', None)
    gender = request.json.get('gender', None)
    img_url = request.json.get('img_url', None)
    skin_color = request.json.get('skin_color', None)
    
    character = Character(name=name,
                    height=height,
                    hair_color=hair_color,
                    eye_color=eye_color,
                    birth_year=birth_year,
                    gender=gender,
                    img_url=img_url, 
                    skin_color=skin_color
                    )
    db.session.add(character)
    db.session.commit()
    return jsonify(character.serialize())