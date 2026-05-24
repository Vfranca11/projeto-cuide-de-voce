from database.conexao import get_connection

class ArtigoModel:

    @staticmethod
    def listar_todos():
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT id_artigo, tag, titulo, resumo, tempo_leitura, criado_em "
            "FROM artigo ORDER BY criado_em DESC"
        )
        artigos = cursor.fetchall()
        cursor.close()
        conn.close()
        return artigos

    @staticmethod
    def buscar_por_id(id_artigo):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM artigo WHERE id_artigo = %s", (id_artigo,)
        )
        artigo = cursor.fetchone()
        cursor.close()
        conn.close()
        return artigo
