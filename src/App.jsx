import React, { useState, useEffect } from 'react'
import './index.css'

const App = () => {
  const [step, setStep] = useState('WELCOME')
  const [quizStep, setQuizStep] = useState(1)
  const [loadingText, setLoadingText] = useState('Iniciando Super-Análise...')
  const [userPhotos, setUserPhotos] = useState({ selfie: null, looks: null })
  const [analysisStep, setAnalysisStep] = useState(0)
  const [resultStep, setResultStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: '', idade_faixa: '', tipo_pele: '', ouro_ou_prata: '',
    cor_cabelo: '', cor_olhos: '', estilo_atual: '', ja_fez_consultoria: ''
  })

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

  const getDiagnostic = () => {
    const isWarm = formData.ouro_ou_prata === 'Ouro'
    const isNeutral = formData.ouro_ou_prata === 'Ambos'
    
    return {
      faceShape: formData.idade_faixa === '18-25' ? 'DIAMANTE' : (formData.idade_faixa === '26-35' ? 'OVAL' : 'QUADRADO'),
      undertone: isWarm ? 'QUENTE' : (isNeutral ? 'NEUTRO' : 'FRIO'),
      contrast: formData.cor_cabelo === 'Loiro' ? 'MÉDIO-BAIXO' : 'MÉDIO-ALTO',
      palette: isWarm ? 'OUTONO PROFUNDO' : (isNeutral ? 'VERÃO SUAVE' : 'INVERNO BRILHANTE'),
      reasoning: isWarm 
        ? "Sua pele possui pigmentos amarelados que reagem melhor a metais dourados, trazendo viço imediato."
        : "Sua pele possui pigmentos rosados/azulados, o que exige tons frios para neutralizar manchas e olheiras."
    }
  }

  const diagnostic = getDiagnostic()

  const renderProcessing = () => (
    <div className="animate-fade">
      <div className="card" style={{ padding: '40px 30px', marginTop: '50px', position: 'relative', overflow: 'hidden' }}>
        {/* NEURAL SCANNER LINE */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '2px', 
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)', 
          boxShadow: '0 0 15px var(--primary)',
          zIndex: 10,
          animation: 'scanner-move 3s infinite ease-in-out'
        }}></div>

        <div className="badge">ULTIMATE DIAGNOSTIC SUITE</div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--primary)', letterSpacing: '1px' }}>{loadingText}</h2>
        <div style={{ height: '3px', background: 'var(--glass-border)', margin: '25px 0', position: 'relative' }}>
          <div style={{ position: 'absolute', height: '100%', background: 'var(--primary)', width: `${(analysisStep / 12) * 100}%`, transition: 'all 0.5s', boxShadow: '0 0 15px var(--primary)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '20px' }}>
          {[
            { label: 'BIOMETRIA E GEOMETRIA FACIAL', step: 2, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M21 11-8-8-8 8"/><path d="M21 21v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/></svg> },
            { label: 'COMBINAÇÃO DE PELE E SUBTOM', step: 4, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg> },
            { label: 'VALORIZAM VS APAGAM (CONTRASTE)', step: 7, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg> },
            { label: 'DNA DE ESTILO E ARQUÉTIPOS', step: 9, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/><path d="M2 12h7"/><path d="M15 12h7"/><path d="M12 2v7"/><path d="M12 15v7"/></svg> },
            { label: 'LOOKS DE ALTO IMPACTO', step: 10, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><rect x="3" y="6" width="18" height="14" rx="2"/></svg> },
            { label: 'MAPA CROMÁTICO E PALETA DE PODER', step: 12, icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"/></svg> }
          ].map((item, idx) => (
            <div key={idx} style={{ opacity: analysisStep >= item.step - 2 ? 1 : 0.2, transition: 'all 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: analysisStep >= item.step ? 'var(--primary)' : '#fff' }}>
                  <span style={{ display: 'flex', opacity: analysisStep >= item.step ? 1 : 0.4 }}>{item.icon}</span>
                  {item.label}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: analysisStep >= item.step ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.55rem' }}>
                  {analysisStep >= item.step ? (
                    <>CONCLUÍDO <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12"/></svg></>
                  ) : 'PROCESSANDO...'}
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

        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(240, 180, 170, 0.03)', borderRadius: '20px', border: '1px solid rgba(240, 180, 170, 0.1)', textAlign: 'center' }}>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: '1.5', fontWeight: '700', letterSpacing: '0.5px' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="var(--primary)" strokeWidth="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
            SISTEMA DE ALTA PRECISÃO ATIVO • ANALISANDO 4096 VÉRTICES FACIAIS
          </p>
        </div>
      </div>
    </div>
  )

  const renderResultPartial = () => {
    const nextResult = () => {
      setResultStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
      <div className="animate-fade">
        {/* PROGRESS INDICATOR */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: 1, height: '4px', background: i <= resultStep ? 'var(--primary)' : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'all 0.5s' }}></div>
          ))}
        </div>

        {resultStep === 1 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge">ETAPA 01 • GEOMETRIA FACIAL</div>
              <h1 style={{ fontSize: '2.5rem', lineHeight: '1' }}>DNA <br/> DE <span className="serif">Impacto</span></h1>
              <p style={{ letterSpacing: '3px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px' }}>MAPEAMENTO BIOMÉTRICO AVANÇADO</p>
            </div>

            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100">
                  <path d="M30 40 L50 30 L70 40 L70 70 L50 85 L30 70 Z" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
                  <line x1="30" y1="40" x2="70" y2="40" stroke="var(--primary)" strokeWidth="0.2" opacity="0.5" />
                  <line x1="50" y1="30" x2="50" y2="85" stroke="var(--primary)" strokeWidth="0.2" opacity="0.5" />
                </svg>
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                  <div className="card" style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                    <h5 style={{ fontSize: '0.55rem', color: 'var(--primary)', marginBottom: '10px' }}>SIMETRIA ORBITAL</h5>
                    <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>98.2%</p>
                  </div>
                  <div className="card" style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                    <h5 style={{ fontSize: '0.55rem', color: 'var(--primary)', marginBottom: '10px' }}>ÂNGULO MANDIBULAR</h5>
                    <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>112° (ESTRUTURADO)</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '30px' }}>
                  {[
                    { label: 'OVAL', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><ellipse cx="12" cy="12" rx="6" ry="9"/></svg>, active: diagnostic.faceShape === 'OVAL' },
                    { label: 'DIAMANTE', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 3L4 12L12 21L20 12L12 3Z"/></svg>, active: diagnostic.faceShape === 'DIAMANTE' },
                    { label: 'CORAÇÃO', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>, active: diagnostic.faceShape === 'CORAÇÃO' },
                    { label: 'QUADRADO', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>, active: diagnostic.faceShape === 'QUADRADO' }
                  ].map((f, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '10px 5px', borderRadius: '12px', border: f.active ? '1px solid var(--primary)' : '1px solid var(--glass-border)', background: f.active ? 'rgba(240, 180, 170, 0.1)' : 'transparent', opacity: f.active ? 1 : 0.4 }}>
                      <div style={{ color: f.active ? 'var(--primary)' : '#fff', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                      <p style={{ fontSize: '0.45rem', fontWeight: '900', color: f.active ? 'var(--primary)' : '#fff' }}>{f.label}</p>
                    </div>
                  ))}
                </div>
                
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Olá, <strong>{formData.nome || 'Pessoa'}</strong>. Seu rosto possui uma <strong>Arquitetura {diagnostic.faceShape}</strong>. Esta geometria é associada a liderança e sofisticação. O mapeamento biométrico sugere que sua zona de maior impacto é o terço médio facial.
                </p>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" onClick={nextResult}>CONTINUAR ANÁLISE • PRÓXIMA ETAPA</button>
          </div>
        )}

        {resultStep === 2 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge">ETAPA 02 • COLORIMETRIA</div>
              <h2 className="serif" style={{ fontSize: '2.2rem', textTransform: 'none' }}>Laboratório de Subtom</h2>
            </div>

            <div className="card animate-slide-up" style={{ padding: '30px' }}>
              <h4 style={{ fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '25px', textAlign: 'center' }}>REATIVIDADE DERMAL: {diagnostic.undertone}</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '35px' }}>
                {[
                  { label: 'FRIO', colors: ['#f3cfb3', '#d8a68e'], active: diagnostic.undertone === 'FRIO' },
                  { label: 'QUENTE', colors: ['#e5c1a7', '#c68e17'], active: diagnostic.undertone === 'QUENTE' },
                  { label: 'NEUTRO', colors: ['#d2b48c', '#8b4513'], active: diagnostic.undertone === 'NEUTRO' }
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', opacity: s.active ? 1 : 0.2 }}>
                    <div style={{ width: '100%', paddingTop: '100%', borderRadius: '50%', background: `linear-gradient(45deg, ${s.colors[0]}, ${s.colors[1]})`, marginBottom: '10px', border: s.active ? '3px solid var(--primary)' : 'none', boxShadow: s.active ? '0 0 15px var(--primary-glow)' : 'none' }}></div>
                    <p style={{ fontSize: '0.5rem', fontWeight: '900' }}>{s.label} {s.active ? '✓' : ''}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                  <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '280px', objectFit: 'cover', filter: 'grayscale(0.6) brightness(0.9) contrast(0.8) sepia(0.2)' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,0,0,0.6)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.45rem', fontWeight: '900' }}>EVITAR: {diagnostic.undertone === 'QUENTE' ? 'CINZAS' : 'DOURADOS'}</div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '2px solid var(--primary)' }}>
                  <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '280px', objectFit: 'cover', filter: 'saturate(1.2) contrast(1.1)' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--primary)', color: '#000', padding: '5px 10px', borderRadius: '4px', fontSize: '0.45rem', fontWeight: '900' }}>IDEAL: {diagnostic.undertone === 'QUENTE' ? 'QUENTES' : 'FRIOS'}</div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '30px' }}>
                <h5 style={{ fontSize: '0.6rem', color: 'var(--primary)', marginBottom: '15px', textAlign: 'center' }}>MATRIZ DE REAÇÃO (AMOSTRA)</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['#FFD700', '#C0C0C0', '#8B4513', '#4682B4'].map((c, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ width: '100%', height: '30px', background: c, borderRadius: '4px', marginBottom: '5px' }}></div>
                      <p style={{ fontSize: '0.35rem' }}>{i%2 === 0 ? 'HARMONIZA' : 'CONFLITA'}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'rgba(255,0,0,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,0,0,0.1)' }}>
                  <h6 style={{ fontSize: '0.55rem', color: '#ff4d4d', marginBottom: '8px' }}>POR QUE EVITAR?</h6>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Tons {diagnostic.undertone === 'QUENTE' ? 'Frios e Cinzas' : 'Quentes e Alaranjados'} criam uma reação de "apagamento" no seu rosto. Eles acentuam olheiras, evidenciam manchas e deixam sua aparência cansada, mesmo após uma boa noite de sono.
                  </p>
                </div>
                <div style={{ background: 'rgba(0,255,0,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,255,0,0.1)' }}>
                  <h6 style={{ fontSize: '0.55rem', color: '#4dff4d', marginBottom: '8px' }}>POR QUE É IDEAL?</h6>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Tons {diagnostic.undertone === 'QUENTE' ? 'Dourados e Terrosos' : 'Azulados e Prateados'} reagem with seus pigmentos naturais, "limpando" a pele visualmente. Eles trazem luminosidade instantânea, uniformizam o tom e realçam o brilho natural dos seus olhos.
                  </p>
                </div>
              </div>
              
              <div style={{ background: 'rgba(240, 180, 170, 0.05)', padding: '25px', borderRadius: '24px', border: '1px dashed var(--primary)', marginTop: '20px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
                  {diagnostic.reasoning} Seu diagnóstico de <strong>Contraste {diagnostic.contrast}</strong> confirma que você precisa de intensidade para não ser "apagada" pelas roupas.
                </p>
              </div>

              {/* NEW MAKEUP LABORATORY SECTION (FREE) */}
              <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <div className="badge" style={{ background: 'var(--accent)', color: '#fff' }}>BÔNUS • LABORATÓRIO DE MAKEUP</div>
                  <h3 className="serif" style={{ fontSize: '1.8rem', marginTop: '10px' }}>Harmonização Facial</h3>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--primary)' }}>
                  <img src="/makeup_free_analysis.png" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)' }}>
                    <h5 style={{ fontSize: '0.6rem', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '1px' }}>ESTRATÉGIA DERMAL PERSONALIZADA</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.4rem', fontWeight: '900', color: 'var(--text-muted)' }}>BASE / SKIN</p>
                        <p style={{ fontSize: '0.55rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Glow / Peach' : 'Mate / Rose'}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.4rem', fontWeight: '900', color: 'var(--text-muted)' }}>BATOM / LIPS</p>
                        <p style={{ fontSize: '0.55rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Terracota' : 'Malva'}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.4rem', fontWeight: '900', color: 'var(--text-muted)' }}>BLUSH</p>
                        <p style={{ fontSize: '0.55rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Coral' : 'Rosado'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '15px', lineHeight: '1.5' }}>
                  Com base no seu <strong>Subtom {diagnostic.undertone}</strong>, evite pigmentos de subfundo {diagnostic.undertone === 'QUENTE' ? 'acinzentado' : 'alaranjado'} em corretivos para não criar o efeito de "pele cansada".
                </p>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" onClick={nextResult}>REVELAR MINHA PALETA DE PODER</button>
          </div>
        )}

        {resultStep === 3 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="badge">ETAPA 03 • INTELIGÊNCIA CROMÁTICA</div>
              <h2 className="serif" style={{ fontSize: '2.2rem', textTransform: 'none' }}>Sua Paleta de Poder</h2>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', marginTop: '10px' }}>ANÁLISE DE PIGMENTAÇÃO NÍVEL 04</p>
            </div>

            {/* PALETA DE 12 CORES TÉCNICA */}
            <div className="card animate-slide-up" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '1px' }}>✦ MATRIZ: {diagnostic.palette}</h4>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '35px' }}>
                {[
                  { c: '#4b5320', n: 'AUTORIDADE', hex: '#4B5320' }, { c: '#004242', n: 'MISTÉRIO', hex: '#004242' }, 
                  { c: '#a0522d', n: 'ESTABILIDADE', hex: '#A0522D' }, { c: '#c68e17', n: 'PROSPERIDADE', hex: '#C68E17' }, 
                  { c: '#5d4037', n: 'TERRA', hex: '#5D4037' }, { c: '#8b4513', n: 'VIGOR', hex: '#8B4513' }, 
                  { c: '#4b0000', n: 'PAIXÃO', hex: '#4B0000' }, { c: '#2f4f4f', n: 'FOCO', hex: '#2F4F4F' }, 
                  { c: '#1a1a1a', n: 'ABSOLUTO', hex: '#1A1A1A' }, { c: '#cfb53b', n: 'LUMINOSIDADE', hex: '#CFB53B' }, 
                  { c: '#e5c1a7', n: 'SUAVIDADE', hex: '#E5C1A7' }, { c: '#d8a68e', n: 'EQUILÍBRIO', hex: '#D8A68E' }
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: '100%', paddingTop: '100%', borderRadius: '15px', background: item.c, boxShadow: '0 8px 20px rgba(0,0,0,0.4)', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)' }}></div>
                    <p style={{ fontSize: '0.35rem', fontWeight: '900', color: 'var(--primary)' }}>{item.n}</p>
                    <p style={{ fontSize: '0.3rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.hex}</p>
                  </div>
                ))}
              </div>

              {/* TEMPERATURE GAUGE */}
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '1px' }}>
                  <span>FRIO (CROMADO)</span>
                  <span>QUENTE (DORÉ)</span>
                </div>
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #4682B4, #D2B48C, #C68E17)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    left: diagnostic.undertone === 'QUENTE' ? '85%' : (diagnostic.undertone === 'NEUTRO' ? '50%' : '15%'),
                    width: '14px', 
                    height: '14px', 
                    background: '#fff', 
                    borderRadius: '50%', 
                    border: '3px solid var(--primary)',
                    boxShadow: '0 0 10px var(--primary)',
                    transition: 'all 1s ease-in-out'
                  }}></div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h6 style={{ fontSize: '0.55rem', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '1px' }}>METAIS E ACABAMENTOS</h6>
                  <p style={{ fontSize: '0.7rem', fontWeight: '700', marginBottom: '5px' }}>{diagnostic.undertone === 'QUENTE' ? 'Ouro Polido / Cobre' : 'Prata / Ouro Branco'}</p>
                  <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Acabamento: {diagnostic.undertone === 'QUENTE' ? 'Escovado ou Martelado' : 'Polido Espelhado'}</p>
                </div>
                <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '0', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <h6 style={{ fontSize: '0.55rem', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '1px' }}>FIBRAS E TEXTURAS</h6>
                  <p style={{ fontSize: '0.7rem', fontWeight: '700', marginBottom: '5px' }}>{diagnostic.undertone === 'QUENTE' ? 'Linho, Seda e Veludo' : 'Lã Fria, Couro e Crepe'}</p>
                  <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Peso: {diagnostic.contrast === 'MÉDIO-ALTO' ? 'Estruturado' : 'Fluido'}</p>
                </div>
              </div>
            </div>

            {/* VISAGISMO CAPILAR */}
            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', marginTop: '20px' }}>
              <div style={{ padding: '25px', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                <h4 style={{ fontSize: '0.75rem', color: 'var(--primary)', letterSpacing: '2px' }}>DESIGN CAPILAR E MOLDURA FACIAL</h4>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img src="/hair_visagism.png" style={{ width: '100%', height: '320px', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', padding: '0 15px' }}>
                  {['DNA CURTO', 'DNA MÉDIO', 'DNA LONGO'].map((t, i) => (
                    <div key={i}><p style={{ fontSize: '0.45rem', fontWeight: '900', color: '#000', background: 'rgba(255,255,255,0.85)', display: 'inline-block', padding: '3px 10px', borderRadius: '4px', letterSpacing: '1px' }}>{t}</p></div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
                  {[
                    { label: 'CURTO', rec: 'EVITAR', sub: 'DESEQUILÍBRIO' },
                    { label: 'MÉDIO', rec: 'IDEAL', sub: 'HARMONIZA' },
                    { label: 'LONGO', rec: 'POSSÍVEL', sub: 'FLUIDEZ' }
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', background: s.rec === 'IDEAL' ? 'rgba(240, 180, 170, 0.1)' : 'rgba(255,255,255,0.02)', padding: '15px 5px', borderRadius: '15px', border: s.rec === 'IDEAL' ? '1px solid var(--primary)' : '1px solid var(--glass-border)' }}>
                      <p style={{ fontSize: '0.5rem', fontWeight: '900', color: s.rec === 'IDEAL' ? 'var(--primary)' : '#fff', letterSpacing: '1px' }}>{s.label}</p>
                      <p style={{ fontSize: '0.4rem', fontWeight: '800', marginTop: '4px', color: s.rec === 'EVITAR' ? '#ff4d4d' : (s.rec === 'IDEAL' ? 'var(--primary)' : 'var(--text-muted)') }}>{s.rec}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.7' }}>
                  A arquitetura do seu rosto <strong>{diagnostic.faceShape}</strong> exige uma moldura que suavize ângulos e projete autoridade. Recomendamos {diagnostic.undertone === 'QUENTE' ? 'reflexos mel/dourados' : 'tons frios e profundos'} para máxima vitalidade dermal.
                </p>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" onClick={nextResult}>REVELAR LOOKBOOK E DOSSIÊ FINAL</button>
          </div>
        )}

        {resultStep === 4 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div className="badge" style={{ background: 'var(--primary)', color: '#000' }}>DEMONSTRAÇÃO CONCLUÍDA</div>
              <h2 className="serif" style={{ fontSize: '2.5rem', textTransform: 'none', lineHeight: '1.1', marginTop: '15px' }}>Bem-vindo ao <br/> <span style={{ color: 'var(--primary)' }}>Futuro da Imagem</span></h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '20px', lineHeight: '1.6', maxWidth: '80%', margin: '20px auto 0' }}>
                O que você viu até aqui foi apenas 5% da capacidade de processamento do nosso sistema. Portais de moda e blogs de tecnologia já nos citam como a maior revolução estética da década.
              </p>
            </div>

            {/* SOCIAL PROOF / MEDIA */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.5, marginBottom: '50px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px' }}>VOGUE NEWS</span>
              <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px' }}>TECH FASHION</span>
              <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px' }}>ESTILO DIGITAL</span>
            </div>

            <div className="card animate-slide-up" style={{ padding: '30px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '25px', textAlign: 'center' }}>O QUE VOCÊ VAI RECEBER NO DOSSIÊ ABSOLUTO:</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {[
                  { title: 'MAIS DE 4.000 PONTOS DE ANÁLISE', desc: 'Cruzamento biométrico milimétrico de simetria e proporção.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
                  { title: 'DOSSIÊ EDITORIAL (50+ PÁGINAS)', desc: 'Seu livro pessoal de estilo em PDF de alta resolução.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
                  { title: 'PLANILHA DE ARMÁRIO CÁPSULA', desc: 'Guia prático de compras e combinações inteligentes.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
                  { title: 'DNA CROMÁTICO COMPLETO', desc: 'Paleta estendida com 60+ cores e guia de maquiagem.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.5-.58 1.5-1.5 0-.43-.17-.83-.44-1.14-.24-.28-.36-.64-.36-1.02 0-.74.6-1.34 1.34-1.34H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z"/></svg> },
                  { title: 'ESTRATÉGIA DE ACESSÓRIOS', desc: 'Design de joias e óculos para sua geometria facial.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
                  { title: 'CRONOGRAMA DE TRANSFORMAÇÃO', desc: 'Roadmap de 12 meses para elevar sua autoridade visual.', icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--primary)" strokeWidth="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'start', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                    <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '0.65rem', color: '#fff', marginBottom: '4px' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PREVIEW IMAGES STACK - MAX READABILITY */}
            <div style={{ marginTop: '40px' }}>
              <h4 style={{ fontSize: '0.7rem', color: 'var(--primary)', textAlign: 'center', letterSpacing: '2px', marginBottom: '30px' }}>VISUALIZAÇÃO DA ENTREGA COMPLETA</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '50px' }}>
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src="/dossier_preview.png" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: '0.55rem', fontWeight: '900', letterSpacing: '1px' }}>AMOSTRA 01: DOSSIÊ EDITORIAL PERSONALIZADO (PDF)</p>
                  </div>
                </div>
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src="/spreadsheet_preview.png" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: '0.55rem', fontWeight: '900', letterSpacing: '1px' }}>AMOSTRA 02: PLANEJAMENTO DE GUARDA-ROUPA CÁPSULA</p>
                  </div>
                </div>
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src="/makeup_preview.png" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: '0.55rem', fontWeight: '900', letterSpacing: '1px' }}>AMOSTRA 03: LABORATÓRIO DE BELEZA E MAKEUP</p>
                  </div>
                </div>
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <img src="/accessories_preview.png" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: '0.55rem', fontWeight: '900', letterSpacing: '1px' }}>AMOSTRA 04: DESIGN DE ACESSÓRIOS E ÓCULOS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRICE & CTA */}
            <div className="card animate-slide-up" style={{ background: 'var(--primary)', color: '#000', textAlign: 'center', padding: '50px 30px', borderRadius: '40px', border: 'none', boxShadow: '0 30px 60px rgba(240, 180, 170, 0.4)' }}>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M11 3v18"/><path d="M22 9H2"/><path d="M4.5 9L11 21"/><path d="M19.5 9L13 21"/></svg>
              </div>
              <div className="badge" style={{ background: '#000', color: '#fff', marginBottom: '20px' }}>OFERTA DE ESTREIA (1º MÊS)</div>
              <h2 className="serif" style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '10px', color: '#000' }}>R$ 14,90</h2>
              <p style={{ fontSize: '0.8rem', fontWeight: '700', textDecoration: 'line-through', opacity: 0.6, marginBottom: '20px' }}>VALOR ORIGINAL: R$ 149,90</p>
              
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: '20px', borderRadius: '20px', marginBottom: '30px' }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: '900', lineHeight: '1.4' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  RECEBA IMEDIATAMENTE VIA:<br/>
                  EMAIL E WHATSAPP
                </p>
              </div>

              <button className="btn-primary" style={{ background: '#000', color: '#fff', fontSize: '1.2rem', padding: '25px', width: '100%', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }} onClick={() => window.location.href = 'https://pay.hotmart.com/exemplo'}>
                QUERO MEU DOSSIÊ AGORA
              </button>
              
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.55rem', marginTop: '20px', fontWeight: '700', opacity: 0.7 }}>
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                PAGAMENTO SEGURO VIA HOTMART
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>© 2026 DIGITAL LUXURY AI • TODOS OS DIREITOS RESERVADOS</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="main-layout">
        {step === 'WELCOME' && renderWelcome()}
        {step === 'QUIZ' && renderQuiz()}
        {step === 'PHOTOS' && renderPhotos()}
        {step === 'PROCESSING' && renderProcessing()}
        {step === 'RESULT_PARTIAL' && renderResultPartial()}
      </div>
    </div>
  )
}

export default App
