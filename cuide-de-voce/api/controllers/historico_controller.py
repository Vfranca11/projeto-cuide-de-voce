from flask import Blueprint, jsonify, request
from models.historico_model import HistoricoModel
from middleware.jwt_middleware import token_required

historico_bp = Blueprint('historico', __name__)

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

def serializar_historico(lista):
    result = []
    for item in lista:
        novo = {}
        for k, v in item.items():
            novo[k] = str(v) if hasattr(v, 'isoformat') else v
        result.append(novo)
    return result

# GET /historico
@historico_bp.route('/historico', methods=['GET'])
@token_required
def listar():
    try:
        id_usuario = request.usuario_id
        historico = HistoricoModel.listar_por_usuario(id_usuario)
        return resposta(serializar_historico(historico), 'Histórico carregado com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)

# DELETE /historico/<id>
@historico_bp.route('/historico/<int:id_resultado>', methods=['DELETE'])
@token_required
def remover(id_resultado):
    try:
        id_usuario = request.usuario_id
        afetados = HistoricoModel.remover_por_id(id_resultado, id_usuario)
        if afetados == 0:
            return resposta(mensagem='Resultado não encontrado', sucesso=False, status=404)
        return resposta(mensagem='Resultado removido com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)

# DELETE /historico
@historico_bp.route('/historico', methods=['DELETE'])
@token_required
def remover_todos():
    try:
        id_usuario = request.usuario_id
        HistoricoModel.remover_todos_do_usuario(id_usuario)
        return resposta(mensagem='Histórico apagado com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)
