import React, { useState, useEffect } from 'react'
import './index.css'

import './index.css'

const SkinIcon = ({ color }) => (
  <svg viewBox="0 0 100 100" width="85" height="85">
    <path d="M50 15c-15 0-25 10-25 25 0 15 10 25 25 25s25-10 25-25c0-15-10-25-25-25z" fill={color} style={{ transition: 'fill 0.4s ease' }} />
    <path d="M50 70c-20 0-35 10-35 25h70c0-15-15-25-35-25z" fill={color} opacity="0.6" style={{ transition: 'fill 0.4s ease' }} />
  </svg>
)

const HairIcon = ({ color }) => (
  <svg viewBox="0 0 100 100" width="100" height="100">
    {/* Cabelo Longo Editorial */}
    <path d="M50 5C20 5 8 25 8 50c0 25-5 45-5 45h20c5-10 10-15 27-15s22 5 27 15h20c0 0-5-20-5-45C92 25 80 5 50 5z" fill={color} opacity="0.4" style={{ transition: 'fill 0.4s ease' }} />
    <path d="M50 10C30 10 15 30 15 55c0 20-3 35-3 35h15c3-10 8-15 23-15s20 5 23 15h15s-3-15-3-35c0-25-15-45-35-45z" fill={color} style={{ transition: 'fill 0.4s ease' }} />
    {/* Detalhes de mechas longas */}
    <path d="M30 40c-2 15-2 35 0 45" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M70 40c2 15 2 35 0 45" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
)

const EyeIcon = ({ color }) => (
  <svg viewBox="0 0 100 100" width="90" height="90">
    <path d="M10 50C10 50 30 25 50 25C70 25 90 50 90 50C90 50 70 75 50 75C30 75 10 50 10 50Z" fill="#fff" opacity="0.9"/>
    <circle cx="50" cy="50" r="18" fill={color} style={{ transition: 'fill 0.4s ease' }} />
    <circle cx="50" cy="50" r="8" fill="#000" />
    <circle cx="56" cy="44" r="3" fill="#fff" opacity="0.6" />
  </svg>
)

