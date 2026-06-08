import React, { useState, useEffect } from 'react';
import { CONCEPTS } from '../../data/cases';
import { supabase } from '../../supabaseClient';

const ConceptPopup = () => {
  const [concepts, setConcepts] = useState(CONCEPTS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const { data } = await supabase.from('custom_concepts').select('*').order('created_at');
        if (data?.length) {
          const mapped = data.map(c => ({
            ...c,
            iconBg: c.color + '20',
            tags: Array.isArray(c.tags) ? c.tags : [],
          }));
          setConcepts([...CONCEPTS, ...mapped]);
        }
      } catch (err) {
        console.error('Error loading custom concepts:', err);
      }
    };
    loadAndSubscribe();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom_concepts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_concepts' }, payload => {
        loadAndSubscribe();
      })
      .subscribe((status, err) => {
        if (err) console.error('Subscription error:', err);
      });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const concept = concepts[currentIdx];

  const handleNext = () => {
    if (currentIdx < concepts.length - 1) {
      setCurrentIdx(p => p + 1);
      setRevealed(false);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => { setCurrentIdx(0); setRevealed(false); setIsFinished(false); };

  if (isFinished) {
    return (
      <div className="quiz-result-card">
        <div style={{fontSize:'48px',marginBottom:'12px'}}>💡</div>
        <div className="quiz-result-score" style={{color:'var(--coral)'}}>{concepts.length}</div>
        <div className="quiz-result-label">Concepts Reviewed</div>
        <div className="quiz-result-msg">Great ward round prep! You've covered all key concepts. 🌟</div>
        <button className="btn btn-primary" onClick={reset}>Review Again →</button>
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <div className="quiz-header">
        <div style={{fontWeight:700,color:'var(--text-muted)'}}>Concept {currentIdx + 1} of {concepts.length}</div>
        <div style={{fontWeight:700,color:'var(--coral)'}}>💡 Quick Recall</div>
      </div>

      <div style={{display:'flex',gap:'4px'}}>
        {concepts.map((_, i) => (
          <div key={i} style={{flex:1,height:'6px',borderRadius:'20px',
            background: i <= currentIdx ? 'var(--coral)' : '#eee',
            opacity: i < currentIdx ? 0.5 : 1}} />
        ))}
      </div>

      <div style={{background: concept.color, borderRadius:'16px', padding:'24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'16px'}}>
          <div style={{width:'52px',height:'52px',borderRadius:'14px',background:concept.iconBg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',flexShrink:0}}>
            {concept.icon}
          </div>
          <div>
            <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'17px',color:concept.textColor}}>{concept.title}</div>
            <div style={{fontSize:'13px',color:concept.textColor,opacity:0.8,marginTop:'2px'}}>{concept.hint}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {concept.tags.map((t, i) => (
            <span key={i} style={{fontSize:'11px',fontWeight:700,padding:'2px 10px',borderRadius:'20px',background:'rgba(0,0,0,0.08)',color:concept.textColor}}>#{t}</span>
          ))}
        </div>
      </div>

      {!revealed ? (
        <button className="btn btn-primary" style={{width:'100%',background:'var(--coral)'}} onClick={() => setRevealed(true)}>
          Tap to Reveal Explanation →
        </button>
      ) : (
        <>
          <div style={{background:'white',border:'1.5px solid var(--coral)',borderRadius:'12px',padding:'16px 18px',fontSize:'14px',lineHeight:1.8,color:'var(--text)'}}>
            {concept.body}
          </div>
          <button className="btn btn-primary" style={{width:'100%'}} onClick={handleNext}>
            {currentIdx === concepts.length - 1 ? 'Finish →' : 'Next Concept →'}
          </button>
        </>
      )}
    </div>
  );
};

export default ConceptPopup;
