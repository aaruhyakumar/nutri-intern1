export const CASES = [
  {
    id: 0,
    difficulty: "Moderate",
    name: "Meena, 55F", emoji: "👩",
    desc: "T2DM, on Insulin Glargine + Metformin. BMI 28.5. Admitted for recurrent nocturnal hypoglycemia.",
    tags: ["T2DM", "Insulin", "Hypoglycemia", "Overweight"],
    color: "#EF9F27",
    steps: [
      { label: "Patient Snapshot", question: "What is the primary nutrition concern for Meena based on her presentation?",
        options: ["Hyperglycemia management","Nocturnal hypoglycemia from inadequate bedtime nutrition","Obesity-focused weight loss","Micronutrient deficiency"],
        correct: 1, explanation: "Meena's recurrent nocturnal hypoglycemia is directly linked to her insulin regimen and insufficient bedtime carbohydrate intake. The bedtime snack prevents overnight glucose drops." },
      { label: "Primary Nutrition Problem", question: "Which PES statement best describes Meena's condition?",
        options: ["Overweight (NI-5.3) related to excess calorie intake","Inadequate carbohydrate intake (NI-5.8.1) related to lack of bedtime snack as evidenced by nocturnal hypoglycemia","Protein-energy malnutrition related to poor appetite","Disordered eating related to fear of hypoglycemia"],
        correct: 1, explanation: "The PES format: Problem (Inadequate carb intake) + Etiology (no bedtime snack) + Signs/Symptoms (documented hypoglycemia episodes). This is the correct clinical nutrition diagnosis." },
      { label: "Top Priority", question: "What is the single most urgent nutrition intervention for Meena?",
        options: ["Reduce total daily calories","Prescribe a 15-20g carbohydrate bedtime snack","Eliminate all simple sugars","Initiate enteral nutrition"],
        correct: 1, explanation: "A 15-20g carbohydrate bedtime snack (e.g., 1 cup milk + 2 crackers) provides slow glucose release overnight, preventing the insulin-glucose mismatch that causes nocturnal hypoglycemia." },
      { label: "Mechanism", question: "WHY does a bedtime snack prevent nocturnal hypoglycemia?",
        options: ["It cancels out the insulin dose","It provides a sustained glucose source to counteract peak insulin action during early sleep hours","It increases liver glycogen storage permanently","It suppresses cortisol overnight"],
        correct: 1, explanation: "Insulin Glargine peaks and basal insulin remains active. Without carbohydrate, blood glucose drops. A slow-digesting carb + protein snack provides steady glucose release matching basal insulin action." },
      { label: "Core Nutrition Strategy", question: "Which overall dietary pattern is best for Meena?",
        options: ["Ketogenic diet (very low carb)","Consistent carbohydrate distribution across 3 meals + 2-3 snacks","High-protein, low-fat diet","Intermittent fasting (16:8)"],
        correct: 1, explanation: "Carbohydrate consistency at each meal and snack stabilizes blood glucose fluctuations. Predictable carb intake allows insulin doses to be adjusted accurately." },
      { label: "Calorie & Carb Direction", question: "What carbohydrate range is typically recommended for T2DM management?",
        options: ["< 20g/day (ketogenic)","45-60g per meal + 15-30g per snack","200g+ per meal","No restriction needed"],
        correct: 1, explanation: "For T2DM with insulin: ~45-60g carbs/meal and 15-30g/snack allows predictable postprandial glucose rises that match insulin pharmacokinetics. Adjust based on SMBG." },
      { label: "Practical Food Application", question: "Which bedtime snack is BEST suited for Meena?",
        options: ["A glass of fruit juice (high GI, fast absorption)","1 cup warm low-fat milk + 2 whole wheat crackers","A large banana alone","Sweetened yogurt"],
        correct: 1, explanation: "Milk provides protein + lactose (slower carb), crackers add complex carbs. Together they provide sustained glucose release. Fruit juice is too fast-acting and won't last the night." },
      { label: "Monitoring Parameters", question: "Which monitoring parameter is MOST critical for Meena?",
        options: ["Weekly weight","3am blood glucose checks + fasting glucose log","Daily HbA1c testing","Monthly lipid panel only"],
        correct: 1, explanation: "3am glucose checks confirm whether hypoglycemia is occurring (< 70mg/dL). Combined with fasting morning levels, this guides snack timing and insulin dose adjustments." },
      { label: "Patient Education", question: "What is the single most important thing to teach Meena?",
        options: ["Count every calorie consumed","Never skip the bedtime snack — it is part of her insulin management","Avoid all carbohydrates after 6pm","Exercise immediately after the snack"],
        correct: 1, explanation: "Simple, actionable education: the bedtime snack is as important as her insulin injection. Skipping it creates the same risk as a missed glucose-raising mechanism." },
      { label: "Follow-up & Escalation", question: "When should Meena be escalated to the endocrinologist?",
        options: ["Only if HbA1c > 10%","If hypoglycemia persists despite correct snack timing and insulin review","When she gains weight","After 6 months of dietary intervention"],
        correct: 1, explanation: "Persistent hypoglycemia despite dietary optimization signals insulin dose may need adjustment. This requires physician/endocrinologist review — the dietitian's role is to flag and refer appropriately." }
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
      { label: "Patient Snapshot", question: "What is the primary nutritional risk in CKD Stage 3b?", options: ["Vitamin C toxicity","Protein-energy wasting + electrolyte imbalance","Hypoglycemia","Iron overload"], correct: 1, explanation: "CKD patients face protein-energy wasting (PEW) while simultaneously needing protein restriction to reduce uremic load. Electrolyte management (K, P, Na) is equally critical." },
      { label: "Primary Nutrition Problem", question: "What is the most urgent electrolyte concern for Rajan?", options: ["Low sodium","Hyperkalemia (K⁺ 5.6 mEq/L)","Low calcium","Hypomagnesemia"], correct: 1, explanation: "K⁺ of 5.6 is above normal (3.5-5.0). In CKD, kidneys cannot excrete potassium efficiently. Hyperkalemia risks fatal arrhythmias — immediate dietary potassium restriction is critical." },
      { label: "Top Priority", question: "What protein intake is recommended for non-dialysis CKD Stage 3b?", options: ["2.0 g/kg/day (high protein)","0.6-0.8 g/kg/day (low-protein diet)","No protein restriction","5g/day"], correct: 1, explanation: "Low-protein diet (0.6-0.8g/kg) reduces nitrogenous waste accumulation and slows CKD progression. However, adequate calories (30-35 kcal/kg) must accompany this to prevent PEW." },
      { label: "Mechanism", question: "Why does protein restriction help in CKD?", options: ["It eliminates all kidney disease","It reduces urea, creatinine, and phosphate production, reducing the kidneys' filtration burden","It increases eGFR permanently","It prevents hypertension only"], correct: 1, explanation: "Every gram of protein metabolized produces nitrogenous waste. Reducing intake decreases the uremic milieu, slows glomerular hyperfiltration damage, and delays dialysis initiation." },
      { label: "Core Nutrition Strategy", question: "Which food should Rajan LIMIT most strictly?", options: ["White rice","Bananas, potatoes, tomatoes (high-K foods)","Low-fat dairy","Eggs"], correct: 1, explanation: "Bananas (~422mg K), potatoes (~900mg K), tomatoes — all high-potassium foods must be restricted. Leaching vegetables (boiling with excess water and discarding) can reduce potassium by 50-60%." },
      { label: "Calorie & Carb Direction", question: "Why is adequate calorie intake critical when protein is restricted?", options: ["Extra calories cure CKD","Without sufficient calories, the body catabolizes muscle protein — worsening uremia","It prevents edema","Calories replace protein function"], correct: 1, explanation: "Protein-sparing effect: adequate carbohydrates and fats provide energy so dietary protein (and muscle protein) is used for tissue maintenance, not fuel. This prevents PEW in CKD." },
      { label: "Practical Food Application", question: "Which is the best protein source for Rajan?", options: ["Red meat (high phosphorus + protein)","Egg whites (high biological value, low phosphorus)","Lentils (high potassium)","Cheese (high phosphorus)"], correct: 1, explanation: "Egg whites provide high biological value protein with minimal phosphorus and potassium. High-BV proteins allow lower quantities to meet amino acid requirements, supporting the restricted protein goal." },
      { label: "Monitoring Parameters", question: "Which lab must be monitored most frequently for Rajan?", options: ["Blood glucose","Serum potassium, creatinine, eGFR, phosphate monthly","Cholesterol only","Vitamin D annually"], correct: 1, explanation: "Monthly renal panel tracks disease progression and guides dietary adjustments. Rising K+ or falling eGFR signals need for stricter restriction or dialysis referral." },
      { label: "Patient Education", question: "What cooking technique reduces potassium in vegetables?", options: ["Steaming (retains all minerals)","Peeling, cutting small, boiling in large water volume, discarding water (leaching)","Microwaving","Eating raw"], correct: 1, explanation: "Leaching: peel → small cuts → soak 2h → boil in 10x water volume → drain. Removes 30-60% of potassium. This allows more vegetable variety while controlling K intake." },
      { label: "Follow-up & Escalation", question: "At what eGFR should dialysis be discussed?", options: ["> 60 mL/min","< 15 mL/min (Stage 5 CKD)","< 45 mL/min","When creatinine hits 2.0"], correct: 1, explanation: "eGFR < 15 marks Stage 5 (kidney failure). Dialysis preparation begins at eGFR 15-20. The dietitian should flag declining eGFR trends and ensure nephrology and patient are informed." }
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
      { label: "Patient Snapshot", question: "When should nutrition support ideally begin post-GI surgery?", options: ["Only after bowel sounds return (day 5-7)","Early enteral nutrition within 24-48h post-op is preferred if clinically safe","Only when patient is fully alert","After 1 week of IV fluids only"], correct: 1, explanation: "Early enteral nutrition (within 24-48h) maintains gut mucosal integrity, reduces infection risk, and supports wound healing. Modern protocols prefer EN over prolonged NPO status." },
      { label: "Primary Nutrition Problem", question: "What is the primary nutrition diagnosis for Priya on Day 3?", options: ["Obesity","Inadequate enteral nutrition intake related to NPO status post-surgery as evidenced by 72h of nutritional deficit","Hyperglycemia","Food allergy"], correct: 1, explanation: "Three days post-op NPO creates a significant nutrition deficit. The PES: Inadequate intake (Problem) + NPO/surgical status (Etiology) + 72h deficit + compromised wound healing (Signs)." },
      { label: "Top Priority", question: "What is Priya's immediate nutrition priority?", options: ["Start a high-fiber oral diet","Initiate enteral nutrition (NGT/NJT) with appropriate formula","Start full parenteral nutrition","Keep NPO for another 3 days"], correct: 1, explanation: "Enteral nutrition via nasogastric or nasojejunal tube preserves gut function, is safer than TPN, more cost-effective, and supports the gut-immune barrier. Start low rate, advance as tolerated." },
      { label: "Mechanism", question: "Why is adequate protein critical for Priya's wound healing?", options: ["Protein is not needed for wound healing","Protein provides amino acids for collagen synthesis, immune function, and tissue repair — deficiency delays healing and increases infection risk","Protein only builds muscle","Protein is only needed for dialysis patients"], correct: 1, explanation: "Wound healing phases (inflammatory, proliferative, remodeling) all require protein. Collagen is 30% glycine + proline. Arginine, glutamine are conditionally essential post-surgery." },
      { label: "Core Nutrition Strategy", question: "What is the recommended protein target for a post-surgical patient like Priya?", options: ["0.4g/kg/day (minimal)","1.2-1.5g/kg/day (elevated for wound healing and surgical stress)","3g/kg/day","No protein — just glucose IV"], correct: 1, explanation: "Surgical stress increases protein catabolism. Post-op protein needs rise to 1.2-1.5g/kg (some sources 1.5-2.0g for major surgery). This supports tissue repair, immune response, and prevents muscle wasting." },
      { label: "Calorie & Carb Direction", question: "What calorie target is appropriate for Priya in the acute post-op phase?", options: ["< 1000 kcal (restriction)","25-30 kcal/kg/day (avoid overfeeding)","50 kcal/kg/day (aggressive refeeding)","Only IV dextrose"], correct: 1, explanation: "Post-surgical: 25-30 kcal/kg avoids overfeeding syndrome while meeting metabolic demands. Hyperalimentation worsens hyperglycemia, liver dysfunction, and immune suppression. Target euglycemia." },
      { label: "Practical Food Application", question: "Which enteral formula is BEST for Priya?", options: ["Standard whole-protein formula initiated at full rate","Semi-elemental or polymeric formula started at low rate (20-25ml/h), advanced every 8-12h","High-fiber formula from day 1","Sugar-based formula only"], correct: 1, explanation: "Post-GI surgery: start low (20-25ml/h) → advance. Polymeric formulas are well-tolerated if gut is functional. Semi-elemental if malabsorption concerns. Monitor residuals, tolerance, bloating." },
      { label: "Monitoring Parameters", question: "What should be monitored daily for Priya on enteral nutrition?", options: ["Only weight","Gastric residuals, tolerance (nausea/distension), blood glucose, fluid balance, electrolytes","Cholesterol only","HbA1c weekly"], correct: 1, explanation: "Daily monitoring: gastric residual volumes (< 200ml generally acceptable), electrolytes (refeeding risk), blood glucose (target 140-180mg/dL ICU), weight, I&O balance, wound healing progress." },
      { label: "Patient Education", question: "When transitioning Priya to oral feeds, what should she start with?", options: ["Full regular diet immediately","Clear liquids → full liquids → soft/low-residue diet → regular, progressing based on tolerance","High-fiber foods first","Only protein shakes"], correct: 1, explanation: "Post-GI surgery diet progression: clear liquids (water, broth, juice) → full liquids (pudding, milk) → soft/low-residue → regular diet. Rushing progression risks anastomotic leak or ileus." },
      { label: "Follow-up & Escalation", question: "When should Priya's team consider Total Parenteral Nutrition (TPN)?", options: ["If she doesn't like the EN formula","If enteral nutrition is contraindicated or not meeting > 60% needs after 5-7 days","Immediately after all GI surgery","TPN is never used post-surgery"], correct: 1, explanation: "TPN reserved for: EN contraindicated (obstruction, fistula, intolerance) OR if EN covers < 60% of needs by day 5-7. TPN carries higher infection risk (CLABSI) and liver complications — not first-line." }
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
