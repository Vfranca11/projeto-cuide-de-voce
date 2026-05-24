from flask import Blueprint, request, jsonify
from models.usuario_model import UsuarioModel
from middleware.jwt_middleware import gerar_token

auth_bp = Blueprint('auth', __name__)

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

# POST /auth/login
@auth_bp.route('/auth/login', methods=['POST'])
def login():
    try:
        dados = request.get_json()
        if not dados or not dados.get('email') or not dados.get('senha'):
            return resposta(mensagem='E-mail e senha são obrigatórios', sucesso=False, status=400)

        usuario = UsuarioModel.buscar_por_email(dados['email'])
        if not usuario:
            return resposta(mensagem='E-mail ou senha inválidos', sucesso=False, status=401)

        if not UsuarioModel.verificar_senha(dados['senha'], usuario['senha']):
            return resposta(mensagem='E-mail ou senha inválidos', sucesso=False, status=401)

        token = gerar_token(usuario['id_usuario'], usuario['nome'], usuario['email'])
        usuario_sem_senha = {k: v for k, v in usuario.items() if k != 'senha'}

        # Serializa datetime
        if usuario_sem_senha.get('criado_em'):
            usuario_sem_senha['criado_em'] = str(usuario_sem_senha['criado_em'])

        return resposta(
            {'token': token, 'usuario': usuario_sem_senha},
            'Login realizado com sucesso!'
        )
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)

# POST /auth/cadastro
@auth_bp.route('/auth/cadastro', methods=['POST'])
def cadastro():
    try:
        dados = request.get_json()
        for campo in ['nome', 'email', 'senha']:
            if not dados.get(campo):
                return resposta(mensagem=f'{campo.capitalize()} é obrigatório', sucesso=False, status=400)

        if len(dados['senha']) < 4:
            return resposta(mensagem='A senha deve ter pelo menos 4 caracteres', sucesso=False, status=400)

        existente = UsuarioModel.buscar_por_email(dados['email'])
        if existente:
            return resposta(mensagem='E-mail já cadastrado', sucesso=False, status=409)

        id_novo = UsuarioModel.cadastrar(dados)
        usuario = UsuarioModel.buscar_por_id(id_novo)

        if usuario and usuario.get('criado_em'):
            usuario['criado_em'] = str(usuario['criado_em'])

        token = gerar_token(id_novo, dados['nome'], dados['email'])
        return resposta(
            {'token': token, 'usuario': usuario},
            'Cadastro realizado com sucesso!',
            status=201
        )
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)
