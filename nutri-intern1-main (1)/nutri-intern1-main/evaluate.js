async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userAnswer, caseData } = req.body;
  if (!userAnswer || !caseData) return res.status(400).json({ error: 'Missing fields' });

  const systemPrompt = `You are an expert clinical dietitian tutor evaluating a nutrition intern's answer.
Your role is to assess understanding, reasoning quality, and concept coverage — NOT exact wording.

Case: ${caseData.title}
Scenario: ${caseData.scenario}
Objective: ${caseData.objective}
Expert Answer: ${caseData.expertAnswer}
Key Concepts Required: ${caseData.keyConcepts.join(', ')}

Evaluate the intern's answer and respond ONLY with a valid JSON object in this exact format:
{
  "tier": "strong" | "partial" | "weak",
  "scores": {
    "conceptMatch": <0-30>,
    "reasoning": <0-25>,
    "missingCritical": <0-20>,
    "explanationDepth": <0-15>,
    "terminologyAccuracy": <0-10>
  },
  "totalScore": <0-100>,
  "correctConcepts": ["concept1", "concept2"],
  "missingConcepts": ["concept1", "concept2"],
  "misconceptions": ["any wrong ideas stated"],
  "feedbackMessage": "Mentor-like, encouraging, specific feedback (2-3 sentences)",
  "correctionGuidance": "What was incomplete and why (2-3 sentences)",
  "nextThinkingDirection": "One specific question or direction to deepen understanding",
  "strengthSummary": "What the learner did well (1-2 sentences)"
}

Scoring rules:
- Accept synonyms and equivalent medical concepts
- Reward correct reasoning even if terminology is imperfect
- tier 'strong': totalScore >= 75
- tier 'partial': totalScore 40-74
- tier 'weak': totalScore < 40
- Be encouraging, never harsh. Sound like a mentor, not a judge.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Intern's answer: "${userAnswer}"` }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);
    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    return res.status(200).json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { default: handler };
