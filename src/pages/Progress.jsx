import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProgress, getGameScores, getCaseAttempts, getLESessions } from '../supabaseClient';

const GAME_NAMES = { pearls:'Diagnostic Pearls', quiz:'Quick Quiz', trigger:'Decision Trigger', concept:'Concept Popup' };
const GAME_COLORS = { pearls:'var(--purple)', quiz:'var(--amber)', trigger:'var(--teal)', concept:'var(--coral)' };
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const Progress = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ cases:0, games:0, le:0, xp:0, quizScore:0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [caseHistory, setCaseHistory] = useState([]);
  const [leHistory, setLeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('cases');
  const [weekActivity, setWeekActivity] = useState(Array(7).fill(0));
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user) return;
    Promise.all([getProgress(user.id), getGameScores(user.id), getCaseAttempts(user.id), getLESessions(user.id)])
      .then(([prog, games, cases, le]) => {
        if (prog) setStats({ cases: prog.cases_completed||0, games: prog.games_played||0, le: prog.le_attempts||0, xp: prog.xp||0, quizScore: Math.round(prog.avg_quiz_score||0) });
        setGameHistory(games||[]);
        setCaseHistory(cases||[]);
        setLeHistory(le||[]);

        // Build weekly activity (last 7 days)
        const now = new Date();
        const week = Array(7).fill(0);
        const allActivity = [
          ...(cases||[]).map(a => a.completed_at),
          ...(games||[]).map(g => g.played_at),
          ...(le||[]).map(s => s.submitted_at),
        ];
        allActivity.forEach(t => {
          if (!t) return;
          const diff = Math.floor((now - new Date(t)) / 86400000);
          if (diff >= 0 && diff < 7) week[6 - diff]++;
        });
        setWeekActivity(week);

        // Calculate streak (consecutive days with activity)
        const activeDays = new Set(allActivity.filter(Boolean).map(t => {
          const d = new Date(t);
          return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        }));
        let s = 0;
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          if (activeDays.has(key)) s++;
          else if (i > 0) break;
        }
        setStreak(s);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [user, profile]);

  const level = profile?.level || 1;
  const xpToNext = level * 100;
  const xpPct = Math.min(Math.round((stats.xp % xpToNext) / xpToNext * 100), 100);
  const maxActivity = Math.max(...weekActivity, 1);

  const getTimeAgo = (t) => {
    const d = (Date.now()-new Date(t))/1000;
    if (d<3600) return Math.floor(d/60)+'m ago';
    if (d<86400) return Math.floor(d/3600)+'h ago';
    return Math.floor(d/86400)+'d ago';
  };

  // Day labels starting from 7 days ago
  const dayLabels = Array(7).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return DAYS[d.getDay()];
  });

  const STAT_CARDS = [
    { icon:'📋', value:stats.cases,        label:'Cases Completed', color:'var(--teal)',   bg:'var(--teal-light)' },
    { icon:'🎮', value:stats.games,        label:'Games Played',    color:'var(--purple)', bg:'var(--purple-light)' },
    { icon:'🎯', value:stats.quizScore+'%',label:'Quiz Average',    color:'var(--amber)',  bg:'var(--amber-light)' },
    { icon:'⭐', value:stats.xp,           label:'Total XP',        color:'var(--coral)',  bg:'var(--coral-light)' },
  ];

  return (
    <div className="progress-content">
      <div className="page-header">
        <h1>My Progress 📈</h1>
        <p>Track your clinical learning journey</p>
      </div>
      {error && (
        <div style={{background:'var(--coral-light)',border:'1.5px solid var(--coral)',borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'20px'}}>⚠️</span>
          <div>
            <div style={{fontWeight:700,fontSize:'13px',color:'var(--coral)'}}>Failed to load progress</div>
            <div style={{fontSize:'12px',color:'var(--coral)',opacity:0.8}}>Check your connection and refresh the page.</div>
          </div>
        </div>
      )}

      {/* Level Card */}
      <div style={{background:'linear-gradient(135deg,#0a5c47,#1D9E75)',borderRadius:'20px',padding:'24px 28px',marginBottom:'24px',color:'white'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
          <div>
            <div style={{fontSize:'13px',opacity:0.8,marginBottom:'4px'}}>Current Level</div>
            <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'32px'}}>Level {level}</div>
          </div>
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <div style={{textAlign:'center',background:'rgba(255,255,255,0.15)',borderRadius:'14px',padding:'10px 16px'}}>
              <div style={{fontSize:'22px'}}>🔥</div>
              <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px',color:'#fde68a'}}>{streak}</div>
              <div style={{fontSize:'11px',opacity:0.85,fontWeight:600}}>Day Streak</div>
            </div>
            <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px'}}>
              🏅
            </div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
          <span style={{fontSize:'12px',opacity:0.85,fontWeight:600}}>XP Progress to Level {level+1}</span>
          <span style={{fontSize:'12px',opacity:0.85,fontWeight:700}}>{stats.xp % xpToNext} / {xpToNext} XP</span>
        </div>
        <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'20px',height:'10px'}}>
          <div style={{background:'#fde68a',height:'10px',borderRadius:'20px',width:`${xpPct}%`,transition:'width 0.8s'}} />
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'24px'}}>
        {STAT_CARDS.map((s,i) => (
          <div key={i} style={{background:'white',borderRadius:'14px',padding:'18px',boxShadow:'var(--shadow)',borderTop:`3px solid ${s.color}`}}>
            <div style={{width:'40px',height:'40px',borderRadius:'10px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',marginBottom:'10px'}}>
              {s.icon}
            </div>
            {loading
              ? <div className="skeleton" style={{height:'28px',width:'50px',marginBottom:'6px'}} />
              : <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'24px',color:s.color}}>{s.value}</div>
            }
            <div style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:600,marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div className="card" style={{marginBottom:'24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <div className="card-title" style={{marginBottom:0}}>📅 This Week's Activity</div>
          <div style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:600}}>{weekActivity.reduce((a,b)=>a+b,0)} total actions</div>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'100px'}}>
          {weekActivity.map((val, i) => (
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px'}}>
              <div style={{fontSize:'11px',fontWeight:700,color: val>0?'var(--teal)':'var(--text-muted)'}}>{val||''}</div>
              <div style={{width:'100%',borderRadius:'6px 6px 0 0',
                background: val>0 ? `linear-gradient(180deg,var(--teal),#0a5c47)` : '#f0f0f0',
                height:`${Math.max((val/maxActivity)*80, val>0?8:4)}px`,
                transition:'height 0.6s ease',
                boxShadow: val>0 ? '0 2px 8px rgba(29,158,117,0.3)' : 'none'}} />
              <div style={{fontSize:'11px',fontWeight:700,color: i===6?'var(--teal)':'var(--text-muted)'}}>{dayLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History Tabs */}
      <div className="card">
        <div style={{display:'flex',gap:'8px',marginBottom:'20px',borderBottom:'2px solid #f0f0f0',paddingBottom:'12px'}}>
          {[['cases','📋 Cases'],['games','🎮 Games']].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{padding:'7px 16px',borderRadius:'8px',border:'none',fontWeight:700,fontSize:'13px',cursor:'pointer',
                background: tab===id?'var(--teal)':'transparent',
                color: tab===id?'white':'var(--text-muted)'}}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'cases' && (
          caseHistory.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No cases completed yet.</p> :
          caseHistory.map((c,i) => {
            const pct = Math.round((c.score/c.max_score)*100);
            return (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'12px 0',borderBottom: i<caseHistory.length-1?'1px solid #f0f0f0':'none'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'var(--teal-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>📋</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:'13px',marginBottom:'4px'}}>{c.case_name}</div>
                  <div style={{background:'#f0f0f0',borderRadius:'20px',height:'6px'}}>
                    <div style={{background: pct>=80?'var(--teal)':pct>=50?'var(--amber)':'var(--coral)',height:'6px',borderRadius:'20px',width:`${pct}%`}} />
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:'14px',color: pct>=80?'var(--teal)':pct>=50?'var(--amber)':'var(--coral)'}}>{c.score}/{c.max_score}</div>
                  <div style={{fontSize:'11px',color:'var(--text-muted)'}}>{getTimeAgo(c.completed_at)}</div>
                </div>
              </div>
            );
          })
        )}

        {tab === 'games' && (
          gameHistory.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No games played yet.</p> :
          gameHistory.map((g,i) => {
            const pct = Math.round((g.score/g.max_score)*100);
            const color = GAME_COLORS[g.game]||'var(--blue)';
            return (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'12px 0',borderBottom: i<gameHistory.length-1?'1px solid #f0f0f0':'none'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'10px',background:color+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>🎮</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:'13px',marginBottom:'4px'}}>{GAME_NAMES[g.game]||g.game}</div>
                  <div style={{background:'#f0f0f0',borderRadius:'20px',height:'6px'}}>
                    <div style={{background:color,height:'6px',borderRadius:'20px',width:`${pct}%`}} />
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontWeight:800,fontSize:'14px',color}}>{pct}%</div>
                  <div style={{fontSize:'11px',color:'var(--text-muted)'}}>{getTimeAgo(g.played_at)}</div>
                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
};

export default Progress;
