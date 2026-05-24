import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AppLayout from '../layouts/AppLayout'

const CFG = {
  otimo:   { emoji:'🌟', cor:'#2d8a52', corBg:'var(--green-50)', corBorda:'var(--green-200)', chip:'chip-green', corBarra:'var(--green-400)' },
  bom:     { emoji:'😊', cor:'#226b3f', corBg:'var(--green-50)', corBorda:'var(--green-200)', chip:'chip-green', corBarra:'var(--green-500)' },
  atencao: { emoji:'🌤', cor:'#7a5000', corBg:'#fffbe6', corBorda:'#ffe58f', chip:'chip-amber', corBarra:'#f5a623' },
  alerta:  { emoji:'⚠️', cor:'#8b3a00', corBg:'#fff4e6', corBorda:'#ffc08a', chip:'chip-amber', corBarra:'#e07000' },
  critico: { emoji:'🆘', cor:'#8b1a1a', corBg:'#ffe9e9', corBorda:'#f5a0a0', chip:'chip-red',   corBarra:'#c0392b' },
}

export default function Resultado() {
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(()=>{ if(!state?.resultado) navigate('/',{replace:true}) },[state,navigate])
  if(!state?.resultado) return null

  const r = state.resultado
  const cfg = CFG[r.nivel]||CFG.bom
  const perc = Math.round(r.percentual)

  return (
    <AppLayout title="Seu resultado" subtitle="Questionário emocional">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>
        {/* Resultado principal */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Header do resultado */}
          <div style={{ border:`1.5px solid ${cfg.corBorda}`, borderRadius:'var(--radius-lg)', padding:'32px 36px', background:cfg.corBg }}>
            <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:20 }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:'white', border:`2px solid ${cfg.corBorda}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, flexShrink:0 }}>
                {cfg.emoji}
              </div>
              <div>
                <p style={{ fontSize:12, textTransform:'uppercase', letterSpacing:'1px', color:cfg.cor, fontWeight:600, marginBottom:6 }}>Resultado do questionário</p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:300, color:cfg.cor }}>{r.titulo}</h2>
              </div>
            </div>

            {/* Barra */}
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text-muted)', marginBottom:8 }}>
                <span>Nível de tensão emocional</span>
                <strong style={{ color:cfg.cor }}>{perc}%</strong>
              </div>
              <div className="progress-bar" style={{ height:10 }}>
                <div className="progress-fill" style={{ width:`${perc}%`, background:cfg.corBarra }}/>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginTop:4 }}>
                <span>Bem-estar elevado</span><span>Sobrecarga alta</span>
              </div>
            </div>

            <p style={{ fontSize:15, color:'var(--text-mid)', lineHeight:1.8 }}>{r.mensagem}</p>
          </div>

          {/* Alerta CVV */}
          {r.nivel==='critico' && (
            <div style={{ background:'#ffe9e9', border:'1.5px solid #f5a0a0', borderRadius:'var(--radius-lg)', padding:'20px 24px' }}>
              <p style={{ fontWeight:600, color:'#8b1a1a', marginBottom:6 }}>🆘 Precisa de apoio agora?</p>
              <p style={{ fontSize:14, color:'#c0392b', lineHeight:1.6, marginBottom:14 }}>O CVV atende 24h pelo número <strong>188</strong>, gratuitamente e com sigilo total.</p>
              <a href="tel:188" style={{ textDecoration:'none' }}>
                <button className="btn-primary" style={{ background:'#8b1a1a' }}>Ligar CVV — 188</button>
              </a>
            </div>
          )}
        </div>

        {/* Painel lateral */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Estatísticas */}
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--green-100)' }}>
              <p style={{ fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px', color:'var(--text-muted)' }}>Detalhes</p>
            </div>
            {[['Pontos obtidos', r.pontuacao],['Pontuação máxima', r.pontuacao_max],['Percentual', `${perc}%`]].map(([l,v])=>(
              <div key={l} style={{ padding:'14px 20px', borderBottom:'1px solid var(--green-50)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:13, color:'var(--text-muted)' }}>{l}</span>
                <strong style={{ fontSize:15, color:'var(--text-dark)' }}>{v}</strong>
              </div>
            ))}
          </div>

          {/* Ações */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <button className="btn-primary full" onClick={()=>navigate('/')}>← Voltar ao início</button>
            <button className="btn-ghost full" onClick={()=>navigate('/historico')}>Ver histórico</button>
            <button className="btn-ghost full" onClick={()=>navigate('/quiz')}>Refazer questionário</button>
          </div>

          {/* Sugestão */}
          <div style={{ background:'var(--green-50)', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'16px 18px' }}>
            <p style={{ fontSize:13, color:'var(--text-mid)', lineHeight:1.75 }}>
              💡 Pratique a <strong>respiração guiada</strong> para ajudar a regular suas emoções.
            </p>
            <button className="btn-ghost full" style={{ marginTop:10, fontSize:13 }} onClick={()=>navigate('/respiracao')}>
              🌿 Praticar respiração
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
