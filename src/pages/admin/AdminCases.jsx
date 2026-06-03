import React, { useState, useEffect } from 'react';
import { saveCustomCase, getCustomCases, deleteCustomCase } from '../../supabaseClient';

const emptyStep = () => ({
  label: '',
  question: '',
  answerType: 'short',
  primaryKeywords: [],
  secondaryKeywords: [],
  semanticVariations: {},
  hints: [],
  sampleAnswers: [],
  feedback: { strong: '', correct: '', partial: '', incomplete: '' }
});

const AdminCases = () => {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({ name: '', emoji: '👤', description: '', tags: '', difficulty: 'Moderate', color: '#1D9E75' });
  const [steps, setSteps] = useState([emptyStep()]);
  const [editingStepIdx, setEditingStepIdx] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getCustomCases().then(setCases);
  }, []);

  const updateStep = (i, field, val) => {
    const s = [...steps];
    s[i] = { ...s[i], [field]: val };
    setSteps(s);
  };

  const addPrimaryKeyword = (stepIdx) => {
    const s = [...steps];
    s[stepIdx].primaryKeywords.push({ word: '', weight: 2 });
    setSteps(s);
  };

  const updatePrimaryKeyword = (stepIdx, kwIdx, field, val) => {
    const s = [...steps];
    s[stepIdx].primaryKeywords[kwIdx] = { ...s[stepIdx].primaryKeywords[kwIdx], [field]: val };
    setSteps(s);
  };

  const removePrimaryKeyword = (stepIdx, kwIdx) => {
    const s = [...steps];
    s[stepIdx].primaryKeywords.splice(kwIdx, 1);
    setSteps(s);
  };

  const addSecondaryKeyword = (stepIdx) => {
    const s = [...steps];
    s[stepIdx].secondaryKeywords.push({ word: '', weight: 1 });
    setSteps(s);
  };

  const updateSecondaryKeyword = (stepIdx, kwIdx, field, val) => {
    const s = [...steps];
    s[stepIdx].secondaryKeywords[kwIdx] = { ...s[stepIdx].secondaryKeywords[kwIdx], [field]: val };
    setSteps(s);
  };

  const removeSecondaryKeyword = (stepIdx, kwIdx) => {
    const s = [...steps];
    s[stepIdx].secondaryKeywords.splice(kwIdx, 1);
    setSteps(s);
  };

  const addHint = (stepIdx) => {
    const s = [...steps];
    s[stepIdx].hints.push('');
    setSteps(s);
  };

  const updateHint = (stepIdx, hintIdx, val) => {
    const s = [...steps];
    s[stepIdx].hints[hintIdx] = val;
    setSteps(s);
  };

  const removeHint = (stepIdx, hintIdx) => {
    const s = [...steps];
    s[stepIdx].hints.splice(hintIdx, 1);
    setSteps(s);
  };

  const addSampleAnswer = (stepIdx, tier) => {
    const s = [...steps];
    s[stepIdx].sampleAnswers.push({ text: '', tier });
    setSteps(s);
  };

  const updateSampleAnswer = (stepIdx, ansIdx, field, val) => {
    const s = [...steps];
    s[stepIdx].sampleAnswers[ansIdx] = { ...s[stepIdx].sampleAnswers[ansIdx], [field]: val };
    setSteps(s);
  };

  const removeSampleAnswer = (stepIdx, ansIdx) => {
    const s = [...steps];
    s[stepIdx].sampleAnswers.splice(ansIdx, 1);
    setSteps(s);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case?')) return;
    await deleteCustomCase(id);
    getCustomCases().then(setCases);
  };

  const handleSave = async () => {
    if (!form.name || !form.description) {
      setMsg('❌ Case name and description are required.');
      setTimeout(() => setMsg(''), 3000);
      return;
    }

    const caseData = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      steps: steps.filter(s => s.label && s.question)
    };

    const err = await saveCustomCase(caseData);
    if (!err) {
      setMsg('✅ Case created successfully!');
      setForm({ name: '', emoji: '👤', description: '', tags: '', difficulty: 'Moderate', color: '#1D9E75' });
      setSteps([emptyStep()]);
      setEditingStepIdx(null);
      getCustomCases().then(setCases);
    } else {
      setMsg('❌ Failed to create case.');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Create New Clinical Case 📋</h1>
        <p>Build keyword-based learning cases with professional feedback</p>
      </div>

      {msg && (
        <div style={{padding:'12px 16px',background:msg.includes('✅')?'#f0fdf8':'#fff5f3',border:`1px solid ${msg.includes('✅')?'var(--teal)':'var(--coral)'}`,borderRadius:'10px',marginBottom:'20px',color:msg.includes('✅')?'var(--teal)':'var(--coral)',fontWeight:600}}>
          {msg}
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>
        {/* Case Basics */}
        <div className="card">
          <div className="card-title">Case Details</div>
          <div className="form-group">
            <label>Patient Name & Age</label>
            <input type="text" placeholder="e.g., Arun, 45M" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <div className="form-group">
              <label>Emoji</label>
              <input type="text" value={form.emoji} onChange={e => setForm(p=>({...p,emoji:e.target.value}))} style={{width:'100%'}} maxLength={2} />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input type="color" value={form.color} onChange={e => setForm(p=>({...p,color:e.target.value}))} style={{width:'100%',height:'38px',border:'none',cursor:'pointer'}} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} placeholder="Brief clinical presentation..."
              onChange={e => setForm(p=>({...p,description:e.target.value}))}
              style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'80px'}} />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" placeholder="T2DM, Insulin, Hypoglycemia" value={form.tags} onChange={e => setForm(p=>({...p,tags:e.target.value}))} />
          </div>
          <div className="form-group">
            <label>Difficulty</label>
            <select value={form.difficulty} onChange={e => setForm(p=>({...p,difficulty:e.target.value}))} style={{width:'100%',padding:'10px 12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px'}}>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Steps Summary */}
        <div className="card">
          <div className="card-title">Case Steps ({steps.length})</div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',maxHeight:'400px',overflowY:'auto'}}>
            {steps.map((step, i) => (
              <div key={i} 
                onClick={() => setEditingStepIdx(editingStepIdx === i ? null : i)}
                style={{padding:'10px 12px',background:editingStepIdx===i?form.color+'18':'#f9f9f9',border:`1px solid ${editingStepIdx===i?form.color:'#e8e8e8'}`,borderRadius:'8px',cursor:'pointer',transition:'all 0.2s'}}>
                <div style={{fontWeight:700,fontSize:'12px',color:form.color}}>Step {i+1}</div>
                <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'3px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  {step.label || '(Untitled)'}
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary" onClick={() => setSteps([...steps, emptyStep()])} style={{marginTop:'12px',width:'100%'}}>
            + Add Step
          </button>
        </div>
      </div>

      {/* Step Editor */}
      {editingStepIdx !== null && (
        <div className="card" style={{borderTop:`3px solid ${form.color}`}}>
          <div className="card-title">Step {editingStepIdx + 1} Editor</div>

          <div className="form-group">
            <label>Step Label</label>
            <input type="text" placeholder="e.g., Patient Snapshot" value={steps[editingStepIdx].label} onChange={e => updateStep(editingStepIdx, 'label', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Question</label>
            <textarea value={steps[editingStepIdx].question} placeholder="What should the intern answer?" onChange={e => updateStep(editingStepIdx, 'question', e.target.value)} style={{width:'100%',padding:'12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px',resize:'vertical',minHeight:'60px'}} />
          </div>

          <div className="form-group">
            <label>Answer Type</label>
            <select value={steps[editingStepIdx].answerType} onChange={e => updateStep(editingStepIdx, 'answerType', e.target.value)} style={{width:'100%',padding:'10px 12px',border:'2px solid #e8e8e8',borderRadius:'10px',fontFamily:'Nunito',fontSize:'14px'}}>
              <option value="short">Short (1-2 sentences)</option>
              <option value="long">Long (detailed paragraph)</option>
            </select>
          </div>

          {/* Primary Keywords */}
          <div style={{marginTop:'20px',borderTop:'1px solid #e8e8e8',paddingTop:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:800,color:'var(--teal)',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>🔴 Primary Keywords (Critical)</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'12px'}}>
              {steps[editingStepIdx].primaryKeywords.map((kw, kwIdx) => (
                <div key={kwIdx} style={{display:'grid',gridTemplateColumns:'1fr 100px auto',gap:'10px',alignItems:'start',padding:'10px',background:'#f9f9f9',borderRadius:'8px'}}>
                  <input type="text" placeholder="Keyword..." value={kw.word} onChange={e => updatePrimaryKeyword(editingStepIdx, kwIdx, 'word', e.target.value)} style={{padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px'}} />
                  <select value={kw.weight} onChange={e => updatePrimaryKeyword(editingStepIdx, kwIdx, 'weight', parseInt(e.target.value))} style={{padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px'}}>
                    <option value={1}>Weight: 1</option>
                    <option value={2}>Weight: 2</option>
                    <option value={3}>Weight: 3</option>
                  </select>
                  <button onClick={() => removePrimaryKeyword(editingStepIdx, kwIdx)} style={{padding:'6px 10px',background:'var(--coral)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600}}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addPrimaryKeyword(editingStepIdx)} style={{padding:'8px 12px',background:'var(--teal)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600}}>+ Add Primary Keyword</button>
          </div>

          {/* Secondary Keywords */}
          <div style={{marginTop:'20px',borderTop:'1px solid #e8e8e8',paddingTop:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:800,color:'var(--blue)',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>🟡 Secondary Keywords (Supporting)</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'12px'}}>
              {steps[editingStepIdx].secondaryKeywords.map((kw, kwIdx) => (
                <div key={kwIdx} style={{display:'grid',gridTemplateColumns:'1fr 100px auto',gap:'10px',alignItems:'start',padding:'10px',background:'#f9f9f9',borderRadius:'8px'}}>
                  <input type="text" placeholder="Keyword..." value={kw.word} onChange={e => updateSecondaryKeyword(editingStepIdx, kwIdx, 'word', e.target.value)} style={{padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px'}} />
                  <select value={kw.weight} onChange={e => updateSecondaryKeyword(editingStepIdx, kwIdx, 'weight', parseInt(e.target.value))} style={{padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px'}}>
                    <option value={1}>Weight: 1</option>
                    <option value={2}>Weight: 2</option>
                  </select>
                  <button onClick={() => removeSecondaryKeyword(editingStepIdx, kwIdx)} style={{padding:'6px 10px',background:'var(--coral)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600}}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addSecondaryKeyword(editingStepIdx)} style={{padding:'8px 12px',background:'var(--blue)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600}}>+ Add Secondary Keyword</button>
          </div>

          {/* Hints */}
          <div style={{marginTop:'20px',borderTop:'1px solid #e8e8e8',paddingTop:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:800,color:'var(--text)',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>💡 Case-Related Hints (3-5)</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'12px'}}>
              {steps[editingStepIdx].hints.map((hint, hintIdx) => (
                <div key={hintIdx} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'10px',alignItems:'start'}}>
                  <textarea value={hint} placeholder={`Hint ${hintIdx+1}...`} onChange={e => updateHint(editingStepIdx, hintIdx, e.target.value)} style={{padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px',resize:'vertical',minHeight:'50px'}} />
                  <button onClick={() => removeHint(editingStepIdx, hintIdx)} style={{padding:'6px 10px',background:'var(--coral)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600,height:'fit-content'}}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addHint(editingStepIdx)} style={{padding:'8px 12px',background:'var(--text)',color:'white',border:'none',borderRadius:'6px',fontSize:'12px',cursor:'pointer',fontWeight:600}}>+ Add Hint</button>
          </div>

          {/* Feedback */}
          <div style={{marginTop:'20px',borderTop:'1px solid #e8e8e8',paddingTop:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:800,color:'var(--text)',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>📝 Professional Feedback (by tier)</div>
            {['strong', 'correct', 'partial', 'incomplete'].map((tier, i) => (
              <div key={i} style={{marginBottom:'12px'}}>
                <label style={{fontSize:'12px',fontWeight:700,color:tier==='strong'?'var(--teal)':tier==='correct'?'var(--blue)':tier==='partial'?'var(--amber)':'var(--coral)',marginBottom:'6px',display:'block'}}>
                  {tier === 'strong' ? '🏆 Strong' : tier === 'correct' ? '✅ Correct' : tier === 'partial' ? '📋 Partial' : '❌ Incomplete'}
                </label>
                <textarea value={steps[editingStepIdx].feedback[tier]} placeholder={`Feedback for ${tier} answers...`} onChange={e => {
                  const s = [...steps];
                  s[editingStepIdx].feedback[tier] = e.target.value;
                  setSteps(s);
                }} style={{width:'100%',padding:'10px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'13px',resize:'vertical',minHeight:'70px'}} />
              </div>
            ))}
          </div>

          {/* Sample Answers */}
          <div style={{marginTop:'20px',borderTop:'1px solid #e8e8e8',paddingTop:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:800,color:'var(--text)',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.5px'}}>✏️ Sample Answers (Reference)</div>
            {steps[editingStepIdx].sampleAnswers.map((ans, ansIdx) => (
              <div key={ansIdx} style={{marginBottom:'12px',padding:'12px',background:'#f9f9f9',borderRadius:'8px',borderLeft:`3px solid ${ans.tier==='strong'?'var(--teal)':ans.tier==='correct'?'var(--blue)':ans.tier==='partial'?'var(--amber)':'var(--coral)'}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontSize:'11px',fontWeight:700,textTransform:'uppercase',color:ans.tier==='strong'?'var(--teal)':ans.tier==='correct'?'var(--blue)':ans.tier==='partial'?'var(--amber)':'var(--coral)'}}>Tier: {ans.tier}</span>
                  <button onClick={() => removeSampleAnswer(editingStepIdx, ansIdx)} style={{padding:'4px 8px',background:'var(--coral)',color:'white',border:'none',borderRadius:'4px',fontSize:'11px',cursor:'pointer',fontWeight:600}}>✕</button>
                </div>
                <textarea value={ans.text} placeholder="Sample answer text..." onChange={e => updateSampleAnswer(editingStepIdx, ansIdx, 'text', e.target.value)} style={{width:'100%',padding:'8px',border:'1px solid #e8e8e8',borderRadius:'6px',fontFamily:'Nunito',fontSize:'12px',resize:'vertical',minHeight:'60px'}} />
              </div>
            ))}
            <div style={{display:'flex',gap:'6px'}}>
              {['strong', 'correct', 'partial', 'incomplete'].map(tier => (
                <button key={tier} onClick={() => addSampleAnswer(editingStepIdx, tier)} style={{flex:1,padding:'8px',background:tier==='strong'?'var(--teal)':tier==='correct'?'var(--blue)':tier==='partial'?'var(--amber)':'var(--coral)',color:'white',border:'none',borderRadius:'6px',fontSize:'11px',cursor:'pointer',fontWeight:600,textTransform:'capitalize'}}>
                  + {tier}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { const s = [...steps]; s.splice(editingStepIdx, 1); setSteps(s); setEditingStepIdx(null); }} style={{marginTop:'20px',padding:'10px 16px',background:'var(--coral)',color:'white',border:'none',borderRadius:'8px',fontWeight:600,cursor:'pointer'}}>
            Remove Step
          </button>
        </div>
      )}

      {/* Save Button */}
      <button className="btn btn-primary" onClick={handleSave} style={{marginTop:'20px',width:'100%',padding:'14px',fontSize:'15px',fontWeight:700}}>
        ✓ Create Case
      </button>

      {/* Existing Cases */}
      {cases.length > 0 && (
        <div style={{marginTop:'40px'}}>
          <h3 style={{fontSize:'16px',fontWeight:800,marginBottom:'16px'}}>Your Custom Cases ({cases.length})</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'16px'}}>
            {cases.map((c, i) => (
              <div key={i} className="card" style={{borderTop:`3px solid ${c.color||'#1D9E75'}`}}>
                <div style={{display:'flex',alignItems:'start',justifyContent:'space-between',marginBottom:'10px'}}>
                  <div style={{fontFamily:'Poppins',fontWeight:800,fontSize:'20px'}}>{c.emoji}</div>
                  <button onClick={() => handleDelete(c.id)} style={{padding:'4px 8px',background:'var(--coral)',color:'white',border:'none',borderRadius:'4px',fontSize:'11px',cursor:'pointer',fontWeight:600}}>Delete</button>
                </div>
                <h4 style={{fontSize:'14px',fontWeight:700,color:'var(--text)',margin:'0 0 6px'}}>{c.name}</h4>
                <p style={{fontSize:'12px',color:'var(--text-muted)',margin:'0 0 10px',lineHeight:1.5}}>{c.description}</p>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {(c.tags||[]).slice(0,3).map((t, j) => (
                    <span key={j} style={{fontSize:'11px',background:c.color+'20',color:c.color||'#1D9E75',padding:'2px 8px',borderRadius:'4px',fontWeight:600}}>{t}</span>
                  ))}
                </div>
                <div style={{fontSize:'11px',color:'var(--text-muted)',marginTop:'8px',fontWeight:600}}>📚 {c.steps?.length || 0} steps</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCases;
