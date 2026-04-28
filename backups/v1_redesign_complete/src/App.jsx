import React, { useState, useEffect } from 'react'
import './index.css'

const App = () => {
  const [step, setStep] = useState('WELCOME')
  const [quizStep, setQuizStep] = useState(1)
  const [loadingText, setLoadingText] = useState('Iniciando Super-Análise...')
  const [userPhotos, setUserPhotos] = useState({ selfie: null, looks: null })
  const [analysisStep, setAnalysisStep] = useState(0)

  useEffect(() => {
    if (step === 'PROCESSING') {
      const themes = [
        'Iniciando Bioestatística Facial...',
        'Mapeando Geometria de Traços...',
        'Escaneando Iris e Pigmentação...',
        'Analisando Subtom e Tonalidade...',
        'Testando Combinação de Pele...',
        'Iniciando Draping Digital...',
        'Cores que Valorizam vs Apagam...',
        'Calculando Contraste de Impacto...',
        'Curando Looks de Alta Presença...',
        'Sincronizando Estilo e Arquétipos...',
        'Mapeando Poder Cromático...',
        'Finalizando Mapa Absoluto...'
      ]
      let i = 0
      const interval = setInterval(() => {
        setLoadingText(themes[i % themes.length])
        setAnalysisStep(prev => prev + 1)
        i++
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [step])
  const [formData, setFormData] = useState({
    nome: '', idade_faixa: '', tipo_pele: '', ouro_ou_prata: '',
    cor_cabelo: '', cor_olhos: '', estilo_atual: '', ja_fez_consultoria: ''
  })

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUserPhotos(prev => ({ ...prev, [type]: url }))
    }
  }

  const renderWelcome = () => (
    <div className="animate-fade">
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
        <div className="badge">BIOMETRY • COLOR • ESSENCE</div>
        <h1 style={{ fontSize: '2.8rem', lineHeight: '1.1', color: 'var(--white)', fontWeight: '900' }}>
          INTELLIGENCE <br/> <span className="serif" style={{ color: 'var(--primary)', textTransform: 'none', fontSize: '2.4rem' }}>Digital Luxury</span>
        </h1>
        <p style={{ letterSpacing: '2px', fontSize: '0.75rem', marginTop: '20px', color: 'var(--text-muted)', opacity: 0.8 }}>
          O FUTURO DA SUA IMAGEM COMEÇA AGORA
        </p>
      </div>
      
      <div className="image-container animate-slide-up" style={{ marginBottom: '50px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} className="avatar-preview" alt="Welcome" />
        <div className="scan-line"></div>
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <h2 style={{ fontSize: '1.8rem', textTransform: 'none', lineHeight: '1.2' }} className="serif">Análise Bioestética por Inteligência Artificial.</h2>
        </div>
      </div>

      <button className="btn-primary animate-slide-up" onClick={() => setStep('QUIZ')}>INICIAR MAPA DE BELEZA</button>
      <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>ESCANEE SEU DNA VISUAL EM 30 SEGUNDOS</p>
    </div>
  )

  const renderQuiz = () => (
    <div className="animate-fade">
      <div style={{ marginBottom: '30px' }}>
        <div className="badge">PASSO {quizStep} DE 2</div>
        <h2 style={{ fontSize: '1.8rem' }}>{quizStep === 1 ? 'Sua Identidade' : 'Seu Perfil Visual'}</h2>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${quizStep === 1 ? '50%' : '100%'}` }}></div></div>
      </div>

      {quizStep === 1 ? (
        <>
          <div className="input-group">
            <label className="label-futuristic">Como podemos te chamar?</label>
            <input type="text" className="input-field" placeholder="Nome Completo" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
          </div>
          <div className="input-group">
            <label className="label-futuristic">Faixa de Idade</label>
            <div className="chip-grid">
              {['18-25', '26-35', '36-45', '46+'].map(v => <button key={v} type="button" className={`chip ${formData.idade_faixa === v ? 'active' : ''}`} onClick={() => setFormData({...formData, idade_faixa: v})}>{v}</button>)}
            </div>
          </div>
          <div className="input-group">
            <label className="label-futuristic">Tipo de Pele</label>
            <div className="chip-grid">
              {['Clara', 'Média', 'Escura'].map(v => <button key={v} type="button" className={`chip ${formData.tipo_pele === v ? 'active' : ''}`} onClick={() => setFormData({...formData, tipo_pele: v})}>{v}</button>)}
            </div>
          </div>
          <div className="input-group">
            <label className="label-futuristic">Metal Predominante</label>
            <div className="chip-grid">
              {['Ouro', 'Prata', 'Ambos'].map(v => <button key={v} type="button" className={`chip ${formData.ouro_ou_prata === v ? 'active' : ''}`} onClick={() => setFormData({...formData, ouro_ou_prata: v})}>{v}</button>)}
            </div>
          </div>
          <button className="btn-primary" disabled={!formData.nome || !formData.idade_faixa} onClick={() => setQuizStep(2)}>Próximo</button>
        </>
      ) : (
        <>
          {/* Step 2 fields similarly updated to chips */}
          <div className="input-group">
            <label className="label-futuristic">Cor do Cabelo</label>
            <div className="chip-grid">
              {['Loiro', 'Castanho', 'Preto', 'Ruivo'].map(v => <button key={v} type="button" className={`chip ${formData.cor_cabelo === v ? 'active' : ''}`} onClick={() => setFormData({...formData, cor_cabelo: v})}>{v}</button>)}
            </div>
          </div>
          <div className="input-group">
            <label className="label-futuristic">Cor dos Olhos</label>
            <div className="chip-grid">
              {['Castanhos', 'Azuis', 'Verdes', 'Mel'].map(v => <button key={v} type="button" className={`chip ${formData.cor_olhos === v ? 'active' : ''}`} onClick={() => setFormData({...formData, cor_olhos: v})}>{v}</button>)}
            </div>
          </div>
          <button className="btn-primary" onClick={() => setStep('PHOTOS')}>Continuar</button>
        </>
      )}
    </div>
  )

  const renderPhotos = () => (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <div className="badge">SCAN VISUAL</div>
        <h2 style={{ fontSize: '2rem' }}>Documentação <span className="serif" style={{ textTransform: 'none' }}>Bioestética</span></h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px' }}>Carregue uma selfie frontal com iluminação natural para precisão técnica.</p>
      </div>
      
      <label className="card animate-slide-up" style={{ cursor: 'pointer', textAlign: 'center', padding: '0', overflow: 'hidden' }}>
        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload('selfie', e)} />
        {userPhotos.selfie ? (
          <img src={userPhotos.selfie} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        ) : (
          <div style={{ padding: '80px 40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📸</div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.8rem', letterSpacing: '2px' }}>CARREGAR FOTO</h4>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '10px' }}>Certifique-se de estar sem óculos e com o rosto limpo.</p>
          </div>
        )}
      </label>

      <button className="btn-primary animate-slide-up" disabled={!userPhotos.selfie} onClick={() => { setStep('PROCESSING'); setAnalysisStep(0); setTimeout(() => setStep('RESULT_PARTIAL'), 25000) }}>GERAR MEU DOSSIÊ AGORA</button>
    </div>
  )

  const renderProcessing = () => (
    <div className="animate-fade">
      <div className="card" style={{ padding: '40px 30px', marginTop: '50px' }}>
        <div className="badge">ULTIMATE DIAGNOSTIC SUITE</div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--primary)' }}>{loadingText}</h2>
        <div style={{ height: '3px', background: 'var(--glass-border)', margin: '25px 0', position: 'relative' }}>
          <div style={{ position: 'absolute', height: '100%', background: 'var(--primary)', width: `${(analysisStep / 12) * 100}%`, transition: 'all 0.5s', boxShadow: '0 0 15px var(--primary)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {[
            { label: 'BIOMETRIA E GEOMETRIA FACIAL', step: 2, icon: '📐' },
            { label: 'COMBINAÇÃO DE PELE E SUBTOM', step: 4, icon: '✨' },
            { label: 'VALORIZAM VS APAGAM (CONTRASTE)', step: 7, icon: '🎭' },
            { label: 'DNA DE ESTILO E ARQUÉTIPOS', step: 9, icon: '🧬' },
            { label: 'LOOKS DE ALTO IMPACTO', step: 10, icon: '👗' },
            { label: 'MAPA CROMÁTICO E PALETA DE PODER', step: 12, icon: '🎨' }
          ].map((item, idx) => (
            <div key={idx} style={{ opacity: analysisStep >= item.step - 2 ? 1 : 0.2, transition: 'all 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px' }}>
                <span style={{ color: analysisStep >= item.step ? 'var(--primary)' : '#fff' }}>{item.icon} {item.label}</span>
                <span style={{ color: analysisStep >= item.step ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.55rem' }}>
                  {analysisStep >= item.step ? 'CONCLUÍDO ✓' : 'ANALISANDO...'}
                </span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  background: analysisStep >= item.step ? 'var(--primary)' : 'var(--accent)', 
                  width: analysisStep >= item.step ? '100%' : (analysisStep >= item.step - 2 ? '65%' : '0%'),
                  transition: 'all 2s ease-in-out'
                }}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '35px', padding: '20px', background: 'rgba(240, 180, 170, 0.05)', borderRadius: '15px', border: '1px solid var(--primary)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.5', fontWeight: '600' }}>
            ⚠️ SISTEMA DE ALTA PRECISÃO: Cruzando Biometria com Banco de Dados de Luxo. Por favor, não feche esta página.
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ transform: 'scale(0.5)', marginTop: '10px' }}></div>
      </div>
    </div>
  )

  const renderResultPartial = () => (
    <div className="animate-fade">
      {/* PÁGINA 1: SUA ESSÊNCIA */}
      <div className="animate-fade">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', lineHeight: '1' }}>CONSULTORIA <br/> DE <span className="serif">Imagem</span></h1>
          <p style={{ letterSpacing: '3px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px' }}>ESTILO, CONFIANÇA E AUTENTICIDADE</p>
        </div>

        <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
          <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '550px', objectFit: 'cover' }} />
          <div style={{ padding: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem' }}>✨</span>
              <h3 style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: '800' }}>SUA ESSÊNCIA ÚNICA</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: '800' }}>✦ ARQUITETURA FACIAL</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Seus traços possuem uma harmonia natural que transmite sofisticação e uma presença marcante, típica de mulheres que dominam sua própria imagem.</p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: '800' }}>✦ MAGNETISMO NATURAL</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Olhar profundo e expressivo, com uma estrutura facial que valoriza a feminilidade e a autoridade em equilíbrio perfeito.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h4 className="badge" style={{ marginBottom: '25px' }}>PALAVRAS-CHAVE</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontSize: '0.55rem', fontWeight: '800' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span>🌿</span><span>AUTÊNTICA</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span>👑</span><span>ELEGANTE</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span>✨</span><span>NATURAL</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span>💎</span><span>CONFIANTE</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><span>❤️</span><span>FEMININA</span></div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.2rem' }}>🍃</span>
            <h3 style={{ fontSize: '1rem', letterSpacing: '2px' }}>SEU ESTILO</h3>
          </div>
          <h4 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '10px' }} className="serif">Clássico Contemporâneo</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Seu estilo une o clássico e o moderno de forma equilibrada. Na imagem, isso aparece na leveza dos traços, na naturalidade da expressão e nas escolhas que transmitem sofisticação sem esforço.
          </p>
        </div>

        <div style={{ padding: '40px 20px', textAlign: 'left', position: 'relative' }}>
          <span style={{ fontSize: '3rem', position: 'absolute', top: '10px', left: '0', opacity: 0.1 }}>“</span>
          <p className="serif" style={{ fontSize: '1.8rem', lineHeight: '1.2', color: 'var(--white)' }}>
            Você não precisa mudar quem você é. Você precisa <span style={{ color: 'var(--accent)' }}>revelar</span> quem você é.
          </p>
          <div style={{ width: '50px', height: '1px', background: 'var(--accent)', margin: '30px 0' }}></div>
        <div className="card" style={{ background: 'rgba(20, 20, 25, 0.95)', border: '1px solid var(--glass-border)', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '40px 30px' }}>
            <div className="badge" style={{ color: 'var(--accent)' }}>PÁGINA 01</div>
            <h1 className="serif" style={{ fontSize: '3rem', lineHeight: '1', marginBottom: '10px', color: 'var(--white)' }}>CONSULTORIA DE IMAGEM</h1>
            <p className="serif" style={{ fontSize: '1.2rem', color: 'var(--accent)', fontStyle: 'italic', marginBottom: '30px' }}>Estilo, confiança e autenticidade</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px' }}>
                <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--white)', marginBottom: '15px' }}>✨ SUA ESSÊNCIA</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '5px' }}>HARMONIA FACIAL</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Seus traços são equilibrados e expressivos, com um olhar que transmite profundidade, inteligência e sensibilidade.</p>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '5px' }}>PONTOS FORTES NATURAIS</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Olhos marcantes, sobrancelhas bem definidas, lábios com formato elegante e um contorno suave que valoriza sua feminilidade.</p>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '5px' }}>IMPRESSÃO VISUAL</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Você transmite presença, segurança e autenticidade. Sua imagem passa uma sensação de elegância natural e acolhimento sofisticado.</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
                <h5 style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '15px', textAlign: 'center' }}>PALAVRAS-CHAVE</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  {['AUTÊNTICA', 'ELEGANTE', 'SENSÍVEL', 'CONFIANTE', 'MODERNA', 'INSPIRADORA'].map((word, i) => (
                    <span key={i} style={{ fontSize: '0.6rem', color: 'var(--white)', opacity: 0.8 }}>{word} {i < 5 ? '✦' : ''}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginTop: '30px' }}>
          <div className="card" style={{ padding: '30px' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '20px' }}>SEU ESTILO</h4>
            <h3 className="serif" style={{ fontSize: '1.6rem', color: 'var(--white)', marginBottom: '15px', textTransform: 'none' }}>Elegância Sofisticada com Toque Moderno</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Seu estilo transmite maturidade, feminilidade e bom gosto. Você tem uma presença natural que dispensa excessos e ganha força quando comunica sua essência com intenção. O ideal é um visual que una sofisticação, leveza e autenticidade, com peças de qualidade e caimento impecável que valorizem sua beleza real.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '15px' }}>“</div>
            <p className="serif" style={{ fontSize: '1.4rem', color: 'var(--white)', fontStyle: 'italic', lineHeight: '1.4' }}>
              Você não precisa mudar quem você é. Você precisa <span style={{ color: 'var(--accent)' }}>revelar</span> quem você é.
            </p>
            <div style={{ fontSize: '2rem', color: 'var(--accent)', marginTop: '5px', transform: 'rotate(180deg)' }}>“</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ letterSpacing: '3px', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '700' }}>✦ E ISSO É SÓ O COMEÇO DO QUE SUA IMAGEM PODE TRANSMITIR...</p>
        </div>
      </div>

      {/* PÁGINA 2: DIAGNÓSTICO DETALHADO */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '30px' }}>
          <div className="badge">DIAGNÓSTICO • PÁGINA 02</div>
          <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '10px', color: 'var(--white)' }}>O que está impedindo sua imagem de evoluir <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>(e você não percebeu)</span></h2>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '4px', border: '1px solid var(--glass-border)', marginTop: '20px' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <div>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--white)', marginBottom: '8px' }}>DIAGNÓSTICO DIRETO</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Existe uma harmonia natural no seu rosto — isso é claro. Mas hoje, alguns elementos não estão trabalhando a seu favor... estão apenas "neutros".
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginTop: '30px' }}>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}>•</span> A escolha de cores próximas ao preto cria peso visual e reduz a leveza do seu rosto.
              </li>
              <li style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}>•</span> O cabelo, apesar de bonito, não está sendo usado estrategicamente para valorizar seus traços.
              </li>
              <li style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--accent)' }}>•</span> O estilo atual comunica simplicidade... mas não transmite todo o potencial de presença que você tem.
              </li>
            </ul>
            <div style={{ background: 'var(--primary-glow)', padding: '20px', borderRadius: '4px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginBottom: '10px' }}>✨</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--white)', lineHeight: '1.4' }}>Nada está errado — mas também não está <strong>intencional</strong>.</p>
            </div>
          </div>
        </div>

        {/* CONTRASTE COMPARISON */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', position: 'relative' }}>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(255,255,255,0.03)' }}>
              <h5 style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>COMO ESTÁ HOJE:</h5>
            </div>
            <img src="/contrast_comparison.png" style={{ width: '100%', height: '280px', objectFit: 'cover', filter: 'grayscale(0.3)' }} />
            <div style={{ padding: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Imagem natural, acessível e simpática</li>
                <li>• Beleza evidente, porém discreta</li>
                <li>• Presença leve, mas pouco marcante</li>
              </ul>
              <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.02)', textAlign: 'center', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--white)' }}>Hoje você é vista. Mas poderia ser <strong>lembrada</strong>.</p>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, background: 'var(--accent)', color: '#000', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem', border: '4px solid var(--bg-dark)' }}>VS</div>

          <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--accent)' }}>
            <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.1)' }}>
              <h5 style={{ fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--accent)' }}>COMO PODERIA ESTAR:</h5>
            </div>
            <img src="/contrast_comparison.png" style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.65rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>✨ Imagem mais refinada e estratégica</li>
                <li>✨ Traços mais iluminados e definidos</li>
                <li>✨ Presença que chama atenção com elegância</li>
              </ul>
              <div style={{ marginTop: '15px', padding: '10px', background: 'var(--accent)', textAlign: 'center', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.7rem', color: '#000', fontWeight: 'bold' }}>Só alinhar sua imagem com seu potencial.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PONTOS DE ATENÇÃO */}
        <div className="card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👁️</div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--white)' }}>PONTOS DE ATENÇÃO</h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {[
              "Uso excessivo de cores escuras próximas ao rosto (apagam sua luminosidade)",
              "Falta de contraste estratégico entre cabelo, pele e roupa",
              "Estilo neutro que não reforça sua identidade visual",
              "Cabelo sem direcionamento de volume e moldura facial",
              "Elementos visuais que não destacam seu olhar (que é um dos seus pontos fortes)"
            ].map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '4px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--accent)' }}>{i + 1}</span>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '25px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '70%' }}>
            Você não precisa mudar quem você é... só precisa alinhar sua imagem com o que você já carrega.
          </p>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>→</div>
          </div>
        </div>
      </div>

      {/* PÁGINA 3: COLORIMETRIA TÉCNICA (DASHBOARD) */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '30px' }}>
          <div className="badge">ANÁLISE CROMÁTICA • PÁGINA 03</div>
          <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '10px', color: 'var(--white)' }}>Sua Colorimetria Técnica</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '30px' }}>MÉTRICAS QUE DEFINEM SUA HARMONIA NATURAL</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', marginBottom: '40px' }}>
            {/* SUBTOM COMPARATIVO */}
            <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
              <h5 style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '20px' }}>DETERMINAÇÃO DE SUBTOM</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.4 }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom, #d8a7b1, #b2beb5)', borderRadius: '4px' }}></div>
                  <span style={{ fontSize: '0.65rem' }}>FRIO / COOL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid var(--accent)', padding: '10px', borderRadius: '4px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom, #d2b48c, #8b4513)', borderRadius: '4px' }}></div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--white)', fontWeight: 'bold' }}>QUENTE / WARM ✓</span>
                    <p style={{ fontSize: '0.5rem', color: 'var(--accent)' }}>Amarelado • Dourado • Pêssego</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ESCALAS TÉCNICAS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--white)' }}>CONTRASTE PESSOAL</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>MÉDIO-ALTO</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0', width: '75%', height: '100%', background: 'var(--accent)', borderRadius: '3px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--white)' }}>INTENSIDADE</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>SUAVE / OPACA</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0', width: '40%', height: '100%', background: 'var(--accent)', borderRadius: '3px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--white)' }}>PROFUNDIDADE</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>MÉDIA-ESCURA</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0', width: '85%', height: '100%', background: 'var(--accent)', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* BEAUTY BASE (MAKEUP MATCHING) */}
          <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', marginBottom: '30px' }}>
            <img src="/beauty_base_skin_grid.png" style={{ width: '100%', height: '200px', objectFit: 'cover', opacity: 0.8 }} />
            <div style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--white)', marginBottom: '20px', textAlign: 'center' }}>BEAUTY BASE: COMBINAÇÃO DE PELE</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div>
                  <h5 style={{ fontSize: '0.6rem', color: 'var(--accent)', marginBottom: '15px' }}>SUA TONALIDADE:</h5>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['#f3cfb3', '#e5c1a7', '#d8a68e', '#c68e17'].map((c, i) => (
                      <div key={i} style={{ flex: 1, height: '30px', background: c, borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '10px' }}>Warm Honey • Golden • Beige</p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.6rem', color: 'var(--accent)', marginBottom: '15px' }}>DIRECIONAMENTO:</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.8rem' }}>✨</span>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Acabamento Glow/Satin</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.8rem' }}>🎨</span>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Subtons Quentes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '20px', borderRadius: '4px', border: '1px dashed var(--accent)', marginBottom: '40px' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              💡 <strong>ANÁLISE TÉCNICA:</strong> Sua pele reage melhor a pigmentos de base amarelada. Cores frias tendem a evidenciar olheiras, enquanto tons quentes uniformizam e trazem viço imediato.
            </p>
          </div>
        </div>
      </div>


        {/* COLOR PALETTES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h5 style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '15px' }}>SUA PALETA IDEAL</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {['#f5e6d3', '#e0c097', '#b8860b', '#8b4513', '#556b2f', '#2f4f4f', '#004242', '#4b0000', '#5d4037', '#3d2b1f'].map((c, i) => (
                <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}></div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h5 style={{ fontSize: '0.7rem', color: '#ff4d4d', marginBottom: '15px' }}>CORES QUE PODEM APAGAR</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {['#ffffff', '#add8e6', '#ffc0cb', '#ff00ff', '#8a2be2', '#808080', '#000000', '#0000ff', '#4b0082', '#ff4500'].map((c, i) => (
                <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}></div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '30px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
          <p className="serif" style={{ fontSize: '1.2rem', opacity: 0.9, color: 'var(--accent)', fontStyle: 'italic' }}>
            "Isso explica por que algumas cores te valorizam tanto e outras, mesmo bonitas, não têm o mesmo efeito em você."
          </p>
        </div>


      {/* PÁGINA 4: CORES QUE VALORIZAM VS APAGAM DETALHADO */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '30px' }}>
            <div className="badge">ANÁLISE DE CORES • PÁGINA 04</div>
            <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '10px' }}>Cores que te valorizam <span style={{ fontSize: '1rem', verticalAlign: 'middle' }}>VS</span> cores que te <span style={{ color: 'var(--accent)' }}>apagam</span></h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SAIBA QUAIS CORES REALÇAM SUA BELEZA NATURAL E QUAIS DIMINUEM SUA LUMINOSIDADE</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* VALORIZAM */}
          <div className="card" style={{ borderTop: '4px solid var(--primary)', padding: '20px' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--primary)', marginBottom: '10px', textAlign: 'center' }}>CORES QUE VALORIZAM</h4>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>Iluminam • Destacam • Rejuvenescem</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { color: '#4b5320', name: 'VERDE OLIVA', desc: 'Traz sofisticação, realça o brilho dos olhos.' },
                { color: '#004242', name: 'AZUL PETRÓLEO', desc: 'Destaca sua presença e valoriza o tom da pele.' },
                { color: '#a0522d', name: 'TERRACOTA', desc: 'Aquece o rosto e ressalta sua beleza natural.' },
                { color: '#c68e17', name: 'CARAMELO', desc: 'Ilumina sua pele e transmite sofisticação.' },
                { color: '#d2b48c', name: 'BEGE QUENTE / AREIA', desc: 'Harmoniza com seu subtom e traz leveza.' },
                { color: '#ff7f50', name: 'SALMÃO / CORAL', desc: 'Traz frescor, ilumina o rosto e transmite energia.' },
                { color: '#cfb53b', name: 'DOURADO / CHAMPAGNE', desc: 'Realça seu brilho natural e adiciona luminosidade.' },
                { color: '#f5f5f0', name: 'OFF-WHITE / MARFIM', desc: 'Suaviza e ilumina, criando efeito de frescor.' }
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '35px', height: '35px', background: c.color, borderRadius: '4px', flexShrink: 0 }}></div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '0.6rem', color: 'var(--white)', marginBottom: '2px' }}>{c.name}</h5>
                    <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', lineHeight: '1.2' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary)', fontSize: '1rem' }}>✓</div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Essas cores trabalham com sua harmonia natural e realçam seus pontos fortes.</p>
            </div>
          </div>

          {/* APAGAM */}
          <div className="card" style={{ borderTop: '4px solid var(--accent)', padding: '20px' }}>
            <h4 style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '10px', textAlign: 'center' }}>CORES QUE APAGAM</h4>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>Pesam • Endurecem • Envelhecem</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { color: '#000000', name: 'PRETO PRÓXIMO AO ROSTO', desc: 'Cria sombra, endurece os traços e apaga luminosidade.' },
                { color: '#2f2f2f', name: 'CINZA ESCURO', desc: 'Traz um aspecto de cansaço para a pele.' },
                { color: '#b2beb5', name: 'CINZA CLARO FRIO', desc: 'Apaga o brilho do rosto e deixa a pele opaca.' },
                { color: '#002366', name: 'AZUL MARINHO', desc: 'Muito fechado para o seu contraste, pesa.' },
                { color: '#b39eb5', name: 'LILÁS / ROXO FRIO', desc: 'Traz aparência de cansaço e amarelado.' },
                { color: '#c71585', name: 'PINK FRIO', desc: 'Cria contraste artificial e evidencia marcas.' },
                { color: '#ffffff', name: 'BRANCO ÓPTICO', desc: 'Muito frio e intenso, contraste duro.' },
                { color: '#98ff98', name: 'VERDE MENTA', desc: 'Apaga sua cor natural e deixa o rosto sem vida.' }
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '35px', height: '35px', background: c.color, borderRadius: '4px', flexShrink: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--accent)', fontSize: '1rem' }}>✕</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '0.6rem', color: 'var(--white)', marginBottom: '2px' }}>{c.name}</h5>
                    <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', lineHeight: '1.2' }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ color: 'var(--accent)', fontSize: '1rem' }}>✕</div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Essas cores competem com sua beleza natural e criam efeito de cansaço.</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '25px' }}>
          <h4 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '20px', textAlign: 'center' }}>DICA PRÁTICA</h4>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧣</div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>LENÇOS & ACESSÓRIOS</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👕</div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>BLUSAS & MALHAS</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💍</div>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>JOIAS & METAIS</p>
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px', lineHeight: '1.5' }}>
            Use as cores que te valorizam <strong>próximas ao rosto</strong>: blusas, lenços, acessórios, maquiagens e até óculos. Elas refletem luz no seu rosto e comunicam saúde, confiança e presença.
          </p>
        </div>

        <div style={{ textAlign: 'center', padding: '30px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
          <p className="serif" style={{ fontSize: '1.2rem', opacity: 0.9, color: 'var(--accent)', fontStyle: 'italic' }}>
            "Quando você usa as cores certas, sua beleza aparece antes mesmo de você falar."
          </p>
        </div>
      </div>

      {/* PÁGINA 5: CABELO */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '30px' }}>
            <div className="badge">VISAGISMO • PÁGINA 05</div>
            <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '10px' }}>Cores e cortes que te valorizam</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cabelo certo, tom certo, moldura certa: o trio que transforma sua presença.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '30px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
          <p className="serif" style={{ fontSize: '1.1rem', opacity: 0.9, color: 'var(--accent)' }}>"O SEGREDO ESTÁ NA HARMONIA: cor que ilumina + corte que valoriza = versão poderosa de você."</p>
        </div>
      </div>

      {/* PÁGINA 6: CURADORIA DE ESTILO (LOOKBOOK) */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '30px' }}>
          <div className="badge">EDITORIAL DE ESTILO • PÁGINA 06</div>
          <h2 className="serif" style={{ fontSize: '2.2rem', textTransform: 'none', marginBottom: '10px', color: 'var(--white)' }}>Curadoria de Looks de Alto Impacto</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '40px' }}>PROPOSTAS ESTRATÉGICAS ALINHADAS À SUA ESSÊNCIA E CARTELA</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {[
              {
                title: "PROFISSIONAL MODERNO",
                img: "/look_profissional.png",
                concept: "Autoridade com Suavidade",
                pieces: ["Blazer Estruturado", "Calça Alfaiataria", "Cinto Minimalista"],
                colors: ["Oliva", "Bege", "Off-White"],
                tips: "Acessórios dourados foscos trazem sofisticação sem ostentação."
              },
              {
                title: "CASUAL CONTEMPORÂNEO",
                img: "/look_casual.png",
                concept: "Conforto com Intencionalidade",
                pieces: ["Knit de Qualidade", "Jeans Premium", "Bolsa Estruturada"],
                colors: ["Musgo", "Caramelo", "Jeans"],
                tips: "Lenços na bolsa ou pescoço elevam o look básico instantaneamente."
              },
              {
                title: "ELEGANTE NOITE",
                img: "/look_elegante_festa.png",
                concept: "Poder e Presença Marcante",
                pieces: ["Vestido Fluido", "Sandália de Tiras", "Clutch de Textura"],
                colors: ["Chocolate", "Ouro", "Terracota"],
                tips: "Combine tons de marrom com metais dourados para um efeito luxuoso."
              }
            ].map((look, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', alignItems: 'start' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={look.img} style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--glass-border)' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '-15px', background: 'var(--accent)', color: '#000', padding: '10px 20px', fontWeight: '800', fontSize: '0.7rem', letterSpacing: '2px', boxShadow: '10px 10px 30px rgba(0,0,0,0.3)' }}>
                      ESTILO {idx + 1}
                    </div>
                  </div>
                  
                  <div style={{ padding: '10px 0' }}>
                    <h3 className="serif" style={{ fontSize: '1.6rem', color: 'var(--white)', marginBottom: '5px' }}>{look.title}</h3>
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '25px' }}>{look.concept}</p>
                    
                    <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '20px' }}>
                      <h6 style={{ fontSize: '0.6rem', color: 'var(--white)', letterSpacing: '1px', marginBottom: '15px' }}>COMPONENTES CHAVE:</h6>
                      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {look.pieces.map((p, i) => (
                          <li key={i} style={{ fontSize: '0.55rem', padding: '5px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                      <div>
                        <h6 style={{ fontSize: '0.6rem', color: 'var(--white)', marginBottom: '10px' }}>PALETA DO LOOK:</h6>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {look.colors.map((c, i) => (
                            <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.3 + (i*0.3), border: '1px solid rgba(255,255,255,0.1)' }}></div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 style={{ fontSize: '0.6rem', color: 'var(--white)', marginBottom: '10px' }}>METAIS:</h6>
                        <span style={{ fontSize: '1rem' }}>✨ 📿</span>
                      </div>
                    </div>

                    <div style={{ padding: '15px', background: 'rgba(212, 175, 55, 0.05)', borderLeft: '3px solid var(--accent)' }}>
                      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        💡 <strong>DICA DE STYLING:</strong> {look.tips}
                      </p>
                    </div>
                  </div>
                </div>
                {idx < 2 && <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)', margin: '40px 0' }}></div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '40px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
          <p className="serif" style={{ fontSize: '1.3rem', opacity: 0.9, color: 'var(--accent)', fontStyle: 'italic' }}>
            "Estilo é uma forma de dizer quem você é, sem precisar falar."
          </p>
        </div>
      </div>

      {/* PÁGINA 7: SEU MAPA CROMÁTICO COMPLETO (DASHBOARD) */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '30px' }}>
          <div className="badge">MAPA ABSOLUTO • PÁGINA 07</div>
          <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '30px', color: 'var(--white)' }}>Seu Mapa Cromático Completo</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* COLUNA ESQUERDA: INDICADORES TÉCNICOS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                <h5 style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '15px' }}>UNDERTONE</h5>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ width: '30px', height: '30px', background: '#e5ddd0', borderRadius: '50%', opacity: 0.5 }}></div>
                  <div style={{ width: '40px', height: '40px', background: '#d2b48c', borderRadius: '50%', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>✓</div>
                  <div style={{ width: '30px', height: '30px', background: '#8b7d6b', borderRadius: '50%', opacity: 0.5 }}></div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--white)', marginLeft: '10px' }}>NEUTRO QUENTE</span>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                <h5 style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '15px' }}>CONTRASTE</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ flex: 1, height: '10px', background: 'linear-gradient(to right, #eee, #333)', borderRadius: '5px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '60%', top: '-5px', width: '20px', height: '20px', background: 'var(--accent)', borderRadius: '50%', border: '2px solid var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '0.6rem', fontWeight: 'bold' }}>✓</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '15px', textAlign: 'center' }}>MÉDIO-ALTO</p>
              </div>

              <div className="card" style={{ padding: '20px', background: 'var(--accent)', color: '#000', textAlign: 'center', marginBottom: '0' }}>
                <h5 style={{ fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '5px' }}>ESTAÇÃO</h5>
                <h3 className="serif" style={{ fontSize: '1.8rem', textTransform: 'uppercase' }}>OUTONO PROFUNDO 🍂</h3>
              </div>
            </div>

            {/* COLUNA DIREITA: NEUTROS & EVITAR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                <h5 style={{ fontSize: '0.65rem', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '15px' }}>MELHORES NEUTROS</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['#f5f5dc', '#c2b280', '#8b4513', '#556b2f', '#3d2b1f', '#2f4f4f'].map((c, i) => (
                    <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '4px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem' }}>✓</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'rgba(255,0,0,0.02)', border: '1px solid rgba(255,0,0,0.1)', marginBottom: '0' }}>
                <h5 style={{ fontSize: '0.65rem', color: '#ff4d4d', letterSpacing: '2px', marginBottom: '15px' }}>EVITAR</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['#ffffff', '#add8e6', '#e6e6fa', '#f0e68c'].map((c, i) => (
                    <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '4px', position: 'relative', opacity: 0.6 }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ff4d4d', fontSize: '0.8rem' }}>✕</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h5 style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '20px', textAlign: 'center' }}>COMPARATIVO DE CORES (EFEITO FACIAL)</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src="/look_profissional.png" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', filter: i > 3 ? 'sepia(0.5)' : 'none' }} />
                  <div style={{ position: 'absolute', top: '5px', right: '5px', background: 'var(--primary)', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✓</div>
                </div>
              ))}
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src="/look_casual.png" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', filter: 'grayscale(0.5)' }} />
                  <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#ff4d4d', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✕</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px', padding: '25px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
            <h5 style={{ fontSize: '0.7rem', color: 'var(--white)', letterSpacing: '2px', marginBottom: '20px', textAlign: 'center' }}>SUA PALETA DE PODER</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '8px' }}>
              {['#4b5320', '#004242', '#a0522d', '#c68e17', '#5d4037', '#8b4513', '#4b0000', '#2f4f4f', '#1a1a1a'].map((c, i) => (
                <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '4px' }}></div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px' }}>
            <div className="card" style={{ padding: '15px', textAlign: 'center', marginBottom: '0' }}>
              <h6 style={{ fontSize: '0.55rem', color: 'var(--accent)', marginBottom: '10px' }}>METAL IDEAL</h6>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #cfb53b, #fff)', borderRadius: '50%', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>✓</div>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #c0c0c0, #fff)', borderRadius: '50%', opacity: 0.3 }}></div>
              </div>
            </div>
            <div className="card" style={{ padding: '15px', textAlign: 'center', marginBottom: '0' }}>
              <h6 style={{ fontSize: '0.55rem', color: 'var(--accent)', marginBottom: '10px' }}>ACESSÓRIOS</h6>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '1.2rem' }}>
                <span>🕶️</span><span>👜</span><span>🧣</span><span>📿</span>
              </div>
            </div>
            <div className="card" style={{ padding: '15px', textAlign: 'center', marginBottom: '0' }}>
              <h6 style={{ fontSize: '0.55rem', color: 'var(--accent)', marginBottom: '10px' }}>MAKEUP HARMONY</h6>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <div style={{ width: '20px', height: '20px', background: '#5d4037', borderRadius: '50%' }}></div>
                <div style={{ width: '20px', height: '20px', background: '#a0522d', borderRadius: '50%' }}></div>
                <div style={{ width: '20px', height: '20px', background: '#8b4513', borderRadius: '50%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PÁGINA 8: GUIA INTEGRADO DE BELEZA (HAIR & MAKEUP) */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '30px' }}>
          <div className="badge">VISAGISMO INTEGRADO • PÁGINA 08</div>
          <h2 className="serif" style={{ fontSize: '2rem', textTransform: 'none', marginBottom: '30px', color: 'var(--white)' }}>Guia Integrado de Beleza</h2>
          
          {/* SEÇÃO 1: HAIRSTYLE ANALYSIS */}
          <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', marginBottom: '30px' }}>
            <img src="/luxury_hair_editorial_grid.png" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <div style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '20px', textAlign: 'center' }}>✦ VISAGISMO: MOLDURA E COR ✦</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <h5 style={{ fontSize: '0.65rem', color: 'var(--primary)', marginBottom: '5px' }}>FORMATOS RECOMENDADOS:</h5>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['Face Framing', 'Long Layers', 'Soft Waves'].map((h, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '20px', fontSize: '0.55rem', border: '1px solid var(--glass-border)', color: 'var(--white)' }}>{h}</div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Cortes que criam volume e suavidade para harmonizar seu rosto.</p>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.65rem', color: 'var(--accent)', marginBottom: '10px' }}>TONS IDEAIS:</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {['#3d2b1f', '#1a1a1a', '#5d4037', '#4b0000'].map((c, i) => (
                      <div key={i} style={{ width: '100%', paddingTop: '100%', background: c, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: MAKEUP GUIDE */}
          <div className="card" style={{ padding: '25px', background: 'rgba(255,255,255,0.02)' }}>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '20px', textAlign: 'center' }}>✦ GUIA DE MAQUIAGEM ✦</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
              {[
                { label: 'PELE', items: ['Nude Beige', 'Warm Sand'], icon: '✨' },
                { label: 'OLHOS', items: ['Tons Terrosos', 'Delineado Fino'], icon: '👁️' },
                { label: 'BLUSH', items: ['Pêssego', 'Rosa Queimado'], icon: '🌸' },
                { label: 'LÁBIOS', items: ['Nude Rose', 'Terracota'], icon: '👄' },
                { label: 'CONTORNO', items: ['Subtle Glow', 'Soft Shadow'], icon: '🎨' }
              ].map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: '100%', height: '70px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '10px' }}>
                    {m.icon}
                  </div>
                  <h6 style={{ fontSize: '0.6rem', color: 'var(--white)', marginBottom: '5px' }}>{m.label}</h6>
                  {m.items.map((item, idx) => (
                    <p key={idx} style={{ fontSize: '0.5rem', color: 'var(--text-muted)' }}>• {item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '30px 0', borderBottom: '1px solid var(--glass-border)', marginBottom: '40px' }}>
            <p className="serif" style={{ fontSize: '1.2rem', opacity: 0.9, fontStyle: 'italic', color: 'var(--accent)' }}>
              "A beleza estratégica integra cor, corte e traços em uma única narrativa."
            </p>
        </div>
      </div>
    </div>


      {/* PÁGINA 9: SEU NOVO ESTILO COMEÇA AGORA */}
      <div className="animate-fade">
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '35px' }}>
            <div className="badge">TRANSFORMAÇÃO • PÁGINA 09</div>
            <h2 className="serif" style={{ fontSize: '2.4rem', textTransform: 'none', marginBottom: '10px' }}>Seu novo estilo começa agora</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Quando sua imagem está alinhada com quem você é, tudo se torna mais natural.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '25px' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>✨</div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--white)', marginBottom: '5px' }}>SUA NOVA PERCEPÇÃO</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Você passa a se reconhecer de verdade. Sua imagem se torna um reflexo fiel de quem você é.</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>🎨</span>
                  <p style={{ fontSize: '0.55rem', marginTop: '5px' }}>Mais clareza na escolha de cores</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>🛡️</span>
                  <p style={{ fontSize: '0.55rem', marginTop: '5px' }}>Mais segurança no estilo</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>👤</span>
                  <p style={{ fontSize: '0.55rem', marginTop: '5px' }}>Mais presença visual</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1rem' }}>🎯</span>
                  <p style={{ fontSize: '0.55rem', marginTop: '5px' }}>Mais coerência na imagem</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '15px' }}>O QUE MUDA NA PRÁTICA</h4>
              <ul style={{ fontSize: '0.7rem', color: 'var(--text-muted)', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✦ Escolhas mais estratégicas e assertivas</li>
                <li style={{ marginBottom: '8px' }}>✦ Menos dúvidas ao se vestir e combinar</li>
                <li style={{ marginBottom: '8px' }}>✦ Aparência mais harmoniosa e intencional</li>
                <li>✦ Estilo mais consistente e alinhado</li>
              </ul>
            </div>

            <div className="card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '15px' }}>COMO APLICAR NO DIA A DIA</h4>
              <ul style={{ fontSize: '0.7rem', color: 'var(--text-muted)', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>✦ Escolha cores alinhadas à sua cartela</li>
                <li style={{ marginBottom: '8px' }}>✦ Adapte seu guarda-roupa com inteligência</li>
                <li style={{ marginBottom: '8px' }}>✦ Use acessórios com intenção e equilíbrio</li>
                <li>✦ Mantenha coerência visual em todas as escolhas</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--accent)' }}>
              <img src="/closing_best_version.png" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
              <div style={{ padding: '25px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '15px' }}>SUA MELHOR VERSÃO</h4>
                <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"Mais harmonia, mais leveza, mais você. Quando tudo está alinhado, sua beleza se destaca de forma natural e sofisticada."</p>
              </div>
            </div>

            <div className="card" style={{ padding: '25px' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '10px' }}>REFORÇO DE IDENTIDADE</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>A consultoria não muda quem você é — ela revela e organiza o que já existe de melhor na sua imagem.</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--white)', fontWeight: 'bold', marginTop: '10px' }}>Você continua sendo você, apenas com mais clareza, estratégia e presença.</p>
            </div>
          </div>
        </div>

        <div className="card animate-slide-up" style={{ background: 'var(--primary)', color: '#fff', textAlign: 'center', padding: '50px 30px', borderRadius: '30px', marginTop: '40px', boxShadow: '0 30px 60px rgba(224, 166, 156, 0.4)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>💎</div>
          <h2 className="serif" style={{ fontSize: '2.2rem', textTransform: 'none', marginBottom: '15px', color: '#fff' }}>O seu novo capítulo começa aqui</h2>
          <p style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(255,255,255,0.9)', marginBottom: '35px', lineHeight: '1.6' }}>Você acaba de receber uma amostra do seu potencial. O Dossiê Completo contém mais de 50 páginas de análise personalizada para transformar sua presença de vez.</p>
          <button className="btn-primary" style={{ background: '#fff', color: 'var(--primary)', boxShadow: 'none' }} onClick={() => alert('Checkout...')}>DESBLOQUEAR MEU DOSSIÊ COMPLETO</button>
          <p style={{ fontSize: '0.7rem', marginTop: '20px', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>ACESSO IMEDIATO • MÉTODO EXCLUSIVO</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-container">
      {step === 'WELCOME' && renderWelcome()}
      {step === 'QUIZ' && renderQuiz()}
      {step === 'PHOTOS' && renderPhotos()}
      {step === 'PROCESSING' && renderProcessing()}
      {step === 'RESULT_PARTIAL' && renderResultPartial()}
    </div>
  )
}

export default App
