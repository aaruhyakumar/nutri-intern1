import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CASES } from '../data/cases';
import { saveCaseAttempt } from '../supabaseClient';

const CaseStudies = () => {
  const { user } = useAuth();
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const currentCase = selectedCaseIdx !== null ? CASES[selectedCaseIdx] : null;

  const handleSelectCase = (idx) => {
    setSelectedCaseIdx(idx);
    setCurrentStep(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowSummary(false);
  };

  const handleAnswer = (idx) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(idx);
    if (idx === currentCase.steps[currentStep].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < currentCase.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowSummary(true);
      if (user) {
        saveCaseAttempt(user.id, selectedCaseIdx, currentCase.name, score + (selectedOption === currentCase.steps[currentStep].correct ? 1 : 0), currentCase.steps.length);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsAnswered(true); // Assuming they already answered previous steps
      setSelectedOption(null); // We don't track historical options in this simple version
    }
  };

  if (selectedCaseIdx === null) {
    return (
      <div className="cases-content">
        <div className="page-header">
          <h1>Case Studies 📋</h1>
          <p>Work through real clinical nutrition cases using the 10-step framework</p>
        </div>
        <div className="case-selector">
          {CASES.map((c, i) => (
            <div className="case-card" key={i} onClick={() => handleSelectCase(i)}>
              <span className={`case-tag badge-${c.color === '#EF9F27' ? 'amber' : c.color === '#378ADD' ? 'blue' : 'green'}`}>
                {c.tags[0]}
              </span>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <div className="game-meta">
                <span className="case-difficulty" style={{color: 'var(--teal)'}}>● Moderate</span>
                <span style={{fontSize:'11px',color:'var(--text-muted)'}}>{c.steps.length} steps</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="cases-content">
        <div className="summary-card show">
          <h2>🎉 Case Complete!</h2>
          <p style={{color:'var(--text-muted)',marginBottom:'16px'}}>Here's what you should remember:</p>
          <div style={{display:'flex',alignItems:'baseline',gap:'8px',marginBottom:'4px'}}>
            <div className="summary-score">{score}/{currentCase.steps.length}</div>
            <span style={{color:'var(--text-muted)',fontSize:'14px'}}>correct answers</span>
          </div>
          <div className="summary-steps">
            {currentCase.steps.map((step, i) => (
              <div className="summary-step" key={i}>
                <div className="ss-num">{i + 1}</div>
                <div className="ss-content">
                  <p>{step.label}</p>
                  <span>{step.explanation.substring(0, 100)}...</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{marginTop:'20px',width:'100%'}} onClick={() => setSelectedCaseIdx(null)}>
            Try Another Case →
          </button>
        </div>
      </div>
    );
  }

  const step = currentCase.steps[currentStep];

  return (
    <div className="cases-content">
      <div className="patient-banner">
        <div className="patient-img">{currentCase.emoji}</div>
        <div className="patient-info">
          <h2>{currentCase.name}</h2>
          <div>{currentCase.desc}</div>
          <div className="patient-tags">
            {currentCase.tags.map((t, i) => <span className="ptag" key={i}>{t}</span>)}
          </div>
        </div>
      </div>

      <div className="steps-progress">
        {currentCase.steps.map((_, i) => (
          <div key={i} className={`step-dot ${i < currentStep ? 'done' : i === currentStep ? 'current' : ''}`}></div>
        ))}
      </div>

      <div className="flashcard">
        <div className="fc-step">
          <div className="fc-step-num" style={{background: currentCase.color + '20', color: currentCase.color}}>{currentStep + 1}</div>
          <div className="fc-step-label">{step.label}</div>
        </div>
        <div className="fc-question">{step.question}</div>
        <div className="fc-options">
          {step.options.map((opt, i) => (
            <button 
              key={i} 
              className={`fc-option ${isAnswered ? (i === step.correct ? 'correct' : (i === selectedOption ? 'wrong' : '')) : ''}`}
              onClick={() => handleAnswer(i)}
              disabled={isAnswered}
            >
              {opt}
            </button>
          ))}
        </div>
        {isAnswered && <div className="fc-explanation show">{step.explanation}</div>}
      </div>

      <div className="fc-nav">
        <button className="btn btn-secondary" onClick={handlePrev} disabled={currentStep === 0}>← Back</button>
        <button className="btn btn-secondary" onClick={() => setSelectedCaseIdx(null)}>Exit Case</button>
        <button className="btn btn-primary" onClick={handleNext} disabled={!isAnswered}>
          {currentStep === currentCase.steps.length - 1 ? 'Finish Case →' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
};

export default CaseStudies;
