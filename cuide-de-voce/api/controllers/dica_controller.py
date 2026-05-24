from flask import Blueprint, jsonify
from models.dica_model import DicaModel
from middleware.jwt_middleware import token_required

dica_bp = Blueprint('dica', __name__)

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

# GET /dicas
@dica_bp.route('/dicas', methods=['GET'])
@token_required
def listar():
    try:
        dicas = DicaModel.listar_todas()
        return resposta(dicas, 'Dicas listadas com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)
