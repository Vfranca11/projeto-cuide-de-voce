from database.conexao import get_connection

class QuizModel:

    @staticmethod
    def listar_perguntas():
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM pergunta ORDER BY ordem")
        perguntas = cursor.fetchall()
        for p in perguntas:
            cursor2 = conn.cursor(dictionary=True)
            cursor2.execute(
                "SELECT id_opcao, texto, valor FROM opcao WHERE id_pergunta = %s",
                (p['id_pergunta'],)
            )
            p['opcoes'] = cursor2.fetchall()
            cursor2.close()
        cursor.close()
        conn.close()
        return perguntas

    @staticmethod
    def criar_sessao(id_usuario):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO sessao (id_usuario) VALUES (%s)", (id_usuario,)
        )
        conn.commit()
        id_sessao = cursor.lastrowid
        cursor.close()
        conn.close()
        return id_sessao

    @staticmethod
    def salvar_respostas(id_sessao, respostas):
        conn = get_connection()
        cursor = conn.cursor()
        query = "INSERT INTO resposta (id_sessao, id_pergunta, valor) VALUES (%s, %s, %s)"
        for r in respostas:
            cursor.execute(query, (id_sessao, r['id_pergunta'], r['valor']))
        conn.commit()
        cursor.close()
        conn.close()

    @staticmethod
    def salvar_resultado(id_sessao, pontuacao, pontuacao_max, percentual, nivel, titulo, mensagem):
        conn = get_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO resultado (id_sessao, pontuacao, pontuacao_max, percentual, nivel, titulo, mensagem)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (id_sessao, pontuacao, pontuacao_max, percentual, nivel, titulo, mensagem))
        conn.commit()
        id_resultado = cursor.lastrowid
        cursor.close()
        conn.close()
        return id_resultado

    @staticmethod
    def buscar_resultado_por_id(id_resultado):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM resultado WHERE id_resultado = %s", (id_resultado,))
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()
        return resultado
