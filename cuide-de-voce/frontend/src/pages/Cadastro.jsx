import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { cadastro } from '../services/api'

export default function Cadastro() {
  const navigate = useNavigate()
  const { entrar } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const validar = () => {
    const e = {}
    if (!form.nome || form.nome.trim().length < 2) e.nome = 'Informe seu nome.'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido.'
    if (!form.senha || form.senha.length < 4) e.senha = 'Mínimo 4 caracteres.'
    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validar()) return
    setCarregando(true)
    try {
      const res = await cadastro(form)
      if (res.data.sucesso) {
        entrar(res.data.dados.token, res.data.dados.usuario)
        showToast('Conta criada com sucesso!')
        navigate('/')
      }
    } catch (e) {
      showToast(e.response?.data?.mensagem || 'Erro ao criar conta', 'error')
    } finally { setCarregando(false) }
  }

  return (
    <div className="auth-screen">
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 340 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px'
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5C20 5 8 12 8 24a12 12 0 0024 0C32 12 20 5 20 5z" fill="rgba(255,255,255,0.5)"/>
              <circle cx="20" cy="24" r="6" fill="rgba(255,255,255,0.9)"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, lineHeight: 1.2, marginBottom: 16 }}>
            Comece sua <em style={{ fontStyle: 'italic', color: 'var(--green-200)' }}>jornada</em>
          </h1>
          <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.75 }}>
            Crie sua conta gratuita e tenha acesso a todas as ferramentas de bem-estar emocional.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form">
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, marginBottom: 6 }}>
              Criar conta
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Preencha os dados abaixo para começar</p>
          </div>

          <div>
            <label>Nome completo</label>
            <input className={`input-field${erros.nome ? ' error' : ''}`} type="text"
              placeholder="Seu nome..." value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })} />
            {erros.nome && <span className="field-error show">{erros.nome}</span>}
          </div>

          <div>
            <label>E-mail</label>
            <input className={`input-field${erros.email ? ' error' : ''}`} type="email"
              placeholder="seu@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
            {erros.email && <span className="field-error show">{erros.email}</span>}
          </div>

          <div>
            <label>Senha</label>
            <div className="input-wrap">
              <input className={`input-field${erros.senha ? ' error' : ''}`}
                type={mostrarSenha ? 'text' : 'password'} placeholder="Mínimo 4 caracteres..."
                value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} />
              <button className="toggle-pw" type="button" onClick={() => setMostrarSenha(v => !v)}>
                {mostrarSenha
                  ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M7.5 7.6a2.5 2.5 0 003.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>}
              </button>
            </div>
            {erros.senha && <span className="field-error show">{erros.senha}</span>}
          </div>

          <button className="btn-primary full" onClick={handleSubmit} disabled={carregando}>
            {carregando ? 'Criando conta...' : 'Criar conta gratuita'}
          </button>

          <div className="auth-divider">já tem conta?</div>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost full">Fazer login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
