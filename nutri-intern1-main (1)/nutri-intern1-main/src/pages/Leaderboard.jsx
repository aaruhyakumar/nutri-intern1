import React, { useState, useEffect } from 'react';
import { getGameLeaderboard } from '../supabaseClient';

const GAMES = [
  { id: 'quiz',    title: 'Quick Quiz',        emoji: '⚡', color: 'var(--amber)',  grad: 'linear-gradient(135deg,#EF9F27,#b86e00)' },
  { id: 'pearls',  title: 'Diagnostic Pearls', emoji: '💎', color: 'var(--purple)', grad: 'linear-gradient(135deg,#7F77DD,#4a44a8)' },
  { id: 'trigger', title: 'Decision Trigger',  emoji: '🧠', color: 'var(--teal)',   grad: 'linear-gradient(135deg,#1D9E75,#0a5c47)' },
  { id: 'concept', title: 'Concept Popup',     emoji: '💡', color: 'var(--coral)',  grad: 'linear-gradient(135deg,#D85A30,#a83010)' },
];

const MEDAL = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [boards, setBoards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all(GAMES.map(g => getGameLeaderboard(g.id).then(data => [g.id, data])))
      .then(results => { setBoards(Object.fromEntries(results)); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const activeGame = GAMES.find(g => g.id === activeTab);
  const entries = boards[activeTab] || [];

  return (
    <div style={{maxWidth:'700px',margin:'0 auto'}}>
      <div className="page-header">
        <h1>Leaderboard 🏆</h1>
        <p>Top scores across all games — updated in real time</p>
      </div>

      {error && (
        <div style={{background:'var(--coral-light)',border:'1.5px solid var(--coral)',borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'20px'}}>⚠️</span>
          <div>
            <div style={{fontWeight:700,fontSize:'13px',color:'var(--coral)'}}>Failed to load leaderboard</div>
            <div style={{fontSize:'12px',color:'var(--coral)',opacity:0.8}}>Check your connection and refresh the page.</div>
          </div>
        </div>
      )}
      {/* Game tabs */}
      <div className="leaderboard-tabs" style={{display:'flex',gap:'10px',marginBottom:'24px',flexWrap:'wrap'}}>
        {GAMES.map(g => (
          <button key={g.id} onClick={() => setActiveTab(g.id)}
            style={{flex:1,minWidth:'120px',padding:'12px 8px',borderRadius:'12px',border:'2px solid',fontWeight:700,fontSize:'13px',cursor:'pointer',transition:'all 0.2s',
              borderColor: activeTab===g.id ? g.color : '#eee',
              background: activeTab===g.id ? g.color+'18' : 'white',
              color: activeTab===g.id ? g.color : 'var(--text-muted)'}}>
            {g.emoji} {g.title}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      {!loading && entries.length >= 3 && (
        <div className="podium-wrap" style={{marginBottom:'28px'}}>
          {/* Mobile: 1st on top, 2nd+3rd below. Desktop: 2nd, 1st, 3rd side by side */}
          <div className="podium-row">
            {/* 2nd */}
            <div className="podium-item podium-2nd">
              <div style={{background:'white',borderRadius:'16px',padding:'16px 12px',boxShadow:'var(--shadow)',border:'2px solid #eee',textAlign:'center'}}>
                <div style={{fontSize:'28px',marginBottom:'6px'}}>🥈</div>
                <div style={{fontWeight:800,fontSize:'13px',color:'var(--text)',marginBottom:'2px'}}>{entries[1]?.profiles?.name||'Intern'}</div>
                <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:'#aaa'}}>{entries[1]?.score}<span style={{fontSize:'11px',opacity:0.6}}>/{entries[1]?.max_score}</span></div>
              </div>
              <div style={{height:'40px',background:'#e8e8e8',borderRadius:'0 0 8px 8px',marginTop:'-4px'}} />
            </div>
            {/* 1st */}
            <div className="podium-item podium-1st">
              <div style={{background:activeGame.grad,borderRadius:'16px',padding:'20px 12px',boxShadow:`0 8px 24px ${activeGame.color}40`,border:`2px solid ${activeGame.color}`,textAlign:'center'}}>
                <div style={{fontSize:'36px',marginBottom:'8px'}}>🥇</div>
                <div style={{fontWeight:800,fontSize:'14px',color:'white',marginBottom:'4px'}}>{entries[0]?.profiles?.name||'Intern'}</div>
                <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'26px',color:'white'}}>{entries[0]?.score}<span style={{fontSize:'13px',opacity:0.7}}>/{entries[0]?.max_score}</span></div>
              </div>
              <div style={{height:'60px',background:activeGame.color+'40',borderRadius:'0 0 8px 8px',marginTop:'-4px'}} />
            </div>
            {/* 3rd */}
            <div className="podium-item podium-3rd">
              <div style={{background:'white',borderRadius:'16px',padding:'16px 12px',boxShadow:'var(--shadow)',border:'2px solid #eee',textAlign:'center'}}>
                <div style={{fontSize:'28px',marginBottom:'6px'}}>🥉</div>
                <div style={{fontWeight:800,fontSize:'13px',color:'var(--text)',marginBottom:'2px'}}>{entries[2]?.profiles?.name||'Intern'}</div>
                <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:'#cd7f32'}}>{entries[2]?.score}<span style={{fontSize:'11px',opacity:0.6}}>/{entries[2]?.max_score}</span></div>
              </div>
              <div style={{height:'24px',background:'#e8e8e8',borderRadius:'0 0 8px 8px',marginTop:'-4px'}} />
            </div>
          </div>
        </div>
      )}

      {/* Full list */}
      <div className="card">
        <div className="card-title">{activeGame.emoji} {activeGame.title} — All Rankings</div>
        {loading ? (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[1,2,3].map(i => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'14px',background:'#fafafa',border:'1.5px solid #eee'}}>
                <div className="skeleton" style={{width:'32px',height:'32px',borderRadius:'50%',flexShrink:0}} />
                <div style={{flex:1}}>
                  <div className="skeleton" style={{height:'14px',width:'40%',marginBottom:'8px'}} />
                  <div className="skeleton" style={{height:'7px',width:'100%',borderRadius:'20px'}} />
                </div>
                <div className="skeleton" style={{height:'20px',width:'48px',borderRadius:'8px'}} />
              </div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div style={{textAlign:'center',padding:'32px 0'}}>
            <div style={{fontSize:'40px',marginBottom:'10px'}}>🎮</div>
            <p style={{fontSize:'13px',color:'var(--text-muted)',fontWeight:600}}>No scores yet — be the first to play!</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {entries.map((r, i) => {
              const pct = Math.round((r.score / r.max_score) * 100);
              return (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'14px',
                  background: i===0 ? activeGame.color+'12' : '#fafafa',
                  border: `1.5px solid ${i===0 ? activeGame.color+'40' : '#eee'}`}}>
                  <div style={{fontSize:'24px',width:'32px',textAlign:'center',flexShrink:0}}>{MEDAL[i]}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:'14px',color:'var(--text)',marginBottom:'6px'}}>{r.profiles?.name||'Intern'}</div>
                    <div style={{background:'#e8e8e8',borderRadius:'20px',height:'7px'}}>
                      <div style={{background:activeGame.color,height:'7px',borderRadius:'20px',width:`${pct}%`,transition:'width 0.6s'}} />
                    </div>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'18px',color:activeGame.color}}>{r.score}<span style={{fontSize:'12px',opacity:0.6}}>/{r.max_score}</span></div>
                    <div style={{fontSize:'11px',color:'var(--text-muted)',fontWeight:600}}>{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
