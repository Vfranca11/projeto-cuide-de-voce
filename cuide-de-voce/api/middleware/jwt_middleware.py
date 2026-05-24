import jwt
import os
from functools import wraps
from flask import request, jsonify
from datetime import datetime, timedelta

JWT_SECRET = os.getenv('JWT_SECRET', 'cuide_de_voce_secret')

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

def gerar_token(usuario_id, nome, email):
    payload = {
        'usuario_id': usuario_id,
        'nome': nome,
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return resposta(mensagem='Token não fornecido', sucesso=False, status=401)
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            request.usuario_id = data['usuario_id']
            request.usuario_nome = data.get('nome', '')
            request.usuario_email = data.get('email', '')
        except jwt.ExpiredSignatureError:
            return resposta(mensagem='Token expirado', sucesso=False, status=401)
        except jwt.InvalidTokenError:
            return resposta(mensagem='Token inválido', sucesso=False, status=401)
        return f(*args, **kwargs)
    return decorated
