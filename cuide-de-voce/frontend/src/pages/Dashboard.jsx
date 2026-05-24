import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLayout from '../layouts/AppLayout'

const CARDS = [
  { path: '/artigos',    emoji: '📖', title: 'Artigos',            desc: 'Leituras sobre bem-estar',         color: 'var(--green-100)' },
  { path: '/dicas',     emoji: '💡', title: 'Dicas',              desc: 'Hábitos de autocuidado',           color: '#fff9e6' },
  { path: '/respiracao',emoji: '🌿', title: 'Respiração',         desc: 'Exercício guiado 4-7-8',           color: '#edfaf2' },
  { path: '/quiz',      emoji: '📋', title: 'Questionário',       desc: '30 perguntas emocionais',          color: '#f0f5ff' },
  { path: '/historico', emoji: '🕐', title: 'Histórico',          desc: 'Seus resultados anteriores',       color: 'var(--green-50)' },
  { path: '/ajuda',     emoji: '🆘', title: 'Ajuda',              desc: 'Recursos de apoio e crise',        color: '#fff0f0' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const primeiroNome = usuario?.nome?.split(' ')[0] || ''

  return (
    <AppLayout>
      {/* Boas-vindas */}
      <div style={{
        background: 'linear-gradient(135deg, var(--green-700) 0%, var(--green-500) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 36px',
        color: 'white',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 6, position: 'relative' }}>{saudacao},</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, position: 'relative' }}>
          {primeiroNome} <em style={{ fontStyle: 'italic', color: 'var(--green-200)' }}>como você está hoje?</em>
        </h2>
        <p style={{ fontSize: 14, opacity: 0.7, marginTop: 10, position: 'relative' }}>
          Explore os recursos disponíveis para cuidar do seu bem-estar emocional.
        </p>
        <button className="btn-primary" style={{ marginTop: 20, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', position: 'relative', backdropFilter: 'blur(4px)' }}
          onClick={() => navigate('/quiz')}>
          Responder questionário →
        </button>
      </div>

      {/* Grid de atalhos */}
      <p className="section-label">O que você quer fazer?</p>
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {CARDS.map(c => (
          <div key={c.path}
            style={{ background: 'white', border: '1.5px solid var(--green-100)', borderRadius: 'var(--radius-lg)', padding: '20px 22px', cursor: 'pointer', transition: 'all 0.18s' }}
            onClick={() => navigate(c.path)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-300)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--green-100)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ width: 46, height: 46, borderRadius: 12, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>
              {c.emoji}
            </div>
            <p style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{c.title}</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
