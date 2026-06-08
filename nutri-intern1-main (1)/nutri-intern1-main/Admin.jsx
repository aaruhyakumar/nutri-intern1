import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAdminOverview, getInternDetail, saveAdminReview, getAdminReviews,
  saveCustomCase, getCustomCases, saveCustomQuizQuestion, getCustomQuiz
} from '../supabaseClient';

const TABS = ['📊 Intern Records', '📋 Upload Cases', '🎮 Game Data', '✍️ Reviews'];

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState(0);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [internDetail, setInternDetail] = useState(null);
  const [internReviews, setInternReviews] = useState([]);

  // Upload Case state
  const [caseForm, setCaseForm] = useState({ name: '', emoji: '👤', desc: '', tags: '', color: '#1D9E75' });
  const [caseMsg, setCaseMsg] = useState('');
  const [customCases, setCustomCases] = useState([]);

  // Quiz state
  const [quizForm, setQuizForm] = useState({ q: '', opts: ['', '', '', ''], c: 0, exp: '' });
  const [quizMsg, setQuizMsg] = useState('');
  const [customQuiz, setCustomQuiz] = useState([]);

  // Review state
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewMsg, setReviewMsg] = useState('');

  useEffect(() => {
    getAdminOverview().then(d => { setInterns(d); setLoading(false); });
    getCustomCases().then(setCustomCases);
    getCustomQuiz().then(setCustomQuiz);
  }, []);

  const loadInternDetail = async (intern) => {
    setSelectedIntern(intern);
    const detail = await getInternDetail(intern.user_id || intern.id);
    setInternDetail(detail);
    const reviews = await getAdminReviews(intern.user_id || intern.id);
    setInternReviews(reviews);
  };

  const handleSaveReview = async () => {
    if (!selectedIntern || !reviewText.trim()) return;
    const err = await saveAdminReview(user.id, selectedIntern.user_id || selectedIntern.id, selectedIntern.name, reviewText, reviewRating);
    if (!err) {
      setReviewMsg('✅ Review saved!');
      setReviewText('');
      const reviews = await getAdminReviews(selectedIntern.user_id || selectedIntern.id);
      setInternReviews(reviews);
    } else {
      setReviewMsg('❌ Failed to save review.');
    }
    setTimeout(() => setReviewMsg(''), 3000);
  };

  const handleSaveCase = async () => {
    if (!caseForm.name || !caseForm.desc) return;
    const err = await saveCustomCase({ ...caseForm, tags: caseForm.tags.split(',').map(t => t.trim()), steps: [] });
    if (!err) {
      setCaseMsg('✅ Case uploaded!');
      setCaseForm({ name: '', emoji: '👤', desc: '', tags: '', color: '#1D9E75' });
      getCustomCases().then(setCustomCases);
    } else { setCaseMsg('❌ Failed.'); }
    setTimeout(() => setCaseMsg(''), 3000);
  };

  const handleSaveQuiz = async () => {
    if (!quizForm.q || quizForm.opts.some(o => !o)) return;
    const err = await saveCustomQuizQuestion(quizForm);
    if (!err) {
      setQuizMsg('✅ Question added!');
      setQuizForm({ q: '', opts: ['', '', '', ''], c: 0, exp: '' });
      getCustomQuiz().then(setCustomQuiz);
    } else { setQuizMsg('❌ Failed.'); }
    setTimeout(() => setQuizMsg(''), 3000);
  };

  const getTimeAgo = (t) => {
    if (!t) return '—';
    const diff = (Date.now() - new Date(t)) / 1000;
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  if (!isAdmin) return (
    <div className="admin-content">
      <div className="page-header"><h1>Access Denied 🚫</h1><p>Admin privileges required.</p></div>
    </div>
  );

  return (
    <div className="admin-content">
      <div className="page-header">
        <h1>Admin Panel 🛡️</h1>
        <p>Manage interns, content, and reviews</p>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            style={{padding:'9px 18px',borderRadius:'10px',border:'2px solid',fontWeight:700,fontSize:'13px',cursor:'pointer',
              borderColor: tab === i ? 'var(--teal)' : '#ddd',
              background: tab === i ? 'var(--teal-light)' : 'white',
              color: tab === i ? 'var(--teal)' : 'var(--text-muted)'}}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB 0: Intern Records */}
      {tab === 0 && (
        <div style={{display:'grid',gridTemplateColumns: selectedIntern ? '1fr 1fr' : '1fr',gap:'20px'}}>
          <div className="card" style={{overflowX:'auto'}}>
            <div className="card-title">Intern Leaderboard</div>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
              <thead>
                <tr style={{borderBottom:'2px solid #eee',textAlign:'left'}}>
                  {['Intern','Level','XP','Cases','Quiz Avg','Games','AI Sessions','Last Active',''].map((h,i) => (
                    <th key={i} style={{padding:'10px 12px',fontWeight:700,color:'var(--text-muted)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="9" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>Loading...</td></tr>
                ) : interns.length > 0 ? interns.map((r, i) => (
                  <tr key={i} style={{borderBottom:'1px solid #f0f0f0',background: selectedIntern?.name === r.name ? 'var(--teal-light)' : i%2===0?'':'#fafafa'}}>
                    <td style={{padding:'12px',fontWeight:700}}>{r.name||'—'}</td>
                    <td style={{padding:'12px'}}><span style={{background:'var(--teal-light)',color:'var(--teal)',padding:'2px 8px',borderRadius:'20px',fontWeight:700,fontSize:'12px'}}>Lv {r.level||1}</span></td>
                    <td style={{padding:'12px',fontWeight:700,color:'var(--teal)'}}>{r.xp||0}</td>
                    <td style={{padding:'12px'}}>{r.cases_completed||0}</td>
                    <td style={{padding:'12px'}}>{r.avg_quiz_score ? Math.round(r.avg_quiz_score)+'%' : '—'}</td>
                    <td style={{padding:'12px'}}>{r.games_played||0}</td>
                    <td style={{padding:'12px'}}>{r.le_attempts||0}</td>
                    <td style={{padding:'12px',color:'var(--text-muted)'}}>{getTimeAgo(r.last_active)}</td>
                    <td style={{padding:'12px'}}>
                      <button onClick={() => loadInternDetail(r)}
                        style={{padding:'4px 12px',borderRadius:'8px',border:'1.5px solid var(--teal)',background:'white',color:'var(--teal)',fontWeight:700,fontSize:'12px',cursor:'pointer'}}>
                        View
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="9" style={{padding:'20px',textAlign:'center',color:'var(--text-muted)'}}>No data yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedIntern && internDetail && (
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div className="card">
                <div className="card-title">📋 {selectedIntern.name} — Case Attempts</div>
                {internDetail.cases.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No cases yet.</p> :
                  internDetail.cases.slice(0,5).map((c,i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                      <span>{c.case_name}</span>
                      <span style={{fontWeight:700,color:'var(--teal)'}}>{c.score}/{c.max_score}</span>
                    </div>
                  ))
                }
              </div>
              <div className="card">
                <div className="card-title">🎮 Game Scores</div>
                {internDetail.games.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No games yet.</p> :
                  internDetail.games.slice(0,5).map((g,i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                      <span style={{textTransform:'capitalize'}}>{g.game}</span>
                      <span style={{fontWeight:700,color:'var(--purple)'}}>{g.score}/{g.max_score}</span>
                    </div>
                  ))
                }
              </div>
              <div className="card">
                <div className="card-title">🧠 Learning Engine Sessions</div>
                {internDetail.le.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No sessions yet.</p> :
                  internDetail.le.slice(0,5).map((s,i) => (
                    <div key={i} style={{padding:'8px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                      <div style={{fontWeight:700}}>{s.case_title}</div>
                      <div style={{color:'var(--text-muted)',marginTop:'2px'}}>{s.ai_tier || 'skipped'} · {s.ai_score != null ? s.ai_score+'pts' : '—'}</div>
                    </div>
                  ))
                }
              </div>
              {internReviews.length > 0 && (
                <div className="card">
                  <div className="card-title">✍️ Past Reviews</div>
                  {internReviews.map((r,i) => (
                    <div key={i} style={{padding:'10px 0',borderBottom:'1px solid #f0f0f0',fontSize:'13px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                        <span style={{fontWeight:700}}>{'⭐'.repeat(r.rating)}</span>
                        <span style={{color:'var(--text-muted)'}}>{getTimeAgo(r.created_at)}</span>
                      </div>
                      <p style={{color:'var(--text)'}}>{r.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 1: Upload Cases */}
      {tab === 1 && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
          <div className="card">
            <div className="card-title">Upload New Case</div>
            <div className="form-group">
              <label>Patient Name & Age</label>
              <input type="text" placeholder="e.g. Arun, 45M" value={caseForm.name} onChange={e => setCaseForm(p=>({...p,name:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Emoji</label>
              <input type="text" placeholder="👤" value={caseForm.emoji} onChange={e => setCaseForm(p=>({...p,emoji:e.target.value}))} style={{width:'80px'}} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Brief clinical description..." value={caseForm.desc}
                onChange={e => setCaseForm(p=>({...p,desc:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'80px'}} />
            </div>
            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input type="text" placeholder="T2DM, Insulin, Hypoglycemia" value={caseForm.tags} onChange={e => setCaseForm(p=>({...p,tags:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input type="color" value={caseForm.color} onChange={e => setCaseForm(p=>({...p,color:e.target.value}))} style={{width:'60px',height:'36px',border:'none',cursor:'pointer'}} />
            </div>
            {caseMsg && <p style={{fontSize:'13px',fontWeight:700,marginBottom:'12px',color: caseMsg.startsWith('✅') ? 'var(--teal)' : 'var(--coral)'}}>{caseMsg}</p>}
            <button className="btn btn-primary" onClick={handleSaveCase} style={{width:'100%'}}>Upload Case →</button>
          </div>

          <div className="card" style={{overflowY:'auto',maxHeight:'500px'}}>
            <div className="card-title">Uploaded Cases ({customCases.length})</div>
            {customCases.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No custom cases yet.</p> :
              customCases.map((c,i) => (
                <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                  <div style={{fontWeight:700,fontSize:'14px'}}>{c.emoji} {c.name}</div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'4px'}}>{c.desc}</div>
                  <div style={{marginTop:'6px',display:'flex',gap:'6px',flexWrap:'wrap'}}>
                    {(c.tags||[]).map((t,j) => <span key={j} className="badge badge-green">{t}</span>)}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* TAB 2: Game Data */}
      {tab === 2 && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
          <div className="card">
            <div className="card-title">Add Quiz Question</div>
            <div className="form-group">
              <label>Question</label>
              <textarea placeholder="Enter question..." value={quizForm.q}
                onChange={e => setQuizForm(p=>({...p,q:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'70px'}} />
            </div>
            {quizForm.opts.map((opt, i) => (
              <div className="form-group" key={i}>
                <label style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <input type="radio" name="correct" checked={quizForm.c === i} onChange={() => setQuizForm(p=>({...p,c:i}))} />
                  Option {i+1} {quizForm.c === i && <span style={{color:'var(--teal)',fontSize:'11px'}}>(correct)</span>}
                </label>
                <input type="text" placeholder={`Option ${i+1}`} value={opt}
                  onChange={e => { const o=[...quizForm.opts]; o[i]=e.target.value; setQuizForm(p=>({...p,opts:o})); }} />
              </div>
            ))}
            <div className="form-group">
              <label>Explanation</label>
              <textarea placeholder="Explain the correct answer..." value={quizForm.exp}
                onChange={e => setQuizForm(p=>({...p,exp:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'60px'}} />
            </div>
            {quizMsg && <p style={{fontSize:'13px',fontWeight:700,marginBottom:'12px',color: quizMsg.startsWith('✅') ? 'var(--teal)' : 'var(--coral)'}}>{quizMsg}</p>}
            <button className="btn btn-primary" onClick={handleSaveQuiz} style={{width:'100%'}}>Add Question →</button>
          </div>

          <div className="card" style={{overflowY:'auto',maxHeight:'600px'}}>
            <div className="card-title">Custom Quiz Questions ({customQuiz.length})</div>
            {customQuiz.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No custom questions yet.</p> :
              customQuiz.map((q,i) => (
                <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                  <div style={{fontWeight:700,fontSize:'13px'}}>{q.q}</div>
                  <div style={{marginTop:'6px',display:'flex',flexDirection:'column',gap:'3px'}}>
                    {(q.opts||[]).map((o,j) => (
                      <span key={j} style={{fontSize:'12px',color: j===q.c ? 'var(--teal)' : 'var(--text-muted)',fontWeight: j===q.c ? 700 : 400}}>
                        {j===q.c ? '✓ ' : '○ '}{o}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* TAB 3: Reviews */}
      {tab === 3 && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
          <div className="card">
            <div className="card-title">Write a Review</div>
            <div className="form-group">
              <label>Select Intern</label>
              <select value={selectedIntern?.name || ''} onChange={e => {
                  const intern = interns.find(i => i.name === e.target.value);
                  if (intern) loadInternDetail(intern);
                }}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',background:'white'}}>
                <option value="">— Select intern —</option>
                {interns.map((r,i) => <option key={i} value={r.name}>{r.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div style={{display:'flex',gap:'8px'}}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setReviewRating(n)}
                    style={{fontSize:'22px',background:'none',border:'none',cursor:'pointer',opacity: n<=reviewRating ? 1 : 0.3}}>⭐</button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Review / Feedback</label>
              <textarea placeholder="Write your feedback for this intern..." value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'120px'}} />
            </div>
            {reviewMsg && <p style={{fontSize:'13px',fontWeight:700,marginBottom:'12px',color: reviewMsg.startsWith('✅') ? 'var(--teal)' : 'var(--coral)'}}>{reviewMsg}</p>}
            <button className="btn btn-primary" onClick={handleSaveReview} disabled={!selectedIntern || !reviewText.trim()} style={{width:'100%'}}>
              Submit Review →
            </button>
          </div>

          <div className="card" style={{overflowY:'auto',maxHeight:'500px'}}>
            <div className="card-title">
              {selectedIntern ? `Reviews for ${selectedIntern.name}` : 'Select an intern to view reviews'}
            </div>
            {internReviews.length === 0 ? (
              <p style={{fontSize:'13px',color:'var(--text-muted)'}}>{selectedIntern ? 'No reviews yet for this intern.' : 'Select an intern first.'}</p>
            ) : internReviews.map((r,i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontWeight:700}}>{'⭐'.repeat(r.rating)}</span>
                  <span style={{fontSize:'12px',color:'var(--text-muted)'}}>{getTimeAgo(r.created_at)}</span>
                </div>
                <p style={{fontSize:'13px',color:'var(--text)',lineHeight:'1.6'}}>{r.review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
