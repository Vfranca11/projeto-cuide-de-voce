import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistorico, removerHistorico, limparHistorico } from '../services/api'
import { useToast } from '../context/ToastContext'
import AppLayout from '../layouts/AppLayout'
import Loading from '../components/Loading'

const NIVEL = {
  otimo:   { emoji:'🌟', chip:'chip-green', corBarra:'var(--green-400)' },
  bom:     { emoji:'😊', chip:'chip-green', corBarra:'var(--green-500)' },
  atencao: { emoji:'🌤', chip:'chip-amber', corBarra:'#f5a623' },
  alerta:  { emoji:'⚠️', chip:'chip-amber', corBarra:'#e07000' },
  critico: { emoji:'🆘', chip:'chip-red',   corBarra:'#c0392b' },
}

const fmt = s => s ? new Date(s).toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : ''

export default function Historico() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [historico, setHistorico] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [confirmLimpar, setConfirmLimpar] = useState(false)
  const [removendo, setRemovendo] = useState(null)

  useEffect(()=>{
    getHistorico().then(r=>setHistorico(r.data.dados||[])).catch(()=>showToast('Erro ao carregar histórico','error')).finally(()=>setCarregando(false))
  },[])

  const remover = async id => {
    setRemovendo(id)
    try{ await removerHistorico(id); setHistorico(h=>h.filter(r=>r.id_resultado!==id)); showToast('Removido') }
    catch{ showToast('Erro ao remover','error') }
    finally{ setRemovendo(null) }
  }

  const limpar = async ()=>{
    try{ await limparHistorico(); setHistorico([]); setConfirmLimpar(false); showToast('Histórico apagado') }
    catch{ showToast('Erro ao apagar','error') }
  }

  return (
    <AppLayout title="Histórico" subtitle="Seus resultados anteriores">
      {carregando && <Loading />}

      {!carregando && historico.length===0 && (
        <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'64px 36px', display:'flex', flexDirection:'column', alignItems:'center', gap:14, textAlign:'center' }}>
          <span style={{ fontSize:56 }}>📋</span>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:300 }}>Nenhum resultado ainda</h3>
          <p style={{ color:'var(--text-muted)', fontSize:14 }}>Responda o questionário para ver seu histórico aqui.</p>
          <button className="btn-primary" style={{ marginTop:8 }} onClick={()=>navigate('/quiz')}>Responder questionário</button>
        </div>
      )}

      {!carregando && historico.length>0 && (
        <>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <p style={{ fontSize:14, color:'var(--text-muted)' }}>{historico.length} resultado{historico.length!==1?'s':''}</p>
            <button style={{ background:'none', border:'1px solid #f5a0a0', borderRadius:'999px', color:'#c0392b', fontFamily:'var(--font-body)', fontSize:13, padding:'6px 16px', cursor:'pointer' }} onClick={()=>setConfirmLimpar(true)}>
              Apagar tudo
            </button>
          </div>

          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Resultado</th>
                  <th>Nível</th>
                  <th>Pontuação</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {historico.map(r=>{
                  const cfg = NIVEL[r.nivel]||NIVEL.bom
                  return (
                    <tr key={r.id_resultado}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <span style={{ fontSize:20 }}>{cfg.emoji}</span>
                          <div>
                            <p style={{ fontWeight:500, fontSize:14 }}>{r.titulo}</p>
                            <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2, maxWidth:280, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.mensagem}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className={`chip ${cfg.chipClass||cfg.chip}`}>{r.nivel}</span></td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div className="progress-bar" style={{ width:80 }}>
                            <div className="progress-fill" style={{ width:`${r.percentual}%`, background:cfg.corBarra }}/>
                          </div>
                          <span style={{ fontSize:13 }}>{Math.round(r.percentual)}%</span>
                        </div>
                      </td>
                      <td style={{ fontSize:13, color:'var(--text-muted)', whiteSpace:'nowrap' }}>{fmt(r.gerado_em)}</td>
                      <td>
                        <button
                          onClick={()=>remover(r.id_resultado)}
                          disabled={removendo===r.id_resultado}
                          style={{ background:'none', border:'1px solid var(--green-100)', borderRadius:'999px', color:'var(--text-muted)', fontFamily:'var(--font-body)', fontSize:12, padding:'4px 12px', cursor:'pointer', transition:'all 0.15s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='#f5a0a0';e.currentTarget.style.color='#c0392b'}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--green-100)';e.currentTarget.style.color='var(--text-muted)'}}
                        >
                          {removendo===r.id_resultado?'...':'Remover'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal */}
      {confirmLimpar && (
        <div style={{ position:'fixed', inset:0, background:'rgba(10,46,26,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9000 }}>
          <div style={{ background:'white', borderRadius:'var(--radius-lg)', padding:28, width:360, boxShadow:'var(--shadow-lg)' }}>
            <p style={{ fontWeight:500, marginBottom:8, fontSize:16 }}>Apagar todo o histórico?</p>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:20 }}>Essa ação não pode ser desfeita.</p>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn-ghost full" onClick={()=>setConfirmLimpar(false)}>Cancelar</button>
              <button className="btn-primary full" style={{ background:'#8b1a1a' }} onClick={limpar}>Apagar tudo</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
