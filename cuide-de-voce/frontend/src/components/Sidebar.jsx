import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const NAV = [
  {
    label: 'Principal',
    items: [
      {
        path: '/',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="2" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="10" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="6" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
        label: 'Dashboard',
      },
    ],
  },
  {
    label: 'Conteúdos',
    items: [
      {
        path: '/artigos',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
        label: 'Artigos',
      },
      {
        path: '/dicas',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 010 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 12a5 5 0 010-10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/><rect x="6.5" y="13" width="5" height="1.5" rx="0.75" fill="currentColor"/><rect x="7.5" y="15.5" width="3" height="1.5" rx="0.75" fill="currentColor"/></svg>,
        label: 'Dicas de autocuidado',
      },
      {
        path: '/respiracao',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C9 2 4 5.5 4 11a5 5 0 0010 0C14 5.5 9 2 9 2z" stroke="currentColor" strokeWidth="1.4"/><circle cx="9" cy="11" r="2" fill="currentColor" opacity="0.5"/></svg>,
        label: 'Respiração guiada',
      },
    ],
  },
  {
    label: 'Questionário',
    items: [
      {
        path: '/quiz',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><text x="9" y="13.5" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600" fontFamily="DM Sans, sans-serif">?</text></svg>,
        label: 'Responder quiz',
      },
      {
        path: '/historico',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
        label: 'Histórico',
      },
    ],
  },
  {
    label: 'Suporte',
    items: [
      {
        path: '/ajuda',
        icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke="currentColor" strokeWidth="1.4"/><path d="M9 8v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="9" cy="14" r="0.8" fill="currentColor"/></svg>,
        label: 'Ajuda e crise',
        danger: true,
      },
    ],
  },
]

export default function Sidebar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { usuario, sair } = useAuth()
  const { showToast } = useToast()

  const handleSair = () => {
    sair()
    showToast('Até logo!')
    navigate('/login')
  }

  const primeiroNome = usuario?.nome?.split(' ')[0] || ''

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 3C11 3 5 7 5 13a6 6 0 0012 0C17 7 11 3 11 3z" fill="rgba(255,255,255,0.5)"/>
            <circle cx="11" cy="13" r="3" fill="rgba(255,255,255,0.9)"/>
          </svg>
        </div>
        <h1>Cuide de <em>você</em></h1>
      </div>

      {/* Usuário */}
      {usuario && (
        <div className="sidebar-user">
          <p>Bem-vindo</p>
          <strong>{primeiroNome}</strong>
        </div>
      )}

      {/* Navegação */}
      <nav className="sidebar-nav">
        {NAV.map(grupo => (
          <div key={grupo.label}>
            <p className="nav-label">{grupo.label}</p>
            {grupo.items.map(item => (
              <button
                key={item.path}
                className={`nav-item${location.pathname === item.path ? ' active' : ''}${item.danger ? ' danger' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="sidebar-footer">
        <button className="nav-item danger" onClick={handleSair}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M12 12l3-3-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="15" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Sair da conta
        </button>
      </div>
    </aside>
  )
}
