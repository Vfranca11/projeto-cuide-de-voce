import { useState, useEffect, useRef, useCallback } from 'react'
import AppLayout from '../layouts/AppLayout'

const CICLOS = [
  { label:'Inspire',  duracao:4000, cor:'#2d8a52', escala:1.55 },
  { label:'Segure',   duracao:7000, cor:'#226b3f', escala:1.55 },
  { label:'Expire',   duracao:8000, cor:'#6dc991', escala:0.72 },
  { label:'Descanse', duracao:2000, cor:'#a8e2be', escala:0.72 },
]

export default function Respiracao() {
  const [ativo, setAtivo] = useState(false)
  const [fase, setFase] = useState(0)
  const [segundos, setSegundos] = useState(4)
  const [ciclosCompletos, setCiclosCompletos] = useState(0)
  const timerRef = useRef(null)
  const faseRef = useRef(0)
  const segRef = useRef(4)

  const proximaFase = useCallback(() => {
    const nova = (faseRef.current+1)%CICLOS.length
    if(nova===0) setCiclosCompletos(c=>c+1)
    faseRef.current=nova; segRef.current=CICLOS[nova].duracao/1000
    setFase(nova); setSegundos(CICLOS[nova].duracao/1000)
  },[])

  useEffect(()=>{
    if(!ativo) return
    timerRef.current = setInterval(()=>{ segRef.current-=1; setSegundos(segRef.current); if(segRef.current<=0) proximaFase() },1000)
    return ()=>clearInterval(timerRef.current)
  },[ativo,proximaFase])

  const toggle = ()=>{
    if(ativo){ clearInterval(timerRef.current); faseRef.current=0; segRef.current=4; setFase(0); setSegundos(4); setCiclosCompletos(0) }
    setAtivo(v=>!v)
  }

  const c = CICLOS[fase]

  return (
    <AppLayout title="Respiração guiada" subtitle="Técnica 4-7-8">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:28, alignItems:'start' }}>
        {/* Orb central */}
        <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'48px', display:'flex', flexDirection:'column', alignItems:'center', gap:28 }}>
          <div style={{ position:'relative', width:240, height:240, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }} onClick={toggle}>
            {/* Anel externo */}
            <div style={{
              position:'absolute', inset:0, borderRadius:'50%',
              background:`radial-gradient(circle, ${ativo?c.cor:'var(--green-300)'} 0%, transparent 70%)`,
              transform:`scale(${ativo?c.escala:1})`,
              transition:'transform 1s ease-in-out, background 1s ease',
              opacity:0.3
            }}/>
            {/* Círculo principal */}
            <div style={{
              width:160, height:160, borderRadius:'50%',
              background: ativo?c.cor:'var(--green-400)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              transform:`scale(${ativo?c.escala:1})`,
              transition:'transform 1s ease-in-out, background 1s ease',
              boxShadow:`0 0 60px ${ativo?c.cor+'55':'rgba(45,138,82,0.25)'}`,
              position:'relative'
            }}>
              {ativo?(
                <>
                  <span style={{ color:'white', fontSize:18, fontWeight:500 }}>{c.label}</span>
                  <span style={{ color:'rgba(255,255,255,0.8)', fontSize:32, fontFamily:'var(--font-display)', fontWeight:300 }}>{segundos}s</span>
                </>
              ):(
                <span style={{ color:'white', fontSize:14, textAlign:'center', padding:'0 20px', lineHeight:1.5 }}>Clique para iniciar</span>
              )}
            </div>
          </div>

          {/* Fases */}
          <div style={{ display:'flex', gap:10, width:'100%', maxWidth:400 }}>
            {CICLOS.map((cf,i)=>(
              <div key={i} style={{
                flex:1, padding:'10px 8px', textAlign:'center',
                background: ativo&&fase===i ? 'var(--green-100)' : 'var(--off-white)',
                border:`1.5px solid ${ativo&&fase===i?'var(--green-400)':'var(--green-100)'}`,
                borderRadius:'var(--radius-md)', transition:'all 0.4s'
              }}>
                <span style={{ display:'block', fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', color:'var(--text-muted)', marginBottom:3 }}>{cf.label}</span>
                <span style={{ fontSize:16, fontWeight:500, color:'var(--green-700)' }}>{cf.duracao/1000}s</span>
              </div>
            ))}
          </div>

          {ciclosCompletos>0 && <p style={{ fontSize:14, color:'var(--text-muted)' }}>Ciclos completos: <strong style={{ color:'var(--green-700)' }}>{ciclosCompletos}</strong></p>}

          <button className="btn-primary" style={{ minWidth:200, background:ativo?'#8b1a1a':undefined }} onClick={toggle}>
            {ativo?'⏹ Parar':'▶ Iniciar exercício'}
          </button>
        </div>

        {/* Instruções */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'22px 24px' }}>
            <p style={{ fontWeight:500, fontSize:15, marginBottom:12 }}>Como funciona</p>
            <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.75, marginBottom:14 }}>A técnica 4-7-8 ativa o sistema nervoso parassimpático, reduzindo a ansiedade e promovendo relaxamento.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[['🫁','Inspire','pelo nariz por 4s'],['🤐','Segure','o ar por 7s'],['💨','Expire','pela boca por 8s'],['😌','Descanse','por 2 segundos']].map(([e,t,d])=>(
                <div key={t} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ fontSize:18 }}>{e}</span>
                  <div><p style={{ fontSize:13, fontWeight:500 }}>{t}</p><p style={{ fontSize:12, color:'var(--text-muted)' }}>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'var(--green-50)', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'18px 20px' }}>
            <p style={{ fontSize:13, color:'var(--text-mid)', lineHeight:1.75 }}>💡 Faça de <strong>3 a 5 ciclos</strong> para sentir o efeito completo. Ideal antes de dormir ou em momentos de ansiedade.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
