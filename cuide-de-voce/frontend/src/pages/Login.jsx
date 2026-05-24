import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { login } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const { entrar } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const validar = () => {
    const e = {}
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido.'
    if (!form.senha || form.senha.length < 4) e.senha = 'Mínimo 4 caracteres.'
    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validar()) return
    setCarregando(true)
    try {
      const res = await login(form)
      if (res.data.sucesso) {
        entrar(res.data.dados.token, res.data.dados.usuario)
        showToast('Login realizado com sucesso!')
        navigate('/')
      }
    } catch (e) {
      showToast(e.response?.data?.mensagem || 'Erro ao fazer login', 'error')
    } finally { setCarregando(false) }
  }

  return (
    <div className="auth-screen">
      {/* Lado esquerdo — hero */}
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 360 }}>
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 300, lineHeight: 1.2, marginBottom: 16 }}>
            Cuide de <em style={{ fontStyle: 'italic', color: 'var(--green-200)' }}>você</em>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.75 }}>
            Um espaço seguro para cuidar da sua saúde mental com recursos práticos e apoio personalizado.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Exercícios de respiração guiada', 'Questionário emocional completo', 'Artigos e dicas de autocuidado'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, opacity: 0.85 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="auth-right">
        <div className="auth-form">
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, marginBottom: 6 }}>
              Bem-vindo de volta
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Entre com sua conta para continuar</p>
          </div>

          <div>
            <label>E-mail</label>
            <input className={`input-field${erros.email ? ' error' : ''}`} type="email"
              placeholder="seu@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            {erros.email && <span className="field-error show">{erros.email}</span>}
          </div>

          <div>
            <label>Senha</label>
            <div className="input-wrap">
              <input className={`input-field${erros.senha ? ' error' : ''}`}
                type={mostrarSenha ? 'text' : 'password'} placeholder="Sua senha..."
                value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              <button className="toggle-pw" type="button" onClick={() => setMostrarSenha(v => !v)}>
                {mostrarSenha
                  ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M7.5 7.6a2.5 2.5 0 003.4 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>}
              </button>
            </div>
            {erros.senha && <span className="field-error show">{erros.senha}</span>}
          </div>

          <button className="btn-primary full" onClick={handleSubmit} disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar na conta'}
          </button>

          <div className="auth-divider">ou</div>

          <Link to="/cadastro" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost full">Criar uma conta gratuita</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
