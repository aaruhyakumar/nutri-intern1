import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_QS } from '../../data/cases';
import { useAuth } from '../../context/AuthContext';
import { saveGameScore, getCustomQuiz, supabase } from '../../supabaseClient';

const QuickQuiz = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState(QUIZ_QS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [streak, setStreak] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const loadAndSubscribe = async () => {
      try {
        const custom = await getCustomQuiz();
        if (custom?.length) setQuestions([...QUIZ_QS, ...custom]);
      } catch (err) {
        console.error('Error loading custom quiz:', err);
      }
    };
    loadAndSubscribe();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('custom_quiz_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_quiz' }, payload => {
        loadAndSubscribe();
      })
      .subscribe((status, err) => {
        if (err) console.error('Subscription error:', err);
      });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isFinished && !answered && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(null);
    }
    return () => clearInterval(timerRef.current);
  }, [timeLeft, answered, isFinished]);

  const handleAnswer = (idx) => {
    clearInterval(timerRef.current);
    setAnswered(true);
    setSelectedOpt(idx);
    if (idx === questions[currentIdx].c) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setAnswered(false);
      setSelectedOpt(null);
      setTimeLeft(15);
    } else {
      setIsFinished(true);
      if (user) saveGameScore(user.id, 'quiz', score + (selectedOpt === questions[currentIdx].c ? 1 : 0), questions.length);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-result-card">
        <div className="quiz-result-score" style={{color: score > 7 ? 'var(--teal)' : 'var(--amber)'}}>
          {score} / {questions.length}
        </div>
        <div className="quiz-result-label">Questions Correct</div>
        <div className="quiz-result-msg">
          {score >= 8 ? "Excellent! You're ward-ready. 🏆" : score >= 5 ? "Good effort! Keep reviewing. 📚" : "Keep practicing! Clinical dietetics is a journey. 💪"}
        </div>
        <button className="btn btn-primary" onClick={() => {
          setCurrentIdx(0); setScore(0); setIsFinished(false);
          setAnswered(false); setTimeLeft(15); setStreak(0);
        }}>Play Again →</button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="quiz-wrap">
      <div className="quiz-header">
        <div style={{fontWeight:700,color:'var(--text-muted)'}}>Question {currentIdx + 1} of {questions.length}</div>
        <div className="quiz-streak">🔥 Streak: {streak}</div>
      </div>

      <div className="quiz-timer">
        <div className="timer-bar">
          <div className="timer-fill" style={{width: `${(timeLeft / 15) * 100}%`, background: timeLeft < 5 ? 'var(--coral)' : 'var(--teal)'}}></div>
        </div>
        <div style={{fontWeight:700,fontSize:'14px',width:'30px'}}>{timeLeft}s</div>
      </div>

      <div className="quiz-q">{q.q}</div>

      <div className="quiz-options">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            className={`quiz-opt ${answered ? (i === q.c ? 'qcorrect' : (i === selectedOpt ? 'qwrong' : '')) : ''}`}
            onClick={() => handleAnswer(i)}
            disabled={answered}
          >
            <div className="quiz-opt-letter">{String.fromCharCode(65 + i)}</div>
            {opt}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`quiz-feedback-bar show ${selectedOpt === q.c ? 'qfb-correct' : 'qfb-wrong'}`}>
          {selectedOpt === q.c ? "Correct! " : "Incorrect. "} {q.exp}
        </div>
      )}

      {answered && (
        <button className="btn btn-primary" style={{width:'100%'}} onClick={nextQuestion}>
          {currentIdx === questions.length - 1 ? 'Show Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  );
};

export default QuickQuiz;
