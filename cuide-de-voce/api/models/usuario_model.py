from database.conexao import get_connection
import bcrypt

class UsuarioModel:

    @staticmethod
    def buscar_por_email(email):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE email = %s", (email,))
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()
        return usuario

    @staticmethod
    def buscar_por_id(id_usuario):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT id_usuario, nome, email, criado_em FROM usuario WHERE id_usuario = %s",
            (id_usuario,)
        )
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()
        return usuario

    @staticmethod
    def cadastrar(dados):
        conn = get_connection()
        cursor = conn.cursor()
        senha_hash = bcrypt.hashpw(
            dados['senha'].encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
        query = """
            INSERT INTO usuario (nome, email, senha)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (dados['nome'], dados['email'], senha_hash))
        conn.commit()
        id_inserido = cursor.lastrowid
        cursor.close()
        conn.close()
        return id_inserido

    @staticmethod
    def verificar_senha(senha_plain, senha_hash):
        return bcrypt.checkpw(
            senha_plain.encode('utf-8'),
            senha_hash.encode('utf-8')
        )
