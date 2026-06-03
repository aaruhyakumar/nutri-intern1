import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminReviews, supabase } from '../supabaseClient';

const MyReviews = () => {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadReviews = () =>
      getAdminReviews(user.id).then(r => { setReviews(r); setLoading(false); });

    loadReviews();

    // Real-time: re-fetch whenever admin inserts/updates/deletes a review for this intern
    const subscription = supabase
      .channel(`reviews_${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admin_reviews', filter: `intern_id=eq.${user.id}` },
        () => loadReviews()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [user]);

  const getTimeAgo = (t) => {
    const d = (Date.now() - new Date(t)) / 1000;
    if (d < 3600) return Math.floor(d / 60) + 'm ago';
    if (d < 86400) return Math.floor(d / 3600) + 'h ago';
    return Math.floor(d / 86400) + 'd ago';
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div style={{maxWidth:'700px', margin:'0 auto'}}>
      <div className="page-header">
        <h1>My Reviews ✍️</h1>
        <p>Feedback from your clinical supervisor</p>
      </div>

      {/* Summary banner */}
      {!loading && reviews.length > 0 && (
        <div style={{background:'linear-gradient(135deg,#0a5c47,#1D9E75)',borderRadius:'20px',padding:'24px 28px',marginBottom:'24px',color:'white',display:'flex',alignItems:'center',gap:'24px'}}>
          <div style={{textAlign:'center',flexShrink:0}}>
            <div className="reviews-banner-rating" style={{fontFamily:'Poppins',fontWeight:800,fontSize:'48px',lineHeight:1,color:'#fde68a'}}>{avgRating}</div>
            <div style={{fontSize:'13px',opacity:0.85,marginTop:'4px',fontWeight:600}}>Avg Rating</div>
            <div style={{fontSize:'20px',marginTop:'4px'}}>{'⭐'.repeat(Math.round(avgRating))}</div>
          </div>
          <div style={{width:'1px',height:'60px',background:'rgba(255,255,255,0.2)'}} />
          <div style={{flex:1,minWidth:0}}>
            <div className="reviews-banner-name" style={{fontFamily:'Poppins',fontWeight:700,fontSize:'18px',marginBottom:'4px'}}>
              {profile?.name || 'Intern'}
            </div>
            <div style={{fontSize:'13px',opacity:0.8}}>{reviews.length} review{reviews.length !== 1 ? 's' : ''} from your supervisor</div>
            <div style={{fontSize:'12px',opacity:0.7,marginTop:'4px'}}>Latest: {getTimeAgo(reviews[0]?.created_at)}</div>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="card" style={{textAlign:'center',padding:'40px'}}>
          <p style={{color:'var(--text-muted)',fontSize:'13px'}}>Loading...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="card" style={{textAlign:'center',padding:'48px 24px'}}>
          <div style={{fontSize:'48px',marginBottom:'12px'}}>📭</div>
          <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'var(--text)',marginBottom:'6px'}}>No reviews yet</div>
          <p style={{fontSize:'13px',color:'var(--text-muted)'}}>Your supervisor hasn't written any feedback yet. Keep completing cases and games!</p>
        </div>
      ) : (
        <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          {reviews.map((r, i) => (
            <div key={i} className="card" style={{borderLeft:`4px solid ${r.rating >= 4 ? 'var(--teal)' : r.rating >= 3 ? 'var(--amber)' : 'var(--coral)'}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                <div>
                  <div style={{fontSize:'20px',marginBottom:'2px'}}>{'⭐'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                  <div style={{fontSize:'11px',color:'var(--text-muted)',fontWeight:600,marginTop:'4px'}}>Review #{reviews.length - i}</div>
                </div>
                <div style={{fontSize:'12px',color:'var(--text-muted)',fontWeight:600,flexShrink:0}}>{getTimeAgo(r.created_at)}</div>
              </div>
              <p style={{fontSize:'14px',color:'var(--text)',lineHeight:1.8,margin:0}}>{r.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
