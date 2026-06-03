import React, { useState } from 'react';
import DiagnosticPearls from '../components/games/DiagnosticPearls';
import QuickQuiz from '../components/games/QuickQuiz';
import DecisionTrigger from '../components/games/DecisionTrigger';
import ConceptPopup from '../components/games/ConceptPopup';

const GAMES = [
  { id:'pearls',  title:'Diagnostic Pearls',  emoji:'💎', color:'var(--purple)', light:'var(--purple-light)', desc:'Flip cards to reveal clinical nutrition pearls. Test your knowledge of key diagnostic indicators.', pills:['Flashcard','8 pearls'],    stat:'8 cards' },
  { id:'trigger', title:'Decision Trigger',   emoji:'🧠', color:'var(--teal)',   light:'var(--teal-light)',   desc:'If/Then clinical reasoning. Practice decision-making with real ward scenarios.', pills:['Scenario','Critical thinking'], stat:'3 scenarios' },
  { id:'quiz',    title:'Quick Quiz',         emoji:'⚡', color:'var(--amber)',  light:'var(--amber-light)',  desc:'Rapid-fire timed questions on clinical dietetics. 10 questions, 15 seconds each.', pills:['Timed','10 questions'],       stat:'10 questions' },
  { id:'concept', title:'Mini Concept Popup', emoji:'💡', color:'var(--coral)',  light:'var(--coral-light)',  desc:'Tap a concept to reveal explanations. Perfect for ward rounds prep.', pills:['Reference','Quick recall'],          stat:'6 concepts' },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);
  const game = GAMES.find(g => g.id === activeGame);

  if (activeGame) {
    return (
      <div style={{position:'fixed',inset:0,background:'var(--bg)',zIndex:500,display:'flex',flexDirection:'column'}}>
        {/* Fullscreen Header */}
        <div className="game-fullscreen-header" style={{background:`linear-gradient(135deg,${game.color},${game.color==='var(--purple)'?'#4a44a8':game.color==='var(--teal)'?'#0a5c47':game.color==='var(--amber)'?'#b86e00':'#a83010'})`,padding:'14px 20px',display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
          <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>{game.emoji}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'15px',color:'white',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{game.title}</div>
            <div className="game-header-desc" style={{fontSize:'11px',color:'rgba(255,255,255,0.7)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{game.desc}</div>
          </div>
          <button onClick={() => setActiveGame(null)}
            style={{background:'rgba(255,255,255,0.15)',border:'none',color:'white',width:'36px',height:'36px',borderRadius:'50%',fontSize:'16px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            ✕
          </button>
        </div>
        {/* Fullscreen Body */}
        <div className="game-fullscreen-body" style={{flex:1,overflowY:'auto',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'28px 20px'}}>
          <div style={{width:'100%',maxWidth:'600px'}}>
            {activeGame === 'pearls'  && <DiagnosticPearls />}
            {activeGame === 'quiz'    && <QuickQuiz />}
            {activeGame === 'trigger' && <DecisionTrigger />}
            {activeGame === 'concept' && <ConceptPopup />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="games-content">
      <div className="page-header">
        <h1>Games 🎮</h1>
        <p>Learn clinical nutrition through interactive games — earn XP with every play</p>
      </div>

      <div className="games-grid">
        {GAMES.map(g => (
          <div key={g.id} style={{background:'white',borderRadius:'20px',overflow:'hidden',boxShadow:'var(--shadow)',transition:'transform 0.2s,box-shadow 0.2s',cursor:'pointer'}}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='var(--shadow)'; }}>
            {/* Gradient header */}
            <div style={{background:`linear-gradient(135deg,${g.color}22,${g.color}08)`,padding:'24px 24px 16px',borderBottom:`1px solid ${g.color}20`}}>
              <div style={{width:'56px',height:'56px',borderRadius:'16px',background:g.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',marginBottom:'14px',boxShadow:`0 4px 12px ${g.color}40`}}>
                {g.emoji}
              </div>
              <h3 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'var(--text)',marginBottom:'6px'}}>{g.title}</h3>
              <p style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:'1.6'}}>{g.desc}</p>
            </div>
            <div style={{padding:'16px 24px 20px'}}>
              <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
                {g.pills.map((p,i) => (
                  <span key={i} style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',background: i===0?g.color+'18':'#f0f0f0',color: i===0?g.color:'var(--text-muted)'}}>
                    {p}
                  </span>
                ))}
                <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',background:'#f0f0f0',color:'var(--text-muted)',marginLeft:'auto'}}>
                  {g.stat}
                </span>
              </div>
              <button onClick={() => setActiveGame(g.id)}
                style={{width:'100%',padding:'12px',borderRadius:'12px',border:'none',background:g.color,color:'white',fontFamily:'Poppins',fontWeight:700,fontSize:'14px',cursor:'pointer',transition:'opacity 0.2s'}}
                onMouseEnter={e => e.currentTarget.style.opacity='0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                Play Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
