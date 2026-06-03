import React, { useState, useEffect } from 'react';
import { TRIGGERS } from '../../data/cases';
import { useAuth } from '../../context/AuthContext';
import { saveGameScore } from '../../supabaseClient';
import { supabase } from '../../supabaseClient';

const STEP_META = [
  { label: 'IF',      color: '#E6F1FB', textColor: '#185FA5', placeholder: 'What is the clinical problem here?' },
  { label: 'BECAUSE', color: '#FAEEDA', textColor: '#854F0B', placeholder: 'What is the underlying cause/mechanism?' },
  { label: 'THEN',    color: '#E1F5EE', textColor: '#0F6E56', placeholder: 'What is your immediate intervention?' },
  { label: 'MONITOR', color: '#EEEDFE', textColor: '#3C3489', placeholder: 'What will you track going forward?' },
];

const DecisionTrigger = () => {
  const { user } = useAuth();
  const [triggers, setTriggers] = useState(TRIGGERS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [showReveal, setShowReveal] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const { data } = await supabase.from('custom_triggers').select('*').order('created_at');
        if (data?.length) {
          const mapped = data.map(t => ({
            scenario: t.scenario,
            steps: STEP_META,
            answers: t.answers,
          }));
          setTriggers([...TRIGGERS, ...mapped]);
        }
      } catch (err) {
        console.error('Error loading custom triggers:', err);
      }
    };
    loadAndSubscribe();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom_triggers_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_triggers' }, payload => {
        loadAndSubscribe();
      })
      .subscribe((status, err) => {
        if (err) console.error('Subscription error:', err);
      });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const currentTrigger = triggers[currentIdx];

  const nextTrigger = () => {
    if (currentIdx < triggers.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setInputs(['', '', '', '']);
      setShowReveal(false);
    } else {
      setIsFinished(true);
      if (user) saveGameScore(user.id, 'trigger', triggers.length, triggers.length);
    }
  };

  const reset = () => { setCurrentIdx(0); setInputs(['','','','']); setShowReveal(false); setIsFinished(false); };

  if (isFinished) {
    return (
      <div className="quiz-result-card">
        <div style={{fontSize:'48px',marginBottom:'12px'}}>🧠</div>
        <div className="quiz-result-score" style={{color:'var(--teal)'}}>{triggers.length}</div>
        <div className="quiz-result-label">Scenarios Completed</div>
        <div className="quiz-result-msg">Great clinical reasoning! You've worked through all decision scenarios. 🏆</div>
        <button className="btn btn-primary" onClick={reset}>Play Again →</button>
      </div>
    );
  }

  return (
    <div className="dt-wrap">
      <div className="dt-progress">
        {triggers.map((_, i) => (
          <div key={i} className={`dt-prog-dot ${i < currentIdx ? 'dt-done' : i === currentIdx ? 'dt-active' : ''}`}></div>
        ))}
      </div>

      <div className="dt-scenario">{currentTrigger.scenario}</div>

      <div className="dt-steps">
        {currentTrigger.steps.map((step, i) => (
          <div className="dt-step-item" key={i}>
            <div className="dt-step-row">
              <span className="dt-step-badge" style={{background: step.color, color: step.textColor}}>{step.label}</span>
              <textarea
                className={`dt-step-input ${inputs[i] ? 'dt-filled' : ''}`}
                placeholder={step.placeholder}
                value={inputs[i]}
                rows={2}
                onChange={e => { const a = [...inputs]; a[i] = e.target.value; setInputs(a); }}
                disabled={showReveal}
              />
            </div>
            {showReveal && (
              <div className="dt-reveal show">
                <div className="dt-reveal-header">Expert {step.label} Pathway</div>
                <div className="dt-reveal-body">{currentTrigger.answers[i]}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap:'10px'}}>
        {!showReveal ? (
          <button className="btn btn-primary" style={{flex:1}} onClick={() => setShowReveal(true)}>Reveal Expert Logic →</button>
        ) : (
          <button className="btn btn-primary" style={{flex:1}} onClick={nextTrigger}>
            {currentIdx === triggers.length - 1 ? 'Finish →' : 'Next Scenario →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default DecisionTrigger;
