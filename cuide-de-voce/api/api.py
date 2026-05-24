from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

from controllers.auth_controller import auth_bp
from controllers.artigo_controller import artigo_bp
from controllers.dica_controller import dica_bp
from controllers.quiz_controller import quiz_bp
from controllers.historico_controller import historico_bp

app.register_blueprint(auth_bp)
app.register_blueprint(artigo_bp)
app.register_blueprint(dica_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(historico_bp)

@app.route('/')
def index():
    return jsonify({
        'sucesso': True,
        'mensagem': 'API Cuide de Você',
        'versao': '1.0.0'
    })

@app.errorhandler(404)
def not_found(e):
    return jsonify({'sucesso': False, 'mensagem': 'Rota não encontrada'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'sucesso': False, 'mensagem': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_DEBUG', '1') == '1', port=5000)
