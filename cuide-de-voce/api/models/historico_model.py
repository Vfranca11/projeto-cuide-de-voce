from database.conexao import get_connection

class HistoricoModel:

    @staticmethod
    def listar_por_usuario(id_usuario):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT r.id_resultado, r.pontuacao, r.pontuacao_max, r.percentual,
                   r.nivel, r.titulo, r.mensagem, r.gerado_em,
                   s.id_sessao, s.iniciada_em
            FROM resultado r
            INNER JOIN sessao s ON s.id_sessao = r.id_sessao
            WHERE s.id_usuario = %s
            ORDER BY r.gerado_em DESC
        """
        cursor.execute(query, (id_usuario,))
        historico = cursor.fetchall()
        cursor.close()
        conn.close()
        return historico

    @staticmethod
    def remover_por_id(id_resultado, id_usuario):
        conn = get_connection()
        cursor = conn.cursor()
        # Verifica se o resultado pertence ao usuário antes de deletar
        query_check = """
            SELECT r.id_resultado FROM resultado r
            INNER JOIN sessao s ON s.id_sessao = r.id_sessao
            WHERE r.id_resultado = %s AND s.id_usuario = %s
        """
        cursor.execute(query_check, (id_resultado, id_usuario))
        if not cursor.fetchone():
            cursor.close()
            conn.close()
            return 0
        cursor.execute("DELETE FROM resultado WHERE id_resultado = %s", (id_resultado,))
        conn.commit()
        afetados = cursor.rowcount
        cursor.close()
        conn.close()
        return afetados

    @staticmethod
    def remover_todos_do_usuario(id_usuario):
        conn = get_connection()
        cursor = conn.cursor()
        query = """
            DELETE r FROM resultado r
            INNER JOIN sessao s ON s.id_sessao = r.id_sessao
            WHERE s.id_usuario = %s
        """
        cursor.execute(query, (id_usuario,))
        conn.commit()
        afetados = cursor.rowcount
        cursor.close()
        conn.close()
        return afetados
