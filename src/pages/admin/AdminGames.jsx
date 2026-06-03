import React, { useState, useEffect } from 'react';
import { saveCustomQuizQuestion, getCustomQuiz, deleteCustomQuizQuestion, deleteCustomPearl, deleteCustomTrigger, deleteCustomConcept } from '../../supabaseClient';
import { supabase } from '../../supabaseClient';

const GAME_TYPES = [
  { id: 'quiz',    label: 'Quick Quiz',         icon: '⚡', color: 'var(--amber)',  light: 'var(--amber-light)',  textColor: '#854F0B' },
  { id: 'pearls',  label: 'Diagnostic Pearls',  icon: '💎', color: 'var(--purple)', light: 'var(--purple-light)', textColor: 'var(--purple)' },
  { id: 'trigger', label: 'Decision Trigger',   icon: '🧠', color: 'var(--teal)',   light: 'var(--teal-light)',   textColor: 'var(--teal)' },
  { id: 'concept', label: 'Mini Concept Popup', icon: '💡', color: 'var(--coral)',  light: 'var(--coral-light)',  textColor: 'var(--coral)' },
];

const AdminGames = () => {
  const [activeGame, setActiveGame] = useState('quiz');
  const [quizForm, setQuizForm] = useState({ q: '', opts: ['','','',''], c: 0, exp: '' });
  const [pearlForm, setPearlForm] = useState({ clue: '', answer: '', options: ['','','',''], correct: 0, detail: '', approach: '' });
  const [triggerForm, setTriggerForm] = useState({ scenario: '', answers: ['','','',''] });
  const [conceptForm, setConceptForm] = useState({ icon: '📌', title: '', hint: '', tags: '', body: '', color: '#FAEEDA', textColor: '#854F0B' });
  const [customQuiz, setCustomQuiz] = useState([]);
  const [customPearls, setCustomPearls] = useState([]);
  const [customTriggers, setCustomTriggers] = useState([]);
  const [customConcepts, setCustomConcepts] = useState([]);
  const [msg, setMsg] = useState({ text: '', ok: true });

  const loadAll = () => {
    getCustomQuiz().then(setCustomQuiz);
    supabase.from('custom_pearls').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomPearls(data || []));
    supabase.from('custom_triggers').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomTriggers(data || []));
    supabase.from('custom_concepts').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomConcepts(data || []));
  };

  useEffect(() => { loadAll(); }, []);

  const showMsg = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: '', ok: true }), 4000); };

  const handleDeleteQuiz = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await deleteCustomQuizQuestion(id);
    getCustomQuiz().then(setCustomQuiz);
  };

  const handleDeletePearl = async (id) => {
    if (!window.confirm('Delete this pearl?')) return;
    await deleteCustomPearl(id);
    supabase.from('custom_pearls').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomPearls(data || []));
  };

  const handleDeleteTrigger = async (id) => {
    if (!window.confirm('Delete this trigger?')) return;
    await deleteCustomTrigger(id);
    supabase.from('custom_triggers').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomTriggers(data || []));
  };

  const handleDeleteConcept = async (id) => {
    if (!window.confirm('Delete this concept?')) return;
    await deleteCustomConcept(id);
    supabase.from('custom_concepts').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomConcepts(data || []));
  };

  const saveQuiz = async () => {
    if (!quizForm.q || quizForm.opts.some(o => !o)) { showMsg('❌ All fields and options are required.', false); return; }
    const err = await saveCustomQuizQuestion(quizForm);
    if (!err) { showMsg('✅ Question uploaded successfully!'); setQuizForm({ q:'',opts:['','','',''],c:0,exp:'' }); getCustomQuiz().then(setCustomQuiz); }
    else { console.error('Quiz insert error:', err); showMsg('❌ Upload failed: ' + err.message, false); }
  };

  const savePearl = async () => {
    if (!pearlForm.clue || !pearlForm.answer) { showMsg('❌ Clue and answer are required.', false); return; }
    if (pearlForm.options.some(o => !o)) { showMsg('❌ All 4 options must be filled.', false); return; }
    const { error } = await supabase.from('custom_pearls').insert(pearlForm);
    if (!error) {
      showMsg('✅ Pearl uploaded successfully!');
      setPearlForm({ clue:'',answer:'',options:['','','',''],correct:0,detail:'',approach:'' });
      supabase.from('custom_pearls').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomPearls(data || []));
    } else { console.error('Pearl insert error:', error); showMsg('❌ Upload failed: ' + error.message, false); }
  };

  const saveTrigger = async () => {
    if (!triggerForm.scenario) { showMsg('❌ Scenario is required.', false); return; }
    if (triggerForm.answers.some(a => !a)) { showMsg('❌ All 4 answer fields must be filled.', false); return; }
    const { error } = await supabase.from('custom_triggers').insert(triggerForm);
    if (!error) {
      showMsg('✅ Trigger uploaded successfully!');
      setTriggerForm({ scenario:'',answers:['','','',''] });
      supabase.from('custom_triggers').select('*').order('created_at', { ascending: false }).then(({ data }) => setCustomTriggers(data || []));
    } else { console.error('Trigger insert error:', error); showMsg('❌ Upload failed: ' + error.message, false); }
  };

  const saveConcept = async () => {
    if (!conceptForm.title || !conceptForm.body) { showMsg('❌ Title and body are required.', false); return; }
    const data = { ...conceptForm, tags: conceptForm.tags.split(',').map(t=>t.trim()).filter(Boolean) };
    const { error } = await supabase.from('custom_concepts').insert(data);
    if (!error) {
      showMsg('✅ Concept uploaded successfully!');
      setConceptForm({ icon:'📌',title:'',hint:'',tags:'',body:'',color:'#FAEEDA',textColor:'#854F0B' });
      supabase.from('custom_concepts').select('*').order('created_at', { ascending: false }).then(({ data: d }) => setCustomConcepts(d || []));
    } else { console.error('Concept insert error:', error); showMsg('❌ Upload failed: ' + error.message, false); }
  };

  const game = GAME_TYPES.find(g => g.id === activeGame);

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Games 🎮</h1>
        <p>Add new questions and data to existing games</p>
      </div>

      {/* Game selector */}
      <div style={{display:'flex',gap:'10px',marginBottom:'24px',flexWrap:'wrap'}}>
        {GAME_TYPES.map(g => (
          <button key={g.id} onClick={() => setActiveGame(g.id)}
            style={{padding:'10px 18px',borderRadius:'10px',border:'2px solid',fontWeight:700,fontSize:'13px',cursor:'pointer',
              borderColor: activeGame===g.id ? g.color : '#ddd',
              background: activeGame===g.id ? g.light : 'white',
              color: activeGame===g.id ? g.textColor : 'var(--text-muted)'}}>
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      {msg.text && (
        <div style={{fontSize:'13px',fontWeight:700,marginBottom:'16px',padding:'12px 16px',borderRadius:'8px',
          background: msg.ok ? 'var(--teal-light)' : 'var(--coral-light)',
          color: msg.ok ? 'var(--teal)' : 'var(--coral)',
          border: `1px solid ${msg.ok ? 'var(--teal)' : 'var(--coral)'}`}}>
          {msg.text}
        </div>
      )}

      {/* QUIZ */}
      {activeGame === 'quiz' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
          <div className="card">
            <div className="card-title">Add Quiz Question</div>
            <div className="form-group">
              <label>Question</label>
              <textarea value={quizForm.q} placeholder="Enter question..."
                onChange={e => setQuizForm(p=>({...p,q:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'70px'}} />
            </div>
            {quizForm.opts.map((opt,i) => (
              <div className="form-group" key={i}>
                <label style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <input type="radio" name="qcorrect" checked={quizForm.c===i} onChange={() => setQuizForm(p=>({...p,c:i}))} />
                  Option {i+1} {quizForm.c===i && <span style={{color:'var(--teal)',fontSize:'11px'}}>(correct)</span>}
                </label>
                <input type="text" placeholder={`Option ${i+1}`} value={opt}
                  onChange={e => { const o=[...quizForm.opts]; o[i]=e.target.value; setQuizForm(p=>({...p,opts:o})); }} />
              </div>
            ))}
            <div className="form-group">
              <label>Explanation</label>
              <textarea value={quizForm.exp} placeholder="Explain the correct answer..."
                onChange={e => setQuizForm(p=>({...p,exp:e.target.value}))}
                style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'60px'}} />
            </div>
            <button className="btn btn-primary" onClick={saveQuiz} style={{width:'100%'}}>Add Question →</button>
          </div>
          <div className="card" style={{overflowY:'auto',maxHeight:'600px'}}>
            <div className="card-title">Custom Questions ({customQuiz.length})</div>
            {customQuiz.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>None yet.</p> :
              customQuiz.map((q,i) => (
                <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
                    <div style={{fontWeight:700,fontSize:'13px',flex:1,marginRight:'8px'}}>{q.q}</div>
                    <button onClick={() => handleDeleteQuiz(q.id)}
                      style={{background:'var(--coral-light)',border:'none',color:'var(--coral)',borderRadius:'8px',padding:'3px 8px',fontWeight:700,fontSize:'11px',cursor:'pointer',flexShrink:0}}>
                      🗑
                    </button>
                  </div>
                  {(q.opts||[]).map((o,j) => (
                    <div key={j} style={{fontSize:'12px',color:j===q.c?'var(--teal)':'var(--text-muted)',fontWeight:j===q.c?700:400}}>
                      {j===q.c?'✓ ':'○ '}{o}
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* PEARLS */}
      {activeGame === 'pearls' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div className="card">
          <div className="card-title">Add Diagnostic Pearl</div>
          <div className="form-group"><label>Clue</label>
            <textarea value={pearlForm.clue} placeholder="Write the clue/riddle..." onChange={e=>setPearlForm(p=>({...p,clue:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'80px'}} /></div>
          <div className="form-group"><label>Answer</label>
            <input type="text" value={pearlForm.answer} placeholder="Correct answer" onChange={e=>setPearlForm(p=>({...p,answer:e.target.value}))} /></div>
          {pearlForm.options.map((opt,i) => (
            <div className="form-group" key={i}>
              <label style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <input type="radio" name="pcorrect" checked={pearlForm.correct===i} onChange={()=>setPearlForm(p=>({...p,correct:i}))} />
                Option {i+1} {pearlForm.correct===i && <span style={{color:'var(--teal)',fontSize:'11px'}}>(correct)</span>}
              </label>
              <input type="text" placeholder={`Option ${i+1}`} value={opt}
                onChange={e=>{const o=[...pearlForm.options];o[i]=e.target.value;setPearlForm(p=>({...p,options:o}));}} />
            </div>
          ))}
          <div className="form-group"><label>Detail</label>
            <textarea value={pearlForm.detail} placeholder="Clinical detail..." onChange={e=>setPearlForm(p=>({...p,detail:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'60px'}} /></div>
          <div className="form-group"><label>Approach / Thinking tip</label>
            <textarea value={pearlForm.approach} placeholder="How to think about this..." onChange={e=>setPearlForm(p=>({...p,approach:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'60px'}} /></div>
          <button className="btn btn-primary" onClick={savePearl} style={{width:'100%'}}>Add Pearl →</button>
        </div>
        <div className="card" style={{overflowY:'auto',maxHeight:'600px'}}>
          <div className="card-title">Custom Pearls ({customPearls.length})</div>
          {customPearls.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>None yet.</p> :
            customPearls.map((p,i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px'}}>
                  <div style={{fontWeight:700,fontSize:'13px',flex:1,marginRight:'8px'}}>{p.clue}</div>
                  <button onClick={() => handleDeletePearl(p.id)}
                    style={{background:'var(--coral-light)',border:'none',color:'var(--coral)',borderRadius:'8px',padding:'3px 8px',fontWeight:700,fontSize:'11px',cursor:'pointer',flexShrink:0}}>🗑</button>
                </div>
                <div style={{fontSize:'12px',color:'var(--purple)',fontWeight:600}}>✓ {p.answer}</div>
              </div>
            ))
          }
        </div>
        </div>
      )}

      {/* TRIGGER */}
      {activeGame === 'trigger' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div className="card">
          <div className="card-title">Add Decision Trigger Scenario</div>
          <div className="form-group"><label>Scenario</label>
            <textarea value={triggerForm.scenario} placeholder="Describe the clinical scenario..."
              onChange={e=>setTriggerForm(p=>({...p,scenario:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'100px'}} /></div>
          {['IF — Clinical problem','BECAUSE — Mechanism/cause','THEN — Intervention','MONITOR — Follow-up'].map((label,i) => (
            <div className="form-group" key={i}>
              <label>{label}</label>
              <textarea value={triggerForm.answers[i]} placeholder={`Answer for ${label.split('—')[0].trim()}...`}
                onChange={e=>{const a=[...triggerForm.answers];a[i]=e.target.value;setTriggerForm(p=>({...p,answers:a}));}}
                style={{width:'100%',padding:'10px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'13px',resize:'vertical',minHeight:'60px'}} />
            </div>
          ))}
          <button className="btn btn-primary" onClick={saveTrigger} style={{width:'100%'}}>Add Scenario →</button>
        </div>
        <div className="card" style={{overflowY:'auto',maxHeight:'600px'}}>
          <div className="card-title">Custom Triggers ({customTriggers.length})</div>
          {customTriggers.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>None yet.</p> :
            customTriggers.map((t,i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div style={{fontWeight:700,fontSize:'13px',flex:1,marginRight:'8px'}}>{t.scenario}</div>
                  <button onClick={() => handleDeleteTrigger(t.id)}
                    style={{background:'var(--coral-light)',border:'none',color:'var(--coral)',borderRadius:'8px',padding:'3px 8px',fontWeight:700,fontSize:'11px',cursor:'pointer',flexShrink:0}}>🗑</button>
                </div>
              </div>
            ))
          }
        </div>
        </div>
      )}

      {/* CONCEPT */}
      {activeGame === 'concept' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div className="card">
          <div className="card-title">Add Mini Concept</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <div className="form-group"><label>Icon</label>
              <input type="text" value={conceptForm.icon} onChange={e=>setConceptForm(p=>({...p,icon:e.target.value}))} style={{width:'80px'}} /></div>
            <div className="form-group"><label>Card Color</label>
              <input type="color" value={conceptForm.color} onChange={e=>setConceptForm(p=>({...p,color:e.target.value}))} style={{width:'60px',height:'38px',border:'none',cursor:'pointer'}} /></div>
          </div>
          <div className="form-group"><label>Title</label>
            <input type="text" value={conceptForm.title} placeholder="e.g. Glycemic Index" onChange={e=>setConceptForm(p=>({...p,title:e.target.value}))} /></div>
          <div className="form-group"><label>Hint (subtitle)</label>
            <input type="text" value={conceptForm.hint} placeholder="e.g. How fast carbs raise blood sugar" onChange={e=>setConceptForm(p=>({...p,hint:e.target.value}))} /></div>
          <div className="form-group"><label>Tags (comma separated)</label>
            <input type="text" value={conceptForm.tags} placeholder="T2DM, Carbs" onChange={e=>setConceptForm(p=>({...p,tags:e.target.value}))} /></div>
          <div className="form-group"><label>Body</label>
            <textarea value={conceptForm.body} placeholder="Full concept explanation..."
              onChange={e=>setConceptForm(p=>({...p,body:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'100px'}} /></div>
          <button className="btn btn-primary" onClick={saveConcept} style={{width:'100%'}}>Add Concept →</button>
        </div>
        <div className="card" style={{overflowY:'auto',maxHeight:'600px'}}>
          <div className="card-title">Custom Concepts ({customConcepts.length})</div>
          {customConcepts.length === 0 ? <p style={{fontSize:'13px',color:'var(--text-muted)'}}>None yet.</p> :
            customConcepts.map((c,i) => (
              <div key={i} style={{padding:'12px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div style={{fontWeight:700,fontSize:'13px',flex:1,marginRight:'8px'}}>{c.icon} {c.title}</div>
                  <button onClick={() => handleDeleteConcept(c.id)}
                    style={{background:'var(--coral-light)',border:'none',color:'var(--coral)',borderRadius:'8px',padding:'3px 8px',fontWeight:700,fontSize:'11px',cursor:'pointer',flexShrink:0}}>🗑</button>
                </div>
                <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'3px'}}>{c.hint}</div>
              </div>
            ))
          }
        </div>
        </div>
      )}
    </div>
  );
};

export default AdminGames;
