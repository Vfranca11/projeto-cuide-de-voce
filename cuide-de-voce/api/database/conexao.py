import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', ''),
            database=os.getenv('DB_NAME', 'cuide_de_voce'),
            charset='utf8mb4'
        )
        return conn
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        raise e