const VisualSlider = ({ label, type, options, trackClass, formData, setFormData, showErrors, step }) => {
  const [localValue, setLocalValue] = useState(0)
  
  // Inicializar localValue baseado no formData atual
  useEffect(() => {
    const idx = options.findIndex(t => t.label === formData[type])
    if (idx !== -1) setLocalValue((idx / (options.length - 1)) * 1000)
  }, [step])

  const interpolateColor = (val) => {
    const factor = val / 1000
    const segmentSize = 1 / (options.length - 1)
    const segmentIndex = Math.min(Math.floor(factor / segmentSize), options.length - 2)
    const localFactor = (factor - (segmentIndex * segmentSize)) / segmentSize
    
    const c1 = options[segmentIndex].color
    const c2 = options[segmentIndex + 1].color
    
    // Helper to parse hex and interpolate
    const r1 = parseInt(c1.substring(1,3), 16)
    const g1 = parseInt(c1.substring(3,5), 16)
    const b1 = parseInt(c1.substring(5,7), 16)
    
    const r2 = parseInt(c2.substring(1,3), 16)
    const g2 = parseInt(c2.substring(3,5), 16)
    const b2 = parseInt(c2.substring(5,7), 16)
    
    const r = Math.round(r1 + (r2 - r1) * localFactor)
    const g = Math.round(g1 + (g2 - g1) * localFactor)
    const b = Math.round(b1 + (b2 - b1) * localFactor)
    
    return `rgb(${r}, ${g}, ${b})`
  }

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value)
    setLocalValue(val)
    
    // Mapear valor para o label mais próximo para salvar no estado global
    const idx = Math.round((val / 1000) * (options.length - 1))
    if (formData[type] !== options[idx].label) {
      setFormData({...formData, [type]: options[idx].label})
    }
  }

  const adjustValue = (delta) => {
    const newVal = Math.max(0, Math.min(1000, localValue + delta))
    handleSliderChange({ target: { value: newVal } })
  }

  return (
    <div className={`input-group ${showErrors && !formData[type] ? 'invalid shake' : ''}`}>
      <label className="label-futuristic">{label}</label>
      <div className="skin-slider-container">
        <div className="skin-slider-preview" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(198,142,23,0.1)' }}>
          {type === 'tipo_pele' && <SkinIcon color={interpolateColor(localValue)} />}
          {type === 'cor_cabelo' && <HairIcon color={interpolateColor(localValue)} />}
          {type === 'cor_olhos' && <EyeIcon color={interpolateColor(localValue)} />}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="slider-arrow-btn" onClick={() => adjustValue(-50)}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="1"
            value={localValue}
            className={`skin-slider-track ${trackClass || ''}`}
            onInput={handleSliderChange}
          />

          <button className="slider-arrow-btn" onClick={() => adjustValue(50)}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="skin-slider-labels">
          <span>{options[0].label.toUpperCase()}</span>
          <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem' }}>{formData[type] || 'AJUSTE'}</span>
          <span>{options[options.length - 1].label.toUpperCase()}</span>
        </div>
      </div>
      {showErrors && !formData[type] && <span className="error-text">AJUSTE O SLIDER PARA SELECIONAR</span>}
    </div>
  )
}

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
  const [showErrors, setShowErrors] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, quizStep, resultStep])

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
      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
        <div className="logo" style={{ fontSize: '2.4rem', marginBottom: '5px', display: 'block', letterSpacing: '6px' }}>
          RENOVA <span>Mulher</span>
        </div>
        <p style={{ letterSpacing: '3px', fontSize: '0.65rem', color: 'var(--text-muted)', opacity: 0.5, textTransform: 'uppercase', fontWeight: '800' }}>
          INTELIGÊNCIA ARTIFICIAL • DIGITAL LUXURY
        </p>
      </div>
      
      <div className="image-container animate-slide-up" style={{ marginBottom: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.7)' }}>
        <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} className="avatar-preview" alt="Welcome" />
        <div className="scan-line"></div>
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '40px 30px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)', textTransform: 'none', lineHeight: '1.2', fontWeight: '300' }} className="serif">Análise Bioestética por Inteligência Artificial.</h2>
        </div>
      </div>

      <button className="btn-primary animate-slide-up btn-pulse" onClick={() => setStep('QUIZ')}>INICIAR MAPA DE BELEZA</button>
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', opacity: 0.6 }}>ESCANEE SEU DNA VISUAL EM 30 SEGUNDOS</p>
    </div>
  )

  const renderQuiz = () => {
    const step1Valid = formData.nome && formData.idade_faixa && formData.tipo_pele && formData.ouro_ou_prata
    const step2Valid = formData.cor_cabelo && formData.cor_olhos

    const handleNext = () => {
      if (quizStep === 1) {
        if (step1Valid) {
          setQuizStep(2)
          setShowErrors(false)
        } else {
          setShowErrors(true)
        }
      } else {
        if (step2Valid) {
          setStep('PHOTOS')
          setShowErrors(false)
        } else {
          setShowErrors(true)
        }
      }
    }

    return (
      <div className="animate-fade">
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 className="serif" style={{ textTransform: 'none', fontSize: '2rem' }}>{quizStep === 1 ? 'Sua Identidade' : 'Seu Perfil Visual'}</h2>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', marginTop: '5px', opacity: 0.6 }}>PASSO {quizStep} DE 2</p>
          <div className="progress-bar" style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '20px' }}>
            <div className="progress-fill" style={{ height: '100%', background: 'var(--primary)', width: `${quizStep === 1 ? '50%' : '100%'}`, transition: 'width 0.5s', borderRadius: '2px' }}></div>
          </div>
        </div>

        {quizStep === 1 ? (
          <>
            <div className={`input-group ${showErrors && !formData.nome ? 'invalid shake' : ''}`}>
              <label className="label-futuristic">Como podemos te chamar?</label>
              <input type="text" className="input-field" placeholder="Nome Completo" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              {showErrors && !formData.nome && <span className="error-text">POR FAVOR, INSIRA SEU NOME</span>}
            </div>
            <div className={`input-group ${showErrors && !formData.idade_faixa ? 'invalid shake' : ''}`}>
              <label className="label-futuristic">Faixa de Idade</label>
              <div className="chip-grid">
                {['18-25', '26-35', '36-45', '46+'].map(v => <button key={v} type="button" className={`chip ${formData.idade_faixa === v ? 'active' : ''}`} onClick={() => setFormData({...formData, idade_faixa: v})}>{v}</button>)}
              </div>
              {showErrors && !formData.idade_faixa && <span className="error-text">SELECIONE SUA IDADE</span>}
            </div>
            <VisualSlider 
              label="Ajuste seu Tom de Pele"
              type="tipo_pele"
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              step={step}
              options={[
                { label: 'Pálida', color: '#FFF5F0' },
                { label: 'Clara Rosada', color: '#FDF0E5' },
                { label: 'Clara Dourada', color: '#F9E4D0' },
                { label: 'Clara-Média', color: '#F7E1D2' },
                { label: 'Média Neutra', color: '#F0D1BC' },
                { label: 'Média Quente', color: '#E9C8B1' },
                { label: 'Média-Escura', color: '#D3A387' },
                { label: 'Escura', color: '#9D6E50' },
                { label: 'Muito Escura', color: '#7B4F37' },
                { label: 'Profunda', color: '#5C3C2A' }
              ]}
            />
            <div className={`input-group ${showErrors && !formData.ouro_ou_prata ? 'invalid shake' : ''}`}>
              <label className="label-futuristic">Metal Predominante</label>
              <div className="chip-grid">
                {['Ouro', 'Prata', 'Ambos'].map(v => <button key={v} type="button" className={`chip ${formData.ouro_ou_prata === v ? 'active' : ''}`} onClick={() => setFormData({...formData, ouro_ou_prata: v})}>{v}</button>)}
              </div>
              {showErrors && !formData.ouro_ou_prata && <span className="error-text">SELECIONE UMA OPÇÃO</span>}
            </div>
            <button className="btn-primary" onClick={handleNext}>Próximo</button>
          </>
        ) : (
          <>
            <VisualSlider 
              label="Cor do seu Cabelo"
              type="cor_cabelo"
              trackClass="hair-slider-track"
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              step={step}
              options={[
                { label: 'Platina', color: '#F5F5F5' },
                { label: 'Loiro Acinzentado', color: '#D2B48C' },
                { label: 'Loiro Mel', color: '#E3B778' },
                { label: 'Loiro Dourado', color: '#E8C69F' },
                { label: 'Ruivo', color: '#B87333' },
                { label: 'Vermelho/Acaju', color: '#910000' },
                { label: 'Castanho Claro', color: '#8B7355' },
                { label: 'Castanho Médio', color: '#5D4037' },
                { label: 'Castanho Escuro', color: '#3C2F2F' },
                { label: 'Preto', color: '#0A0A0A' }
              ]}
            />
            <VisualSlider 
              label="Cor dos seus Olhos"
              type="cor_olhos"
              trackClass="eye-slider-track"
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              step={step}
              options={[
                { label: 'Azuis', color: '#638596' },
                { label: 'Verdes', color: '#5A785A' },
                { label: 'Mel', color: '#A68D60' },
                { label: 'Castanhos', color: '#3E2723' }
              ]}
            />
            <button className="btn-primary" onClick={handleNext}>Continuar</button>
          </>
        )}
      </div>
    )
  }

  const renderPhotos = () => {
    const handleGenerate = () => {
      if (userPhotos.selfie) {
        setStep('PROCESSING')
        setAnalysisStep(0)
        setShowErrors(false)
        setTimeout(() => setStep('RESULT_PARTIAL'), 25000)
      } else {
        setShowErrors(true)
      }
    }

    return (
      <div className="animate-fade">
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 className="serif" style={{ textTransform: 'none', fontSize: '2.2rem' }}>Documentação <br/> Bioestética</h2>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '12px', letterSpacing: '1px', opacity: 0.7 }}>Carregue uma selfie frontal com iluminação natural para precisão técnica.</p>
        </div>
        
        <label className={`card animate-slide-up ${showErrors && !userPhotos.selfie ? 'invalid shake' : ''}`} style={{ cursor: 'pointer', textAlign: 'center', padding: '0', overflow: 'hidden', border: showErrors && !userPhotos.selfie ? '1px solid #ff4d4d' : '1px solid var(--glass-border)' }}>
          <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload('selfie', e)} />
          {userPhotos.selfie ? (
            <img src={userPhotos.selfie} style={{ width: '100%', height: 'auto', minHeight: '300px', maxHeight: '400px', objectFit: 'cover' }} />
          ) : (
            <div style={{ padding: '60px 30px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📸</div>
              <h4 style={{ color: showErrors && !userPhotos.selfie ? '#ff4d4d' : 'var(--white)', fontSize: '0.8rem', letterSpacing: '2px' }}>CARREGAR FOTO</h4>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '10px' }}>Certifique-se de estar sem óculos e com o rosto limpo.</p>
            </div>
          )}
        </label>
        {showErrors && !userPhotos.selfie && <p className="error-text" style={{ textAlign: 'center', marginBottom: '15px' }}>SUA FOTO É OBRIGATÓRIA PARA A ANÁLISE</p>}

        <button className="btn-primary animate-slide-up" onClick={handleGenerate}>GERAR MEU DOSSIÊ AGORA</button>
      </div>
    )
  }

  const getDiagnostic = () => {
    const { tipo_pele, cor_cabelo, cor_olhos, ouro_ou_prata } = formData
    
    // Lógica Simplificada de Análise Sazonal (Colorimetria)
    const isWarm = ouro_ou_prata === 'Ouro'
    const isNeutral = ouro_ou_prata === 'Ambos'
    const isDarkHair = ['Preto', 'Castanho', 'Vermelho'].includes(cor_cabelo)
    const isLightSkin = ['Clara', 'Clara-Média'].includes(tipo_pele)
    
    let palette = 'VERÃO SUAVE'
    let reasoning = ''
    let contrast = 'MÉDIO'

    if (isWarm) {
      if (isDarkHair) {
        palette = 'OUTONO PROFUNDO'
        reasoning = "A profundidade dos seus cabelos e o subtom quente da sua pele exigem cores terrosas e intensas para harmonia."
      } else {
        palette = 'PRIMAVERA QUENTE'
        reasoning = "Sua combinação de traços iluminados e subtom dourado pede cores vibrantes e claras que tragam viço."
      }
    } else if (isNeutral) {
      palette = 'OUTONO SUAVE'
      reasoning = "Seu equilíbrio entre tons frios e quentes permite uma transição elegante por cores opacas e sofisticadas."
    } else {
      if (isDarkHair && isLightSkin) {
        palette = 'INVERNO BRILHANTE'
        reasoning = "Seu alto contraste entre pele clara e cabelos escuros pede cores puras e intensas para não apagar sua beleza."
      } else {
        palette = 'VERÃO FRIO'
        reasoning = "Seus traços delicados e subtom rosado/azulado exigem cores pastéis e frias para suavizar a textura da pele."
      }
    }

    // Contraste
    if (isLightSkin && isDarkHair) contrast = 'ALTO'
    else if (!isLightSkin && !isDarkHair) contrast = 'BAIXO'
    else contrast = 'MÉDIO'

    return {
      faceShape: formData.idade_faixa === '18-25' ? 'DIAMANTE' : (formData.idade_faixa === '26-35' ? 'OVAL' : 'QUADRADO'),
      undertone: isWarm ? 'QUENTE' : (isNeutral ? 'NEUTRO' : 'FRIO'),
      contrast,
      palette,
      reasoning
    }
  }

  const diagnostic = getDiagnostic()

  const renderProcessing = () => (
    <div className="animate-fade">
      <div className="card" style={{ padding: '60px 30px', marginTop: '20px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: '2.2rem', marginBottom: '10px', textTransform: 'none' }}>Análise Bioestética</h2>
        <p style={{ fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '3px', marginBottom: '40px', fontWeight: '900', textTransform: 'uppercase' }}>
          {loadingText.replace('...', '')} <span className="animate-pulse">_</span>
        </p>

        {/* MODERN HOLOGRAM SCANNER */}
        <div className="hologram-container">
          <img src="/hologram_silhouette.png" className="hologram-image" alt="Hologram Scan" />
          <div className="scanner-line-v2"></div>
          <div className="hologram-overlay"></div>
          
          {/* Biometric Points that appear during scan */}
          {analysisStep >= 2 && <div className="biometric-point" style={{ top: '15%', left: '48%' }}></div>}
          {analysisStep >= 4 && <div className="biometric-point" style={{ top: '45%', left: '35%' }}></div>}
          {analysisStep >= 7 && <div className="biometric-point" style={{ top: '45%', left: '62%' }}></div>}
          {analysisStep >= 9 && <div className="biometric-point" style={{ top: '75%', left: '42%' }}></div>}
          {analysisStep >= 11 && <div className="biometric-point" style={{ top: '25%', left: '55%' }}></div>}
        </div>

        <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '4px', marginTop: '15px', fontWeight: '900' }}>SISTEMA NEURAL ATIVO</div>
        
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', margin: '30px 0', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', 
            height: '100%', 
            background: 'linear-gradient(90deg, var(--primary), #fff)', 
            width: `${(analysisStep / 12) * 100}%`, 
            transition: 'all 0.5s', 
            boxShadow: '0 0 15px var(--primary)' 
          }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
          {[
            { label: 'SIMETRIA', step: 3 },
            { label: 'PIGMENTAÇÃO', step: 5 },
            { label: 'ARQUÉTIPOS', step: 8 },
            { label: 'PROPORÇÃO', step: 11 }
          ].map((item, idx) => (
            <div key={idx} style={{ 
              padding: '12px', 
              background: analysisStep >= item.step ? 'rgba(198, 142, 23, 0.1)' : 'rgba(255,255,255,0.02)', 
              borderRadius: '12px',
              border: analysisStep >= item.step ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
              opacity: analysisStep >= item.step ? 1 : 0.4,
              transition: 'all 0.4s'
            }}>
              <p style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px', color: analysisStep >= item.step ? 'var(--primary)' : '#fff' }}>
                {item.label} {analysisStep >= item.step ? '✓' : ''}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '40px', letterSpacing: '2px' }}>
          SISTEMA NEURAL ATIVO • MAPEANDO DNA VISUAL
        </p>
      </div>
    </div>
  )

  const renderResultPartial = () => {
    const diagnostic = getDiagnostic();
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
              <h1 className="serif" style={{ textTransform: 'none', fontSize: '2.5rem' }}>DNA de <span className="primary-color">Impacto</span></h1>
              <p style={{ letterSpacing: '3px', fontSize: '0.6rem', color: 'var(--primary)', marginTop: '8px', fontWeight: '800' }}>ETAPA 01 • GEOMETRIA FACIAL</p>
            </div>

            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 100">
                  {/* FACE MESH / MOLDE DO ROSTO */}
                  <g stroke="var(--primary)" strokeWidth="0.2" opacity="0.6">
                    {/* Linhas principais de estrutura */}
                    <path d="M50 25 L35 35 L30 55 L35 75 L50 85 L65 75 L70 55 L65 35 Z" fill="none" strokeDasharray="1 1" />
                    <path d="M35 35 L65 35 M30 55 L70 55 M35 75 L65 75" strokeWidth="0.1" opacity="0.3" />
                    <line x1="50" y1="25" x2="50" y2="85" strokeWidth="0.1" opacity="0.4" />
                    
                    {/* Triangulação Biométrica */}
                    <path d="M50 45 L38 48 L50 60 L62 48 Z" fill="rgba(198, 142, 23, 0.05)" />
                    <line x1="38" y1="48" x2="62" y2="48" strokeWidth="0.1" />
                    <line x1="50" y1="25" x2="38" y2="48" strokeWidth="0.1" />
                    <line x1="50" y1="25" x2="62" y2="48" strokeWidth="0.1" />
                    <line x1="38" y1="48" x2="30" y2="55" strokeWidth="0.1" />
                    <line x1="62" y1="48" x2="70" y2="55" strokeWidth="0.1" />
                    
                    {/* Vértices (Pontos brilhantes) */}
                    {[
                      [50, 25], [35, 35], [65, 35], [30, 55], [70, 55], 
                      [35, 75], [65, 75], [50, 85], [38, 48], [62, 48], [50, 60]
                    ].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="0.5" fill="var(--primary)">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i % 3}s`} repeatCount="indefinite" />
                      </circle>
                    ))}
                  </g>
                  {/* SCANNER HORIZONTAL SUTIL */}
                  <line x1="0" y1="0" x2="100" y2="0" stroke="var(--primary)" strokeWidth="0.5" opacity="0.3">
                    <animate attributeName="y1" from="20" to="90" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="y2" from="20" to="90" dur="4s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                  <div className="card" style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '10px' }}>SIMETRIA ORBITAL</h5>
                    <p style={{ fontSize: '1rem', fontWeight: '800' }}>98.2%</p>
                  </div>
                  <div className="card" style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', marginBottom: '0' }}>
                    <h5 style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '10px' }}>ÂNGULO MANDIBULAR</h5>
                    <p style={{ fontSize: '1rem', fontWeight: '800' }}>112° (ESTRUTURADO)</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '10px', marginBottom: '30px' }}>
                  {[
                    { label: 'OVAL', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><ellipse cx="12" cy="12" rx="6" ry="9"/></svg>, active: diagnostic.faceShape === 'OVAL' },
                    { label: 'DIAMANTE', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 3L4 12L12 21L20 12L12 3Z"/></svg>, active: diagnostic.faceShape === 'DIAMANTE' },
                    { label: 'CORAÇÃO', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>, active: diagnostic.faceShape === 'CORAÇÃO' },
                    { label: 'QUADRADO', icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>, active: diagnostic.faceShape === 'QUADRADO' }
                  ].map((f, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '10px 5px', borderRadius: '12px', border: f.active ? '1px solid var(--primary)' : '1px solid var(--glass-border)', background: f.active ? 'rgba(240, 180, 170, 0.1)' : 'transparent', opacity: f.active ? 1 : 0.4 }}>
                      <div style={{ color: f.active ? 'var(--primary)' : '#fff', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                      <p style={{ fontSize: '0.7rem', fontWeight: '900', color: f.active ? 'var(--primary)' : '#fff' }}>{f.label}</p>
                    </div>
                  ))}
                </div>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                  {formData.nome}, nossa IA processou seus 4.096 vértices faciais e detectou uma <strong>Arquitetura {diagnostic.faceShape}</strong>. 
                  Esta geometria é a mais rara entre os arquétipos de sofisticação, exigindo um equilíbrio milimétrico entre luz e sombra que revelaremos no seu Dossiê Completo.
                </p>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" onClick={nextResult}>CONTINUAR ANÁLISE • PRÓXIMA ETAPA</button>
          </div>
        )}
        {resultStep === 2 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 className="serif" style={{ fontSize: '2.5rem', textTransform: 'none' }}>Laboratório de Subtom</h2>
              <p style={{ letterSpacing: '3px', fontSize: '0.6rem', color: 'var(--primary)', marginTop: '8px', fontWeight: '800' }}>ETAPA 02 • COLORIMETRIA</p>
            </div>

            <div className="card animate-slide-up" style={{ padding: '30px' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', letterSpacing: '2px', marginBottom: '25px', textAlign: 'center' }}>TESTE DE TEMPERATURA: {diagnostic.undertone}</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '35px' }}>
                {[
                  { label: 'PRATA', colors: ['#C0C0C0', '#E8E8E8'], active: diagnostic.undertone === 'FRIO' },
                  { label: 'OURO', colors: ['#C68E17', '#D4AF37'], active: diagnostic.undertone === 'QUENTE' },
                  { label: 'AMBOS', colors: ['#D2B48C', '#8B4513'], active: diagnostic.undertone === 'NEUTRO' }
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', opacity: s.active ? 1 : 0.2 }}>
                    <div style={{ width: '100%', paddingTop: '100%', borderRadius: '50%', background: `linear-gradient(45deg, ${s.colors[0]}, ${s.colors[1]})`, marginBottom: '10px', border: s.active ? '3px solid var(--primary)' : 'none', boxShadow: s.active ? '0 0 15px var(--primary-glow)' : 'none' }}></div>
                    <p style={{ fontSize: '0.8rem', fontWeight: '900' }}>{s.label} {s.active ? '✓' : ''}</p>
                  </div>
                ))}
              </div>

              {/* DIGITAL DRAPING SIMULATION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '3px solid #C0C0C0' }}>
                  <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', padding: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.5rem', fontWeight: '900', color: diagnostic.undertone === 'QUENTE' ? '#ff4d4d' : '#4dff4d' }}>
                      {diagnostic.undertone === 'QUENTE' ? '🔴 PALIDEZ DERMAL' : '🟢 LUMINOSIDADE'}
                    </p>
                  </div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '3px solid #C68E17' }}>
                  <img src={userPhotos.selfie || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', padding: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.5rem', fontWeight: '900', color: diagnostic.undertone === 'QUENTE' ? '#4dff4d' : '#ff4d4d' }}>
                      {diagnostic.undertone === 'QUENTE' ? '🟢 VITALIDADE' : '🔴 SOMBRA ACENTUADA'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', marginBottom: '30px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '15px', textAlign: 'center', letterSpacing: '2px' }}>ANÁLISE DE REATIVIDADE DERMAL</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>UNIFORMIZAÇÃO</p>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', background: 'var(--primary)', width: '88%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>CONTROLE DE PIGMENTAÇÃO</p>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', background: 'var(--primary)', width: '92%', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255,0,0,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,0,0,0.1)' }}>
                  <h6 style={{ fontSize: '0.8rem', color: '#ff4d4d', marginBottom: '8px' }}>REAÇÃO NEGATIVA</h6>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Tons {diagnostic.undertone === 'QUENTE' ? 'Prateados' : 'Dourados'} projetam sombras nas linhas de expressão e olheiras.
                  </p>
                </div>
                <div style={{ background: 'rgba(0,255,0,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(0,255,0,0.1)' }}>
                  <h6 style={{ fontSize: '0.8rem', color: '#4dff4d', marginBottom: '8px' }}>REAÇÃO POSITIVA</h6>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    O {diagnostic.undertone === 'QUENTE' ? 'Ouro' : 'Prata'} traz luminosidade imediata e efeito de "pele descansada".
                  </p>
                </div>
              </div>
              
              <div style={{ background: 'rgba(198, 142, 23, 0.05)', padding: '25px', borderRadius: '24px', border: '1px dashed var(--primary)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.7' }}>
                  {formData.nome}, com seus olhos <strong>{formData.cor_olhos}</strong> e cabelos <strong>{formData.cor_cabelo}</strong>, o seu <strong>Subtom {diagnostic.undertone}</strong> cria uma assinatura cromática única. 
                  {diagnostic.reasoning} Seu <strong>Contraste {diagnostic.contrast}</strong> exige intensidade para máxima harmonia visual.
                </p>
              </div>

              {/* NEW MAKEUP LABORATORY SECTION (FREE) */}
              <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <h3 className="serif" style={{ fontSize: '2.2rem', marginTop: '10px' }}>Harmonização Facial</h3>
                  <p style={{ letterSpacing: '3px', fontSize: '0.6rem', color: 'var(--accent)', marginTop: '8px', fontWeight: '800' }}>BÔNUS • LABORATÓRIO DE MAKEUP</p>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--primary)' }}>
                  <img src="/makeup_free_analysis.png" style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.8)' }}>
                    <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '1px' }}>ESTRATÉGIA DERMAL PERSONALIZADA</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)' }}>BASE / SKIN</p>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Glow / Peach' : 'Mate / Rose'}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)' }}>BATOM / LIPS</p>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Terracota' : 'Malva'}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-muted)' }}>BLUSH</p>
                        <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>{diagnostic.undertone === 'QUENTE' ? 'Coral' : 'Rosado'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '15px', lineHeight: '1.5' }}>
                  Com base no seu <strong>Subtom {diagnostic.undertone}</strong>, evite pigmentos de subfundo {diagnostic.undertone === 'QUENTE' ? 'acinzentado' : 'alaranjado'} em corretivos para não criar o efeito de "pele cansada".
                </p>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" onClick={nextResult}>REVELAR MINHA PALETA DE PODER</button>
          </div>
        )}

        {resultStep === 3 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '45px' }}>
              <h2 className="serif" style={{ fontSize: '2.5rem', textTransform: 'none' }}>Sua Matriz de Poder</h2>
              <p style={{ letterSpacing: '3px', fontSize: '0.6rem', color: 'var(--primary)', marginTop: '8px', fontWeight: '800' }}>ETAPA 03 • INTELIGÊNCIA CROMÁTICA</p>
            </div>

            {/* MODERN TECHNOLOGICAL PALETTE ANALYSIS */}
            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', letterSpacing: '1px' }}>✦ PALETA: {diagnostic.palette}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>DNA CROMÁTICO DETECTADO</p>
                </div>
                <div style={{ padding: '8px 15px', background: 'rgba(198, 142, 23, 0.1)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)' }}>ALTA PRECISÃO</p>
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img src="/chromatic_dna_tech.png" style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} alt="Chromatic DNA Tech" />
                <div className="scanner-line-v2"></div>
              </div>

              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '35px' }}>
                  {[
                    { c: '#4b5320', n: 'AUTORIDADE', sub: 'Oliva Profundo' }, 
                    { c: '#004242', n: 'MISTÉRIO', sub: 'Petrol' }, 
                    { c: '#a0522d', n: 'ESTABILIDADE', sub: 'Siena' }, 
                    { c: '#c68e17', n: 'SUCESSO', sub: 'Ouro Real' }, 
                    { c: '#5d4037', n: 'RAÍZES', sub: 'Mocha' }, 
                    { c: '#8b4513', n: 'VIGOR', sub: 'Terracota' }, 
                    { c: '#4b0000', n: 'IMPACTO', sub: 'Vinho' }, 
                    { c: '#1a1a1a', n: 'ABSOLUTO', sub: 'Onix' }
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ width: '100%', paddingTop: '100%', borderRadius: '12px', background: item.c, boxShadow: '0 8px 20px rgba(0,0,0,0.4)', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)' }}></div>
                      <p style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--primary)' }}>{item.n}</p>
                      <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.sub}</p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '25px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                  <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '10px' }}>OBJETIVO DE COMUNICAÇÃO</h5>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.7' }}>
                    {formData.nome}, sua paleta <strong>{diagnostic.palette}</strong> foi selecionada para projetar {diagnostic.undertone === 'QUENTE' ? 'calor, segurança e autoridade natural' : 'distanciamento elegante, foco e alta sofisticação'}. Estas cores reduzem sombras faciais e elevam sua presença em qualquer ambiente.
                  </p>
                </div>
              </div>
            </div>

            {/* MODERN TECHNOLOGICAL CONTRASTE STRATEGY */}
            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ padding: '25px', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary)', letterSpacing: '2px' }}>ESTRATÉGIA DE CONTRASTE</h4>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img src="/contrast_analysis_tech.png" style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} alt="Contrast Tech Analysis" />
                <div className="scanner-line-v2"></div>
                <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '8px 15px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--primary)' }}>SISTEMA DE CORRELAÇÃO ATIVO</p>
                </div>
              </div>

              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                    <p style={{ fontSize: '0.5rem', color: 'var(--primary)', marginBottom: '5px' }}>ÍNDICE DETECTADO</p>
                    <p style={{ fontSize: '1rem', fontWeight: '900' }}>{diagnostic.contrast}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                    <p style={{ fontSize: '0.5rem', color: 'var(--primary)', marginBottom: '5px' }}>REATIVIDADE</p>
                    <p style={{ fontSize: '1rem', fontWeight: '900' }}>ALTA PRECISÃO</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(198, 142, 23, 0.05)', padding: '25px', borderRadius: '20px', borderLeft: '4px solid var(--primary)' }}>
                  <h6 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '10px', letterSpacing: '1px' }}>DIRETRIZ TÉCNICA:</h6>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.7', fontWeight: '500' }}>
                    {diagnostic.contrast === 'ALTO' 
                      ? "Sua beleza suporta cores puras e opostas. Use o preto e branco para criar um impacto visual imediato."
                      : "Sua beleza é valorizada pela suavidade. Evite cortes bruscos de cor e prefira tons que se fundem."}
                  </p>
                </div>
              </div>
            </div>

            {/* MODERN TECHNOLOGICAL HAIR & VISAGISM */}
            <div className="card animate-slide-up" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '25px', textAlign: 'center', borderBottom: '1px solid var(--glass-border)' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary)', letterSpacing: '2px' }}>DESIGN CAPILAR E MOLDURA</h4>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img src="/hair_visagism_tech.png" style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover' }} alt="Hair Visagism Tech Analysis" />
                <div className="scanner-line-v2"></div>
                <div style={{ position: 'absolute', bottom: '15px', left: '15px', padding: '8px 15px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--primary)' }}>MAPEAMENTO DE VISAGISMO ATIVO</p>
                </div>
              </div>

              <div style={{ padding: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                    <p style={{ fontSize: '0.5rem', color: 'var(--primary)', marginBottom: '5px' }}>ARQUITETURA FACIAL</p>
                    <p style={{ fontSize: '1rem', fontWeight: '900' }}>{diagnostic.faceShape}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(198, 142, 23, 0.1)' }}>
                    <p style={{ fontSize: '0.5rem', color: 'var(--primary)', marginBottom: '5px' }}>RECOMENDAÇÃO</p>
                    <p style={{ fontSize: '1rem', fontWeight: '900' }}>AUTORIDADE</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(198, 142, 23, 0.05)', padding: '25px', borderRadius: '20px', borderRight: '4px solid var(--primary)' }}>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.7', textAlign: 'center' }}>
                    {formData.nome}, a arquitetura <strong>{diagnostic.faceShape}</strong> do seu rosto exige uma moldura que projete autoridade. 
                    Com seus olhos <strong>{formData.cor_olhos}</strong>, recomendamos <strong>{diagnostic.undertone === 'QUENTE' ? 'reflexos mel/dourados' : 'tons frios e profundos'}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <button className="btn-primary animate-slide-up" style={{ marginTop: '30px' }} onClick={nextResult}>REVELAR LOOKBOOK E DOSSIÊ FINAL</button>
          </div>
        )}

        {resultStep === 4 && (
          <div className="animate-fade">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div className="badge" style={{ background: 'var(--primary)', color: '#000' }}>DEMONSTRAÇÃO CONCLUÍDA</div>
              <h2 className="serif" style={{ fontSize: '2.5rem', textTransform: 'none', lineHeight: '1.1', marginTop: '15px' }}>Bem-vindo ao <br/> <span style={{ color: 'var(--primary)' }}>Futuro da Imagem</span></h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '20px', lineHeight: '1.7', maxWidth: '90%', margin: '20px auto 0' }}>
                {formData.nome}, o que você viu até aqui foi apenas 5% da capacidade de processamento do nosso sistema. 
                Sua combinação única de <strong>{formData.cor_olhos}</strong>, cabelos <strong>{formData.cor_cabelo}</strong> e pele <strong>{formData.tipo_pele}</strong> gerou um diagnóstico de alta complexidade que precisa ser explorado em profundidade no seu Dossiê Final.
              </p>
            </div>

            {/* SOCIAL PROOF / MEDIA */}
            <div style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>
              <div className="footer-media" style={{ opacity: 0.6 }}>
                <span className="media-label">VOGUE</span>
                <span className="media-label">GLAMOUR</span>
                <span className="media-label">ELLE</span>
              </div>
              <div className="footer-media" style={{ opacity: 0.3, marginTop: '20px', gap: '30px' }}>
                <span style={{ fontSize: '0.5rem', fontWeight: '900', letterSpacing: '2px' }}>MODA TECNOLÓGICA</span>
                <span style={{ fontSize: '0.5rem', fontWeight: '900', letterSpacing: '2px' }}>ESTILO DIGITAL</span>
              </div>
            </div>

            <div className="card animate-slide-up" style={{ padding: '25px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '20px', textAlign: 'center', letterSpacing: '2px' }}>O QUE VOCÊ VAI RECEBER:</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { title: '4.000+ PONTOS', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> },
                  { title: '50+ PÁGINAS', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
                  { title: 'ARMÁRIO CÁPSULA', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg> },
                  { title: 'DNA CROMÁTICO', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0-10 10c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2z"/><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg> },
                  { title: 'ACESSÓRIOS', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
                  { title: 'ROADMAP 12M', icon: <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/></svg> }
                ].map((item, idx) => (
                  <div key={idx} className={`stagger-${idx + 1}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '15px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
                    <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                    <h4 style={{ fontSize: '0.6rem', color: '#fff', fontWeight: '900', letterSpacing: '1px' }}>{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <h4 style={{ fontSize: '0.7rem', color: 'var(--primary)', textAlign: 'center', letterSpacing: '2px', marginBottom: '30px' }}>VISUALIZAÇÃO DA ENTREGA COMPLETA</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '50px' }}>
                {[
                  { img: '/dossier_preview.png', label: 'AMOSTRA 01: DOSSIÊ EDITORIAL PERSONALIZADO (PDF)', h: '400px' },
                  { img: '/spreadsheet_preview.png', label: 'AMOSTRA 02: PLANEJAMENTO DE GUARDA-ROUPA CÁPSULA', h: '350px' },
                  { img: '/makeup_analysis_pt.png', label: 'AMOSTRA 03: LABORATÓRIO DE BELEZA E MAKEUP', h: '450px' },
                  { img: '/accessories_analysis_pt.png', label: 'AMOSTRA 04: DESIGN DE ACESSÓRIOS E ÓCULOS', h: '450px' },
                  { img: '/color_dna_preview.png', label: 'AMOSTRA 05: MAPA DE DNA CROMÁTICO E PALETA ESTENDIDA', h: '450px' },
                  { img: '/roadmap_preview.png', label: 'AMOSTRA 06: CRONOGRAMA ANUAL DE TRANSFORMAÇÃO', h: '450px' }
                ].map((item, idx) => (
                  <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '0' }}>
                    <img src={item.img} style={{ width: '100%', height: item.h, objectFit: 'cover' }} />
                    <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(0,0,0,0.5)' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' }}>{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE & CTA */}
            <div className="card animate-slide-up" style={{ background: 'var(--primary)', color: '#000', textAlign: 'center', padding: '40px 20px', borderRadius: '32px', border: 'none', boxShadow: '0 30px 60px rgba(240, 180, 170, 0.4)' }}>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M11 3v18"/><path d="M22 9H2"/><path d="M4.5 9L11 21"/><path d="M19.5 9L13 21"/></svg>
              </div>
              <div className="badge" style={{ background: '#000', color: '#fff', marginBottom: '15px' }}>OFERTA DE ESTREIA</div>
              <h2 className="serif" style={{ fontSize: 'clamp(2rem, 10vw, 2.8rem)', fontWeight: '900', marginBottom: '5px', color: '#000' }}>R$ 14,90</h2>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', textDecoration: 'line-through', opacity: 0.6, marginBottom: '25px' }}>VALOR ORIGINAL: R$ 149,90</p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '20px', marginBottom: '25px', border: '1px solid rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div className="badge" style={{ background: '#000', color: '#fff', fontSize: '0.5rem', padding: '4px 12px' }}>ENTREGA IMEDIATA</div>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '900', lineHeight: '1.2', color: '#000', margin: '5px 0' }}>
                  RECEBA AGORA <br/> IMEDIATAMENTE
                </p>
              </div>

              <button id="checkout-button" className="btn-primary btn-pulse" style={{ background: '#000', color: '#fff', fontSize: '1.1rem', padding: '20px', width: '100%', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }} onClick={() => window.location.href = 'https://pay.lowify.com.br/checkout?product_id=fTJQGj'}>
                QUERO MEU DOSSIÊ AGORA
              </button>
              
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.5rem', marginTop: '15px', fontWeight: '700', opacity: 0.7 }}>
                <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                PAGAMENTO SEGURO LOWIFY
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '1px', opacity: 0.5 }}>AGUARDANDO FINALIZAÇÃO DO PAGAMENTO...</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="main-layout" style={{ paddingTop: '0' }}>
        {step === 'WELCOME' && renderWelcome()}
        {step === 'QUIZ' && renderQuiz()}
        {step === 'PHOTOS' && renderPhotos()}
        {step === 'PROCESSING' && renderProcessing()}
        {step === 'RESULT_PARTIAL' && renderResultPartial()}
        
        {/* Floating Background Particles */}
        <div className="particles-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className="floating-particle" style={{ left: `${Math.random() * 100}%`, '--dur': `${10 + Math.random() * 15}s`, animationDelay: `${Math.random() * 5}s` }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
