import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LE_CASES } from '../data/le_cases';
import { saveLESession } from '../supabaseClient';

const LearningEngine = () => {
  const { user } = useAuth();
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showExpertAnswer, setShowExpertAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentCase = LE_CASES.find(c => c.id === selectedCaseId);

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer, caseData: currentCase })
      });
      
      const result = await response.json();
      setFeedback(result);
      
      if (user) {
        saveLESession(user.id, selectedCaseId, currentCase.title, userAnswer, result, hintsUsed);
      }
    } catch (err) {
      console.error('Evaluation error:', err);
      // Fallback evaluation would go here if needed
      alert("Error connecting to AI Tutor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (user) {
      saveLESession(user.id, selectedCaseId, currentCase.title, userAnswer, null, hintsUsed, true);
    }
    setSelectedCaseId(null);
    setUserAnswer('');
    setFeedback(null);
    setHintsUsed(0);
    setShowExpertAnswer(false);
  };

  if (!selectedCaseId) {
    return (
      <div className="le-content">
        <div className="page-header">
          <h1>Learning Engine 🧠</h1>
          <p>AI-powered case evaluation with expert tutor feedback</p>
        </div>
        <div className="le-cases-grid">
          {LE_CASES.map((c) => (
            <div className="le-case-card" key={c.id} onClick={() => setSelectedCaseId(c.id)} style={{borderTopColor: c.color}}>
              <div className="le-card-header">
                <div className="le-emoji">{c.emoji}</div>
                <div className={`le-diff-badge diff-${c.difficulty.toLowerCase()}`}>{c.difficulty}</div>
              </div>
              <h3>{c.title}</h3>
              <p>{c.scenario.substring(0, 100)}...</p>
              <div className="le-card-meta">
                <span className="le-meta-pill">⏱️ {c.timeEstimate}</span>
                <span className="le-meta-pill">📂 {c.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="le-content">
      <div className="le-workspace show">
        <div className="le-scenario-card">
          <div className="le-scenario-header">
            <div className="le-scenario-emoji" style={{background: currentCase.color + '20'}}>{currentCase.emoji}</div>
            <div>
              <div className="le-scenario-title">{currentCase.title}</div>
              <div className="le-scenario-meta">
                <span className={`le-diff-badge diff-${currentCase.difficulty.toLowerCase()}`}>{currentCase.difficulty}</span>
                <span className="le-meta-pill">Category: {currentCase.category}</span>
              </div>
            </div>
          </div>
          <div className="le-scenario-body">{currentCase.scenario}</div>
          <div className="le-objective">🎯 <strong>Objective:</strong> {currentCase.objective}</div>
        </div>

        {!feedback && !loading && (
          <div className="le-answer-panel">
            <div className="le-answer-label">📝 Your Answer</div>
            <textarea 
              className="le-answer-textarea" 
              placeholder="Write your clinical reasoning here. Explain the root cause, mechanism, and your recommended intervention..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            ></textarea>
            
            {showHint && (
              <div className="le-hint-box show">
                <div className="le-hint-level">Hint {hintsUsed + 1}</div>
                <div>{currentCase.hints[hintsUsed]}</div>
              </div>
            )}

            <div className="le-answer-actions">
              <button className="btn-hint" onClick={() => { 
                setShowHint(true); 
                if (!showHint && hintsUsed < 2) setHintsUsed(prev => prev + 1); 
              }}>💡 Hint</button>
              <button className="btn btn-secondary" onClick={() => setSelectedCaseId(null)}>← Back</button>
              <button className="btn btn-secondary" onClick={handleSkip}>Skip →</button>
              <span className="le-char-count">{userAnswer.trim().split(/\s+/).filter(x => x).length} words</span>
              <button className="btn-submit-answer" disabled={!userAnswer.trim()} onClick={handleSubmit}>Evaluate My Answer →</button>
            </div>
          </div>
        )}

        {loading && (
          <div className="le-loading show">
            <div className="le-spinner"></div>
            <div style={{fontFamily:'Poppins',fontWeight:600,color:'var(--teal)'}}>AI Tutor is evaluating your answer...</div>
          </div>
        )}

        {feedback && (
          <div className="le-feedback-panel show">
            <div className={`le-tier-banner tier-${feedback.tier}`}>
              <div className="tier-icon">{feedback.tier === 'strong' ? '🏆' : feedback.tier === 'partial' ? '⚖️' : '🎯'}</div>
              <div>
                <div className="le-tier-title">{feedback.tier.toUpperCase()} Reasoning</div>
                <div className="le-tier-subtitle">{feedback.strengthSummary}</div>
              </div>
              <div className="le-total-score" style={{marginLeft:'auto'}}>
                <div className="le-total-num">{feedback.totalScore}</div>
                <div className="le-total-label">/100</div>
              </div>
            </div>

            <div className="le-score-grid">
              {Object.entries(feedback.scores).map(([key, val]) => (
                <div className="le-score-item" key={key}>
                  <div className="le-score-val">{val}</div>
                  <div className="le-score-lbl">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>

            <div className="le-fb-section">
              <div className="le-fb-section-title">✅ Concepts You Identified</div>
              <div className="le-concepts-row">
                {feedback.correctConcepts.map((c, i) => <span key={i} className="le-concept-tag tag-correct">{c}</span>)}
              </div>
            </div>

            <div className="le-fb-section">
              <div className="le-fb-section-title">🔍 Missing Concepts</div>
              <div className="le-concepts-row">
                {feedback.missingConcepts.map((c, i) => <span key={i} className="le-concept-tag tag-missing">{c}</span>)}
              </div>
            </div>

            <div className="le-fb-section">
              <div className="le-fb-section-title">💬 Tutor Feedback</div>
              <div className="le-fb-box fb-box-green">{feedback.feedbackMessage}</div>
            </div>

            {feedback.correctionGuidance && (
              <div className="le-fb-section">
                <div className="le-fb-section-title">🔧 What Was Incomplete</div>
                <div className="le-fb-box fb-box-amber">{feedback.correctionGuidance}</div>
              </div>
            )}

            <div className="le-fb-section">
              <div className="le-fb-section-title">➡️ Next Thinking Direction</div>
              <div className="le-fb-box fb-box-blue">{feedback.nextThinkingDirection}</div>
            </div>

            <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
              <button className="btn btn-secondary" onClick={() => { setFeedback(null); setShowExpertAnswer(false); }}>↩ Try Again</button>
              <button className="btn btn-primary" onClick={() => setShowExpertAnswer(!showExpertAnswer)}>
                {showExpertAnswer ? 'Hide' : 'Show'} Expert Answer →
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedCaseId(null)}>Finish Session</button>
            </div>

            {showExpertAnswer && (
              <div className="le-expert-section show" style={{marginTop:'20px'}}>
                <div className="le-fb-section-title">Expert Reasoning</div>
                <div className="le-expert-answer">{currentCase.expertAnswer}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningEngine;
