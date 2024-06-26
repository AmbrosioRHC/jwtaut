from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

# Configuración básica de la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config['SECRET_KEY'] = 'your_secret_key'  # Cambia esto por una clave secreta segura
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Cambia la URI según tu base de datos
db = SQLAlchemy(app)

# Modelo de Usuario para la base de datos
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Decorador para verificar el token de autenticación
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 400

    hashed_password = generate_password_hash(password, method='scrypt')
    new_user = User(email=email, password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'message': 'Error registering user', 'error': str(e)}), 500

# Ruta para el inicio de sesión
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        # Generar token JWT y devolverlo
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'])
        return jsonify({'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


# Ruta protegida que requiere token para acceder
@app.route('/api/private', methods=['GET'])
@token_required
def private_route(current_user):
    return jsonify({'message': 'This is a private route!', 'email': current_user.email}), 200

# Configuración para crear las tablas antes de iniciar la aplicación
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5173, debug=True)
