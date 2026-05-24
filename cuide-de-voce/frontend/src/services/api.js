import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor — adiciona token JWT em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Interceptor — trata erros de autenticação globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ========================
// AUTENTICAÇÃO
// ========================
export const login = (dados) => api.post('/auth/login', dados)
export const cadastro = (dados) => api.post('/auth/cadastro', dados)

// ========================
// ARTIGOS
// ========================
export const getArtigos = () => api.get('/artigos')
export const getArtigo = (id) => api.get(`/artigo/${id}`)

// ========================
// DICAS
// ========================
export const getDicas = () => api.get('/dicas')

// ========================
// QUIZ
// ========================
export const getPerguntas = () => api.get('/quiz')
export const responderQuiz = (dados) => api.post('/quiz/responder', dados)

// ========================
// HISTÓRICO
// ========================
export const getHistorico = () => api.get('/historico')
export const removerHistorico = (id) => api.delete(`/historico/${id}`)
export const limparHistorico = () => api.delete('/historico')

export default api
