import React, { useState, useEffect } from 'react';
import { getAdminOverview, getInternDetail } from '../../supabaseClient';

const AdminInterns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

  useEffect(() => { getAdminOverview().then(d => { setInterns(d); setLoading(false); }); }, []);

  const loadDetail = async (intern) => {
    setSelected(intern);
    const d = await getInternDetail(intern.user_id || intern.id);
    setDetail(d);
  };

  const getTimeAgo = (t) => {
    if (!t) return '—';
    const diff = (Date.now() - new Date(t)) / 1000;
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Intern Records 👥</h1>
        <p>View performance and activity for each intern</p>
      </div>

      <div style={{display:'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap:'20px'}}>
        <div className="card" style={{overflowX:'auto'}}>
          <div className="card-title">All Interns</div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
            <thead>
              <tr style={{borderBottom:'2px solid #eee',textAlign:'left'}}>
                {['Intern','Level','XP','Cases','Quiz Avg','Games','Last Active',''].map((h,i) => (
                  <th key={i} style={{padding:'10px 12px',fontWeight:700,color:'var(--text-muted)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>Loading...</td></tr>
              ) : interns.length === 0 ? (
                <tr><td colSpan="8" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>No interns yet.</td></tr>
              ) : interns.map((r, i) => (
                <tr key={i} style={{borderBottom:'1px solid #f0f0f0', background: selected?.name===r.name ? 'var(--teal-light)' : i%2===0?'':'#fafafa'}}>
                  <td style={{padding:'12px',fontWeight:700}}>{r.name||'—'}</td>
                  <td style={{padding:'12px'}}><span style={{background:'var(--teal-light)',color:'var(--teal)',padding:'2px 8px',borderRadius:'20px',fontWeight:700,fontSize:'12px'}}>Lv {r.level||1}</span></td>
                  <td style={{padding:'12px',fontWeight:700,color:'var(--teal)'}}>{r.xp||0}</td>
                  <td style={{padding:'12px'}}>{r.cases_completed||0}</td>
                  <td style={{padding:'12px'}}>{r.avg_quiz_score ? Math.round(r.avg_quiz_score)+'%' : '—'}</td>
                  <td style={{padding:'12px'}}>{r.games_played||0}</td>
                  <td style={{padding:'12px',color:'var(--text-muted)'}}>{getTimeAgo(r.last_active)}</td>
                  <td style={{padding:'12px'}}>
                    <button onClick={() => loadDetail(r)}
                      style={{padding:'4px 12px',borderRadius:'8px',border:'1.5px solid var(--teal)',background:'white',color:'var(--teal)',fontWeight:700,fontSize:'12px',cursor:'pointer'}}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && detail && (
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div className="card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div className="card-title" style={{marginBottom:0}}>{selected.name}</div>
                <button onClick={() => { setSelected(null); setDetail(null); }}
                  style={{background:'none',border:'none',cursor:'pointer',fontSize:'18px',color:'var(--text-muted)'}}>✕</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                {[['XP',selected.xp||0,'var(--teal)'],['Level',selected.level||1,'var(--purple)'],['Cases',selected.cases_completed||0,'var(--blue)'],['Games',selected.games_played||0,'var(--amber)']].map(([l,v,c])=>(
                  <div key={l} style={{padding:'12px',background:'#f8faf9',borderRadius:'10px',textAlign:'center'}}>
                    <div style={{fontWeight:800,fontSize:'20px',color:c}}>{v}</div>
                    <div style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:600}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">📋 Case Attempts</div>
              {detail.cases.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No cases yet.</p> :
                detail.cases.slice(0,5).map((c,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                    <span>{c.case_name}</span>
                    <span style={{fontWeight:700,color:'var(--teal)'}}>{c.score}/{c.max_score}</span>
                  </div>
                ))
              }
            </div>

            <div className="card">
              <div className="card-title">🎮 Game Scores</div>
              {detail.games.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No games yet.</p> :
                detail.games.slice(0,5).map((g,i) => (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                    <span style={{textTransform:'capitalize'}}>{g.game}</span>
                    <span style={{fontWeight:700,color:'var(--purple)'}}>{g.score}/{g.max_score}</span>
                  </div>
                ))
              }
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInterns;
