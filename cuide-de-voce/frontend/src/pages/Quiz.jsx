import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPerguntas, responderQuiz } from '../services/api'
import { useToast } from '../context/ToastContext'
import AppLayout from '../layouts/AppLayout'
import Loading from '../components/Loading'

export default function Quiz() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [perguntas, setPerguntas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [atual, setAtual] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [selecionada, setSelecionada] = useState(null)

  useEffect(()=>{
    getPerguntas().then(r=>setPerguntas(r.data.dados||[])).catch(()=>showToast('Erro ao carregar perguntas','error')).finally(()=>setCarregando(false))
  },[])

  useEffect(()=>{
    const id = perguntas[atual]?.id_pergunta
    setSelecionada(respostas[id]??null)
  },[atual,perguntas,respostas])

  const selecionar = v => {
    const id = perguntas[atual].id_pergunta
    setSelecionada(v); setRespostas(p=>({...p,[id]:v}))
  }

  const avancar = () => {
    if(selecionada===null){showToast('Selecione uma opção','error');return}
    if(atual<perguntas.length-1) setAtual(a=>a+1)
  }
  const voltar = () => { if(atual>0) setAtual(a=>a-1) }

  const enviar = async ()=>{
    if(selecionada===null){showToast('Selecione uma opção','error');return}
    setEnviando(true)
    try{
      const payload = perguntas.map(p=>({id_pergunta:p.id_pergunta, valor:respostas[p.id_pergunta]??0}))
      const res = await responderQuiz({respostas:payload})
      if(res.data.sucesso) navigate('/resultado',{state:{resultado:res.data.dados}})
    }catch(e){ showToast(e.response?.data?.mensagem||'Erro ao enviar','error') }
    finally{ setEnviando(false) }
  }

  if(carregando) return <AppLayout title="Questionário"><Loading /></AppLayout>

  const p = perguntas[atual]
  const total = Object.keys(respostas).length
  const prog = Math.round((total/perguntas.length)*100)
  const ehUltima = atual===perguntas.length-1

  return (
    <AppLayout title="Questionário emocional" subtitle={`${atual+1} de ${perguntas.length} perguntas`}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'start' }}>
        {/* Pergunta principal */}
        <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'32px 36px' }}>
          {/* Progress */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text-muted)', marginBottom:8 }}>
              <span>Pergunta {atual+1} de {perguntas.length}</span>
              <span>{prog}% respondido</span>
            </div>
            <div className="progress-bar" style={{ height:8 }}>
              <div className="progress-fill" style={{ width:`${prog}%` }}/>
            </div>
          </div>

          <p style={{ fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.8px', color:'var(--green-500)', marginBottom:12 }}>Pergunta {atual+1}</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:300, lineHeight:1.5, marginBottom:24 }}>{p.texto}</p>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {(p.opcoes||[]).map(o=>(
              <button key={o.id_opcao}
                onClick={()=>selecionar(o.valor)}
                style={{
                  display:'flex', alignItems:'center', gap:14, padding:'14px 18px',
                  border:`1.5px solid ${selecionada===o.valor?'var(--green-500)':'var(--green-100)'}`,
                  borderRadius:'var(--radius-md)',
                  background: selecionada===o.valor?'var(--green-50)':'var(--off-white)',
                  cursor:'pointer', textAlign:'left', transition:'all 0.15s', fontFamily:'var(--font-body)'
                }}
              >
                <div style={{
                  width:18, height:18, borderRadius:'50%', flexShrink:0,
                  border:`1.5px solid ${selecionada===o.valor?'var(--green-500)':'var(--green-300)'}`,
                  background: selecionada===o.valor?'var(--green-500)':'transparent',
                  transition:'all 0.15s'
                }}/>
                <span style={{ fontSize:14, color:'var(--text-dark)' }}>{o.texto}</span>
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap:10, marginTop:24 }}>
            {atual>0 && <button className="btn-ghost" onClick={voltar}>← Anterior</button>}
            <div style={{ flex:1 }}/>
            {ehUltima
              ? <button className="btn-primary" onClick={enviar} disabled={enviando}>{enviando?'Enviando...':'Ver resultado →'}</button>
              : <button className="btn-primary" onClick={avancar}>Próxima →</button>
            }
          </div>
        </div>

        {/* Painel lateral — visão geral */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'20px 22px' }}>
            <p style={{ fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px', color:'var(--text-muted)', marginBottom:14 }}>Seu progresso</p>
            <div style={{ display:'flex', gap:14, marginBottom:12 }}>
              <div style={{ flex:1, textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:300, color:'var(--green-600)' }}>{total}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)' }}>Respondidas</p>
              </div>
              <div style={{ width:1, background:'var(--green-100)' }}/>
              <div style={{ flex:1, textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:300, color:'var(--text-muted)' }}>{perguntas.length-total}</p>
                <p style={{ fontSize:12, color:'var(--text-muted)' }}>Restantes</p>
              </div>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width:`${prog}%` }}/></div>
          </div>

          <div style={{ background:'var(--green-50)', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'18px 20px' }}>
            <p style={{ fontSize:13, color:'var(--text-mid)', lineHeight:1.75 }}>
              💡 Responda com honestidade. Não há respostas certas ou erradas — o resultado reflete como você está se sentindo agora.
            </p>
          </div>

          {/* Mini mapa das perguntas */}
          <div style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'18px 20px' }}>
            <p style={{ fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.6px', color:'var(--text-muted)', marginBottom:12 }}>Mapa de respostas</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {perguntas.map((_,i)=>(
                <div key={i}
                  onClick={()=>setAtual(i)}
                  style={{
                    width:28, height:28, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:500, cursor:'pointer',
                    background: i===atual?'var(--green-600)': respostas[perguntas[i]?.id_pergunta]!==undefined?'var(--green-100)':'var(--off-white)',
                    color: i===atual?'white': respostas[perguntas[i]?.id_pergunta]!==undefined?'var(--green-700)':'var(--text-muted)',
                    border:`1px solid ${i===atual?'var(--green-600)':'var(--green-100)'}`,
                    transition:'all 0.15s'
                  }}
                >{i+1}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
