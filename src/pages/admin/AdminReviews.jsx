import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminOverview, saveAdminReview, getAdminReviews } from '../../supabaseClient';

const getTimeAgo = (t) => {
  if (!t) return '—';
  const diff = (Date.now() - new Date(t)) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
};

const AdminReviews = () => {
  const { user } = useAuth();
  const [interns, setInterns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState('');

  useEffect(() => { getAdminOverview().then(setInterns); }, []);

  const selectIntern = async (intern) => {
    setSelected(intern);
    const r = await getAdminReviews(intern.user_id || intern.id);
    setReviews(r);
  };

  const handleSubmit = async () => {
    if (!selected || !reviewText.trim()) return;
    const err = await saveAdminReview(user.id, selected.user_id || selected.id, selected.name, reviewText, rating);
    if (!err) {
      setMsg('✅ Review saved!');
      setReviewText('');
      setRating(5);
      const r = await getAdminReviews(selected.user_id || selected.id);
      setReviews(r);
    } else { setMsg('❌ Failed.'); }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Reviews ✍️</h1>
        <p>Write and manage feedback for each intern</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'240px 1fr 1fr',gap:'20px'}}>
        {/* Intern list */}
        <div className="card" style={{padding:'16px'}}>
          <div className="card-title">Interns</div>
          {interns.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No interns yet.</p> :
            interns.map((r,i) => (
              <div key={i} onClick={() => selectIntern(r)}
                style={{padding:'10px 12px',borderRadius:'10px',cursor:'pointer',marginBottom:'4px',fontWeight:700,fontSize:'13px',
                  background: selected?.name===r.name ? 'var(--teal-light)' : 'transparent',
                  color: selected?.name===r.name ? 'var(--teal)' : 'var(--text)',
                  borderLeft: selected?.name===r.name ? '3px solid var(--teal)' : '3px solid transparent'}}>
                {r.name}
                <div style={{fontWeight:400,fontSize:'11px',color:'var(--text-muted)',marginTop:'2px'}}>Lv {r.level||1} · {r.xp||0} XP</div>
              </div>
            ))
          }
        </div>

        {/* Write review */}
        <div className="card">
          <div className="card-title">{selected ? `Review for ${selected.name}` : 'Select an intern'}</div>
          {!selected ? (
            <p style={{fontSize:'13px',color:'var(--text-muted)'}}>Click an intern on the left to write a review.</p>
          ) : (
            <>
              <div className="form-group">
                <label>Rating</label>
                <div style={{display:'flex',gap:'6px'}}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setRating(n)}
                      style={{fontSize:'24px',background:'none',border:'none',cursor:'pointer',opacity:n<=rating?1:0.25,transition:'opacity 0.15s'}}>⭐</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Feedback</label>
                <textarea value={reviewText} placeholder={`Write your feedback for ${selected.name}...`}
                  onChange={e => setReviewText(e.target.value)}
                  style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'160px'}} />
              </div>
              {msg && <p style={{fontSize:'13px',fontWeight:700,marginBottom:'12px',color:msg.startsWith('✅')?'var(--teal)':'var(--coral)'}}>{msg}</p>}
              <button className="btn btn-primary" onClick={handleSubmit} disabled={!reviewText.trim()} style={{width:'100%'}}>
                Submit Review →
              </button>
            </>
          )}
        </div>

        {/* Past reviews */}
        <div className="card" style={{overflowY:'auto',maxHeight:'70vh'}}>
          <div className="card-title">{selected ? `Past Reviews — ${selected.name}` : 'Past Reviews'}</div>
          {!selected ? (
            <p style={{fontSize:'13px',color:'var(--text-muted)'}}>Select an intern to view their reviews.</p>
          ) : reviews.length === 0 ? (
            <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No reviews yet for {selected.name}.</p>
          ) : reviews.map((r,i) => (
            <div key={i} style={{padding:'14px 0',borderBottom:'1px solid #f0f0f0'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                <span style={{fontWeight:700,fontSize:'16px'}}>{'⭐'.repeat(r.rating)}</span>
                <span style={{fontSize:'12px',color:'var(--text-muted)'}}>{getTimeAgo(r.created_at)}</span>
              </div>
              <p style={{fontSize:'13px',color:'var(--text)',lineHeight:'1.7'}}>{r.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
