import React, { useState, useEffect } from 'react';
import { PEARLS } from '../../data/cases';
import { useAuth } from '../../context/AuthContext';
import { saveGameScore } from '../../supabaseClient';
import { supabase } from '../../supabaseClient';

const DiagnosticPearls = () => {
  const { user } = useAuth();
  const [pearls, setPearls] = useState(PEARLS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const { data } = await supabase.from('custom_pearls').select('*').order('created_at');
        if (data?.length) setPearls([...PEARLS, ...data]);
      } catch (err) {
        console.error('Error loading custom pearls:', err);
      }
    };
    loadAndSubscribe();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom_pearls_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_pearls' }, payload => {
        loadAndSubscribe();
      })
      .subscribe((status, err) => {
        if (err) console.error('Subscription error:', err);
      });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const pearl = pearls[currentIdx];
  const answered = selected !== null;
  const isCorrect = selected === pearl?.correct;

  const handleOption = (idx) => {
    if (answered) return;
    setSelected(idx);
    if (idx === pearl.correct) setScore(p => p + 1);
  };

  const handleNext = () => {
    if (currentIdx < pearls.length - 1) {
      setFlipped(false);
      setTimeout(() => { setCurrentIdx(p => p + 1); setSelected(null); }, 300);
    } else {
      setIsFinished(true);
      if (user) saveGameScore(user.id, 'pearls', score + (isCorrect ? 1 : 0), pearls.length);
    }
  };

  const reset = () => { setCurrentIdx(0); setSelected(null); setScore(0); setIsFinished(false); setFlipped(false); };

  if (isFinished) {
    const finalScore = score + (isCorrect ? 1 : 0);
    const pct = Math.round((finalScore / pearls.length) * 100);
    return (
      <div className="quiz-result-card">
        <div style={{fontSize:'48px',marginBottom:'12px'}}>💎</div>
        <div className="quiz-result-score" style={{color: pct >= 70 ? 'var(--purple)' : 'var(--amber)'}}>
          {finalScore} / {pearls.length}
        </div>
        <div className="quiz-result-label">Pearls Solved</div>
        <div className="quiz-result-msg">
          {pct >= 80 ? "Excellent clinical knowledge! 🏆" : pct >= 50 ? "Good effort! Review the missed pearls. 📚" : "Keep studying! These pearls are ward essentials. 💪"}
        </div>
        <button className="btn btn-primary" onClick={reset}>Play Again →</button>
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <div className="quiz-header">
        <div style={{fontWeight:700,color:'var(--text-muted)'}}>Pearl {currentIdx + 1} of {pearls.length}</div>
        <div style={{fontWeight:700,color:'var(--purple)'}}>💎 {score} solved</div>
      </div>

      <div style={{display:'flex',gap:'4px'}}>
        {pearls.map((_, i) => (
          <div key={i} style={{flex:1,height:'6px',borderRadius:'20px',
            background: i <= currentIdx ? 'var(--purple)' : '#eee',
            opacity: i < currentIdx ? 0.5 : 1}} />
        ))}
      </div>

      <div className="pearl-flip-scene">
        <div className={`pearl-flip-card ${flipped ? 'flipped' : ''}`}>
          <div className="pearl-face pearl-front" onClick={() => !flipped && setFlipped(true)}>
            <div style={{fontSize:'44px',marginBottom:'18px'}}>💎</div>
            <div style={{fontSize:'16px',fontWeight:600,color:'rgba(255,255,255,0.9)',lineHeight:1.8,marginBottom:'24px'}}>
              {pearl.clue}
            </div>
            <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'30px',padding:'8px 20px',color:'white',fontWeight:700,fontSize:'13px'}}>
              Tap to reveal options →
            </div>
          </div>

          <div className="pearl-face pearl-back">
            <div style={{fontSize:'12px',fontWeight:800,textTransform:'uppercase',letterSpacing:'1px',color:'var(--purple)',marginBottom:'14px'}}>
              What is the answer?
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {pearl.options.map((opt, i) => (
                <button key={i}
                  className={`quiz-opt ${answered ? (i === pearl.correct ? 'qcorrect' : i === selected ? 'qwrong' : '') : ''}`}
                  onClick={() => handleOption(i)}
                  disabled={answered}>
                  <div className="quiz-opt-letter">{String.fromCharCode(65 + i)}</div>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {answered && (
        <div style={{background:'var(--purple-light)',borderLeft:'4px solid var(--purple)',borderRadius:'12px',padding:'14px 16px',fontSize:'13px',lineHeight:1.7,color:'var(--text)'}}>
          <div style={{fontWeight:800,color:'var(--purple)',marginBottom:'4px'}}>💡 Expert Insight</div>
          {pearl.detail}
          <div style={{marginTop:'8px',fontSize:'12px',fontStyle:'italic',color:'var(--text-muted)'}}>
            <strong>Approach:</strong> {pearl.approach}
          </div>
        </div>
      )}

      {answered && (
        <button className="btn btn-primary" style={{width:'100%'}} onClick={handleNext}>
          {currentIdx === pearls.length - 1 ? 'See Results →' : 'Next Pearl →'}
        </button>
      )}
    </div>
  );
};

export default DiagnosticPearls;
