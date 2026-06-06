import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const AdminLearning = () => {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({
    emoji: '🏥', title: '', scenario: '', objective: '',
    difficulty: 'Intermediate', category: '', timeEstimate: '10-15 min',
    color: '#1D9E75', expertAnswer: '',
    hints: ['', '', '']
  });
  const [msg, setMsg] = useState('');

  const loadCases = async () => {
    const { data } = await supabase.from('custom_le_cases').select('*').order('created_at', { ascending: false });
    setCases(data || []);
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadCases(); }, []);

  const updateHint = (i, val) => {
    const h = [...form.hints]; h[i] = val; setForm(p => ({ ...p, hints: h }));
  };

  const handleSave = async () => {
    if (!form.title || !form.scenario || !form.objective) return;
    const { error } = await supabase.from('custom_le_cases').insert({
      ...form,
      hints: form.hints.filter(Boolean)
    });
    if (!error) {
      setMsg('✅ Case added!');
      setForm({ emoji:'🏥',title:'',scenario:'',objective:'',difficulty:'Intermediate',category:'',timeEstimate:'10-15 min',color:'#1D9E75',expertAnswer:'',hints:['','',''] });
      loadCases();
    } else { setMsg('❌ Failed.'); }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Learning Engine 🧠</h1>
        <p>Add new AI-evaluated cases for interns</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="card">
            <div className="card-title">Case Info</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div className="form-group"><label>Emoji</label>
                <input type="text" value={form.emoji} onChange={e=>setForm(p=>({...p,emoji:e.target.value}))} style={{width:'80px'}} /></div>
              <div className="form-group"><label>Color</label>
                <input type="color" value={form.color} onChange={e=>setForm(p=>({...p,color:e.target.value}))} style={{width:'60px',height:'38px',border:'none',cursor:'pointer'}} /></div>
            </div>
            <div className="form-group"><label>Title</label>
              <input type="text" value={form.title} placeholder="e.g. Refeeding Syndrome in ICU" onChange={e=>setForm(p=>({...p,title:e.target.value}))} /></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div className="form-group"><label>Category</label>
                <input type="text" value={form.category} placeholder="e.g. Critical Care" onChange={e=>setForm(p=>({...p,category:e.target.value}))} /></div>
              <div className="form-group"><label>Time Estimate</label>
                <input type="text" value={form.timeEstimate} placeholder="10-15 min" onChange={e=>setForm(p=>({...p,timeEstimate:e.target.value}))} /></div>
            </div>
            <div className="form-group"><label>Difficulty</label>
              <select value={form.difficulty} onChange={e=>setForm(p=>({...p,difficulty:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',background:'white'}}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Scenario & Objective</div>
            <div className="form-group"><label>Clinical Scenario</label>
              <textarea value={form.scenario} placeholder="Describe the full clinical scenario..."
                onChange={e=>setForm(p=>({...p,scenario:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'120px'}} /></div>
            <div className="form-group"><label>Objective</label>
              <textarea value={form.objective} placeholder="What should the intern identify/explain?"
                onChange={e=>setForm(p=>({...p,objective:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'70px'}} /></div>
          </div>

          <div className="card">
            <div className="card-title">Hints (up to 3)</div>
            {form.hints.map((h,i) => (
              <div className="form-group" key={i}>
                <label>Hint {i+1}</label>
                <input type="text" value={h} placeholder={`Hint ${i+1}...`} onChange={e=>updateHint(i,e.target.value)} />
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">Expert Answer</div>
            <textarea value={form.expertAnswer} placeholder="Write the ideal expert answer..."
              onChange={e=>setForm(p=>({...p,expertAnswer:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'120px'}} />
            {msg && <p style={{fontSize:'13px',fontWeight:700,margin:'12px 0',color:msg.startsWith('✅')?'var(--teal)':'var(--coral)'}}>{msg}</p>}
            <button className="btn btn-primary" onClick={handleSave} style={{width:'100%',marginTop:'12px'}}>Add Case →</button>
          </div>
        </div>

        <div className="card" style={{overflowY:'auto',maxHeight:'80vh'}}>
          <div className="card-title">Custom LE Cases ({cases.length})</div>
          {cases.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>No custom cases yet.</p> :
            cases.map((c,i) => (
              <div key={i} style={{padding:'14px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                  <span style={{fontSize:'22px'}}>{c.emoji}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:'14px'}}>{c.title}</div>
                    <div style={{fontSize:'12px',color:'var(--text-muted)'}}>{c.difficulty} · {c.category} · {c.timeEstimate}</div>
                  </div>
                </div>
                <p style={{fontSize:'12px',color:'var(--text-muted)'}}>{c.scenario?.substring(0,100)}...</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AdminLearning;
