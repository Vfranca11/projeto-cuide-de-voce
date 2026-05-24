from flask import Blueprint, jsonify
from models.artigo_model import ArtigoModel
from middleware.jwt_middleware import token_required

artigo_bp = Blueprint('artigo', __name__)

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

def serializar(obj):
    if isinstance(obj, list):
        return [serializar(i) for i in obj]
    if isinstance(obj, dict):
        return {k: str(v) if hasattr(v, 'isoformat') else v for k, v in obj.items()}
    return obj

# GET /artigos
@artigo_bp.route('/artigos', methods=['GET'])
@token_required
def listar():
    try:
        artigos = ArtigoModel.listar_todos()
        return resposta(serializar(artigos), 'Artigos listados com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)

# GET /artigo/<id>
@artigo_bp.route('/artigo/<int:id_artigo>', methods=['GET'])
@token_required
def detalhe(id_artigo):
    try:
        artigo = ArtigoModel.buscar_por_id(id_artigo)
        if not artigo:
            return resposta(mensagem='Artigo não encontrado', sucesso=False, status=404)
        return resposta(serializar(artigo), 'Artigo encontrado')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)
