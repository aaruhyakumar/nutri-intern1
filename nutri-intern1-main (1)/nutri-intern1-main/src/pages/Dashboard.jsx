import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProgress, getGameScores, getCaseAttempts, getLESessions } from '../supabaseClient';

const getTimeAgo = (t) => {
  if (!t) return '—';
  const d = (Date.now()-new Date(t))/1000;
  if (d<3600) return Math.floor(d/60)+'m ago';
  if (d<86400) return Math.floor(d/3600)+'h ago';
  return Math.floor(d/86400)+'d ago';
};

const Dashboard = () => {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState({ cases: 0, quizScore: 0, gamesPlayed: 0, xp: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [progress, gameScores, caseAttempts, leSessions] = await Promise.all([
          getProgress(user.id), getGameScores(user.id), getCaseAttempts(user.id), getLESessions(user.id)
        ]);
        if (progress) setStats({ cases: progress.cases_completed||0, quizScore: Math.round(progress.avg_quiz_score||0), gamesPlayed: progress.games_played||0, xp: progress.xp||0 });
        const gameNames = { pearls:'Diagnostic Pearls', quiz:'Quick Quiz', trigger:'Decision Trigger', concept:'Concept Popup' };
        const gameColors = { pearls:'var(--purple)', quiz:'var(--amber)', trigger:'var(--teal)', concept:'var(--coral)' };
        const all = [
          ...(caseAttempts||[]).map(a => ({ icon:'📋', color:'var(--teal)',  text:`${a.case_name}`, sub:`${a.score}/${a.max_score} correct`, time: a.completed_at })),
          ...(gameScores||[]).map(g  => ({ icon:'🎮', color: gameColors[g.game]||'var(--blue)', text: gameNames[g.game]||g.game, sub:`${g.score}/${g.max_score} pts`, time: g.played_at })),
          ...(leSessions||[]).map(s  => ({ icon:'🧠', color:'var(--purple)', text: s.case_title, sub: s.ai_tier||'skipped', time: s.submitted_at })),
        ].sort((a,b) => new Date(b.time)-new Date(a.time)).slice(0,6);
        setActivities(all);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const level = profile?.level || 1;
  const xpToNext = level * 100;
  const xpPct = Math.min(Math.round((stats.xp % xpToNext) / xpToNext * 100), 100);

  const STATS = [
    { icon:'📋', value: stats.cases,       label:'Cases Done',    grad:'linear-gradient(135deg,#1D9E75,#0a5c47)',   sub:'Clinical cases' },
    { icon:'🎯', value: stats.quizScore+'%',label:'Quiz Avg',      grad:'linear-gradient(135deg,#EF9F27,#b86e00)',   sub:'Quiz accuracy' },
    { icon:'🎮', value: stats.gamesPlayed,  label:'Games Played',  grad:'linear-gradient(135deg,#378ADD,#1a5fa8)',   sub:'All games' },
    { icon:'⭐', value: stats.xp,           label:'XP Earned',     grad:'linear-gradient(135deg,#7F77DD,#4a44a8)',   sub:`Level ${level}` },
  ];

  return (
    <div className="dashboard-content">
      {error && (
        <div style={{background:'var(--coral-light)',border:'1.5px solid var(--coral)',borderRadius:'12px',padding:'14px 18px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'20px'}}>⚠️</span>
          <div>
            <div style={{fontWeight:700,fontSize:'13px',color:'var(--coral)'}}>Failed to load data</div>
            <div style={{fontSize:'12px',color:'var(--coral)',opacity:0.8}}>Check your connection and refresh the page.</div>
          </div>
        </div>
      )}
      {/* Hero Banner */}
      <div style={{background:'linear-gradient(135deg,#0a5c47 0%,#1D9E75 60%,#5DCAA5 100%)',borderRadius:'20px',padding:'28px 32px',marginBottom:'28px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-40px',right:'-40px',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}} />
        <div style={{position:'absolute',bottom:'-60px',right:'80px',width:'160px',height:'160px',borderRadius:'50%',background:'rgba(255,255,255,0.04)'}} />
        <div style={{position:'relative',zIndex:1}}>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:'13px',fontWeight:600,marginBottom:'4px'}}>{greeting} 👋</p>
          <h1 style={{fontFamily:'Poppins',fontWeight:800,fontSize:'26px',color:'white',marginBottom:'6px'}}>{profile?.name || 'Intern'}</h1>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'13px',marginBottom:'20px'}}>Clinical Dietetics Intern · {profile?.hospital || 'NutriIntern Platform'}</p>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{flex:1,maxWidth:'240px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{color:'rgba(255,255,255,0.85)',fontSize:'12px',fontWeight:700}}>Level {level} Progress</span>
                <span style={{color:'rgba(255,255,255,0.85)',fontSize:'12px',fontWeight:700}}>{xpPct}%</span>
              </div>
              <div style={{background:'rgba(255,255,255,0.2)',borderRadius:'20px',height:'8px'}}>
                <div style={{background:'#fde68a',height:'8px',borderRadius:'20px',width:`${xpPct}%`,transition:'width 0.8s'}} />
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.15)',borderRadius:'12px',padding:'8px 16px',color:'white',fontWeight:800,fontSize:'13px'}}>
              ⭐ {stats.xp} XP
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'24px'}}>
        {STATS.map((s,i) => (
          <div key={i} style={{background:s.grad,borderRadius:'16px',padding:'20px',color:'white',boxShadow:'0 4px 16px rgba(0,0,0,0.12)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:'-10px',right:'-10px',fontSize:'48px',opacity:0.15}}>{s.icon}</div>
            <div style={{fontSize:'22px',marginBottom:'8px'}}>{s.icon}</div>
            {loading
              ? <div className="skeleton" style={{height:'32px',width:'60px',marginBottom:'8px',opacity:0.4}} />
              : <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'26px',lineHeight:1}}>{s.value}</div>
            }
            <div style={{fontWeight:700,fontSize:'12px',marginTop:'4px',opacity:0.9}}>{s.label}</div>
            <div style={{fontSize:'11px',opacity:0.7,marginTop:'2px'}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-bottom-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))',gap:'20px'}}>
        {/* Quick Actions */}
        <div className="card">
          <div className="card-title">🚀 Quick Start</div>
          {[
            { icon:'🏥', label:'Clinical Cases',  sub:'MCQ-based case studies',  color:'var(--teal)',   bg:'var(--teal-light)',   section:'cases' },
            { icon:'🎮', label:'Games',           sub:'4 interactive games',      color:'var(--purple)', bg:'var(--purple-light)', section:'games' },
            { icon:'📈', label:'My Progress',     sub:'View your stats',          color:'var(--blue)',   bg:'var(--blue-light)',   section:'progress' },
          ].map((a,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'12px',borderRadius:'12px',background:a.bg,marginBottom: i<2?'10px':'0',cursor:'pointer'}}
              onClick={() => document.dispatchEvent(new CustomEvent('navigate', { detail: a.section }))}>
              <div style={{width:'40px',height:'40px',borderRadius:'10px',background:a.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>
                {a.icon}
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:'14px',color:'var(--text)'}}>{a.label}</div>
                <div style={{fontSize:'12px',color:'var(--text-muted)'}}>{a.sub}</div>
              </div>
              <div style={{marginLeft:'auto',color:a.color,fontWeight:700,fontSize:'16px'}}>→</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-title">⚡ Recent Activity</div>
          {loading ? (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {[1,2,3].map(i => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0'}}>
                  <div className="skeleton" style={{width:'36px',height:'36px',borderRadius:'10px',flexShrink:0}} />
                  <div style={{flex:1}}>
                    <div className="skeleton" style={{height:'13px',width:'70%',marginBottom:'6px'}} />
                    <div className="skeleton" style={{height:'11px',width:'40%'}} />
                  </div>
                  <div className="skeleton" style={{height:'11px',width:'40px'}} />
                </div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div style={{textAlign:'center',padding:'20px 0'}}>
              <div style={{fontSize:'40px',marginBottom:'8px'}}>🌱</div>
              <p style={{fontSize:'13px',color:'var(--text-muted)',fontWeight:600}}>No activity yet — start a case or game!</p>
            </div>
           ) : activities.map((a,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0',borderBottom: i<activities.length-1?'1px solid #f0f0f0':'none'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'10px',background:a.color+'20',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>
                {a.icon}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:'13px',color:'var(--text)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{a.text}</div>
                <div style={{fontSize:'11px',color:a.color,fontWeight:600}}>{a.sub}</div>
              </div>
              <div style={{fontSize:'11px',color:'var(--text-muted)',flexShrink:0}}>{getTimeAgo(a.time)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
