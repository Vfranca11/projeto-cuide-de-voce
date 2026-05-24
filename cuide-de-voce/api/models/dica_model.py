from database.conexao import get_connection

class DicaModel:

    @staticmethod
    def listar_todas():
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dica ORDER BY id_dica")
        dicas = cursor.fetchall()
        cursor.close()
        conn.close()
        return dicas
