import { useState, useEffect } from 'react';
import { getAdminOverview, getCustomCases, getCustomQuiz } from '../../supabaseClient';

const getTimeAgo = (t) => {
  if (!t) return '—';
  const diff = (Date.now() - new Date(t)) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
};

const AdminDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [cases, setCases] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminOverview(), getCustomCases(), getCustomQuiz()])
      .then(([i, c, q]) => { setInterns(i); setCases(c); setQuiz(q); setLoading(false); });
  }, []);

  const totalXP    = interns.reduce((s, i) => s + (i.xp || 0), 0);
  const totalCases = interns.reduce((s, i) => s + (i.cases_completed || 0), 0);
  const totalGames = interns.reduce((s, i) => s + (i.games_played || 0), 0);
  const avgQuiz    = interns.length ? Math.round(interns.reduce((s,i) => s+(i.avg_quiz_score||0),0) / interns.length) : 0;
  const maxXP      = interns.length ? Math.max(...interns.map(i => i.xp||0)) : 1;

  const STAT_CARDS = [
    { label: 'Total Interns',    value: interns.length, icon: '👥', grad: 'linear-gradient(135deg,#1D9E75,#0a5c47)', sub: 'Registered' },
    { label: 'Cases Completed',  value: totalCases,     icon: '📋', grad: 'linear-gradient(135deg,#378ADD,#1a5fa8)', sub: 'All interns' },
    { label: 'Games Played',     value: totalGames,     icon: '🎮', grad: 'linear-gradient(135deg,#EF9F27,#b86e00)', sub: 'Platform total' },
    { label: 'Avg Quiz Score',   value: avgQuiz+'%',    icon: '🎯', grad: 'linear-gradient(135deg,#D85A30,#a83010)', sub: 'Across all interns' },
    { label: 'Total XP Earned',  value: totalXP,        icon: '⭐', grad: 'linear-gradient(135deg,#5DCAA5,#1D9E75)', sub: 'Combined XP' },
  ];

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Admin Dashboard 🛡️</h1>
        <p>Platform overview — interns, content, and activity</p>
      </div>

      {/* Stat Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'16px',marginBottom:'28px'}}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} style={{background:s.grad,borderRadius:'16px',padding:'20px',color:'white',boxShadow:'0 4px 20px rgba(0,0,0,0.12)'}}>
            <div style={{fontSize:'28px',marginBottom:'8px'}}>{s.icon}</div>
            <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'28px',lineHeight:1}}>{loading ? '—' : s.value}</div>
            <div style={{fontWeight:700,fontSize:'13px',marginTop:'4px',opacity:0.9}}>{s.label}</div>
            <div style={{fontSize:'11px',opacity:0.7,marginTop:'2px'}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
        {/* Content Added */}
        <div className="card">
          <div className="card-title">📦 Content Library</div>
          {[
            { label:'Custom Cases',     val: cases.length, max:10, color:'var(--teal)' },
            { label:'Quiz Questions',   val: quiz.length,  max:20, color:'var(--amber)' },
          ].map(({ label, val, max, color }) => (
            <div key={label} style={{marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <span style={{fontSize:'13px',fontWeight:700}}>{label}</span>
                <span style={{fontSize:'13px',fontWeight:800,color}}>{val}</span>
              </div>
              <div style={{background:'#f0f0f0',borderRadius:'20px',height:'8px'}}>
                <div style={{background:color,height:'8px',borderRadius:'20px',width:`${Math.min((val/max)*100,100)}%`,transition:'width 0.6s'}} />
              </div>
            </div>
          ))}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'8px'}}>
            <div style={{padding:'12px',background:'var(--teal-light)',borderRadius:'10px',textAlign:'center'}}>
              <div style={{fontWeight:800,fontSize:'20px',color:'var(--teal)'}}>{cases.length + quiz.length}</div>
              <div style={{fontSize:'11px',color:'var(--teal)',fontWeight:600}}>Total Items</div>
            </div>
            <div style={{padding:'12px',background:'var(--purple-light)',borderRadius:'10px',textAlign:'center'}}>
              <div style={{fontWeight:800,fontSize:'20px',color:'var(--purple)'}}>{totalXP}</div>
              <div style={{fontSize:'11px',color:'var(--purple)',fontWeight:600}}>Total XP</div>
            </div>
          </div>
        </div>

        {/* Top Interns */}
        <div className="card">
          <div className="card-title">🏆 Top Interns by XP</div>
          {loading ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>Loading...</p> :
            interns.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No interns yet.</p> :
            [...interns].sort((a,b)=>(b.xp||0)-(a.xp||0)).slice(0,5).map((r, i) => (
              <div key={i} style={{marginBottom:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'5px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'24px',height:'24px',borderRadius:'50%',background: i===0?'var(--amber)':i===1?'#aaa':'#cd7f32',
                      display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'11px'}}>
                      {i+1}
                    </div>
                    <span style={{fontWeight:700,fontSize:'13px'}}>{r.name}</span>
                  </div>
                  <span style={{fontWeight:800,fontSize:'13px',color:'var(--teal)'}}>{r.xp||0} XP</span>
                </div>
                <div style={{background:'#f0f0f0',borderRadius:'20px',height:'6px'}}>
                  <div style={{background:'linear-gradient(90deg,var(--teal),var(--teal-mid))',height:'6px',borderRadius:'20px',
                    width:`${((r.xp||0)/maxXP)*100}%`,transition:'width 0.6s'}} />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card">
        <div className="card-title">📊 Intern Activity Overview</div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
            <thead>
              <tr style={{borderBottom:'2px solid #eee'}}>
                {['Intern','Level','XP','Cases','Quiz Avg','Games','Last Active'].map((h,i)=>(
                  <th key={i} style={{padding:'10px 12px',fontWeight:700,color:'var(--text-muted)',textAlign:'left'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>Loading...</td></tr>
              ) : interns.length === 0 ? (
                <tr><td colSpan="7" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>No interns yet.</td></tr>
              ) : [...interns].sort((a,b)=>(b.xp||0)-(a.xp||0)).map((r,i) => (
                <tr key={i} style={{borderBottom:'1px solid #f0f0f0',background:i%2===0?'':'#fafafa'}}>
                  <td style={{padding:'12px',fontWeight:700}}>{r.name||'—'}</td>
                  <td style={{padding:'12px'}}>
                    <span style={{background:'var(--teal-light)',color:'var(--teal)',padding:'2px 10px',borderRadius:'20px',fontWeight:700,fontSize:'12px'}}>
                      Lv {r.level||1}
                    </span>
                  </td>
                  <td style={{padding:'12px'}}>
                    <span style={{fontWeight:800,color:'var(--teal)'}}>{r.xp||0}</span>
                  </td>
                  <td style={{padding:'12px'}}>{r.cases_completed||0}</td>
                  <td style={{padding:'12px'}}>
                    <span style={{fontWeight:700,color: (r.avg_quiz_score||0)>=70?'var(--teal)':(r.avg_quiz_score||0)>=50?'var(--amber)':'var(--coral)'}}>
                      {r.avg_quiz_score ? Math.round(r.avg_quiz_score)+'%' : '—'}
                    </span>
                  </td>
                  <td style={{padding:'12px'}}>{r.games_played||0}</td>
                  <td style={{padding:'12px',color:'var(--text-muted)',fontSize:'12px'}}>{getTimeAgo(r.last_active)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
