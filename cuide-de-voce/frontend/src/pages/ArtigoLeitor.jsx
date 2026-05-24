import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArtigo } from '../services/api'
import AppLayout from '../layouts/AppLayout'
import Loading from '../components/Loading'
import styles from './ArtigoLeitor.module.css'

export default function ArtigoLeitor() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [artigo, setArtigo] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    getArtigo(id).then(r=>setArtigo(r.data.dados)).finally(()=>setCarregando(false))
  }, [id])

  return (
    <AppLayout title={artigo?.titulo||'Artigo'} subtitle={artigo?.tempo_leitura}>
      <button className="btn-back" style={{ marginBottom:20 }} onClick={() => navigate('/artigos')}>← Voltar para artigos</button>
      {carregando && <Loading />}
      {!carregando && artigo && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'32px 36px' }}>
            <span className="chip chip-green" style={{ marginBottom:16, display:'inline-block' }}>{artigo.tag}</span>
            <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: artigo.conteudo }} />
          </div>
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'22px 24px', position:'sticky', top:80 }}>
            <p style={{ fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px', color:'var(--text-muted)', marginBottom:12 }}>Sobre este artigo</p>
            <p style={{ fontSize:14, fontWeight:500, marginBottom:6 }}>{artigo.titulo}</p>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--text-muted)', marginBottom:16 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {artigo.tempo_leitura}
            </div>
            <button className="btn-ghost full" onClick={()=>navigate('/artigos')}>← Ver todos os artigos</button>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
