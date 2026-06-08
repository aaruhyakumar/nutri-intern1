import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { CASES } from '../data/cases';
import { saveCaseAttempt, getCaseAttempts } from '../supabaseClient';

const DIFF_COLORS = { Moderate: 'var(--amber)', Hard: 'var(--coral)', Easy: 'var(--teal)' };

const CasePlayer = ({ caseData, caseIdx, user, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [stepResults, setStepResults] = useState([]); // { selected, correct, isCorrect }
  const [expandedStep, setExpandedStep] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const step = caseData.steps[currentStep];

  const handleAnswer = (idx) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(idx);
    if (idx === step.correct) setScore(p => p + 1);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === step.correct;
    const newResults = [...stepResults, { selected: selectedOption, correct: step.correct, isCorrect }];
    setStepResults(newResults);
    if (currentStep < caseData.steps.length - 1) {
      setCurrentStep(p => p + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      const finalScore = newResults.filter(r => r.isCorrect).length;
      setShowSummary(true);
      clearInterval(timerRef.current);
      if (user) saveCaseAttempt(user.id, caseIdx, caseData.name, finalScore, caseData.steps.length);
    }
  };

  if (showSummary) {
    const finalScore = stepResults.filter(r => r.isCorrect).length;
    const totalSteps = caseData.steps.length;
    const pct = Math.round((finalScore / totalSteps) * 100);

    let rating = { label: 'Novice Intern', color: '#64748b', emoji: '🧊', sub: 'Starting the journey. Keep reviewing the 10-step framework.' };
    if (pct >= 90) rating = { label: 'Attending Dietitian', color: 'var(--teal)', emoji: '🏆', sub: 'Exceptional clinical reasoning! You are ward-ready.' };
    else if (pct >= 70) rating = { label: 'Senior Resident', color: 'var(--blue)', emoji: '🩺', sub: 'Strong performance. Minor adjustments needed in specific domains.' };
    else if (pct >= 50) rating = { label: 'Junior Resident', color: 'var(--amber)', emoji: '🏥', sub: 'Good foundation. Practice more cases to sharpen your intervention skills.' };

    const DOMAINS = [
      { label: 'Assessment',    range: [0, 0] },
      { label: 'Diagnosis',     range: [1, 1] },
      { label: 'Intervention',  range: [2, 6] },
      { label: 'Monitoring',    range: [7, 9] },
    ];

    return (
      <div className="cases-content">
        <div className="summary-card show" style={{maxWidth:'860px'}}>

          {/* Header */}
          <div style={{textAlign:'center',marginBottom:'28px'}}>
            <div style={{fontSize:'54px',marginBottom:'10px'}}>{rating.emoji}</div>
            <h2 style={{fontFamily:'Poppins',fontWeight:800,fontSize:'24px',color:'var(--text)',marginBottom:'4px'}}>{rating.label}</h2>
            <div className="rating-badge" style={{background:rating.color+'18',color:rating.color}}>Clinical Rating: {pct}% Mastery</div>
            <div style={{marginTop:'8px',fontSize:'13px',color:'var(--text-muted)',fontWeight:700}}>⏱ Completed in {formatTime(elapsed)}</div>
            <p style={{color:'var(--text-muted)',fontSize:'13px',marginTop:'12px',maxWidth:'380px',marginInline:'auto'}}>{rating.sub}</p>
          </div>

          {/* Score + Domain */}
          <div className="summary-score-grid" style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'24px',marginBottom:'28px'}}>
            <div style={{background:`linear-gradient(135deg,${caseData.color},#0a5c47)`,borderRadius:'18px',padding:'24px',textAlign:'center',color:'white'}}>
              <div style={{fontSize:'12px',opacity:0.8,textTransform:'uppercase',letterSpacing:'1px',fontWeight:700,marginBottom:'6px'}}>Final Score</div>
              <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'52px',lineHeight:1}}>{finalScore}<span style={{fontSize:'22px',opacity:0.6}}>/{totalSteps}</span></div>
              <div style={{fontSize:'13px',opacity:0.85,marginTop:'10px'}}>Correct Decisions</div>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'20px',height:'8px',marginTop:'16px'}}>
                <div style={{background:'#fde68a',height:'8px',borderRadius:'20px',width:`${pct}%`,transition:'width 1s ease-out'}} />
              </div>
            </div>
            <div>
              <div style={{fontSize:'11px',fontWeight:800,textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px',letterSpacing:'1px'}}>Domain Analysis</div>
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                {DOMAINS.map((d, i) => {
                  const [from, to] = d.range;
                  const total = to - from + 1;
                  const correct = stepResults.slice(from, to + 1).filter(r => r.isCorrect).length;
                  const val = Math.round((correct / total) * 100);
                  const color = val >= 80 ? 'var(--teal)' : val >= 50 ? 'var(--amber)' : 'var(--coral)';
                  return (
                    <div key={i}>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'4px'}}>
                        <span style={{fontWeight:700,color:'var(--text)'}}>{d.label}</span>
                        <span style={{fontWeight:800,color}}>{correct}/{total} · {val}%</span>
                      </div>
                      <div style={{height:'6px',background:'#eee',borderRadius:'10px',overflow:'hidden'}}>
                        <div style={{height:'100%',background:color,width:`${val}%`,transition:'width 0.8s'}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step-by-Step Review */}
          <div style={{fontSize:'11px',fontWeight:800,textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px',letterSpacing:'1px'}}>
            Step-by-Step Review
            <span style={{marginLeft:'8px',fontWeight:600,fontSize:'11px',color:'var(--text-muted)',textTransform:'none',letterSpacing:0}}>
              — click any step to expand
            </span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {caseData.steps.map((s, i) => {
              const result = stepResults[i];
              const isCorrect = result?.isCorrect;
              const isOpen = expandedStep === i;
              const borderColor = isCorrect ? 'var(--teal)' : 'var(--coral)';
              const bg = isCorrect ? '#f0fdf8' : '#fff5f3';
              return (
                <div key={i}
                  onClick={() => setExpandedStep(isOpen ? null : i)}
                  style={{border:`1.5px solid ${isOpen ? borderColor : '#eee'}`,borderRadius:'14px',overflow:'hidden',cursor:'pointer',transition:'all 0.2s',background: isOpen ? bg : 'white'}}>
                  {/* Row */}
                  <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background: isCorrect ? 'var(--teal)' : 'var(--coral)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0,color:'white',fontWeight:800}}>
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:'13px',color:'var(--text)'}}>
                        <span style={{color:'var(--text-muted)',fontWeight:600,marginRight:'6px'}}>Step {i+1} · {s.label}</span>
                      </div>
                      <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'480px'}}>{s.question}</div>
                    </div>
                    <div style={{fontSize:'18px',color:'var(--text-muted)',transition:'transform 0.2s',transform: isOpen ? 'rotate(180deg)' : 'none'}}>⌄</div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div style={{padding:'0 16px 16px',borderTop:`1px solid ${borderColor}20`}}>
                      {/* What they picked vs correct */}
                      <div className="answer-compare-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',margin:'12px 0'}}>
                        <div style={{background: isCorrect ? 'var(--teal-light)' : 'var(--coral-light)',borderRadius:'10px',padding:'10px 12px'}}>
                          <div style={{fontSize:'10px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.8px',color: isCorrect ? 'var(--teal)' : 'var(--coral)',marginBottom:'4px'}}>Your Answer</div>
                          <div style={{fontSize:'13px',fontWeight:600,color:'var(--text)'}}>{s.options[result?.selected ?? 0]}</div>
                        </div>
                        {!isCorrect && (
                          <div style={{background:'var(--teal-light)',borderRadius:'10px',padding:'10px 12px'}}>
                            <div style={{fontSize:'10px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.8px',color:'var(--teal)',marginBottom:'4px'}}>Correct Answer</div>
                            <div style={{fontSize:'13px',fontWeight:600,color:'var(--text)'}}>{s.options[s.correct]}</div>
                          </div>
                        )}
                      </div>
                      {/* Explanation */}
                      <div style={{background:'var(--blue-light)',borderLeft:'3px solid var(--blue)',borderRadius:'8px',padding:'10px 14px',fontSize:'13px',color:'#185FA5',lineHeight:1.7}}>
                        💡 {s.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="summary-action-btns" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginTop:'28px'}}>
            <button className="btn btn-secondary" onClick={onBack}>Back to Cases</button>
            <button className="btn btn-primary" onClick={() => { setCurrentStep(0); setScore(0); setIsAnswered(false); setSelectedOption(null); setShowSummary(false); setStepResults([]); setExpandedStep(null); setElapsed(0); timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000); }}>Retake Case</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cases-content">
      <div className="patient-banner" style={{borderLeft:`4px solid ${caseData.color}`}}>
        <div className="patient-img">{caseData.emoji}</div>
        <div className="patient-info" style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'8px'}}>
            <h2 style={{margin:0}}>{caseData.name}</h2>
            <div className="patient-score" style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:caseData.color,lineHeight:1}}>{score}<span style={{fontSize:'12px',opacity:0.6,fontWeight:600}}>/{caseData.steps.length}</span></div>
              <div style={{fontSize:'11px',color:'var(--text-muted)',fontWeight:700,marginTop:'2px'}}>⏱ {formatTime(elapsed)}</div>
            </div>
          </div>
          <div className="patient-desc" style={{fontSize:'13px',color:'var(--text-muted)',margin:'4px 0 8px'}}>{caseData.desc}</div>
          <div className="patient-tags">
            {caseData.tags.map((t, i) => <span className="ptag" key={i}>{t}</span>)}
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
        {caseData.steps.map((_, i) => (
          <div key={i} style={{flex:1,height:'6px',borderRadius:'20px',background: i<currentStep?caseData.color:i===currentStep?caseData.color+'80':'#e8e8e8',transition:'background 0.3s'}} />
        ))}
        <span style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:700,flexShrink:0}}>{currentStep+1}/{caseData.steps.length}</span>
      </div>

      <div className="flashcard">
        <div className="fc-step">
          <div className="fc-step-num" style={{background: caseData.color+'20', color: caseData.color}}>{currentStep + 1}</div>
          <div className="fc-step-label">{step.label}</div>
        </div>
        <div className="fc-question">{step.question}</div>
        <div className="fc-options">
          {step.options.map((opt, i) => (
            <button key={i}
              className={`fc-option ${isAnswered ? (i===step.correct?'correct':i===selectedOption?'wrong':'') : ''}`}
              onClick={() => handleAnswer(i)} disabled={isAnswered}>
              <span style={{display:'inline-block',width:'24px',height:'24px',borderRadius:'50%',background: isAnswered?(i===step.correct?'var(--teal)':i===selectedOption?'var(--coral)':'#e8e8e8'):'#e8e8e8',color: isAnswered&&(i===step.correct||i===selectedOption)?'white':'var(--text-muted)',fontSize:'12px',fontWeight:700,lineHeight:'24px',textAlign:'center',marginRight:'10px',flexShrink:0}}>
                {String.fromCharCode(65+i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
        {isAnswered && <div className="fc-explanation show">{step.explanation}</div>}
      </div>

      <div className="fc-nav">
        <button className="btn btn-secondary" onClick={onBack}>✕ Exit</button>
        <button className="btn btn-primary" onClick={handleNext} disabled={!isAnswered}>
          {currentStep === caseData.steps.length - 1 ? '🏁 Finish Case' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
};

const Cases = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [completedIndexes, setCompletedIndexes] = useState(new Set());

  useEffect(() => {
    if (!user) return;
    getCaseAttempts(user.id).then(attempts => {
      setCompletedIndexes(new Set(attempts.map(a => a.case_index)));
    });
  }, [user]);

  if (selected) return <CasePlayer caseData={selected.data} caseIdx={selected.idx} user={user} onBack={() => setSelected(null)} />;

  return (
    <div className="cases-content">
      <div className="page-header">
        <h1>Clinical Cases 🏥</h1>
        <p>Work through real patient cases using the 10-step clinical nutrition framework</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px'}}>
        {CASES.map((c, i) => (
          <div key={i} className="case-card" onClick={() => setSelected({ data:c, idx:i })}>
            <div style={{height:'6px',background:c.color}} />
            <div className="case-card-content">
              {completedIndexes.has(i) && (
                <div style={{position:'absolute',top:'14px',right:'14px',background:'var(--teal)',color:'white',fontSize:'11px',fontWeight:800,padding:'3px 10px',borderRadius:'20px',display:'flex',alignItems:'center',gap:'4px'}}>
                  ✓ Done
                </div>
              )}
              <div className="case-card-header">
                <div className="case-card-icon" style={{background:c.color+'18'}}>
                  {c.emoji}
                </div>
                <div style={{flex:1}}>
                  <h3 className="case-card-title">{c.name}</h3>
                  <div className="case-card-tags">
                    {c.tags.slice(0,2).map((t,j) => (
                      <span key={j} className="case-card-tag" style={{background:c.color+'18',color:c.color}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="case-card-desc">{c.desc}</p>
              <div className="case-card-footer">
                <div className="case-card-stats">
                  <span>📋 {c.steps.length} steps</span>
                  <span style={{color: c.difficulty==='Easy'?'var(--teal)':c.difficulty==='Hard'?'var(--coral)':'var(--amber)',fontWeight:700}}>● {c.difficulty||'Moderate'}</span>
                </div>
                <div className="case-card-btn" style={{background:c.color}}>
                  Start Case
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
