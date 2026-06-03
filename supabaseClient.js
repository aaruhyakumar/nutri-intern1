import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://igyroanpanikfqtshxlk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gx9g2tsUh9Km7sK7DQYNNA__ipF3Htx';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// AUTH
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signOut = () => supabase.auth.signOut();

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// PROFILE
export const getProfile = async (userId) => {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
};

// PROGRESS
export const getProgress = async (userId) => {
  const { data } = await supabase.from('progress').select('*').eq('user_id', userId).single();
  return data;
};

const XP_VALUES = { case: 20, game: 10, le: 15 };
const LEVEL_THRESHOLD = 100;

const updateProgress = async (userId, type, extraData = {}) => {
  // fetch current progress
  const { data: prog } = await supabase.from('progress').select('*').eq('user_id', userId).single();

  if (!prog) return;

  const xpGain = XP_VALUES[type] || 0;
  const newXP = (prog.xp || 0) + xpGain;
  const newLevel = Math.floor(newXP / LEVEL_THRESHOLD) + 1;

  const updates = {
    xp: newXP,
    updated_at: new Date().toISOString(),
  };

  if (type === 'case') {
    updates.cases_completed = (prog.cases_completed || 0) + 1;
  } else if (type === 'game') {
    updates.games_played = (prog.games_played || 0) + 1;
    // update avg quiz score if it's a quiz
    if (extraData.game === 'quiz' && extraData.score != null && extraData.maxScore) {
      const pct = Math.round((extraData.score / extraData.maxScore) * 100);
      const prevAvg = prog.avg_quiz_score || 0;
      const prevCount = prog.games_played || 0;
      updates.avg_quiz_score = prevCount === 0 ? pct : Math.round((prevAvg * prevCount + pct) / (prevCount + 1));
    }
  } else if (type === 'le') {
    updates.le_attempts = (prog.le_attempts || 0) + 1;
  }

  await supabase.from('progress').update(updates).eq('user_id', userId);

  // update level in profiles too
  if (newLevel > (prog.level || 1)) {
    await supabase.from('profiles').update({ level: newLevel, xp: newXP }).eq('id', userId);
  } else {
    await supabase.from('profiles').update({ xp: newXP }).eq('id', userId);
  }
};

// GAME SCORES
export const saveGameScore = async (userId, game, score, maxScore) => {
  await supabase.from('game_scores').insert({ user_id: userId, game, score, max_score: maxScore });
  await updateProgress(userId, 'game', { game, score, maxScore });
};

export const getGameScores = async (userId) => {
  const { data } = await supabase.from('game_scores').select('*').eq('user_id', userId).order('played_at', { ascending: false });
  return data || [];
};

// CASE ATTEMPTS
export const saveCaseAttempt = async (userId, caseIndex, caseName, score, maxScore) => {
  await supabase.from('case_attempts').insert({ user_id: userId, case_index: caseIndex, case_name: caseName, score, max_score: maxScore });
  await updateProgress(userId, 'case');
};

export const getCaseAttempts = async (userId) => {
  const { data } = await supabase.from('case_attempts').select('*').eq('user_id', userId).order('completed_at', { ascending: false });
  return data || [];
};

// LEARNING ENGINE
export const saveLESession = async (userId, caseId, caseTitle, userAnswer, aiResult, hintsUsed, skipped = false) => {
  await supabase.from('le_sessions').insert({
    user_id: userId, case_id: caseId, case_title: caseTitle,
    user_answer: userAnswer, ai_tier: aiResult?.tier || null,
    ai_score: aiResult?.totalScore || null, ai_feedback: aiResult || null,
    hints_used: hintsUsed, skipped
  });
  await updateProgress(userId, 'le');
};

export const getLESessions = async (userId) => {
  const { data } = await supabase.from('le_sessions').select('*').eq('user_id', userId).order('submitted_at', { ascending: false });
  return data || [];
};

// ADMIN
export const getAdminOverview = async () => {
  const { data } = await supabase.from('admin_overview').select('*');
  return data || [];
};

export const getInternDetail = async (userId) => {
  const [cases, games, le] = await Promise.all([
    supabase.from('case_attempts').select('*').eq('user_id', userId).order('completed_at', { ascending: false }),
    supabase.from('game_scores').select('*').eq('user_id', userId).order('played_at', { ascending: false }),
    supabase.from('le_sessions').select('*').eq('user_id', userId).order('submitted_at', { ascending: false }),
  ]);
  return { cases: cases.data || [], games: games.data || [], le: le.data || [] };
};

export const saveAdminReview = async (adminId, internId, internName, reviewText, rating) => {
  const { error } = await supabase.from('admin_reviews').insert({
    admin_id: adminId, intern_id: internId, intern_name: internName,
    review: reviewText, rating
  });
  return error;
};

export const getAdminReviews = async (internId) => {
  const { data } = await supabase.from('admin_reviews').select('*')
    .eq('intern_id', internId).order('created_at', { ascending: false });
  return data || [];
};

export const saveCustomCase = async (caseData) => {
  const { error } = await supabase.from('custom_cases').insert(caseData);
  return error;
};

export const getCustomCases = async () => {
  const { data } = await supabase.from('custom_cases').select('*').order('created_at', { ascending: false });
  return data || [];
};

export const deleteCustomCase = async (id) => {
  const { error } = await supabase.from('custom_cases').delete().eq('id', id);
  return error;
};

export const deleteCustomQuizQuestion = async (id) => {
  const { error } = await supabase.from('custom_quiz').delete().eq('id', id);
  return error;
};

export const deleteCustomPearl = async (id) => {
  const { error } = await supabase.from('custom_pearls').delete().eq('id', id);
  return error;
};

export const deleteCustomTrigger = async (id) => {
  const { error } = await supabase.from('custom_triggers').delete().eq('id', id);
  return error;
};

export const deleteCustomConcept = async (id) => {
  const { error } = await supabase.from('custom_concepts').delete().eq('id', id);
  return error;
};

export const getGameLeaderboard = async (game) => {
  const { data } = await supabase
    .from('game_scores')
    .select('user_id, score, max_score, played_at, profiles(name)')
    .eq('game', game)
    .order('score', { ascending: false });
  if (!data) return [];
  const best = {};
  data.forEach(r => {
    if (!best[r.user_id] || r.score > best[r.user_id].score) best[r.user_id] = r;
  });
  return Object.values(best).sort((a, b) => b.score - a.score).slice(0, 5);
};

export const saveCustomQuizQuestion = async (q) => {
  const { error } = await supabase.from('custom_quiz').insert(q);
  return error;
};

export const getCustomQuiz = async () => {
  const { data } = await supabase.from('custom_quiz').select('*').order('created_at', { ascending: false });
  return data || [];
};
