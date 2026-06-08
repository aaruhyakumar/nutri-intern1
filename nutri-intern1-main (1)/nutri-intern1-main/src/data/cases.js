export const CASES = [
  {
    id: 0,
    difficulty: "Moderate",
    name: "Meena, 55F", emoji: "👩",
    desc: "T2DM, on Insulin Glargine + Metformin. BMI 28.5. Admitted for recurrent nocturnal hypoglycemia.",
    tags: ["T2DM", "Insulin", "Hypoglycemia", "Overweight"],
    color: "#EF9F27",
    steps: [
      {
        label: "Patient Snapshot",
        question: "What is the primary nutrition concern for Meena based on her presentation?",
        answerType: "short",
        primaryKeywords: [
          { word: "nocturnal hypoglycemia", weight: 2 },
          { word: "bedtime carbohydrate intake", weight: 2 },
          { word: "insulin-glucose mismatch", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "inadequate nutrition", weight: 1 },
          { word: "insulin action", weight: 1 }
        ],
        semanticVariations: {
          "nocturnal hypoglycemia": ["low blood sugar at night", "nighttime glucose drops", "3am hypoglycemia", "overnight glucose crisis"],
          "bedtime carbohydrate intake": ["evening snack", "pre-sleep meal", "bedtime nutrition", "nighttime carbs"],
          "insulin-glucose mismatch": ["insulin without glucose", "active insulin + no food"]
        },
        hints: [
          "🕐 Focus on WHEN this problem happens. What time of day?",
          "💊 She's on insulin. What does insulin need to work safely?",
          "🍽️ What simple meal change could prevent the 3am glucose drop?"
        ],
        sampleAnswers: [
          { text: "Nocturnal hypoglycemia from inadequate bedtime carbs due to active insulin without glucose source.", tier: "strong" },
          { text: "She has low blood sugar at night because no bedtime snack while on insulin.", tier: "correct" },
          { text: "Bedtime carbs are needed for her insulin.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You identified the WHEN (nocturnal), WHAT (inadequate carbs), and WHY (insulin needs glucose). This clinical framing is perfect.",
          correct: "Very solid! You captured the problem. Next level: explain WHY insulin + no carbs specifically causes nighttime drops.",
          partial: "Good start. You identified carbs + bedtime. Go deeper: What medication causes this? How does it interact with fasting?",
          incomplete: "Let's step back. Think: When does she have symptoms? What medication is she on? What's she NOT eating at that time?"
        }
      },
      {
        label: "Primary Nutrition Problem",
        question: "Formulate a PES (Problem-Etiology-Signs/Symptoms) statement for Meena's nutrition diagnosis.",
        answerType: "short",
        primaryKeywords: [
          { word: "inadequate carbohydrate intake", weight: 2 },
          { word: "bedtime snack", weight: 2 },
          { word: "nocturnal hypoglycemia", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "insulin", weight: 1 },
          { word: "related to", weight: 1 },
          { word: "as evidenced by", weight: 1 }
        ],
        semanticVariations: {
          "inadequate carbohydrate intake": ["insufficient carbs", "low carb intake", "inadequate carbs"],
          "bedtime snack": ["evening meal", "pre-sleep food", "nighttime meal"],
          "nocturnal hypoglycemia": ["nighttime low glucose", "3am hypoglycemia", "overnight lows"]
        },
        hints: [
          "Structure: [Problem] related to [Cause] as evidenced by [Evidence]",
          "What specifically is she NOT eating? When?",
          "What documented signs show this is happening?"
        ],
        sampleAnswers: [
          { text: "Inadequate carbohydrate intake related to lack of bedtime snack as evidenced by recurrent nocturnal hypoglycemia episodes.", tier: "strong" },
          { text: "Inadequate bedtime carbs related to missing snack causing nocturnal hypoglycemia.", tier: "correct" },
          { text: "She needs more carbs at bedtime.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect PES formulation! You used the exact clinical diagnosis format: Problem + Etiology + Evidence. This is how nutrition diagnoses are documented.",
          correct: "Great structure! You captured all three components. For future cases, add more specific lab/clinical evidence if available.",
          partial: "You're on the right track but need the full PES framework. Include: What's wrong (problem), WHY it's happening (etiology), and proof it's happening (signs).",
          incomplete: "PES format is critical. Think: (1) What's the nutrition problem? (2) What caused it? (3) What proof shows this exists? Frame it as 'X related to Y as evidenced by Z.'"
        }
      },
      {
        label: "Top Priority",
        question: "What is the single most urgent nutrition intervention for Meena?",
        answerType: "short",
        primaryKeywords: [
          { word: "bedtime snack", weight: 3 },
          { word: "carbohydrate", weight: 2 },
          { word: "15-20 grams", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "milk", weight: 1 },
          { word: "crackers", weight: 1 },
          { word: "sustained glucose", weight: 1 }
        ],
        semanticVariations: {
          "bedtime snack": ["evening meal", "pre-sleep food", "nighttime nutrition"],
          "carbohydrate": ["carbs", "glucose source", "slow-digesting food"],
          "15-20 grams": ["15-20g", "small snack", "modest amount"]
        },
        hints: [
          "What time of day does the problem occur?",
          "What food/meal timing would directly prevent nighttime lows?",
          "Should it be fast-acting carbs or slow-digesting? Why?"
        ],
        sampleAnswers: [
          { text: "Prescribe a 15-20g carbohydrate bedtime snack (milk + crackers) for sustained glucose release during sleep.", tier: "strong" },
          { text: "Give her a bedtime snack with carbs to prevent nighttime hypoglycemia.", tier: "correct" },
          { text: "Add evening nutrition.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You nailed specificity: WHEN (bedtime), WHAT (carbs), HOW MUCH (15-20g), and the rationale (sustained release). This is how to write interventions.",
          correct: "Excellent intervention identification. To strengthen: specify the amount and composition (slow vs. fast carbs matter!).",
          partial: "Right general idea. Next level: quantify it. How much? What type of food? Why that timing?",
          incomplete: "Think about the TIMING. When does her glucose drop? What happens then? What food, given when, would prevent it?"
        }
      },
      {
        label: "Mechanism",
        question: "Explain the physiological mechanism: WHY does a bedtime snack prevent nocturnal hypoglycemia in Meena?",
        answerType: "short",
        primaryKeywords: [
          { word: "insulin glargine", weight: 2 },
          { word: "basal insulin active", weight: 2 },
          { word: "glucose release", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "carbohydrate", weight: 1 },
          { word: "sleep hours", weight: 1 },
          { word: "blood glucose", weight: 1 }
        ],
        semanticVariations: {
          "insulin glargine": ["long-acting insulin", "basal insulin", "Lantus"],
          "basal insulin active": ["insulin still working", "insulin action ongoing"],
          "glucose release": ["sustained glucose", "steady carbs", "slow-digesting food"]
        },
        hints: [
          "What is her insulin medication doing 24/7?",
          "Without food, what happens to glucose when insulin is still working?",
          "How does slow-digesting food balance active insulin?"
        ],
        sampleAnswers: [
          { text: "Insulin Glargine remains active during sleep; without carbohydrate, glucose drops. A slow-digesting snack provides sustained glucose release matching basal insulin action.", tier: "strong" },
          { text: "Insulin is still working at night, so without carbs, glucose drops. The snack provides glucose to balance the insulin.", tier: "correct" },
          { text: "The snack stops low blood sugar.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent mechanistic understanding! You explained the insulin-glucose dynamic. This is advanced clinical reasoning.",
          correct: "Great! You got the cause-effect. To deepen: name the insulin type and explain its duration/action pattern.",
          partial: "You're correct but vague. Get specific: What insulin? What does it do? How does food interact with it?",
          incomplete: "Think step-by-step: (1) What is her insulin doing 24h/day? (2) What happens to glucose without food? (3) How does a snack prevent this?"
        }
      },
      {
        label: "Core Nutrition Strategy",
        question: "What is the best overall dietary pattern for Meena's glucose stability?",
        answerType: "short",
        primaryKeywords: [
          { word: "consistent carbohydrate distribution", weight: 3 },
          { word: "3 meals", weight: 1 },
          { word: "predictable intake", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "blood glucose fluctuations", weight: 1 },
          { word: "insulin adjustment", weight: 1 },
          { word: "snacks", weight: 1 }
        ],
        semanticVariations: {
          "consistent carbohydrate distribution": ["regular carbs", "evenly spaced meals", "carb consistency", "predictable carb timing"],
          "3 meals": ["three meals", "meal pattern"],
          "predictable intake": ["stable eating", "regular pattern", "consistent timing"]
        },
        hints: [
          "Does her insulin dose change daily? No. So what should her carbs do?",
          "Why would erratic eating be dangerous with fixed insulin?",
          "Think: stable = predictable = adjustable"
        ],
        sampleAnswers: [
          { text: "Consistent carbohydrate distribution across 3 meals + 2-3 snacks stabilizes glucose and allows accurate insulin dosing.", tier: "strong" },
          { text: "Regular carb timing at meals and snacks keeps her glucose stable with her fixed insulin dose.", tier: "correct" },
          { text: "She should eat regular meals.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You understand the fundamental principle: predictable carbs + fixed insulin = stable glucose. This is the core of insulin management.",
          correct: "Solid! You got the strategy. To strengthen: explain WHY consistency matters when insulin dose is fixed.",
          partial: "Right direction. Go deeper: WHY is regular eating important when someone is on a fixed insulin dose?",
          incomplete: "Key insight: Her insulin dose doesn't change. So what must her eating pattern do to match it?"
        }
      },
      {
        label: "Calorie & Carb Direction",
        question: "What carbohydrate targets would you recommend per meal and snack for Meena?",
        answerType: "short",
        primaryKeywords: [
          { word: "45-60g per meal", weight: 3 },
          { word: "15-30g per snack", weight: 2 },
          { word: "individual adjustment", weight: 1 }
        ],
        secondaryKeywords: [
          { word: "blood glucose monitoring", weight: 1 },
          { word: "SMBG", weight: 1 }
        ],
        semanticVariations: {
          "45-60g per meal": ["45 to 60 grams at meals", "meals around 50g carbs"],
          "15-30g per snack": ["snacks 15-30 grams", "snack carbs 15-30g"],
          "individual adjustment": ["based on SMBG", "adjusted per person", "tailored"]
        },
        hints: [
          "Standard T2DM on insulin typically uses what carb ranges? (Hint: it's a range, not a fixed number)",
          "Why would meals have more carbs than snacks?",
          "How would you monitor if the targets are working?"
        ],
        sampleAnswers: [
          { text: "45-60g carbs per meal + 15-30g per snack, adjusted based on SMBG patterns and HbA1c response.", tier: "strong" },
          { text: "About 45-60g at meals and 15-20g for snacks like her bedtime meal.", tier: "correct" },
          { text: "She should eat moderate carbs at each meal.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent specific targets! You provided ranges AND mentioned individual monitoring. This is evidence-based practice.",
          correct: "Very good! You nailed the amounts. To enhance: mention how you'd adjust based on her response.",
          partial: "Good vague direction. Get specific: What are the actual gram targets per meal vs. snack?",
          incomplete: "Targets matter! Without numbers, you can't audit if the plan is being followed. Look up standard T2DM carb targets per meal/snack."
        }
      },
      {
        label: "Practical Food Application",
        question: "Describe a specific bedtime snack for Meena that combines carbs and protein. Why this choice?",
        answerType: "short",
        primaryKeywords: [
          { word: "milk", weight: 2 },
          { word: "crackers", weight: 2 },
          { word: "protein + carbs", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "slow digestion", weight: 1 },
          { word: "sustained release", weight: 1 },
          { word: "avoid high glycemic", weight: 1 }
        ],
        semanticVariations: {
          "milk": ["dairy", "low-fat milk", "yogurt"],
          "crackers": ["whole wheat crackers", "complex carbs", "bread"],
          "protein + carbs": ["combined nutrients", "carb + protein"]
        },
        hints: [
          "What type of carbs digest slowly vs. quickly?",
          "Why add protein to a bedtime snack?",
          "What common bedtime foods are TOO fast (high GI) and would fail?"
        ],
        sampleAnswers: [
          { text: "1 cup warm low-fat milk + 2 whole wheat crackers. Protein (milk) slows carb digestion; whole grain provides sustained glucose release overnight.", tier: "strong" },
          { text: "Milk and crackers work well because they digest slowly and prevent nighttime lows.", tier: "correct" },
          { text: "She could eat a snack at bedtime.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect food prescription! You specified amounts, included rationale (GI considerations, protein slowing), and avoided pitfalls. This is practice-ready.",
          correct: "Great! You selected appropriate foods. To strengthen: explain the GI principles and why NOT juice or a banana.",
          partial: "Right food category. Get specific: What amounts? Why these foods? What would fail (e.g., juice alone)?",
          incomplete: "Move from concepts to real foods. Pick a specific snack, quantify it, and explain why it works mechanistically."
        }
      },
      {
        label: "Monitoring Parameters",
        question: "What specific monitoring parameters are most critical for Meena, and how often should they be checked?",
        answerType: "short",
        primaryKeywords: [
          { word: "3am blood glucose", weight: 2 },
          { word: "fasting glucose", weight: 2 },
          { word: "hypoglycemia logs", weight: 1 }
        ],
        secondaryKeywords: [
          { word: "SMBG", weight: 1 },
          { word: "HbA1c", weight: 1 },
          { word: "insulin adjustment", weight: 1 }
        ],
        semanticVariations: {
          "3am blood glucose": ["middle-of-night glucose", "nocturnal glucose checks", "nighttime SMBG"],
          "fasting glucose": ["morning glucose", "fasting blood glucose"],
          "hypoglycemia logs": ["hypoglycemic episodes tracking", "low glucose records"]
        },
        hints: [
          "What is the SYMPTOM we're trying to prevent? When does it happen?",
          "What test would directly show if your intervention is working?",
          "How often would you check to catch dangerous patterns?"
        ],
        sampleAnswers: [
          { text: "3am SMBG + fasting glucose daily × 1 week to detect hypoglycemia patterns; then adjust snack timing/insulin. HbA1c every 3 months.", tier: "strong" },
          { text: "Check blood sugar at 3am and fasting to see if the snack is working. Also track HbA1c.", tier: "correct" },
          { text: "Monitor her blood glucose regularly.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent monitoring strategy! You identified the critical timepoint (3am when she has symptoms), frequency, AND follow-up lab. This ensures your plan works.",
          correct: "Great! You picked the right metrics. To sharpen: specify frequency (daily vs. weekly) and what thresholds trigger action.",
          partial: "Good start. Be specific: WHEN and HOW OFTEN? What exact values are you looking for?",
          incomplete: "Monitoring must be specific. What measurement, at what time, how often, and what value range is 'safe'?"
        }
      },
      {
        label: "Patient Education",
        question: "What is the single most important concept Meena must understand about her bedtime snack?",
        answerType: "short",
        primaryKeywords: [
          { word: "bedtime snack", weight: 2 },
          { word: "essential", weight: 2 },
          { word: "insulin management", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "not optional", weight: 1 },
          { word: "safety", weight: 1 }
        ],
        semanticVariations: {
          "bedtime snack": ["nighttime nutrition", "evening meal"],
          "essential": ["critical", "must-have", "non-negotiable", "required"],
          "insulin management": ["insulin safety", "insulin treatment", "diabetes management"]
        },
        hints: [
          "Is the bedtime snack optional or required? Why?",
          "What does she know about her insulin shot? How is the snack similar?",
          "What language makes this stick in a patient's memory?"
        ],
        sampleAnswers: [
          { text: "The bedtime snack is as essential as her insulin injection—never skip it. Without it, the insulin will cause nighttime lows.", tier: "strong" },
          { text: "She must eat the bedtime snack every night to prevent low blood sugar from her insulin.", tier: "correct" },
          { text: "Bedtime snacks are important.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect educational messaging! You framed it comparably to her insulin (something she already knows is critical), making it memorable and non-negotiable.",
          correct: "Great! You conveyed importance. To strengthen: use an analogy (like comparing to insulin) to make it stick.",
          partial: "Right message but vague. How would you make this memorable to the patient? What comparison would she understand?",
          incomplete: "Education must be actionable and memorable. What's the one concept that, if she remembers it, keeps her safe?"
        }
      },
      {
        label: "Follow-up & Escalation",
        question: "When should Meena be referred to an endocrinologist, and what clinical signs would trigger this?",
        answerType: "short",
        primaryKeywords: [
          { word: "persistent hypoglycemia", weight: 2 },
          { word: "dietary intervention inadequate", weight: 2 },
          { word: "insulin adjustment needed", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "endocrinologist referral", weight: 1 },
          { word: "despite snack compliance", weight: 1 }
        ],
        semanticVariations: {
          "persistent hypoglycemia": ["ongoing lows", "continued episodes", "recurrent hypoglycemia"],
          "dietary intervention inadequate": ["nutrition plan not working", "snack not solving problem"],
          "insulin adjustment needed": ["insulin dose change", "medication adjustment", "dose optimization"]
        },
        hints: [
          "Your nutrition intervention worked? Great! But what if it didn't?",
          "When is the problem beyond dietary control?",
          "At what point does medication need adjustment?"
        ],
        sampleAnswers: [
          { text: "If nocturnal hypoglycemia persists despite correct snack timing and compliance for 2 weeks, refer to endocrinologist for insulin dose review.", tier: "strong" },
          { text: "Refer if the bedtime snack isn't preventing low blood sugars. The insulin dose might need lowering.", tier: "correct" },
          { text: "Refer if she's still having problems.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You know when to delegate: after your intervention, if it fails, medication adjustment is physician scope. You flagged the right escalation point.",
          correct: "Good! You identified the escalation trigger. To enhance: specify timeline (how long to observe?) and what objective data supports referral.",
          partial: "Right idea. Be specific: What's the time frame? What objective sign says 'nutrition alone isn't enough'?",
          incomplete: "Dietitians are first-line nutrition, but MDs/specialists adjust meds. When does the case become their problem?"
        }
      }
    ]
  },
  {
    id: 1,
    difficulty: "Hard",
    name: "Rajan, 62M", emoji: "👨",
    desc: "CKD Stage 3b. Creatinine 2.4 mg/dL, eGFR 38, K⁺ 5.6 mEq/L. Low appetite, mild edema.",
    tags: ["CKD Stage 3b", "Hyperkalemia", "Edema", "Low appetite"],
    color: "#378ADD",
    steps: [
      {
        label: "Patient Snapshot",
        question: "What is the primary nutritional risk in CKD Stage 3b?",
        answerType: "short",
        primaryKeywords: [
          { word: "protein-energy wasting", weight: 2 },
          { word: "electrolyte imbalance", weight: 2 },
          { word: "hyperkalemia", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "uremic load", weight: 1 },
          { word: "phosphate management", weight: 1 }
        ],
        semanticVariations: {
          "protein-energy wasting": ["PEW", "muscle loss", "protein malnutrition"],
          "electrolyte imbalance": ["electrolyte problems", "K+ P+ management"],
          "hyperkalemia": ["high potassium", "elevated K+"]
        },
        hints: [
          "CKD patients can't excrete what mineral properly?",
          "What happens to their muscles when protein needs are restricted?",
          "Name the two main problems: electrical (heart) and metabolic (waste)."
        ],
        sampleAnswers: [
          { text: "Protein-energy wasting combined with dangerous electrolyte imbalance, especially hyperkalemia threatening cardiac function.", tier: "strong" },
          { text: "Both protein wasting and electrolyte problems like high potassium.", tier: "correct" },
          { text: "Kidney disease causes nutrient problems.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You named both major complications: metabolic (PEW, wasting) and electrolyte (hyperkalemia). This dual-threat thinking is advanced CKD care.",
          correct: "Great! You identified both issues. To sharpen: explain WHY kidneys cause wasting when we restrict protein (paradox!).",
          partial: "Right general concept. Be specific: What two main problems define CKD nutrition?",
          incomplete: "CKD is unique: restrict protein to reduce waste, BUT this causes muscle loss. That's the clinical tension you must recognize."
        }
      },
      {
        label: "Primary Nutrition Problem",
        question: "What is the most urgent electrolyte concern for Rajan, and why is it dangerous?",
        answerType: "short",
        primaryKeywords: [
          { word: "hyperkalemia", weight: 3 },
          { word: "potassium 5.6", weight: 2 },
          { word: "cardiac arrhythmia", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "kidney excretion", weight: 1 },
          { word: "dietary restriction", weight: 1 }
        ],
        semanticVariations: {
          "hyperkalemia": ["high K+", "elevated potassium"],
          "potassium 5.6": ["K+ 5.6", "5.6 mEq/L"],
          "cardiac arrhythmia": ["heart rhythm problems", "fatal arrhythmia", "electrical cardiac risk"]
        },
        hints: [
          "K+ 5.6 is above the normal range (3.5-5.0). What organ is sensitive to high K?",
          "Why can't CKD patients excrete excess potassium?",
          "What's the acute danger if potassium keeps rising?"
        ],
        sampleAnswers: [
          { text: "Hyperkalemia (K+ 5.6 above normal 3.5-5.0) is critical because kidneys can't excrete potassium, risking fatal cardiac arrhythmias.", tier: "strong" },
          { text: "High potassium is the urgent problem because it affects heart rhythms and the kidneys can't get rid of it.", tier: "correct" },
          { text: "His potassium is high.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You connected the lab abnormality (K+ 5.6) to the mechanism (impaired renal excretion) to the danger (cardiac). Clinical clarity.",
          correct: "Excellent assessment! To strengthen: mention the normal range (3.5-5.0) and quantify the risk (arrhythmia, sudden death).",
          partial: "Right concern. Get specific: What's the normal K+ range? Why is 5.6 dangerous? Which organ?",
          incomplete: "Hyperkalemia is an emergency. Explain the potassium-heart connection and why CKD patients can't handle excess K."
        }
      },
      {
        label: "Top Priority",
        question: "What protein intake level is recommended for Rajan with non-dialysis CKD Stage 3b?",
        answerType: "short",
        primaryKeywords: [
          { word: "0.6-0.8 g/kg/day", weight: 3 },
          { word: "low-protein diet", weight: 2 },
          { word: "reduce uremic waste", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "adequate calories", weight: 1 },
          { word: "30-35 kcal/kg", weight: 1 }
        ],
        semanticVariations: {
          "0.6-0.8 g/kg/day": ["0.6 to 0.8 grams per kg", "restricted protein"],
          "low-protein diet": ["protein restriction", "limited protein intake"],
          "reduce uremic waste": ["decrease waste production", "lower nitrogenous waste"]
        },
        hints: [
          "High protein = more waste. Low protein = less waste. How much is safe?",
          "BUT: if protein is too low, the body eats its own muscle. What else must we provide?",
          "Name the target AND what else must accompany it."
        ],
        sampleAnswers: [
          { text: "0.6-0.8 g/kg/day (low-protein) to reduce uremic waste, but PAIRED with adequate calories (30-35 kcal/kg) to prevent muscle breakdown.", tier: "strong" },
          { text: "Around 0.6-0.8 grams per kilogram daily to reduce protein waste products.", tier: "correct" },
          { text: "Low protein is needed.", tier: "partial" }
        ],
        feedback: {
          strong: "Outstanding! You understood the CKD paradox: restrict protein (reduce waste) but provide calories (prevent wasting). This dual strategy prevents the trap.",
          correct: "Great! You got the protein target. To enhance: mention the calorie companion (avoiding starvation mode).",
          partial: "Correct protein range. But WHY does it have to be paired with calories? Without that, you incomplete the prescription.",
          incomplete: "CKD nutrition has a trick: reduce protein, but DON'T starve. What else must you give instead of protein calories?"
        }
      },
      {
        label: "Mechanism",
        question: "Explain why protein restriction helps in CKD despite the paradox of muscle loss.",
        answerType: "short",
        primaryKeywords: [
          { word: "protein produces nitrogenous waste", weight: 2 },
          { word: "reduces filtration burden", weight: 2 },
          { word: "slows CKD progression", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "uremia", weight: 1 },
          { word: "glomerular hyperfiltration", weight: 1 }
        ],
        semanticVariations: {
          "protein produces nitrogenous waste": ["protein breakdown creates urea", "protein = nitrogen waste"],
          "reduces filtration burden": ["kidney workload", "less strain on kidneys"],
          "slows CKD progression": ["delays kidney decline", "delays dialysis"]
        },
        hints: [
          "Every gram of protein the body breaks down makes what?",
          "If kidneys are already damaged, and you give them less toxic work, what happens to them?",
          "Trade-off: some muscle loss, but kidneys survive longer. Worth it?"
        ],
        sampleAnswers: [
          { text: "Protein metabolism produces urea/nitrogenous waste. Restricting protein reduces kidney's filtration burden, slowing hyperfiltration damage and delaying dialysis.", tier: "strong" },
          { text: "Less protein means less waste for the damaged kidneys to filter, so they decline slower.", tier: "correct" },
          { text: "Less protein helps the kidneys.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect mechanistic explanation! You named the metabolic consequence (urea), the pathophysiology (hyperfiltration), and the clinical outcome (slowed decline). Advanced.",
          correct: "Excellent! You got the cause-effect. To deepen: name the specific waste products (urea, creatinine, phosphate).",
          partial: "Good intuition. Be specific: What toxic waste does protein make? How does less work help kidneys?",
          incomplete: "Think metabolism: protein → amino acids → ammonia → urea. If kidneys are broken, what happens to all that waste?"
        }
      },
      {
        label: "Core Nutrition Strategy",
        question: "Which foods should Rajan limit most strictly, and what cooking technique can partially salvage vegetables?",
        answerType: "short",
        primaryKeywords: [
          { word: "high-potassium foods", weight: 2 },
          { word: "bananas potatoes tomatoes", weight: 2 },
          { word: "leaching technique", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "boil discard water", weight: 1 },
          { word: "reduce potassium", weight: 1 }
        ],
        semanticVariations: {
          "high-potassium foods": ["K-rich foods", "avoid bananas potatoes"],
          "bananas potatoes tomatoes": ["high-K vegetables", "produce high in potassium"],
          "leaching technique": ["boil and discard", "water displacement method", "potassium removal"]
        },
        hints: [
          "What fruits and veggies are naturally high in K+?",
          "Can he eat veggies if we remove the potassium? How?",
          "Cooking technique: boil → drain → eat. Why does this work?"
        ],
        sampleAnswers: [
          { text: "Strictly limit bananas (~422mg K), potatoes (~900mg K), tomatoes. Use leaching: peel, cut small, soak, boil in excess water, discard water—removes 30-60% K.", tier: "strong" },
          { text: "Avoid high-K foods like bananas and potatoes. Can boil vegetables to remove some potassium.", tier: "correct" },
          { text: "Limit certain vegetables.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You named the dangerous foods with actual K+ amounts (education level!), and taught the leaching method (practice-ready). This empowers the patient.",
          correct: "Great! You identified high-K foods and the cooking method. To enhance: mention how much K is removed (30-60%) and quantities.",
          partial: "Right foods to avoid. But explain the cooking technique: WHY does boiling help? What's left behind?",
          incomplete: "Potassium management is KEY in CKD. Name 3 high-K foods and one technique to reduce K content."
        }
      },
      {
        label: "Calorie & Carb Direction",
        question: "Why is adequate calorie intake critical when protein is restricted, and what is the protein-sparing effect?",
        answerType: "short",
        primaryKeywords: [
          { word: "protein-sparing effect", weight: 3 },
          { word: "adequate carbs fats", weight: 2 },
          { word: "prevent muscle catabolism", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "energy substrate", weight: 1 },
          { word: "tissue maintenance", weight: 1 }
        ],
        semanticVariations: {
          "protein-sparing effect": ["spare muscle protein", "spare lean mass"],
          "adequate carbs fats": ["sufficient non-protein calories", "energy from other sources"],
          "prevent muscle catabolism": ["prevent muscle breakdown", "avoid wasting"]
        },
        hints: [
          "If you restrict protein AND calories, what does the body burn for energy?",
          "If you restrict protein but provide LOTS of carbs/fats, what happens instead?",
          "The trick: energy from carbs/fats, NOT from breaking down muscle."
        ],
        sampleAnswers: [
          { text: "Without adequate calories, body catabolizes muscle protein for energy, worsening uremia and wasting. Sufficient carbs/fats provide energy, sparing dietary and muscle protein from being burned.", tier: "strong" },
          { text: "If calories are low, the body breaks down muscle for energy. Adequate carbs/fats let dietary protein be used for repair instead.", tier: "correct" },
          { text: "Calories prevent muscle loss.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You explained the protein-sparing effect: carbs/fats provide energy so dietary protein isn't wasted for fuel. Clinical gold.",
          correct: "Excellent! You got the concept. To strengthen: quantify calorie targets (30-35 kcal/kg) and explain the metabolic shift.",
          partial: "Good intuition. Explain the full picture: Without calories → starvation mode → muscle eaten. WITH calories → muscle saved.",
          incomplete: "Protein-sparing is the secret sauce of restricted-protein diets. Explain: energy from what source SPARES protein from being burned?"
        }
      },
      {
        label: "Practical Food Application",
        question: "Which protein source is best for Rajan and why? Name a specific food and its advantages.",
        answerType: "short",
        primaryKeywords: [
          { word: "egg whites", weight: 3 },
          { word: "high biological value", weight: 2 },
          { word: "low phosphorus potassium", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "complete amino acids", weight: 1 },
          { word: "small quantities sufficient", weight: 1 }
        ],
        semanticVariations: {
          "egg whites": ["eggs", "white of egg"],
          "high biological value": ["excellent protein quality", "complete protein"],
          "low phosphorus potassium": ["low P and K", "minimal electrolytes"]
        },
        hints: [
          "Which protein has the 'best bang for buck' in terms of nutrition per gram?",
          "Red meat is high in what minerals CKD patients must avoid?",
          "Why is something 'high biological value' better when you're restricting protein?"
        ],
        sampleAnswers: [
          { text: "Egg whites: high biological value (complete amino acids), minimal phosphorus/potassium, allowing lower quantities to meet needs while respecting restrictions.", tier: "strong" },
          { text: "Egg whites are best because they have good protein quality and low phosphorus and potassium.", tier: "correct" },
          { text: "Eggs are a good protein.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect food prescription! You named the food, explained the quality (BV), and why it works mechanistically (efficiency). This is translational nutrition.",
          correct: "Great! You picked egg whites. To enhance: explain biological value and why it matters in restricted protein.",
          partial: "Right food. Get specific: WHY egg whites? What makes them better than other proteins?",
          incomplete: "Think: 0.6-0.8 g/kg protein needs are LOW. Every gram must count (quality). Which protein gives most amino acids per gram?"
        }
      },
      {
        label: "Monitoring Parameters",
        question: "What labs should be monitored for Rajan, how frequently, and what values trigger intervention?",
        answerType: "short",
        primaryKeywords: [
          { word: "renal panel monthly", weight: 2 },
          { word: "potassium creatinine eGFR phosphate", weight: 2 },
          { word: "declining eGFR", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "K+ above 5.5", weight: 1 },
          { word: "dialysis referral eGFR 15-20", weight: 1 }
        ],
        semanticVariations: {
          "renal panel monthly": ["monthly kidney tests", "routine labs every month"],
          "potassium creatinine eGFR phosphate": ["K+, Cr, eGFR, P", "core kidney markers"],
          "declining eGFR": ["falling kidney function", "dropping eGFR"]
        },
        hints: [
          "You restrict protein to slow decline. How do you KNOW if it's working?",
          "Which labs show kidney function? Which show electrolyte danger?",
          "At what eGFR does kidney failure become 'Stage 5' and dialysis unavoidable?"
        ],
        sampleAnswers: [
          { text: "Monthly renal panel: K+ (target <5.5), Cr, eGFR, phosphate. If eGFR falls below 15 or K+ persistently >5.5 despite diet, refer nephrology for dialysis/medications.", tier: "strong" },
          { text: "Check potassium, creatinine, eGFR monthly. If they get worse or K+ stays high, might need medications or dialysis referral.", tier: "correct" },
          { text: "Monitor kidney function regularly.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent monitoring strategy! You named specific labs, frequency, AND action thresholds (eGFR <15, K+ >5.5). This is proactive clinical care.",
          correct: "Great! You identified the labs. To strengthen: specify frequency (monthly, quarterly?) and critical values that trigger escalation.",
          partial: "Right labs. Be specific: How often? What numbers are 'bad'? When do you call nephrology?",
          incomplete: "Monitoring is useless without action thresholds. Define: normal values, warning signs, and 'call the specialist' points."
        }
      },
      {
        label: "Patient Education",
        question: "Teach Rajan one simple, memorable concept about his CKD diet that he must never forget.",
        answerType: "short",
        primaryKeywords: [
          { word: "potassium restriction", weight: 2 },
          { word: "kidney cannot excrete", weight: 2 },
          { word: "dangerous", weight: 1 }
        ],
        secondaryKeywords: [
          { word: "heart rhythm", weight: 1 },
          { word: "life-threatening", weight: 1 }
        ],
        semanticVariations: {
          "potassium restriction": ["limit K+", "avoid high-K foods"],
          "kidney cannot excrete": ["kidneys can't get rid of K+", "broken kidneys trap potassium"],
          "dangerous": ["risky", "cardiac risk"]
        },
        hints: [
          "What's the single biggest dietary danger for CKD? (Not protein—that's slow. Something faster?)",
          "How would you explain K+ danger in one sentence a patient remembers?",
          "What analogy helps? (E.g., battery, plumbing, etc.)"
        ],
        sampleAnswers: [
          { text: "High potassium can stop your heart. Your kidneys can't filter potassium anymore, so you must avoid bananas, potatoes—every single day, forever.", tier: "strong" },
          { text: "Your kidneys can't get rid of extra potassium anymore, so you have to avoid high-K foods to protect your heart.", tier: "correct" },
          { text: "Watch your diet for kidney disease.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect patient education! You made it memorable (heart risk), actionable (specific foods), and non-negotiable (forever). This sticks.",
          correct: "Excellent! You linked kidney dysfunction → K+ danger → heart risk. To strengthen: add one specific food example he must avoid.",
          partial: "Good but vague. Make it STICK: name the food risk (potassium), the organ at risk (heart), the consequence (arrhythmia/death).",
          incomplete: "Patient education must be simple, concrete, scary enough to motivate, and actionable. Name one rule he can't break."
        }
      },
      {
        label: "Follow-up & Escalation",
        question: "At what eGFR threshold should Rajan be referred to nephrology for dialysis planning, and why that number?",
        answerType: "short",
        primaryKeywords: [
          { word: "eGFR 15-20 mL/min", weight: 3 },
          { word: "Stage 5 CKD", weight: 2 },
          { word: "dialysis preparation", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "kidney failure", weight: 1 },
          { word: "dialysis fistula planning", weight: 1 }
        ],
        semanticVariations: {
          "eGFR 15-20 mL/min": ["eGFR <15", "eGFR between 15-20"],
          "Stage 5 CKD": ["Stage 5 kidney disease", "end-stage renal disease"],
          "dialysis preparation": ["start dialysis planning", "prepare for dialysis"]
        },
        hints: [
          "CKD stages: 1, 2, 3a, 3b, 4, 5. Which is kidney 'failure'?",
          "Dialysis doesn't start overnight. When should planning START?",
          "Why eGFR 15-20 and not 5? (Hint: time for fistula maturation, education, etc.)"
        ],
        sampleAnswers: [
          { text: "Refer at eGFR 15-20 (Stage 5 CKD). Below 15 is kidney failure. Early referral allows 3-6 months for fistula creation, education, and planning.", tier: "strong" },
          { text: "When eGFR drops below 15-20, it's time to talk to a nephrologist about dialysis.", tier: "correct" },
          { text: "Refer when kidney function is very low.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You knew the eGFR threshold, named the CKD stage, AND explained the WHY (time for preparation). Advanced understanding.",
          correct: "Excellent! You got the threshold (15-20). To sharpen: explain why that timing (fistula creation, education, planning takes weeks).",
          partial: "Right direction. Get specific: What eGFR? Why that number? Why early vs. waiting?",
          incomplete: "Dialysis planning is not emergency—it's elective surgery. When should you START talking to nephrology so there's time to prepare?"
        }
      }
    ]
  },
  {
    id: 2,
    difficulty: "Hard",
    name: "Priya, 38F", emoji: "👩‍🦱",
    desc: "Day 3 post-GI surgery (small bowel resection). Currently NPO. Transitioning to enteral nutrition. Concerned about wound healing.",
    tags: ["Post-op Day 3", "NPO", "Enteral Nutrition", "Wound Healing"],
    color: "#1D9E75",
    steps: [
      {
        label: "Patient Snapshot",
        question: "When should nutrition support ideally begin post-GI surgery, and why?",
        answerType: "short",
        primaryKeywords: [
          { word: "early enteral nutrition", weight: 2 },
          { word: "24-48 hours post-op", weight: 2 },
          { word: "gut mucosal integrity", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "infection risk reduction", weight: 1 },
          { word: "clinically safe", weight: 1 }
        ],
        semanticVariations: {
          "early enteral nutrition": ["early EN", "early feeding", "immediate EN initiation"],
          "24-48 hours post-op": ["within 24-48h", "first 1-2 days"],
          "gut mucosal integrity": ["maintain gut barrier", "preserve gut function"]
        },
        hints: [
          "Old practice: NPO for days. New practice: feed early. Why?",
          "What happens to the gut if you don't feed it? What happens if you do?",
          "Waiting for bowel sounds: is that still modern practice?"
        ],
        sampleAnswers: [
          { text: "Start early enteral nutrition within 24-48h post-op (if clinically safe) to maintain gut mucosal barrier, reduce infection risk, and support healing.", tier: "strong" },
          { text: "Begin feeding within 1-2 days post-op to keep the gut working and healthy.", tier: "correct" },
          { text: "Feed her soon after surgery.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You nailed modern protocol: early EN maintains gut integrity, reduces infection, supports healing. This is evidence-based and practice-ready.",
          correct: "Great! You got the timing (24-48h). To strengthen: explain WHY early feeding prevents complications (gut barrier, infection).",
          partial: "Right direction. Get specific: How many hours/days? Why is early better than waiting?",
          incomplete: "Old teaching: wait for bowel sounds. New teaching: start early (gut makes its own sounds when fed!). Explain the shift."
        }
      },
      {
        label: "Primary Nutrition Problem",
        question: "Write a PES statement for Priya's nutrition diagnosis on Day 3 post-op.",
        answerType: "short",
        primaryKeywords: [
          { word: "inadequate enteral nutrition intake", weight: 2 },
          { word: "NPO status", weight: 2 },
          { word: "nutritional deficit", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "post-surgical state", weight: 1 },
          { word: "72 hours", weight: 1 },
          { word: "compromised healing", weight: 1 }
        ],
        semanticVariations: {
          "inadequate enteral nutrition intake": ["insufficient EN", "low nutrition intake", "inadequate nutrition"],
          "NPO status": ["nothing by mouth", "NPO order"],
          "nutritional deficit": ["nutrition gap", "72h without feeding"]
        },
        hints: [
          "PES format: Problem + Etiology + Signs/Symptoms",
          "What is the problem? (hint: what's she NOT getting?)",
          "Why? (surgical status, no food allowed)",
          "Evidence? (3 days, no nutrition, wound needs protein)"
        ],
        sampleAnswers: [
          { text: "Inadequate enteral nutrition intake related to NPO status post-GI surgery as evidenced by 72-hour nutrition deficit and at-risk wound healing.", tier: "strong" },
          { text: "Inadequate enteral nutrition related to NPO post-op as evidenced by 3 days without food.", tier: "correct" },
          { text: "She is not eating enough because of surgery.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect PES! You nailed the format and added the consequence (wound healing risk). This is clinical documentation gold.",
          correct: "Excellent PES structure! To enhance: add specificity about the timeline (72h) or healing consequences.",
          partial: "Good PES skeleton. Include: HOW LONG has she been NPO? What's the CONSEQUENCE?",
          incomplete: "PES is standard. Master it: Problem (what's missing?) + Cause (why?) + Proof (what shows it's happening?)."
        }
      },
      {
        label: "Top Priority",
        question: "What is Priya's immediate nutrition priority on Day 3, and why not parenteral nutrition?",
        answerType: "short",
        primaryKeywords: [
          { word: "enteral nutrition", weight: 2 },
          { word: "nasogastric nasojejunal tube", weight: 2 },
          { word: "preserve gut function", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "safer than TPN", weight: 1 },
          { word: "cost-effective", weight: 1 },
          { word: "gut-immune barrier", weight: 1 }
        ],
        semanticVariations: {
          "enteral nutrition": ["EN", "tube feeding", "feeding tube"],
          "nasogastric nasojejunal tube": ["NGT", "NJT", "feeding tube"],
          "preserve gut function": ["maintain gut integrity", "keep gut active"]
        },
        hints: [
          "Enteral (through GI tract) vs. Parenteral (IV)—which uses the gut?",
          "Why is TPN (IV nutrition) a backup, not first choice?",
          "What happens to the gut if you bypass it for too long?"
        ],
        sampleAnswers: [
          { text: "Initiate enteral nutrition via NGT/NJT tube. Enteral preserves gut barrier, is safer than TPN, reduces infection risk, and is cost-effective.", tier: "strong" },
          { text: "Start enteral feeding through a tube to keep the gut working and avoid IV nutrition.", tier: "correct" },
          { text: "Feed her through a tube.", tier: "partial" }
        ],
        feedback: {
          strong: "Outstanding! You chose EN (right choice), named the route (tube), and justified why (gut preservation, safety, cost). This is clinical gold.",
          correct: "Great! You picked EN. To strengthen: explain WHY TPN is reserved for when EN fails (infection risk, liver issues).",
          partial: "Right choice (enteral). Be specific: What tube? Why not parenteral?",
          incomplete: "Golden rule: 'If the gut works, use the gut.' Explain why EN is safer, cheaper, and better than IV nutrition."
        }
      },
      {
        label: "Mechanism",
        question: "Explain why adequate protein is critical for Priya's wound healing. What happens without it?",
        answerType: "short",
        primaryKeywords: [
          { word: "collagen synthesis", weight: 2 },
          { word: "amino acids", weight: 2 },
          { word: "wound healing phases", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "immune function", weight: 1 },
          { word: "tissue repair", weight: 1 }
        ],
        semanticVariations: {
          "collagen synthesis": ["collagen formation", "building scar tissue"],
          "amino acids": ["building blocks", "protein components"],
          "wound healing phases": ["inflammatory proliferative remodeling", "healing stages"]
        },
        hints: [
          "Collagen is 30% glycine + proline. What are those? (amino acids)",
          "Wound healing has 3 phases. All need what to work?",
          "What if a patient runs out of protein during healing? What's the consequence?"
        ],
        sampleAnswers: [
          { text: "Protein provides amino acids (glycine, proline, arginine) for collagen synthesis. All wound healing phases (inflammatory, proliferative, remodeling) need protein; deficiency delays healing and increases infection risk.", tier: "strong" },
          { text: "Protein is needed to build collagen and support the immune system, which protects against infection during healing.", tier: "correct" },
          { text: "Protein is important for healing.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent mechanistic explanation! You named the amino acids, the wound phases, AND the consequences of deficiency. Advanced pathophysiology.",
          correct: "Great! You explained protein's role in healing. To enhance: name specific amino acids (glycine, proline, arginine) and the healing phases.",
          partial: "Good concept. Get specific: What proteins/amino acids? How many healing phases? What happens if protein is deficient?",
          incomplete: "Protein is the foundation of wound healing. Name: amino acids used, healing phases, and what fails without protein."
        }
      },
      {
        label: "Core Nutrition Strategy",
        question: "What protein target should Priya receive post-op, and how does this differ from non-surgical patients?",
        answerType: "short",
        primaryKeywords: [
          { word: "1.2-1.5 g/kg/day", weight: 3 },
          { word: "elevated for surgery", weight: 2 },
          { word: "wound healing stress", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "surgical catabolism", weight: 1 },
          { word: "prevent muscle wasting", weight: 1 }
        ],
        semanticVariations: {
          "1.2-1.5 g/kg/day": ["1.2 to 1.5 grams per kilogram", "elevated protein"],
          "elevated for surgery": ["higher than normal", "stress-related increase"],
          "wound healing stress": ["post-surgical stress", "traumatic injury"]
        },
        hints: [
          "Normal adult protein = ~0.8 g/kg. Post-op is higher. Why?",
          "Surgery is trauma. Trauma increases what breakdown?",
          "How much higher? (Give a range, not a guess.)"
        ],
        sampleAnswers: [
          { text: "1.2-1.5 g/kg/day post-op (vs. 0.8 g/kg normal). Surgical stress increases protein catabolism; elevated intake prevents muscle wasting, supports tissue repair, and maintains immune function.", tier: "strong" },
          { text: "Around 1.2-1.5 grams per kg daily to help the wound heal and prevent muscle loss after surgery.", tier: "correct" },
          { text: "Higher protein is needed after surgery.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You gave the specific target (1.2-1.5 g/kg), compared to baseline (0.8 g/kg), and explained WHY (surgical catabolism). Clinical precision.",
          correct: "Excellent target! To sharpen: mention the baseline (0.8 g/kg) and the metabolic reason (post-op catabolism).",
          partial: "Right direction. Get specific: What's the target? How does it compare to non-surgical patients?",
          incomplete: "Post-op protein needs rise because surgery = trauma = catabolism. Calculate: what's 1.2-1.5 × her body weight?"
        }
      },
      {
        label: "Calorie & Carb Direction",
        question: "What is the appropriate calorie target for Priya in the acute post-op phase, and why avoid overfeeding?",
        answerType: "short",
        primaryKeywords: [
          { word: "25-30 kcal/kg/day", weight: 3 },
          { word: "avoid overfeeding syndrome", weight: 2 },
          { word: "euglycemia target", weight: 1 }
        ],
        secondaryKeywords: [
          { word: "hyperglycemia", weight: 1 },
          { word: "immune suppression", weight: 1 }
        ],
        semanticVariations: {
          "25-30 kcal/kg/day": ["25 to 30 calories per kg", "moderate calorie provision"],
          "avoid overfeeding syndrome": ["prevent refeeding", "don't hyperaliment"],
          "euglycemia target": ["normal blood glucose", "tight glucose control"]
        },
        hints: [
          "More calories = more healing? Not always. What happens if you overfeed?",
          "Overfeeding causes what bad outcomes? (Hint: metabolic, immune, respiratory)",
          "Why is ICU glucose target 140-180, not high-normal?"
        ],
        sampleAnswers: [
          { text: "25-30 kcal/kg/day meets metabolic needs without overfeeding. Excess calories worsen hyperglycemia, impair immune function, increase liver dysfunction, and respiratory complications. Target euglycemia (140-180 mg/dL in ICU).", tier: "strong" },
          { text: "About 25-30 calories per kg to avoid too much feeding, which causes high blood sugar and immune problems.", tier: "correct" },
          { text: "Avoid giving too many calories.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You quantified the target, explained overfeeding harms (hyperglycemia, immune suppression, respiratory), and mentioned glucose targets. Advanced.",
          correct: "Great target! To enhance: explain specific harms of overfeeding (glucose, immune, liver) and the glucose target in ICU.",
          partial: "Right concept. Why exactly is overfeeding bad? What metabolic/clinical consequences?",
          incomplete: "Counterintuitive but true: more calories can harm post-op recovery. Explain the mechanisms of overfeeding harm."
        }
      },
      {
        label: "Practical Food Application",
        question: "Which enteral formula is appropriate for Priya, and how should feeding be initiated and advanced?",
        answerType: "short",
        primaryKeywords: [
          { word: "polymeric formula", weight: 2 },
          { word: "20-25 mL/h start", weight: 2 },
          { word: "advance every 8-12 hours", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "monitor gastric residuals", weight: 1 },
          { word: "assess tolerance", weight: 1 }
        ],
        semanticVariations: {
          "polymeric formula": ["standard formula", "whole-protein formula"],
          "20-25 mL/h start": ["start low", "low infusion rate"],
          "advance every 8-12 hours": ["gradual advancement", "slow escalation"]
        },
        hints: [
          "Post-GI surgery: gut is healing. Use easy-to-digest (polymeric vs. elemental)?",
          "Start low and go slow. Why low initial rate?",
          "How fast can you increase without causing distension/diarrhea?"
        ],
        sampleAnswers: [
          { text: "Polymeric (standard whole-protein) formula started at 20-25 mL/h, advanced every 8-12h as tolerated. Monitor gastric residuals (<200mL acceptable), assess tolerance (nausea, distension), adjust if needed.", tier: "strong" },
          { text: "Start with regular formula at a slow rate (20-25 mL/h) and increase it gradually over days, watching for side effects.", tier: "correct" },
          { text: "Give her a feeding formula slowly.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You chose the right formula (polymeric), specified the starting rate (20-25 mL/h), advancement schedule (every 8-12h), AND monitoring (residuals, tolerance). Practice-ready.",
          correct: "Great! You got the formula and slow start. To enhance: mention advancement schedule, residual volumes, tolerance signs.",
          partial: "Right approach. Specify: What formula? Starting rate? How fast to increase?",
          incomplete: "Post-GI surgery protocol: slow start, gradual advance, frequent monitoring. Quantify all three aspects."
        }
      },
      {
        label: "Monitoring Parameters",
        question: "What should be monitored DAILY for Priya on enteral nutrition, and what values are concerning?",
        answerType: "short",
        primaryKeywords: [
          { word: "gastric residuals", weight: 2 },
          { word: "blood glucose", weight: 2 },
          { word: "fluid balance electrolytes", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "tolerance nausea distension", weight: 1 },
          { word: "wound healing", weight: 1 }
        ],
        semanticVariations: {
          "gastric residuals": ["GRV", "residual volumes"],
          "blood glucose": ["glucose levels", "SMBG"],
          "fluid balance electrolytes": ["I&O balance", "electrolytes"]
        },
        hints: [
          "What tells you the tube feeding is working? (residuals, tolerance)",
          "What metabolic risk post-op? (hyperglycemia, refeeding risk)",
          "When is a residual volume of 300mL acceptable vs. concerning?"
        ],
        sampleAnswers: [
          { text: "Daily: gastric residuals (<200mL goal), blood glucose (target 140-180 ICU), fluid balance/I&O, electrolytes (refeeding risk), bowel tolerance (nausea, distension), wound healing progress.", tier: "strong" },
          { text: "Check stomach contents, blood sugar, fluid intake and output, and how she's tolerating the tube feeding.", tier: "correct" },
          { text: "Monitor how she's doing on the feeding.", tier: "partial" }
        ],
        feedback: {
          strong: "Excellent! You listed daily parameters (residuals, glucose, I&O, electrolytes), specified targets (GRV <200, glucose 140-180), AND added wound assessment. Comprehensive.",
          correct: "Great parameters! To strengthen: mention specific target values (e.g., residuals <200mL, glucose 140-180) and escalation triggers.",
          partial: "Right monitoring items. Specify: What are normal values? What's concerning? When to hold feeding?",
          incomplete: "Monitoring post-op EN requires daily vigilance. Define: what to check, how often, normal ranges, and red flags."
        }
      },
      {
        label: "Patient Education",
        question: "When transitioning Priya from enteral to oral feeding post-op, describe the stepwise diet progression and why it matters.",
        answerType: "short",
        primaryKeywords: [
          { word: "clear liquids", weight: 1 },
          { word: "full liquids", weight: 1 },
          { word: "soft low-residue diet", weight: 1 },
          { word: "progression based on tolerance", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "prevent anastomotic leak", weight: 1 },
          { word: "prevent ileus", weight: 1 }
        ],
        semanticVariations: {
          "clear liquids": ["water broth juice", "transparent liquids"],
          "full liquids": ["pudding milk", "opaque liquids"],
          "soft low-residue diet": ["easy-to-digest foods", "bland diet"],
          "progression based on tolerance": ["gradual diet advancement", "step-wise increase"]
        },
        hints: [
          "Anastomosis (surgical join) is fragile. What happens if you feed heavy foods too fast?",
          "Ileus = gut paralysis. What helps avoid it? (hint: gradual feeding)",
          "Name the 4 diet levels and what makes each safe."
        ],
        sampleAnswers: [
          { text: "Clear liquids (water, broth, juice) → full liquids (milk, pudding) → soft/low-residue → regular diet, each 12-24h, progressing only if tolerated. Prevents anastomotic leak and ileus.", tier: "strong" },
          { text: "Start with liquids, then thicker liquids, then soft foods, then normal food. Go slowly to prevent the surgical connection from leaking.", tier: "correct" },
          { text: "Gradually increase diet after surgery.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You named all 4 diet levels, specified timing (12-24h each), and explained the WHY (anastomotic integrity, ileus prevention). This is patient-safe education.",
          correct: "Excellent progression! To enhance: explain WHY each step (why clear before full liquids? why soft before regular?).",
          partial: "Good sequence. Explain: Why start with clear liquids? Why soft foods before regular? Why the time delays?",
          incomplete: "Post-GI surgery feeding is mechanical progression. Explain: fragile surgical join (anastomosis) + gradual gut recovery = careful steps."
        }
      },
      {
        label: "Follow-up & Escalation",
        question: "When should Priya's team consider Total Parenteral Nutrition (TPN), and what are the risks?",
        answerType: "short",
        primaryKeywords: [
          { word: "enteral nutrition fails", weight: 2 },
          { word: "meets <60% needs after 5-7 days", weight: 2 },
          { word: "EN contraindicated", weight: 2 }
        ],
        secondaryKeywords: [
          { word: "CLABSI risk", weight: 1 },
          { word: "liver dysfunction", weight: 1 }
        ],
        semanticVariations: {
          "enteral nutrition fails": ["EN doesn't work", "EN intolerance"],
          "meets <60% needs after 5-7 days": ["insufficient EN after week"],
          "EN contraindicated": ["obstruction fistula", "EN not possible"]
        },
        hints: [
          "TPN is a backup, not first-line. When does it become necessary?",
          "What complications does TPN carry that EN doesn't? (Hint: infections, liver)",
          "How long should you try EN before saying 'it's not working'?"
        ],
        sampleAnswers: [
          { text: "Consider TPN only if EN is contraindicated (obstruction, fistula, severe intolerance) OR if EN meets <60% of needs after 5-7 days of optimization. TPN carries CLABSI risk, liver dysfunction risk—use cautiously.", tier: "strong" },
          { text: "TPN is used if the tube feeding doesn't work or can't be given. It has risks like line infections and liver problems.", tier: "correct" },
          { text: "TPN can be used if needed.", tier: "partial" }
        ],
        feedback: {
          strong: "Perfect! You defined TPN indications (EN failure/contraindication), timeline (after 5-7d), AND risks (CLABSI, liver). This is advanced escalation thinking.",
          correct: "Great! You identified when TPN is used and some risks. To strengthen: be specific about timelines and complications (name them).",
          partial: "Right concept. When exactly? After how long? What specific risks make TPN dangerous?",
          incomplete: "TPN is expensive, risky (infection, liver), and invasive. Define: when to use, what makes EN preferable, what are the actual complications."
        }
      }
    ]
  }
];

export const PEARLS = [
  {
    clue: "I happen when you feed a starved patient too fast. I drop dangerously in the blood within 72 hours. Cardiac arrhythmias and respiratory failure follow. What am I?",
    answer: "Hypophosphatemia", options: ["Hypokalemia", "Hypophosphatemia", "Hyponatremia", "Hypocalcemia"], correct: 1,
    detail: "Refeeding syndrome hallmark. Phosphate shifts into cells when insulin surges on refeeding. Monitor P, K, Mg closely. Start feeds at 10 kcal/kg/day in high-risk patients.",
    wrongReasons: [
      "Hypokalemia also drops in refeeding, but it is not the hallmark electrolyte — phosphate is the primary driver of life-threatening complications.",
      null,
      "Hyponatremia relates to fluid imbalance, not the insulin-driven intracellular shift that defines refeeding syndrome.",
      "Hypocalcemia is not the defining electrolyte abnormality in refeeding syndrome."
    ],
    approach: "Think: what happens when you suddenly give carbohydrates to a starved body? Insulin surges → drives electrolytes INTO cells. Phosphate is the one that drops most critically and causes cardiac + respiratory failure."
  },
  {
    clue: "I am the rule that saves a hypoglycemic patient. I involve a number, a wait, and a repeat. Dietitians and nurses both know me well. What am I?",
    answer: "Rule of 15", options: ["Rule of 10", "Rule of 15", "Rule of 20", "Rule of 30"], correct: 1,
    detail: "15g fast carbs → wait 15 min → recheck glucose. If still <70 mg/dL, repeat. Always follow with a sustained snack to prevent rebound hypoglycemia.",
    wrongReasons: [
      "10g is not enough carbohydrate to reliably raise blood glucose in a hypoglycemic episode — the standard is 15g.",
      null,
      "20g overshoots — it can cause rebound hyperglycemia. Precision matters in glucose management.",
      "30g is far too much and will spike glucose dangerously. The rule is specifically 15g for a reason."
    ],
    approach: "The clue says 'a number, a wait, and a repeat' — this is a protocol. Think: what is the standard fast-acting carb dose for hypoglycemia treatment? 15g is the evidence-based amount that raises glucose ~2-3 mmol/L within 15 minutes."
  },
  {
    clue: "I am a dangerous trio in CKD patients. Low albumin, shrinking muscles, and unexplained weight loss together describe me. I signal the dietitian to escalate immediately. What am I?",
    answer: "Protein-Energy Wasting", options: ["Malnutrition", "Protein-Energy Wasting", "Sarcopenia", "Cachexia"], correct: 1,
    detail: "PEW in CKD: serum albumin <3.5g/dL + involuntary weight loss + reduced muscle mass. Triggers urgent dietitian review regardless of renal diet restrictions.",
    wrongReasons: [
      "Malnutrition is a broad term. PEW is the CKD-specific syndrome — it has a precise definition involving biochemical markers, body mass, and dietary intake simultaneously.",
      null,
      "Sarcopenia refers specifically to muscle loss with age — it does not capture the biochemical (albumin) and metabolic components that define PEW in CKD.",
      "Cachexia is associated with cancer/inflammation-driven wasting. PEW is the correct term for the CKD context with its specific diagnostic criteria."
    ],
    approach: "The clue gives you three components: biochemical (albumin), body composition (muscle), and weight. In CKD, this specific triad has a name — Protein-Energy Wasting. Always think: what is the CKD-specific term for this syndrome?"
  },
  {
    clue: "I tell you whether a patient is building or breaking down. When I am positive, healing happens. When I am negative, muscle is being lost. I am calculated from protein intake and urine. What am I?",
    answer: "Nitrogen Balance", options: ["Protein Score", "Nitrogen Balance", "Albumin Trend", "Caloric Deficit"], correct: 1,
    detail: "N balance = N in (protein ÷ 6.25) minus N out (UUN + 4g losses). Positive = anabolic. Negative = catabolic. Goal post-surgery: +2 to +4g/day.",
    wrongReasons: [
      "'Protein Score' is not a clinical measurement. There is no such standard tool.",
      null,
      "Albumin trend reflects nutritional status over weeks — it does not tell you in real-time whether the patient is anabolic or catabolic right now.",
      "Caloric deficit tells you about energy, not protein metabolism. Nitrogen balance specifically measures protein anabolism vs catabolism."
    ],
    approach: "The clue says 'calculated from protein intake and urine' — this is the formula: N in (dietary protein ÷ 6.25) minus N out (urinary urea nitrogen + 4g). Positive = building. Negative = breaking down."
  },
  {
    clue: "I am a small snack with a big job. I bridge the gap between a basal insulin injection and the dangerous early morning hours. Without me, a T2DM patient wakes up dizzy and sweating. What am I?",
    answer: "Bedtime Snack", options: ["Morning Supplement", "Bedtime Snack", "Pre-meal Bolus", "Midnight Glucose Drip"], correct: 1,
    detail: "15-20g complex carb + protein at bedtime prevents nocturnal hypoglycemia in insulin-dependent T2DM. Basal insulin peaks at 2-4am — this snack bridges the gap.",
    wrongReasons: [
      "A morning supplement comes after the hypoglycemia has already happened — it does not prevent the overnight glucose drop.",
      null,
      "A pre-meal bolus is rapid-acting insulin given before meals — it is not a food intervention and does not address overnight basal insulin action.",
      "A midnight glucose drip is a hospital intervention, not a practical dietary strategy for outpatient T2DM management."
    ],
    approach: "Think about timing: basal insulin acts continuously and peaks at 2-4am. Without food, glucose drops during sleep. The solution is a snack at BEDTIME — before sleep — to provide sustained glucose through the night."
  },
  {
    clue: "I am a screening tool used on every hospital admission. I combine BMI, weight loss percentage, and acute disease effect into a single risk score. A score of 2 or more means act now. What am I?",
    answer: "MUST Score", options: ["NRS-2002", "MUST Score", "SGA Tool", "MNA Score"], correct: 1,
    detail: "Malnutrition Universal Screening Tool. Score 0 = low risk, 1 = medium, ≥2 = high risk requiring immediate dietitian intervention and nutrition support plan.",
    wrongReasons: [
      "NRS-2002 is used in hospitals but scores differently — it includes disease severity and age. The clue describes MUST's specific three-component structure.",
      null,
      "SGA (Subjective Global Assessment) is a clinical assessment tool, not a quick screening score. It requires a full clinical interview.",
      "MNA (Mini Nutritional Assessment) is designed specifically for elderly patients — not a universal hospital admission screen."
    ],
    approach: "The clue gives you the exact three components: BMI + weight loss % + acute disease effect. This is the MUST formula. Know your screening tools: MUST = community/hospital universal, NRS-2002 = hospital, MNA = elderly, SGA = detailed clinical assessment."
  },
  {
    clue: "I am a cooking technique that can remove up to 60% of a dangerous mineral from vegetables. CKD patients depend on me to eat safely. I involve peeling, soaking, boiling, and discarding. What am I?",
    answer: "Potassium Leaching", options: ["Blanching", "Potassium Leaching", "Steaming", "Pressure Cooking"], correct: 1,
    detail: "Peel → small cuts → soak 2h in cold water → boil in large water volume → discard water. Reduces vegetable potassium by 30-60%, allowing more dietary variety in CKD.",
    wrongReasons: [
      "Blanching (brief boiling then ice water) is used to preserve colour and texture — it does not significantly reduce potassium content.",
      null,
      "Steaming retains minerals — it is the worst method for potassium reduction in CKD patients. Water contact is essential for leaching.",
      "Pressure cooking uses less water and higher heat — it does not leach potassium effectively. You need large volumes of water that are then discarded."
    ],
    approach: "The key mechanism is water-soluble mineral extraction. Potassium dissolves into water. So the technique must involve: maximum water contact + discarding that water. Peel → small cuts (more surface area) → soak → boil in large water → discard. That is leaching."
  },
  {
    clue: "I am the preferred route of nutrition in almost every clinical situation. I keep the gut lining intact, reduce infection risk, and cost less than my alternative. My motto is: if it works, use it. What am I?",
    answer: "Enteral Nutrition", options: ["Parenteral Nutrition", "Enteral Nutrition", "Oral Supplements", "IV Dextrose"], correct: 1,
    detail: "Enteral nutrition (via gut) maintains mucosal integrity, prevents bacterial translocation, is cheaper and safer than TPN. Always preferred unless gut is non-functional.",
    wrongReasons: [
      "Parenteral nutrition (IV) is the alternative — it bypasses the gut, carries higher infection risk (CLABSI), causes gut atrophy, and is far more expensive. It is used only when the gut cannot be used.",
      null,
      "Oral supplements are ideal when a patient can eat, but the clue says 'almost every clinical situation' including those who cannot eat orally — tube feeding is the broader answer.",
      "IV Dextrose provides only glucose — it is not nutrition support. It cannot meet protein, fat, or micronutrient needs."
    ],
    approach: "The motto 'if it works, use it' refers to the gut. Enteral = via the gut (tube or oral). The gut is always preferred because it maintains the gut barrier, immune function, and microbiome. Only bypass it when absolutely necessary."
  }
];

export const TRIGGERS = [
  {
    scenario: "A 55F T2DM patient on Insulin Glargine reports waking up dizzy and sweating at 3am. Blood glucose: 58 mg/dL. She skipped dinner last night.",
    steps: [
      { label: "IF", color: "#E6F1FB", textColor: "#185FA5", placeholder: "What is the clinical problem here?" },
      { label: "BECAUSE", color: "#FAEEDA", textColor: "#854F0B", placeholder: "What is the underlying cause/mechanism?" },
      { label: "THEN", color: "#E1F5EE", textColor: "#0F6E56", placeholder: "What is your immediate intervention?" },
      { label: "MONITOR", color: "#EEEDFE", textColor: "#3C3489", placeholder: "What will you track going forward?" }
    ],
    answers: [
      "Patient has nocturnal hypoglycemia (BG 58 mg/dL) on basal insulin",
      "Insulin Glargine acts continuously overnight — without food, glucose drops during peak action at 2-4am",
      "Prescribe mandatory 15-20g complex carbohydrate + protein bedtime snack. Educate: snack is part of insulin management, not optional",
      "3am blood glucose checks, fasting morning glucose log, review insulin dose with endocrinologist if hypoglycemia persists"
    ]
  },
  {
    scenario: "CKD Stage 3b patient, K+ = 6.1 mEq/L. He eats 2 bananas daily, tomato curry, and coconut water. eGFR = 32. He says he eats 'healthy.'",
    steps: [
      { label: "IF", color: "#E6F1FB", textColor: "#185FA5", placeholder: "What is the clinical problem?" },
      { label: "BECAUSE", color: "#FAEEDA", textColor: "#854F0B", placeholder: "Why is this happening despite 'healthy' eating?" },
      { label: "THEN", color: "#E1F5EE", textColor: "#0F6E56", placeholder: "What dietary intervention do you prescribe?" },
      { label: "MONITOR", color: "#EEEDFE", textColor: "#3C3489", placeholder: "What labs and signs will you track?" }
    ],
    answers: [
      "Dangerous hyperkalemia (K+ 6.1 mEq/L) — risk of fatal cardiac arrhythmia",
      "CKD impairs renal potassium excretion. His 'healthy' foods (banana ~422mg K, tomato, coconut water ~600mg K) are extremely high in potassium",
      "Restrict dietary K+ to <2000mg/day. Eliminate banana, coconut water, tomatoes. Teach potassium leaching for vegetables. Ensure adequate calories to prevent PEW",
      "Serum K+ weekly until stable, eGFR monthly, watch for cardiac symptoms, reassess diet diary at each visit"
    ]
  },
  {
    scenario: "Post-op Day 2 patient on enteral nutrition develops abdominal distension, nausea, and gastric residuals of 350ml. She is on 60ml/h EN rate.",
    steps: [
      { label: "IF", color: "#E6F1FB", textColor: "#185FA5", placeholder: "What is the clinical problem?" },
      { label: "BECAUSE", color: "#FAEEDA", textColor: "#854F0B", placeholder: "What is causing this?" },
      { label: "THEN", color: "#E1F5EE", textColor: "#0F6E56", placeholder: "What is your immediate action?" },
      { label: "MONITOR", color: "#EEEDFE", textColor: "#3C3489", placeholder: "What will you reassess and when?" }
    ],
    answers: [
      "Enteral feeding intolerance — gastric residuals >250-300ml with distension and nausea",
      "EN rate too high for current gut motility post-surgery. Delayed gastric emptying is common post-op",
      "Hold EN temporarily. Reduce rate to last tolerated level (20-25ml/h). Consider prokinetic (metoclopramide). If persistent, switch to post-pyloric NJT or discuss TPN",
      "Reassess residuals every 4h, monitor distension and bowel sounds, advance rate only when residuals <200ml and symptoms resolve"
    ]
  }
];

export const QUIZ_QS = [
  { q: "Normal serum albumin range?", opts: ["2.0-2.5 g/dL", "3.5-5.0 g/dL", "5.5-7.0 g/dL", "1.0-1.5 g/dL"], c: 1, exp: "Albumin 3.5-5.0 g/dL is normal. Below 3.5 suggests malnutrition or inflammation." },
  { q: "Which electrolyte is most critical to restrict in CKD?", opts: ["Iron", "Zinc", "Potassium", "Iodine"], c: 2, exp: "Potassium — impaired renal excretion in CKD leads to hyperkalemia, risking fatal arrhythmias." },
  { q: "Target blood glucose in ICU patients on enteral nutrition?", opts: ["60-80 mg/dL", "140-180 mg/dL", "200-250 mg/dL", "100-120 mg/dL"], c: 1, exp: "140-180 mg/dL is the ASPEN/SCCM target. Tight control (<110) increases hypoglycemia risk." },
  { q: "Bedtime snack carbohydrate goal for T2DM on basal insulin?", opts: ["50g protein", "15-20g carbohydrate", "100g fat", "No snack needed"], c: 1, exp: "15-20g complex carb + protein bridges the overnight insulin action, preventing nocturnal hypoglycemia." },
  { q: "PES in nutrition diagnosis stands for?", opts: ["Patient-Eating-Summary", "Problem-Etiology-Signs/Symptoms", "Plan-Evaluation-Strategy", "Protein-Energy-Score"], c: 1, exp: "Problem (nutrition diagnosis) + Etiology (cause) + Signs/Symptoms (evidence). The standard clinical nutrition diagnosis format." },
  { q: "When should early enteral nutrition begin post-GI surgery?", opts: ["Day 7", "Day 14", "Within 24-48 hours", "Only after bowel sounds return"], c: 2, exp: "ESPEN/ASPEN guidelines: early EN within 24-48h maintains gut integrity and reduces infection risk. Waiting for bowel sounds is outdated." },
  { q: "Protein target for post-surgical wound healing?", opts: ["0.4 g/kg/day", "0.8 g/kg/day", "1.2-1.5 g/kg/day", "3.0 g/kg/day"], c: 2, exp: "1.2-1.5g/kg/day supports collagen synthesis, immune function, and tissue repair. Surgical stress increases protein catabolism." },
  { q: "Which vitamin is essential for collagen synthesis?", opts: ["Vitamin B12", "Vitamin D", "Vitamin C", "Vitamin A"], c: 2, exp: "Vitamin C (ascorbic acid) is a cofactor for prolyl and lysyl hydroxylase — enzymes critical for collagen cross-linking and wound healing." },
  { q: "Refeeding syndrome hallmark electrolyte abnormality?", opts: ["Hypernatremia", "Hypophosphatemia", "Hypercalcemia", "Hyperchloremia"], c: 1, exp: "Hypophosphatemia — insulin surge on refeeding drives phosphate into cells, causing dangerous serum drops. Can cause cardiac arrest." },
  { q: "MUST score ≥ 2 indicates?", opts: ["Low nutrition risk", "Medium risk", "High nutrition risk — act now", "Normal nutritional status"], c: 2, exp: "MUST ≥2 = high malnutrition risk. Requires immediate dietitian referral, nutrition support plan, and monitoring." },
  { q: "Protein intake for non-dialysis CKD Stage 3b?", opts: ["2.0 g/kg/day", "0.6-0.8 g/kg/day", "1.5 g/kg/day", "No restriction"], c: 1, exp: "0.6-0.8g/kg/day reduces uremic waste production and slows CKD progression. Must be paired with adequate calories (30-35 kcal/kg) to prevent PEW." },
  { q: "What does a positive nitrogen balance indicate?", opts: ["Muscle breakdown", "Anabolism — tissue building and healing", "Protein deficiency", "Overfeeding"], c: 1, exp: "Positive N balance = protein intake exceeds losses = anabolic state. Goal post-surgery: +2 to +4g N/day to support wound healing." }
];

export const CONCEPTS = [
  { icon: "📈", title: "Glycemic Index (GI)", color: "#FAEEDA", iconBg: "#EF9F2720", textColor: "#854F0B", hint: "How fast carbs raise blood sugar", tags: ["T2DM", "Carbs", "Blood Sugar"], body: "GI measures how fast a carbohydrate raises blood glucose. Low GI (≤55): oats, legumes, milk. High GI (≥70): white bread, glucose drinks, white rice. In T2DM, prefer low-to-medium GI foods to prevent glucose spikes and improve insulin sensitivity." },
  { icon: "⚠️", title: "Protein-Energy Wasting", color: "#FAECE7", iconBg: "#D85A3020", textColor: "#D85A30", hint: "The CKD malnutrition paradox", tags: ["CKD", "Protein", "Malnutrition"], body: "PEW in CKD: simultaneous protein deficiency + inadequate energy. Signs: albumin <3.5g/dL, weight loss, muscle wasting. Paradox: restrict protein (0.6-0.8g/kg) BUT ensure adequate calories (30-35kcal/kg) to prevent catabolism. Both goals must be met simultaneously." },
  { icon: "🔄", title: "Enteral vs Parenteral", color: "#E1F5EE", iconBg: "#1D9E7520", textColor: "#0F6E56", hint: "If the gut works, use it", tags: ["Post-op", "Tube Feeding", "TPN"], body: "Enteral (via gut) is ALWAYS preferred: maintains gut mucosal integrity, prevents bacterial translocation, lower infection risk, cheaper. Parenteral (IV) is reserved for contraindicated EN or inadequate enteral intake after 5-7 days. 'If the gut works, use it.'" },
  { icon: "⚖️", title: "Nitrogen Balance", color: "#E6F1FB", iconBg: "#378ADD20", textColor: "#185FA5", hint: "Are you building or breaking down?", tags: ["Post-op", "Protein", "Healing"], body: "N balance = N in (protein ÷ 6.25) minus N out (UUN + 4g skin/fecal losses). Positive = anabolic (healing). Negative = catabolic (muscle loss). Goal post-surgery: +2 to +4g/day. Achieved by adequate protein + calorie intake." },
  { icon: "🥦", title: "Potassium Leaching", color: "#EEEDFE", iconBg: "#7F77DD20", textColor: "#3C3489", hint: "CKD-safe vegetable prep", tags: ["CKD", "Potassium", "Cooking"], body: "Reduces K in vegetables by 30-60%: 1) Peel 2) Cut into small pieces 3) Soak in cold water 2h 4) Boil in large volume of water (10x) 5) Discard water. Never reuse the water or steam. Allows more vegetable variety in CKD diet." },
  { icon: "🌙", title: "Bedtime Snack Rule", color: "#FAEEDA", iconBg: "#EF9F2720", textColor: "#854F0B", hint: "Insulin management, not optional", tags: ["T2DM", "Insulin", "Hypoglycemia"], body: "For insulin-dependent diabetics: a 15-20g complex carbohydrate + protein snack at bedtime prevents nocturnal hypoglycemia. E.g., 1 cup milk (12g carb, 8g protein) + 2 crackers (10g carb). Basal insulin peaks at 2-4am — this snack is medical nutrition therapy, not optional." }
];
