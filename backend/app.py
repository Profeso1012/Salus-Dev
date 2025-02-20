import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from openai import OpenAI

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    full_name = db.Column(db.String(120))
    blood_group = db.Column(db.String(5))
    genotype = db.Column(db.String(5))
    medical_history = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
        
    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        full_name=data.get('full_name'),
        blood_group=data.get('blood_group'),
        genotype=data.get('genotype'),
        medical_history=data.get('medical_history', {})
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
        
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    })

@app.route('/api/check-symptoms', methods=['POST'])
def check_symptoms():
    data = request.get_json()
    symptoms = data.get('symptoms')
    
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            store=True,
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant trained to provide preliminary medical advice based on symptoms. Always advise users to consult with a healthcare professional for accurate diagnosis and treatment."},
                {"role": "user", "content": f"Based on these symptoms, what might be the condition and its severity? Symptoms: {symptoms}"}
            ]
        )
        
        response = completion.choices[0].message.content
        
        return jsonify({
            "diagnosis": response,
            "severity": "Please consult a healthcare professional for accurate assessment",
            "recommended_action": "Please consult a healthcare professional for accurate diagnosis and treatment."
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Hospital recommendation endpoint
@app.route('/api/nearby-hospitals', methods=['GET'])
def nearby_hospitals():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    
    # In a real-world scenario, you would use these coordinates to query a database or external API
    # For this example, we'll return static data
    hospitals = [
        {
            "name": "LASU Health Center",
            "distance": "0.5 km",
            "address": "LASU Epe Campus",
            "available": True,
            "phone": "+234-123-4567"
        },
        {
            "name": "Epe General Hospital",
            "distance": "2.3 km",
            "address": "Hospital Road, Epe",
            "available": True,
            "phone": "+234-987-6543"
        },
        {
            "name": "St. Nicholas Hospital",
            "distance": "5.1 km",
            "address": "Lagos Road, Epe",
            "available": True,
            "phone": "+234-246-8135"
        }
    ]
    
    return jsonify(hospitals)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')

