import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDicas } from '../services/api'
import AppLayout from '../layouts/AppLayout'
import Loading from '../components/Loading'

const ICONES = ['🏃','📵','🥗','🙏','🛑','🤝']

export default function Dicas() {
  const [dicas, setDicas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [aberta, setAberta] = useState(null)

  useEffect(() => {
    getDicas().then(r=>setDicas(r.data.dados||[])).finally(()=>setCarregando(false))
  }, [])

  return (
    <AppLayout title="Dicas de autocuidado" subtitle="Hábitos para o dia a dia">
      {carregando && <Loading />}
      {!carregando && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {dicas.map((d,i) => (
            <div key={d.id_dica}
              style={{ background:'white', border:`1.5px solid ${aberta===i?'var(--green-400)':'var(--green-100)'}`, borderRadius:'var(--radius-lg)', overflow:'hidden', transition:'all 0.2s', cursor:'pointer' }}
              onClick={()=>setAberta(aberta===i?null:i)}
            >
              <div style={{ padding:'18px 20px', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:46, height:46, borderRadius:12, background:'var(--green-100)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                  {ICONES[i%ICONES.length]}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:500, fontSize:15 }}>{d.titulo}</p>
                </div>
                <div style={{ color:'var(--text-muted)', transition:'transform 0.25s', transform: aberta===i?'rotate(180deg)':'none' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              {aberta===i && (
                <div style={{ padding:'0 20px 18px', borderTop:'1px solid var(--green-100)' }}>
                  <p style={{ fontSize:14, color:'var(--text-mid)', lineHeight:1.75, paddingTop:14 }}>{d.texto}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
