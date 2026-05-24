import { useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
export default function Conteudos() {
  const navigate = useNavigate()
  const items = [
    { path:'/respiracao', emoji:'🌿', t:'Exercício de respiração', d:'Animação guiada · Técnica 4-7-8', chip:'Relaxamento' },
    { path:'/artigos',    emoji:'📖', t:'Artigos de autoajuda',    d:'Leituras sobre bem-estar mental', chip:'Leitura' },
    { path:'/dicas',      emoji:'💡', t:'Dicas de autocuidado',    d:'Hábitos para o dia a dia',        chip:'Hábitos' },
  ]
  return (
    <AppLayout title="Conteúdos" subtitle="Escolha por onde começar">
      <div className="grid-3">
        {items.map(c=>(
          <div key={c.path}
            style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'28px 24px', cursor:'pointer', transition:'all 0.18s', textAlign:'center' }}
            onClick={()=>navigate(c.path)}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--green-300)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--green-100)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
          >
            <span style={{ fontSize:36, display:'block', marginBottom:14 }}>{c.emoji}</span>
            <p style={{ fontWeight:500, fontSize:15, marginBottom:6 }}>{c.t}</p>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:12 }}>{c.d}</p>
            <span className="chip chip-green">{c.chip}</span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
