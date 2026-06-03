import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { CASES } from '../data/cases';
import { saveCaseAttempt, getCaseAttempts, getCustomCases, supabase } from '../supabaseClient';
import { scoreAnswer, formatScore } from '../utils/scoringEngine';

const DIFF_COLORS = { Moderate: 'var(--amber)', Hard: 'var(--coral)', Easy: 'var(--teal)' };

const CasePlayer = ({ caseData, caseIdx, user, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [scoreResult, setScoreResult] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [stepResults, setStepResults] = useState([]); // Array of best scores per step
  const [expandedStep, setExpandedStep] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const step = caseData.steps[currentStep];

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim() || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const result = await scoreAnswer(studentAnswer, step);
      setScoreResult(result);
      
      // Store this attempt (even if they retry)
      const currentAttempts = stepResults[currentStep] || [];
      const updatedAttempts = [...(stepResults[currentStep] || []), result];
      
      // Keep only the best attempt per step
      const bestAttempt = updatedAttempts.reduce((best, curr) => 
        curr.points > best.points ? curr : best
      );
      
      const newResults = [...stepResults];
      newResults[currentStep] = bestAttempt;
      setStepResults(newResults);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < caseData.steps.length - 1) {
      setCurrentStep(p => p + 1);
      setStudentAnswer("");
      setScoreResult(null);
      setShowHints(false);
    } else {
      // Case complete
      const totalPoints = stepResults.reduce((sum, result) => sum + (result?.points || 0), 0);
      const maxPoints = caseData.steps.length * 5;
      setShowSummary(true);
      clearInterval(timerRef.current);
      if (user) {
        saveCaseAttempt(user.id, caseIdx, caseData.name, totalPoints, maxPoints);
      }
    }
  };

  const handleRetry = () => {
    setStudentAnswer("");
    setScoreResult(null);
    setShowHints(false);
  };

  // SUMMARY VIEW
  if (showSummary) {
    const totalPoints = stepResults.reduce((sum, result) => sum + (result?.points || 0), 0);
    const maxPoints = caseData.steps.length * 5;
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    let rating = { label: 'Novice Intern', color: '#64748b', emoji: '🧊', sub: 'Strong start! Review the concepts and try again.' };
    if (percentage >= 90) rating = { label: 'Attending Dietitian', color: 'var(--teal)', emoji: '🏆', sub: 'Exceptional clinical reasoning! You are ward-ready.' };
    else if (percentage >= 75) rating = { label: 'Senior Resident', color: 'var(--blue)', emoji: '🩺', sub: 'Excellent performance. Nuanced understanding demonstrated.' };
    else if (percentage >= 60) rating = { label: 'Junior Resident', color: 'var(--amber)', emoji: '🏥', sub: 'Solid foundation. Keep practicing to strengthen your answers.' };

    return (
      <div className="cases-content">
        <div className="summary-card show" style={{maxWidth:'900px'}}>
          <div style={{textAlign:'center',marginBottom:'28px'}}>
            <div style={{fontSize:'54px',marginBottom:'10px'}}>{rating.emoji}</div>
            <h2 style={{fontFamily:'Poppins',fontWeight:800,fontSize:'24px',color:'var(--text)',marginBottom:'4px'}}>{rating.label}</h2>
            <div className="rating-badge" style={{background:rating.color+'18',color:rating.color}}>Score: {totalPoints}/{maxPoints} points ({percentage}%)</div>
            <div style={{marginTop:'8px',fontSize:'13px',color:'var(--text-muted)',fontWeight:700}}>⏱ Completed in {formatTime(elapsed)}</div>
            <p style={{color:'var(--text-muted)',fontSize:'13px',marginTop:'12px',maxWidth:'480px',marginInline:'auto'}}>{rating.sub}</p>
          </div>

          <div style={{fontSize:'11px',fontWeight:800,textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px',letterSpacing:'1px'}}>
            Step-by-Step Review
            <span style={{marginLeft:'8px',fontWeight:600,fontSize:'11px',color:'var(--text-muted)',textTransform:'none',letterSpacing:0}}>
              — click to expand
            </span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {caseData.steps.map((s, i) => {
              const result = stepResults[i];
              const scoreInfo = result ? formatScore(result) : null;
              const isOpen = expandedStep === i;
              const borderColor = scoreInfo?.color || '#e8e8e8';
              const bg = scoreInfo?.color ? scoreInfo.color + '08' : '#f9f9f9';

              return (
                <div key={i}
                  onClick={() => setExpandedStep(isOpen ? null : i)}
                  style={{border:`1.5px solid ${isOpen ? borderColor : '#e8e8e8'}`,borderRadius:'14px',overflow:'hidden',cursor:'pointer',transition:'all 0.2s',background: isOpen ? bg : 'white'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:scoreInfo?.color||'#e8e8e8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0,color:'white',fontWeight:800}}>
                      {scoreInfo?.emoji}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:'13px',color:'var(--text)'}}>
                        <span style={{color:'var(--text-muted)',fontWeight:600,marginRight:'6px'}}>Step {i+1} · {s.label}</span>
                      </div>
                      <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'480px'}}>{s.question}</div>
                    </div>
                    {result && <div style={{fontWeight:800,fontSize:'13px',color:scoreInfo.color}}>{result.points}/5 pts</div>}
                    <div style={{fontSize:'18px',color:'var(--text-muted)',transition:'transform 0.2s',transform: isOpen ? 'rotate(180deg)' : 'none'}}>⌄</div>
                  </div>

                  {isOpen && result && (
                    <div style={{padding:'0 16px 16px',borderTop:`1px solid ${borderColor}20`,background:bg}}>
                      <div style={{marginTop:'12px',fontSize:'13px',color:'var(--text)'}}>
                        <div style={{fontWeight:700,marginBottom:'8px'}}>Your Answer:</div>
                        <div style={{background:'white',border:`1px solid ${borderColor}40`,borderRadius:'10px',padding:'12px',marginBottom:'12px',fontStyle:'italic'}}>{result.matchedKeywords.studentAnswer || "No text saved"}</div>

                        <div style={{fontWeight:700,marginBottom:'8px'}}>Matched Keywords:</div>
                        {result.matchedKeywords.primary.length > 0 && (
                          <div style={{marginBottom:'8px'}}>
                            <div style={{fontSize:'11px',fontWeight:600,color:'var(--teal)',marginBottom:'4px'}}>✓ Critical:</div>
                            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                              {result.matchedKeywords.primary.map((kw, j) => (
                                <span key={j} style={{background:'var(--teal)',color:'white',fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'12px'}}>{kw}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {result.matchedKeywords.secondary.length > 0 && (
                          <div style={{marginBottom:'8px'}}>
                            <div style={{fontSize:'11px',fontWeight:600,color:'var(--blue)',marginBottom:'4px'}}>✓ Supporting:</div>
                            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                              {result.matchedKeywords.secondary.map((kw, j) => (
                                <span key={j} style={{background:'var(--blue)',color:'white',fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'12px'}}>{kw}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {result.matchedKeywords.missed.primary.length > 0 && (
                          <div style={{marginBottom:'12px',padding:'10px',background:'var(--coral-light)',borderRadius:'10px'}}>
                            <div style={{fontSize:'11px',fontWeight:600,color:'var(--coral)',marginBottom:'4px'}}>✗ Missed Critical Concepts:</div>
                            <div style={{fontSize:'13px',color:'var(--text)'}}>{result.matchedKeywords.missed.primary.join(", ")}</div>
                          </div>
                        )}

                        <div style={{background:'var(--blue-light)',borderLeft:'3px solid var(--blue)',borderRadius:'8px',padding:'12px',marginTop:'12px'}}>
                          <div style={{fontWeight:700,marginBottom:'6px',color:'var(--blue)'}}>💡 Professional Feedback:</div>
                          <div style={{fontSize:'13px',color:'#185FA5',lineHeight:1.7}}>{result.feedback}</div>
                        </div>

                        {s.sampleAnswers && (
                          <div style={{marginTop:'12px'}}>
                            <div style={{fontWeight:700,marginBottom:'8px'}}>📝 Strong Answer Example:</div>
                            <div style={{background:'white',border:`1px solid var(--teal)40`,borderRadius:'10px',padding:'12px',borderLeft:`3px solid var(--teal)`}}>
                              {s.sampleAnswers.find(a => a.tier === 'strong')?.text}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginTop:'28px'}}>
            <button className="btn btn-secondary" onClick={onBack}>Back to Cases</button>
            <button className="btn btn-primary" onClick={() => { 
              setCurrentStep(0); 
              setStudentAnswer(""); 
              setScoreResult(null); 
              setShowSummary(false); 
              setStepResults([]); 
              setExpandedStep(null); 
              setElapsed(0);
              setShowHints(false);
              timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000); 
            }}>Retake Case</button>
          </div>
        </div>
      </div>
    );
  }

  // CASE PLAYING VIEW
  return (
    <div className="cases-content">
      <div className="patient-banner" style={{borderLeft:`4px solid ${caseData.color}`}}>
        <div className="patient-img">{caseData.emoji}</div>
        <div className="patient-info" style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'8px'}}>
            <h2 style={{margin:0}}>{caseData.name}</h2>
            <div className="patient-score" style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:caseData.color,lineHeight:1}}>
                {stepResults.reduce((sum, r) => sum + (r?.points || 0), 0)}<span style={{fontSize:'12px',opacity:0.6,fontWeight:600}}>/{caseData.steps.length * 5}</span>
              </div>
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

      <div className="flashcard" style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <div>
          <div className="fc-step" style={{marginBottom:'16px'}}>
            <div className="fc-step-num" style={{background: caseData.color+'20', color: caseData.color}}>{currentStep + 1}</div>
            <div className="fc-step-label">{step.label}</div>
          </div>
          <div className="fc-question">{step.question}</div>
        </div>

        {!scoreResult ? (
          <div>
            {/* Hints */}
            <div style={{marginBottom:'16px'}}>
              <button 
                onClick={() => setShowHints(!showHints)}
                style={{background:'none',border:'none',color:'var(--blue)',fontWeight:700,fontSize:'13px',cursor:'pointer',textDecoration:'underline',padding:0}}>
                💡 {showHints ? 'Hide' : 'Show'} Hints
              </button>
              {showHints && step.hints && (
                <div style={{marginTop:'10px',padding:'12px',background:'var(--blue-light)',borderRadius:'10px',display:'flex',flexDirection:'column',gap:'8px'}}>
                  {step.hints.map((hint, i) => (
                    <div key={i} style={{fontSize:'13px',color:'#185FA5',fontWeight:500}}>{hint}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div>
              <label style={{fontWeight:700,fontSize:'13px',color:'var(--text)',display:'block',marginBottom:'8px'}}>
                Your Answer ({step.answerType === 'short' ? '1-2 sentences' : 'detailed'})
              </label>
              <textarea
                ref={textareaRef}
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'100px',fontWeight:500}}
              />
              <div style={{marginTop:'6px',fontSize:'12px',color:'var(--text-muted)',fontWeight:600}}>
                {studentAnswer.length} characters · {studentAnswer.split(/\s+/).length - 1} words
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Score Display */}
            <div style={{background:formatScore(scoreResult).color+'18',borderLeft:`3px solid ${formatScore(scoreResult).color}`,borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                <div style={{fontWeight:800,fontSize:'16px',color:formatScore(scoreResult).color}}>
                  {formatScore(scoreResult).emoji} {formatScore(scoreResult).label}
                </div>
                <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:formatScore(scoreResult).color}}>{scoreResult.points}/5</div>
              </div>
              <div style={{fontSize:'13px',color:'var(--text)',marginBottom:'10px'}}>
                Keyword Match: {scoreResult.percentage}%
              </div>
              <div style={{background:'white',borderRadius:'8px',height:'6px',overflow:'hidden'}}>
                <div style={{height:'100%',background:formatScore(scoreResult).color,width:`${scoreResult.percentage}%`,transition:'width 0.6s ease-out'}} />
              </div>
            </div>

            {/* Feedback */}
            <div style={{background:'var(--blue-light)',borderLeft:'3px solid var(--blue)',borderRadius:'10px',padding:'14px',marginBottom:'16px'}}>
              <div style={{fontWeight:700,marginBottom:'8px',color:'var(--blue)'}}>💡 Feedback:</div>
              <div style={{fontSize:'13px',color:'#185FA5',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{scoreResult.feedback}</div>
            </div>

            {/* Matched Keywords */}
            <div style={{marginBottom:'16px'}}>
              <div style={{fontWeight:700,fontSize:'13px',color:'var(--text)',marginBottom:'8px'}}>Matched Keywords:</div>
              {scoreResult.matchedKeywords.primary.length > 0 && (
                <div style={{marginBottom:'8px'}}>
                  <div style={{fontSize:'11px',fontWeight:600,color:'var(--teal)',marginBottom:'4px'}}>✓ Critical ({scoreResult.matchedKeywords.primary.length}):</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {scoreResult.matchedKeywords.primary.map((kw, i) => (
                      <span key={i} style={{background:'var(--teal)',color:'white',fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'12px'}}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {scoreResult.matchedKeywords.secondary.length > 0 && (
                <div style={{marginBottom:'8px'}}>
                  <div style={{fontSize:'11px',fontWeight:600,color:'var(--blue)',marginBottom:'4px'}}>✓ Supporting ({scoreResult.matchedKeywords.secondary.length}):</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {scoreResult.matchedKeywords.secondary.map((kw, i) => (
                      <span key={i} style={{background:'var(--blue)',color:'white',fontSize:'11px',fontWeight:600,padding:'4px 10px',borderRadius:'12px'}}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {scoreResult.matchedKeywords.missed.primary.length > 0 && (
                <div style={{marginTop:'8px',padding:'10px',background:'var(--coral-light)',borderRadius:'8px'}}>
                  <div style={{fontSize:'11px',fontWeight:600,color:'var(--coral)',marginBottom:'4px'}}>✗ Consider Adding:</div>
                  <div style={{fontSize:'12px',color:'var(--text)'}}>{scoreResult.matchedKeywords.missed.primary.join(", ")}</div>
                </div>
              )}
            </div>

            {/* Strong Answer Example */}
            {step.sampleAnswers && (
              <div style={{background:'#f0fdf8',borderLeft:'3px solid var(--teal)',borderRadius:'10px',padding:'14px',marginBottom:'16px'}}>
                <div style={{fontWeight:700,marginBottom:'8px',color:'var(--teal)'}}>📝 Strong Answer Example:</div>
                <div style={{fontSize:'13px',color:'var(--text)',lineHeight:1.7,fontStyle:'italic'}}>{step.sampleAnswers.find(a => a.tier === 'strong')?.text}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fc-nav" style={{display:'flex',gap:'12px',marginTop:'20px'}}>
        <button className="btn btn-secondary" onClick={onBack}>✕ Exit Case</button>
        {!scoreResult ? (
          <button className="btn btn-primary" onClick={handleSubmitAnswer} disabled={!studentAnswer.trim() || isSubmitting} style={{flex:1}}>
            {isSubmitting ? 'Evaluating...' : 'Submit Answer'}
          </button>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={handleRetry}>↻ Try Again</button>
            <button className="btn btn-primary" onClick={handleNext} style={{flex:1}}>
              {currentStep === caseData.steps.length - 1 ? '🏁 Finish Case' : 'Next Step →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Cases = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [completedIndexes, setCompletedIndexes] = useState(new Set());
  const [allCases, setAllCases] = useState(CASES);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const custom = await getCustomCases();
        const mapped = (custom || []).map((c, i) => ({ ...c, id: CASES.length + i, difficulty: c.difficulty || 'Moderate', tags: Array.isArray(c.tags) ? c.tags : [] }));
        setAllCases([...CASES, ...mapped]);
      } catch (err) {
        console.error('Error loading custom cases:', err);
      }
    };
    loadAndSubscribe();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom_cases_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_cases' }, payload => {
        loadAndSubscribe();
      })
      .subscribe((status, err) => {
        if (err) console.error('Subscription error:', err);
      });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        {allCases.map((c, i) => {
          const hasSteps = c.steps && c.steps.length > 0;
          return (
            <div key={i} className="case-card"
              onClick={() => hasSteps && setSelected({ data:c, idx:i })}
              style={{ cursor: hasSteps ? 'pointer' : 'default', opacity: hasSteps ? 1 : 0.75 }}>
              <div style={{height:'6px',background:c.color}} />
              <div className="case-card-content">
                {/* Badges */}
                {!hasSteps && (
                  <div style={{position:'absolute',top:'14px',right:'14px',background:'#f59e0b',color:'white',fontSize:'11px',fontWeight:800,padding:'3px 10px',borderRadius:'20px'}}>
                    🔒 Coming Soon
                  </div>
                )}
                {hasSteps && completedIndexes.has(i) && (
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
                <p className="case-card-desc">{c.desc || c.description}</p>
                <div className="case-card-footer">
                  <div className="case-card-stats">
                    <span>📋 {hasSteps ? `${c.steps.length} steps` : 'No steps yet'}</span>
                    <span style={{color: c.difficulty==='Easy'?'var(--teal)':c.difficulty==='Hard'?'var(--coral)':'var(--amber)',fontWeight:700}}>● {c.difficulty||'Moderate'}</span>
                  </div>
                  <div className="case-card-btn" style={{background: hasSteps ? c.color : '#aaa'}}>
                    {hasSteps ? 'Start Case' : 'Not Ready'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cases;
