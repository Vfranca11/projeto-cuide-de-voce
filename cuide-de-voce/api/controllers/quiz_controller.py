from flask import Blueprint, request, jsonify
from models.quiz_model import QuizModel
from middleware.jwt_middleware import token_required

quiz_bp = Blueprint('quiz', __name__)

def resposta(dados=None, mensagem='', sucesso=True, status=200):
    return jsonify({'sucesso': sucesso, 'mensagem': mensagem, 'dados': dados}), status

def calcular_nivel(percentual):
    """
    Quanto MENOR o percentual, melhor o estado emocional.
    Pontuação 0 = melhor resposta (raramente ansioso, etc.)
    Pontuação 3 = pior resposta
    """
    if percentual <= 20:
        return {
            'nivel': 'otimo',
            'titulo': 'Bem-estar Elevado',
            'mensagem': 'Você está se cuidando muito bem! Seus indicadores mostram um estado emocional equilibrado e saudável. Continue cultivando esses hábitos — eles fazem uma diferença real no seu bem-estar.'
        }
    elif percentual <= 40:
        return {
            'nivel': 'bom',
            'titulo': 'Bem-estar Positivo',
            'mensagem': 'Você está num bom momento, com alguns aspectos que merecem atenção. Pequenos ajustes na rotina podem fortalecer ainda mais seu equilíbrio emocional. Continue se cuidando!'
        }
    elif percentual <= 60:
        return {
            'nivel': 'atencao',
            'titulo': 'Atenção ao Bem-estar',
            'mensagem': 'Seus resultados indicam que você está enfrentando algumas dificuldades. É um sinal importante para redobrar o autocuidado — sono, movimento, conexão social e momentos de pausa fazem diferença. Você não está sozinho.'
        }
    elif percentual <= 80:
        return {
            'nivel': 'alerta',
            'titulo': 'Alerta Emocional',
            'mensagem': 'Seus indicadores mostram sinais significativos de sobrecarga emocional. Considere conversar com alguém de confiança ou um profissional de saúde mental. Pedir ajuda é um ato de coragem e autocuidado.'
        }
    else:
        return {
            'nivel': 'critico',
            'titulo': 'Cuidado Prioritário',
            'mensagem': 'Seus resultados indicam um momento muito desafiador. Por favor, busque apoio profissional. O CVV atende 24h pelo número 188 — gratuito e sigiloso. Você merece cuidado e suporte.'
        }

# GET /quiz
@quiz_bp.route('/quiz', methods=['GET'])
@token_required
def listar_perguntas():
    try:
        perguntas = QuizModel.listar_perguntas()
        return resposta(perguntas, 'Perguntas carregadas com sucesso')
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)

# POST /quiz/responder
@quiz_bp.route('/quiz/responder', methods=['POST'])
@token_required
def responder():
    try:
        dados = request.get_json()
        respostas = dados.get('respostas', [])

        if not respostas:
            return resposta(mensagem='Respostas são obrigatórias', sucesso=False, status=400)

        id_usuario = request.usuario_id
        id_sessao = QuizModel.criar_sessao(id_usuario)
        QuizModel.salvar_respostas(id_sessao, respostas)

        pontuacao = sum(r['valor'] for r in respostas)
        pontuacao_max = len(respostas) * 3
        percentual = round((pontuacao / pontuacao_max) * 100, 2) if pontuacao_max > 0 else 0

        classificacao = calcular_nivel(percentual)

        id_resultado = QuizModel.salvar_resultado(
            id_sessao,
            pontuacao,
            pontuacao_max,
            percentual,
            classificacao['nivel'],
            classificacao['titulo'],
            classificacao['mensagem']
        )

        resultado = QuizModel.buscar_resultado_por_id(id_resultado)
        if resultado and resultado.get('gerado_em'):
            resultado['gerado_em'] = str(resultado['gerado_em'])

        return resposta(resultado, 'Questionário respondido com sucesso!', status=201)
    except Exception as e:
        return resposta(mensagem=str(e), sucesso=False, status=500)
