# 🌿 Cuide de Você — Sistema Full Stack

Sistema de saúde mental e autocuidado desenvolvido com **React + Vite** (frontend) e **Python Flask** (backend), banco de dados **MySQL**, arquitetura **MVC** e autenticação **JWT**.

---

## 📁 Estrutura do Projeto

```
cuide-de-voce/
├── database.sql                  ← SQL completo (crie o banco por aqui)
│
├── api/                          ← Backend Flask
│   ├── api.py                    ← Entrada principal
│   ├── .env.example              ← Variáveis de ambiente
│   ├── requirements.txt
│   ├── database/
│   │   └── conexao.py            ← Conexão MySQL
│   ├── middleware/
│   │   └── jwt_middleware.py     ← Geração e validação JWT
│   ├── models/
│   │   ├── usuario_model.py
│   │   ├── artigo_model.py
│   │   ├── dica_model.py
│   │   ├── quiz_model.py
│   │   └── historico_model.py
│   └── controllers/
│       ├── auth_controller.py
│       ├── artigo_controller.py
│       ├── dica_controller.py
│       ├── quiz_controller.py
│       └── historico_controller.py
│
└── frontend/                     ← Frontend React + Vite
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── styles/
        │   └── global.css
        ├── services/
        │   └── api.js            ← Axios + interceptors JWT
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ToastContext.jsx
        ├── hooks/
        │   └── useApi.js
        ├── components/
        │   ├── Loading.jsx
        │   └── RotaProtegida.jsx
        └── pages/
            ├── Login.jsx / .module.css
            ├── Cadastro.jsx
            ├── Dashboard.jsx / .module.css
            ├── Conteudos.jsx / .module.css
            ├── Artigos.jsx / .module.css
            ├── ArtigoLeitor.jsx / .module.css
            ├── Dicas.jsx / .module.css
            ├── Respiracao.jsx / .module.css
            ├── Quiz.jsx / .module.css
            ├── Resultado.jsx / .module.css
            ├── Historico.jsx / .module.css
            ├── Ajuda.jsx / .module.css
            └── NotFound.jsx
```

---

## 🗄️ 1. Banco de Dados (MySQL)

### Criar o banco

No MySQL Workbench, DBeaver ou terminal:

```sql
source /caminho/para/database.sql
```

Ou copie e cole o conteúdo do arquivo `database.sql` direto no seu client MySQL.

O script cria automaticamente:
- Banco `cuide_de_voce`
- Tabelas: `usuario`, `artigo`, `dica`, `pergunta`, `opcao`, `sessao`, `resposta`, `resultado`
- 4 artigos de autoajuda
- 6 dicas de autocuidado
- 30 perguntas com 4 opções cada

---

## ⚙️ 2. Backend (Flask)

### Pré-requisitos
- Python 3.10+
- MySQL rodando localmente

### Instalar

```bash
cd api

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Linux / Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

### Configurar variáveis de ambiente

```bash
# Copie o .env.example
cp .env.example .env
```

Edite o `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=cuide_de_voce

JWT_SECRET=cuide_de_voce_jwt_secret_2024

FLASK_DEBUG=1
```

### Rodar o backend

```bash
python api.py
```

O servidor sobe em: **http://localhost:5000**

---

## 💻 3. Frontend (React + Vite)

### Pré-requisitos
- Node.js 18+
- npm 9+

### Instalar

```bash
cd frontend
npm install
```

### Rodar o frontend

```bash
npm run dev
```

O app sobe em: **http://localhost:5173**

> O Vite está configurado com proxy para redirecionar chamadas `/auth`, `/artigos`, `/quiz`, etc. diretamente para `localhost:5000`.

---

## 🔌 API REST — Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/auth/login` | ❌ | Login com e-mail e senha |
| POST | `/auth/cadastro` | ❌ | Criar nova conta |
| GET | `/artigos` | ✅ | Listar todos os artigos |
| GET | `/artigo/<id>` | ✅ | Artigo completo pelo ID |
| GET | `/dicas` | ✅ | Listar dicas de autocuidado |
| GET | `/quiz` | ✅ | Carregar perguntas do quiz |
| POST | `/quiz/responder` | ✅ | Enviar respostas e calcular resultado |
| GET | `/historico` | ✅ | Histórico do usuário logado |
| DELETE | `/historico/<id>` | ✅ | Remover um resultado específico |
| DELETE | `/historico` | ✅ | Apagar todo o histórico |

> ✅ = requer header `Authorization: Bearer <token>`

### Exemplo de resposta padrão

```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso!",
  "dados": {
    "token": "eyJ...",
    "usuario": { "id_usuario": 1, "nome": "Maria", "email": "maria@email.com" }
  }
}
```

---

## 🧩 Funcionalidades

| Tela | Funcionalidade |
|------|---------------|
| **Login** | Autenticação com e-mail/senha + JWT |
| **Cadastro** | Criar conta com validação + bcrypt |
| **Dashboard** | Saudação personalizada + menu principal |
| **Conteúdos** | Hub para artigos, dicas e respiração |
| **Artigos** | Lista + leitura completa via API |
| **Dicas** | Accordion com 6 dicas de autocuidado |
| **Respiração** | Animação guiada técnica 4-7-8 com timer |
| **Quiz** | 30 perguntas dinâmicas com progresso |
| **Resultado** | Classificação emocional + mensagem personalizada |
| **Histórico** | Ver, remover ou apagar todos os resultados |
| **Ajuda** | Recursos de crise (CVV 188), CAPS, técnicas |

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| Cor primária | `#226b3f` (verde floresta) |
| Fonte display | Fraunces (serif italiana) |
| Fonte corpo | DM Sans |
| Border-radius | 8px / 14px / 20px / 32px |
| Animação padrão | fadeInUp 0.35s ease |

---

## 🚀 Produção

### Build do frontend

```bash
cd frontend
npm run build
# Arquivos em frontend/dist/
```

### Servir o backend em produção

```bash
pip install gunicorn
gunicorn -w 4 api:app
```

---

## ❗ Classificação emocional (Quiz)

O sistema calcula o **percentual de tensão emocional** (0% = ótimo → 100% = crítico):

| Percentual | Nível | Título |
|-----------|-------|--------|
| 0 – 20% | `otimo` | Bem-estar Elevado 🌟 |
| 21 – 40% | `bom` | Bem-estar Positivo 😊 |
| 41 – 60% | `atencao` | Atenção ao Bem-estar 🌤 |
| 61 – 80% | `alerta` | Alerta Emocional ⚠️ |
| 81 – 100% | `critico` | Cuidado Prioritário 🆘 |

---

## 📦 Dependências

### Backend (`requirements.txt`)
```
flask
flask-cors
python-dotenv
mysql-connector-python
bcrypt
pyjwt
```

### Frontend (`package.json`)
```
react, react-dom, react-router-dom, axios
```
Dev: `vite, @vitejs/plugin-react`

---

## 🆘 Suporte em crise

Esta aplicação direciona usuários em estado crítico para o **CVV — 188** (gratuito, 24h, sigiloso). Nunca remova esses recursos.
"# projeto-cuide-de-voce" 
