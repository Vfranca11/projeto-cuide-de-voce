import AppLayout from '../layouts/AppLayout'
import { useNavigate } from 'react-router-dom'

const RECURSOS = [
  { emoji:'📞', titulo:'CVV — Centro de Valorização da Vida', desc:'Atendimento 24h, gratuito e sigiloso para pessoas em sofrimento emocional ou crise.', acao:'Ligar: 188', href:'tel:188', cor:'#8b1a1a', bg:'#ffe9e9', borda:'#f5a0a0' },
  { emoji:'💬', titulo:'Chat CVV', desc:'Prefere escrever? O CVV atende pelo chat no site oficial todos os dias.', acao:'Acessar chat', href:'https://www.cvv.org.br', cor:'#226b3f', bg:'var(--green-50)', borda:'var(--green-200)' },
  { emoji:'🏥', titulo:'CAPS — Centro de Atenção Psicossocial', desc:'Serviço público gratuito de saúde mental. Procure a unidade mais próxima.', acao:'Saiba mais', href:'https://www.gov.br/saude/pt-br/assuntos/saude-mental', cor:'#1a4e8b', bg:'#e0f0ff', borda:'#a0c8f5' },
  { emoji:'📱', titulo:'CVV — WhatsApp', desc:'Atendimento por texto via WhatsApp para pessoas em sofrimento.', acao:'Acessar WhatsApp', href:'https://www.cvv.org.br/whatsapp/', cor:'#226b3f', bg:'var(--green-50)', borda:'var(--green-200)' },
]

const TECNICAS = [
  { titulo:'Respiração 4-7-8', desc:'Inspire 4s → Segure 7s → Expire 8s. Ative a resposta de calma do sistema nervoso.' },
  { titulo:'Grounding 5-4-3-2-1', desc:'Nomeie 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia.' },
  { titulo:'Técnica STOP', desc:'Pare, Respire fundo, Observe seus pensamentos e sentimentos, Prossiga com consciência.' },
]

export default function Ajuda() {
  const navigate = useNavigate()

  return (
    <AppLayout title="Ajuda e suporte" subtitle="Recursos disponíveis">
      {/* Alerta emergência */}
      <div style={{ background:'#ffe9e9', border:'1.5px solid #f5a0a0', borderRadius:'var(--radius-lg)', padding:'18px 22px', display:'flex', gap:14, alignItems:'flex-start', marginBottom:24 }}>
        <span style={{ fontSize:28 }}>🆘</span>
        <div>
          <p style={{ fontWeight:600, color:'#8b1a1a', marginBottom:4 }}>Em caso de emergência</p>
          <p style={{ fontSize:14, color:'#c0392b', lineHeight:1.6 }}>
            Se você ou alguém que você conhece está em perigo imediato, ligue para o <strong>SAMU 192</strong> ou vá ao pronto-socorro mais próximo.
          </p>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:24 }}>
        {/* Canais de apoio */}
        <div>
          <p className="section-label">Canais de apoio gratuitos</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {RECURSOS.map((r,i)=>(
              <a key={i} href={r.href} target={r.href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                style={{ background:r.bg, border:`1.5px solid ${r.borda}`, borderRadius:'var(--radius-lg)', padding:'18px 20px', textDecoration:'none', display:'block', transition:'all 0.18s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='var(--shadow)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              >
                <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:10 }}>
                  <span style={{ fontSize:26 }}>{r.emoji}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:500, fontSize:14, color:r.cor, marginBottom:4 }}>{r.titulo}</p>
                    <p style={{ fontSize:13, color:'var(--text-mid)', lineHeight:1.6 }}>{r.desc}</p>
                  </div>
                </div>
                <p style={{ fontSize:13, fontWeight:500, color:r.cor, borderTop:`1px solid ${r.borda}`, paddingTop:10 }}>{r.acao} →</p>
              </a>
            ))}
          </div>
        </div>

        {/* Técnicas + nota */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <p className="section-label">Técnicas de alívio imediato</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {TECNICAS.map((t,i)=>(
                <div key={i} style={{ background:'white', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'16px 18px', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--green-100)', color:'var(--green-700)', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i+1}</div>
                  <div>
                    <p style={{ fontWeight:500, fontSize:14, marginBottom:4 }}>{t.titulo}</p>
                    <p style={{ fontSize:13, color:'var(--text-muted)', lineHeight:1.6 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-ghost full" onClick={()=>navigate('/respiracao')}>🌿 Praticar respiração guiada</button>

          <div style={{ background:'var(--green-50)', border:'1.5px solid var(--green-100)', borderRadius:'var(--radius-lg)', padding:'16px 18px' }}>
            <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.75 }}>
              O <strong>Cuide de Você</strong> é uma ferramenta de apoio e autocuidado, não substitui acompanhamento profissional de saúde mental.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
