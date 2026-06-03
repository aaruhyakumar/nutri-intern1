export const LE_CASES = [
  {
    id: 'le1',
    title: 'Nocturnal Hypoglycemia in T2DM',
    category: 'Endocrinology',
    difficulty: 'Beginner',
    timeEstimate: '5-8 min',
    emoji: '🩸',
    color: '#EF9F27',
    scenario: `Meena, 55F, has Type 2 Diabetes and is on Insulin Glargine (basal insulin) + Metformin. 
She reports waking up at 3am feeling dizzy, sweaty, and confused. Her blood glucose at that time was 54 mg/dL. 
This has happened 4 times in the past 2 weeks. She skips dinner some nights due to lack of appetite.`,
    objective: 'Identify the root cause of her nocturnal hypoglycemia and propose the primary nutrition intervention.',
    expertAnswer: `The root cause is a mismatch between basal insulin action and insufficient carbohydrate availability overnight. 
Meena skips dinner irregularly, leaving no glucose substrate to counteract the continuous action of Insulin Glargine during peak hours (2-4am). 
Primary intervention: Prescribe a mandatory 15-20g complex carbohydrate + protein bedtime snack (e.g., 1 cup low-fat milk + 2 whole wheat crackers). 
This provides sustained glucose release matching basal insulin pharmacokinetics, preventing the overnight glucose drop. 
Patient education must emphasize that this snack is part of her insulin management protocol — not optional.`,
    keyConcepts: ['insulin-glucose mismatch', 'basal insulin peak', 'bedtime snack', 'nocturnal hypoglycemia', 'irregular meals', 'carbohydrate timing'],
    conceptSynonyms: {
      'irregular meals': ['skipped meals', 'missed dinner', 'inconsistent eating', 'delayed eating', 'fasting', 'no dinner'],
      'nocturnal hypoglycemia': ['nighttime low sugar', 'low glucose at night', '3am hypoglycemia', 'overnight sugar drop', 'nocturnal low blood sugar'],
      'bedtime snack': ['nighttime snack', 'pre-sleep snack', 'evening snack', 'snack before bed', '10pm snack'],
      'insulin-glucose mismatch': ['insulin without food', 'insulin acting without carbs', 'no glucose for insulin', 'insulin peak without substrate'],
      'basal insulin peak': ['glargine peak', 'insulin glargine action', 'basal insulin action', 'overnight insulin'],
      'carbohydrate timing': ['carb distribution', 'meal timing', 'glucose timing', 'carb at bedtime']
    },
    hints: [
      'Think about WHEN the hypoglycemia is happening — what is the insulin doing at 3am?',
      'Insulin Glargine is a basal insulin. It acts continuously. What happens if there is no food to balance it overnight?',
      'The solution involves a specific type of snack at a specific time. What macronutrient prevents overnight glucose drops?'
    ],
    commonMistakes: ['Focusing only on symptoms without identifying the trigger', 'Recommending insulin dose reduction without dietary intervention', 'Ignoring meal timing as a root cause'],
    keyTakeaways: ['Basal insulin requires consistent carbohydrate availability', 'Bedtime snack is medical nutrition therapy, not optional', 'Irregular meals + insulin = predictable hypoglycemia risk'],
    patternRecognition: 'Nocturnal symptoms + insulin-dependent patient + irregular meals = always suspect bedtime carbohydrate deficit first'
  },
  {
    id: 'le2',
    title: 'CKD Hyperkalemia — Dietary Management',
    category: 'Nephrology',
    difficulty: 'Intermediate',
    timeEstimate: '8-12 min',
    emoji: '🫘',
    color: '#378ADD',
    scenario: `Rajan, 62M, CKD Stage 3b. Labs: Creatinine 2.4 mg/dL, eGFR 38, Potassium 6.1 mEq/L. 
He reports eating 2 bananas daily, tomato-based curries, and coconut water. 
He has mild pitting edema and his appetite is poor. He asks why he needs to change his diet when he "eats healthy."`,
    objective: 'Explain the mechanism of hyperkalemia in CKD and design the immediate dietary intervention.',
    expertAnswer: `In CKD Stage 3b, the kidneys lose the ability to efficiently excrete potassium. Rajan's K+ of 6.1 mEq/L is dangerously elevated (normal: 3.5-5.0) and risks fatal cardiac arrhythmias. 
His diet is the direct cause: bananas (~422mg K each), tomatoes (~290mg K/100g), and coconut water (~600mg K/cup) are extremely high-potassium foods. 
Immediate intervention: Restrict dietary potassium to <2000mg/day. Eliminate bananas, coconut water, tomatoes. 
Teach potassium leaching for vegetables: peel → small cuts → soak 2h in cold water → boil in large water volume → discard water. This reduces vegetable K by 30-60%. 
Also restrict protein to 0.6-0.8g/kg/day to reduce uremic load, while ensuring 30-35 kcal/kg to prevent protein-energy wasting.`,
    keyConcepts: ['hyperkalemia', 'renal potassium excretion', 'dietary potassium restriction', 'potassium leaching', 'high potassium foods', 'protein restriction CKD'],
    conceptSynonyms: {
      'hyperkalemia': ['high potassium', 'elevated K+', 'potassium toxicity', 'high serum potassium', 'K above normal'],
      'renal potassium excretion': ['kidney cannot remove potassium', 'impaired K excretion', 'kidneys fail to excrete K', 'reduced renal K clearance'],
      'dietary potassium restriction': ['low potassium diet', 'restrict K intake', 'avoid high K foods', 'potassium controlled diet'],
      'potassium leaching': ['boiling vegetables', 'soaking vegetables', 'leaching technique', 'removing potassium from food', 'boil and discard water'],
      'high potassium foods': ['banana', 'tomato', 'coconut water', 'potato', 'orange juice', 'avocado'],
      'protein restriction CKD': ['low protein diet', 'reduce protein intake', '0.6-0.8g/kg protein', 'protein limited diet']
    },
    hints: [
      'Why can\'t Rajan\'s kidneys handle the potassium from his "healthy" foods?',
      'Look at his specific foods — banana, tomato, coconut water. What do they have in common nutritionally?',
      'There is a cooking technique that can reduce potassium in vegetables by up to 60%. What is it?'
    ],
    commonMistakes: ['Not connecting dietary sources to lab values', 'Recommending protein increase when protein restriction is needed', 'Forgetting to address calorie adequacy alongside protein restriction'],
    keyTakeaways: ['CKD impairs potassium excretion — dietary sources directly impact serum K+', 'Leaching is a practical tool to allow vegetable variety', 'Protein restriction must be paired with adequate calories to prevent PEW'],
    patternRecognition: 'High K+ in CKD patient + high-K food history = dietary intervention before medication in mild-moderate cases'
  },
  {
    id: 'le3',
    title: 'Post-Surgical Nutrition — Enteral Feeding Decision',
    category: 'Post-op Care',
    difficulty: 'Intermediate',
    timeEstimate: '8-12 min',
    emoji: '🏥',
    color: '#1D9E75',
    scenario: `Priya, 38F, Day 3 post small bowel resection. Currently NPO. Surgeon says "wait for bowel sounds." 
Priya has lost 4kg since admission. Serum albumin: 2.8 g/dL (low). She has a surgical wound with signs of delayed healing. 
The nursing team asks if they should continue NPO or start nutrition support.`,
    objective: 'Justify the nutrition support decision, select the appropriate route, and calculate initial targets.',
    expertAnswer: `Priya shows clear signs of malnutrition: albumin 2.8 g/dL (normal >3.5), 4kg weight loss, delayed wound healing. 
Evidence-based guidelines (ESPEN, ASPEN) support early enteral nutrition within 24-48h post-surgery — waiting for bowel sounds is outdated practice. 
Decision: Initiate enteral nutrition via nasogastric tube (NGT). Enteral route is preferred over TPN: maintains gut mucosal integrity, reduces bacterial translocation, lower infection risk, cost-effective. 
Targets: Protein 1.2-1.5g/kg/day (elevated for surgical stress + wound healing). Calories: 25-30 kcal/kg/day (avoid overfeeding). 
Start at 20-25ml/h, advance every 8-12h based on tolerance. Monitor gastric residuals (<250ml), blood glucose (target 140-180mg/dL), electrolytes daily. 
Wound healing requires adequate protein (collagen synthesis), Vitamin C, Zinc, and Arginine.`,
    keyConcepts: ['early enteral nutrition', 'NPO vs enteral feeding', 'protein for wound healing', 'nasogastric tube', 'enteral vs parenteral', 'malnutrition signs'],
    conceptSynonyms: {
      'early enteral nutrition': ['start feeding early', 'early EN', 'early tube feeding', 'initiate enteral within 48h', 'early nutritional support'],
      'NPO vs enteral feeding': ['stop NPO', 'end fasting', 'start tube feeding', 'transition from NPO', 'begin nutrition support'],
      'protein for wound healing': ['protein for healing', 'collagen synthesis protein', 'high protein post-op', 'protein repair tissue', 'amino acids for wound'],
      'nasogastric tube': ['NGT', 'NG tube', 'tube feeding', 'nasogastric feeding', 'stomach tube'],
      'enteral vs parenteral': ['gut feeding vs IV', 'EN preferred over TPN', 'use the gut', 'enteral over parenteral', 'avoid TPN if gut works'],
      'malnutrition signs': ['low albumin', 'weight loss', 'delayed healing', 'muscle wasting', 'nutritional deficit']
    },
    hints: [
      'Priya has been NPO for 3 days. What is happening to her nutritional status and wound healing?',
      'Modern guidelines say "if the gut works, use it." Is Priya\'s gut completely non-functional?',
      'What protein target does a post-surgical patient with wound healing concerns need?'
    ],
    commonMistakes: ['Recommending TPN as first choice', 'Waiting for bowel sounds before starting EN (outdated)', 'Using standard protein targets instead of elevated post-surgical targets'],
    keyTakeaways: ['Early EN within 24-48h is evidence-based standard of care', '"If the gut works, use it" — EN always preferred over TPN', 'Post-surgical protein needs are elevated: 1.2-1.5g/kg minimum'],
    patternRecognition: 'Post-op malnutrition + delayed wound healing + NPO >48h = urgent enteral nutrition initiation'
  },
  {
    id: 'le4',
    title: 'Refeeding Syndrome Risk Assessment',
    category: 'Critical Care',
    difficulty: 'Advanced',
    timeEstimate: '12-15 min',
    emoji: '⚠️',
    color: '#7F77DD',
    scenario: `Ahmed, 45M, admitted after 12 days of near-total starvation following a psychiatric episode. 
BMI 15.2 (severely underweight). Labs: Phosphate 1.8 mg/dL (low), K+ 3.1 mEq/L (low), Mg 1.4 mg/dL (low). 
The medical team wants to start aggressive nutrition support immediately to "catch up" on his nutritional deficit. 
You are the dietitian. What is your assessment and plan?`,
    objective: 'Identify refeeding syndrome risk, explain the mechanism, and design a safe nutrition reintroduction protocol.',
    expertAnswer: `Ahmed is at HIGH risk for Refeeding Syndrome (RFS). Risk factors: prolonged starvation (12 days), severely low BMI (15.2), and already-low electrolytes (P, K, Mg) before feeding begins. 
Mechanism: During starvation, cells adapt to fat/protein metabolism. When carbohydrates are reintroduced, insulin surges, driving phosphate, potassium, and magnesium INTO cells — causing dangerous drops in serum levels. 
Hypophosphatemia (<2.5 mg/dL) is the hallmark: causes cardiac arrhythmias, respiratory failure, hemolytic anemia, and neurological dysfunction. 
Safe protocol: DO NOT start aggressive feeding. Begin at 10 kcal/kg/day (max 50% of estimated needs). Advance slowly over 4-7 days. 
Correct electrolytes BEFORE and DURING feeding: phosphate, potassium, magnesium supplementation. 
Monitor: daily electrolytes for first week, cardiac monitoring, fluid balance. Thiamine 100mg IV before any glucose to prevent Wernicke's encephalopathy.`,
    keyConcepts: ['refeeding syndrome', 'hypophosphatemia', 'electrolyte shifts', 'slow nutrition reintroduction', 'thiamine supplementation', 'starvation adaptation'],
    conceptSynonyms: {
      'refeeding syndrome': ['RFS', 'refeeding risk', 'danger of refeeding', 'refeeding complications', 'feeding after starvation risk'],
      'hypophosphatemia': ['low phosphate', 'low phosphorus', 'phosphate drop', 'P below normal', 'serum phosphate deficiency'],
      'electrolyte shifts': ['electrolyte imbalance on refeeding', 'intracellular shift', 'K and P moving into cells', 'electrolyte redistribution'],
      'slow nutrition reintroduction': ['start low go slow', 'gradual feeding', 'hypocaloric start', '10 kcal/kg start', 'slow advancement'],
      'thiamine supplementation': ['vitamin B1', 'thiamine before glucose', 'B1 supplementation', 'prevent Wernicke'],
      'starvation adaptation': ['metabolic adaptation to fasting', 'fat metabolism during starvation', 'body adapts to no food']
    },
    hints: [
      'His electrolytes are already low BEFORE feeding. What happens to phosphate when you suddenly give carbohydrates to a starved patient?',
      'The medical team wants to "catch up" aggressively. Why is this dangerous in a severely malnourished patient?',
      'There is a specific vitamin that must be given BEFORE any glucose in a malnourished patient. Which one and why?'
    ],
    commonMistakes: ['Starting aggressive nutrition without electrolyte correction', 'Forgetting thiamine before glucose', 'Not recognizing already-low electrolytes as a red flag', 'Treating all malnourished patients the same way'],
    keyTakeaways: ['Refeeding syndrome is life-threatening — start low, go slow', 'Correct electrolytes before and during refeeding', 'Thiamine before glucose is non-negotiable in prolonged starvation', 'Hypophosphatemia is the hallmark electrolyte of RFS'],
    patternRecognition: 'Prolonged starvation + low BMI + low electrolytes before feeding = refeeding syndrome protocol, not aggressive nutrition'
  }
];
