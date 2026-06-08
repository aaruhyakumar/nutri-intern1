/**
 * Clinical Cases Scoring Engine
 * Evaluates intern answers using keyword-based semantic similarity
 */

/**
 * Main scoring function
 * @param {string} studentAnswer - The intern's typed answer
 * @param {object} step - The case step object with keywords and feedback
 * @returns {object} { tier, points, percentage, matchedKeywords, feedback, explanation }
 */
export const scoreAnswer = async (studentAnswer, step) => {
  if (!studentAnswer || !studentAnswer.trim()) {
    return {
      tier: "incomplete",
      points: 0,
      percentage: 0,
      matchedKeywords: { primary: [], secondary: [] },
      feedback: step.feedback.incomplete || "Please provide an answer.",
      explanation: "No answer detected."
    };
  }

  const lowerAnswer = studentAnswer.toLowerCase();

  // Calculate keyword matches
  const primaryMatches = step.primaryKeywords.filter(kw =>
    matchKeyword(lowerAnswer, kw.word, step.semanticVariations)
  );

  const secondaryMatches = step.secondaryKeywords.filter(kw =>
    matchKeyword(lowerAnswer, kw.word, step.semanticVariations)
  );

  // Calculate scores
  const primaryScore = primaryMatches.reduce((sum, kw) => sum + kw.weight, 0);
  const secondaryScore = secondaryMatches.reduce((sum, kw) => sum + kw.weight, 0);
  const totalPossible = step.primaryKeywords.reduce((sum, kw) => sum + kw.weight, 0) +
                       step.secondaryKeywords.reduce((sum, kw) => sum + kw.weight, 0);

  const earnedScore = primaryScore + secondaryScore;
  const percentage = totalPossible > 0 ? Math.round((earnedScore / totalPossible) * 100) : 0;

  // Determine tier
  let tier, points, feedbackKey;
  if (percentage >= 85) {
    tier = "strong";
    points = 5;
    feedbackKey = "strong";
  } else if (percentage >= 70) {
    tier = "correct";
    points = 4;
    feedbackKey = "correct";
  } else if (percentage >= 50) {
    tier = "partial";
    points = 2;
    feedbackKey = "partial";
  } else {
    tier = "incomplete";
    points = 0;
    feedbackKey = "incomplete";
  }

  const matchedKeywords = {
    primary: primaryMatches.map(kw => kw.word),
    secondary: secondaryMatches.map(kw => kw.word),
    missed: {
      primary: step.primaryKeywords
        .filter(kw => !primaryMatches.includes(kw))
        .map(kw => kw.word),
      secondary: step.secondaryKeywords
        .filter(kw => !secondaryMatches.includes(kw))
        .map(kw => kw.word)
    }
  };

  return {
    tier,
    points,
    percentage,
    matchedKeywords,
    feedback: step.feedback[feedbackKey] || "Good effort. Review the learning materials.",
    explanation: generateExplanation(matchedKeywords, step)
  };
};

/**
 * Check if a keyword or its variations appear in the answer
 * Supports fuzzy matching and semantic variations
 */
const matchKeyword = (lowerAnswer, keyword, semanticVariations) => {
  const lowerKeyword = keyword.toLowerCase();

  // Exact phrase match (highest priority)
  if (lowerAnswer.includes(lowerKeyword)) {
    return true;
  }

  // Check semantic variations
  if (semanticVariations && semanticVariations[lowerKeyword]) {
    const variations = semanticVariations[lowerKeyword];
    if (variations.some(v => lowerAnswer.includes(v.toLowerCase()))) {
      return true;
    }
  }

  // Partial word match (word boundaries)
  const words = lowerAnswer.split(/[\s,.-;:/-]+/);
  const keywordWords = lowerKeyword.split(/[\s,.-;:/-]+/);

  // If keyword is multiple words, all must be present
  if (keywordWords.length > 1) {
    return keywordWords.every(kw => words.some(w => w.includes(kw) || kw.includes(w)));
  }

  // Single word: check for partial match (>60% similarity)
  return words.some(w => {
    const similarity = levenshteinSimilarity(w, keywordWords[0]);
    return similarity > 0.6;
  });
};

/**
 * Levenshtein distance for fuzzy matching
 * Returns similarity score 0-1 (1 = identical)
 */
const levenshteinSimilarity = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const maxLen = Math.max(len1, len2);

  if (maxLen === 0) return 1;

  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
};

/**
 * Calculate Levenshtein distance between two strings
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

/**
 * Generate detailed explanation of what was matched
 */
const generateExplanation = (matchedKeywords, step) => {
  const { primary, secondary, missed } = matchedKeywords;
  const parts = [];

  if (primary.length > 0) {
    parts.push(`✓ Matched critical keywords: ${primary.join(", ")}`);
  }

  if (secondary.length > 0) {
    parts.push(`✓ Matched supporting keywords: ${secondary.join(", ")}`);
  }

  if (missed.primary.length > 0) {
    parts.push(`✗ Missed critical concepts: ${missed.primary.join(", ")}`);
  }

  if (missed.secondary.length > 0) {
    parts.push(`◦ Could include: ${missed.secondary.join(", ")}`);
  }

  return parts.length > 0 ? parts.join("\n") : "Good attempt. Review the sample answers above.";
};

/**
 * Format score display
 */
export const formatScore = (score) => {
  const tierEmojis = {
    strong: "🏆",
    correct: "✅",
    partial: "📋",
    incomplete: "❌"
  };

  const tierColors = {
    strong: "#10b981",
    correct: "#3b82f6",
    partial: "#f59e0b",
    incomplete: "#ef4444"
  };

  const tierLabels = {
    strong: "Strong Answer",
    correct: "Correct",
    partial: "Partial",
    incomplete: "Incomplete"
  };

  return {
    emoji: tierEmojis[score.tier],
    color: tierColors[score.tier],
    label: tierLabels[score.tier]
  };
};
