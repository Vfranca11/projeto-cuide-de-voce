import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtigos } from '../services/api'
import AppLayout from '../layouts/AppLayout'
import Loading from '../components/Loading'

const COR_CHIP = { Ansiedade:'chip-amber', Autoestima:'chip-green', Sono:'chip-blue', Relações:'chip-green' }

export default function Artigos() {
  const navigate = useNavigate()
  const [artigos, setArtigos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getArtigos().then(r => setArtigos(r.data.dados||[])).finally(()=>setCarregando(false))
  }, [])

  return (
    <AppLayout title="Artigos" subtitle="Leituras para o seu bem-estar">
      {carregando && <Loading />}
      {!carregando && (
        <div className="grid-2">
          {artigos.map(a => (
            <div key={a.id_artigo}
              style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'22px 24px', cursor:'pointer', transition:'all 0.18s' }}
              onClick={() => navigate(`/artigo/${a.id_artigo}`)}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--green-300)';e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--green-100)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
            >
              <span className={`chip ${COR_CHIP[a.tag]||'chip-green'}`} style={{ marginBottom:12, display:'inline-block' }}>{a.tag}</span>
              <h3 style={{ fontSize:16, fontWeight:500, marginBottom:8, lineHeight:1.4 }}>{a.titulo}</h3>
              {a.resumo && <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.7, marginBottom:14 }}>{a.resumo}</p>}
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--text-muted)' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 3.5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                {a.tempo_leitura}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
