import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', gap:16, padding:24, textAlign:'center', background:'var(--off-white)' }}>
      <span style={{ fontSize:60 }}>🌿</span>
      <h2 style={{ fontFamily:'var(--font-display)', fontWeight:300, fontSize:28 }}>Página não encontrada</h2>
      <p style={{ color:'var(--text-muted)', fontSize:15 }}>Essa rota não existe.</p>
      <button className="btn-primary" style={{ marginTop:8 }} onClick={()=>navigate('/')}>← Voltar ao início</button>
    </div>
  )
}
