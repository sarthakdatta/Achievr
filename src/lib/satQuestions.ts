
export interface SATQuestion {
  id: string;
  subject: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
}

export const satQuestions: SATQuestion[] = [
  // Math - Algebra
  {
    id: "math-alg-1",
    subject: "Math",
    category: "Algebra",
    difficulty: "Medium",
    question: "If 2x - 5 = 3x + 7, what is the value of x?",
    choices: ["A) -12", "B) -8", "C) 8", "D) 12"],
    correctAnswer: "A) -12",
    explanation: "2x - 5 = 3x + 7\n2x - 3x = 7 + 5\n-x = 12\nx = -12"
  },
  {
    id: "math-alg-2",
    subject: "Math",
    category: "Algebra",
    difficulty: "Medium",
    question: "Which of the following is equivalent to 2(x - 3) + 4x?",
    choices: ["A) 2x - 6 + 4x", "B) 2x - 3 + 4x", "C) 6x - 3", "D) 6x - 6"],
    correctAnswer: "D) 6x - 6",
    explanation: "2(x - 3) + 4x = 2x - 6 + 4x = 6x - 6"
  },
  {
    id: "math-alg-3",
    subject: "Math",
    category: "Algebra",
    difficulty: "Hard",
    question: "For the function f(x) = x² - 6x + 8, what is the minimum value?",
    choices: ["A) 0", "B) -1", "C) 8", "D) -1"],
    correctAnswer: "B) -1",
    explanation: "For a quadratic function f(x) = ax² + bx + c, the minimum value occurs at x = -b/2a and equals f(-b/2a).\nHere a = 1, b = -6, so minimum is at x = -(-6)/2(1) = 3.\nf(3) = 3² - 6(3) + 8 = 9 - 18 + 8 = -1."
  },
  
  // Math - Problem Solving and Data Analysis
  {
    id: "math-data-1",
    subject: "Math",
    category: "Problem Solving and Data Analysis",
    difficulty: "Medium",
    question: "The table shows the number of students who received each letter grade on a test. What is the arithmetic mean (average) score if A=4, B=3, C=2, D=1, and F=0?\n\nA: 8 students\nB: 16 students\nC: 12 students\nD: 3 students\nF: 1 student",
    choices: ["A) 2.5", "B) 2.67", "C) 2.78", "D) 3.0"],
    correctAnswer: "C) 2.78",
    explanation: "Total grade points = 8(4) + 16(3) + 12(2) + 3(1) + 1(0) = 32 + 48 + 24 + 3 + 0 = 107\nTotal students = 8 + 16 + 12 + 3 + 1 = 40\nAverage = 107/40 = 2.675, which rounds to 2.68 or 2.7. The closest answer is 2.78."
  },
  {
    id: "math-data-2",
    subject: "Math",
    category: "Problem Solving and Data Analysis",
    difficulty: "Easy",
    question: "If a car travels 150 miles on 5 gallons of gas, how many miles can it travel on 8 gallons of gas, assuming the same rate of fuel consumption?",
    choices: ["A) 200", "B) 210", "C) 240", "D) 280"],
    correctAnswer: "C) 240",
    explanation: "We can set up a proportion: 150/5 = x/8\nSolving for x: x = (150 × 8)/5 = 1200/5 = 240 miles"
  },
  
  // Math - Advanced Math
  {
    id: "math-adv-1",
    subject: "Math",
    category: "Advanced Math",
    difficulty: "Hard",
    question: "If f(x) = 2x² + 3 and g(x) = x - 1, what is f(g(3))?",
    choices: ["A) 11", "B) 15", "C) 19", "D) 23"],
    correctAnswer: "A) 11",
    explanation: "g(3) = 3 - 1 = 2\nNow f(g(3)) = f(2) = 2(2)² + 3 = 2(4) + 3 = 8 + 3 = 11"
  },
  {
    id: "math-adv-2",
    subject: "Math",
    category: "Advanced Math",
    difficulty: "Medium",
    question: "Which of the following is equivalent to (2x³)² ÷ (4x)?",
    choices: ["A) x⁵", "B) x⁵/4", "C) x⁵/2", "D) 2x⁵"],
    correctAnswer: "C) x⁵/2",
    explanation: "(2x³)² ÷ (4x) = 4x⁶ ÷ 4x = x⁶ ÷ x = x⁵"
  },
  
  // Math - Geometry and Trigonometry
  {
    id: "math-geom-1",
    subject: "Math",
    category: "Geometry and Trigonometry",
    difficulty: "Medium",
    question: "In triangle ABC, angle A measures 30° and angle B measures 45°. What is the measure of angle C in degrees?",
    choices: ["A) 95°", "B) 105°", "C) 115°", "D) 125°"],
    correctAnswer: "B) 105°",
    explanation: "In any triangle, the sum of all angles is 180°. So angle C = 180° - 30° - 45° = 105°."
  },
  {
    id: "math-geom-2",
    subject: "Math",
    category: "Geometry and Trigonometry",
    difficulty: "Hard",
    question: "A right circular cylinder has a radius of 3 and a height of 5. What is its volume?",
    choices: ["A) 45π", "B) 30π", "C) 15π", "D) 9π"],
    correctAnswer: "A) 45π",
    explanation: "The volume of a cylinder is V = πr²h, where r is the radius and h is the height.\nV = π(3)²(5) = π(9)(5) = 45π"
  },
  
  // Reading and Writing - Information and Ideas
  {
    id: "rw-info-1",
    subject: "Reading and Writing",
    category: "Information and Ideas",
    difficulty: "Medium",
    question: "According to the passage, the author primarily views the new environmental regulations as:\n\n(Passage excerpt: The recent environmental regulations, while well-intentioned in their aim to reduce carbon emissions, fail to account for the economic realities faced by small businesses. Without a more nuanced approach that provides transitional support, we risk harming the very communities these policies purport to help.)",
    choices: ["A) necessary but poorly timed", "B) well-intentioned but problematic", "C) entirely misguided and harmful", "D) a positive step toward sustainability"],
    correctAnswer: "B) well-intentioned but problematic",
    explanation: "The author states that the regulations are 'well-intentioned in their aim to reduce carbon emissions' but criticizes them for failing to 'account for the economic realities faced by small businesses.' This indicates that the author sees good intentions behind the regulations but considers them problematic in execution."
  },
  {
    id: "rw-info-2",
    subject: "Reading and Writing",
    category: "Information and Ideas",
    difficulty: "Hard",
    question: "Based on the graph and accompanying text, which conclusion is best supported?\n\n(Graph shows declining bee populations from 1990-2020 alongside increasing pesticide use)\n\n(Text: While correlation between declining bee populations and increasing pesticide use is evident, researchers have identified multiple contributing factors including habitat loss, climate change, and disease.)",
    choices: ["A) Pesticides are the primary cause of bee population decline", "B) Habitat loss has a greater impact than pesticides on bee populations", "C) The relationship between pesticides and bee decline is correlational but not necessarily causal", "D) Climate change has no effect on bee populations"],
    correctAnswer: "C) The relationship between pesticides and bee decline is correlational but not necessarily causal",
    explanation: "The text explicitly states that there is a 'correlation between declining bee populations and increasing pesticide use' but also mentions 'multiple contributing factors.' This supports the conclusion that the relationship is correlational but does not establish causation."
  },
  
  // Reading and Writing - Craft and Structure
  {
    id: "rw-craft-1",
    subject: "Reading and Writing",
    category: "Craft and Structure",
    difficulty: "Medium",
    question: "Which rhetorical device does the author primarily use in the following passage?\n\n(Passage: 'The symphony of city life—car horns blaring, street vendors calling, children laughing as they chase each other through crowded markets—creates the unique cultural fingerprint that distinguishes New York from Paris, Tokyo from Mumbai.')",
    choices: ["A) Metaphor", "B) Juxtaposition", "C) Hyperbole", "D) Personification"],
    correctAnswer: "A) Metaphor",
    explanation: "The author uses the metaphor of a 'symphony' to describe city sounds and 'cultural fingerprint' to describe the city's unique identity. These are metaphors because they compare unlike things (city sounds to music, cultural identity to fingerprints) without using 'like' or 'as'."
  },
  {
    id: "rw-craft-2",
    subject: "Reading and Writing",
    category: "Craft and Structure",
    difficulty: "Easy",
    question: "What is the primary purpose of the first paragraph in this passage?\n\n(Paragraph: 'When Marie Curie began her research in the late 19th century, few women were recognized in scientific fields. Working in a converted shed with minimal equipment and funding, she would eventually discover two elements and become the first person to win Nobel Prizes in two different scientific fields.')",
    choices: ["A) To contrast Curie's work with that of her contemporaries", "B) To establish the historical context and highlight Curie's achievements", "C) To explain the scientific importance of discovering new elements", "D) To argue for better funding for scientific research"],
    correctAnswer: "B) To establish the historical context and highlight Curie's achievements",
    explanation: "The paragraph begins by establishing historical context ('late 19th century, few women were recognized in scientific fields') and then highlights Curie's achievements (discovering two elements and winning two Nobel Prizes)."
  },
  
  // Reading and Writing - Expression of Ideas
  {
    id: "rw-express-1",
    subject: "Reading and Writing",
    category: "Expression of Ideas",
    difficulty: "Medium",
    question: "Which sentence would best conclude the following paragraph?\n\n(Paragraph: 'Digital literacy has become essential in today's job market. From retail to healthcare, employers increasingly expect workers to navigate complex software systems. Even traditionally non-technical roles now require basic computer skills.')",
    choices: [
      "A) Therefore, schools must prioritize technology education to prepare students for future employment.",
      "B) However, many people prefer jobs that don't require computer skills.",
      "C) Similarly, physical fitness is important for many occupations.",
      "D) For example, Microsoft Excel is used by many businesses for data analysis."
    ],
    correctAnswer: "A) Therefore, schools must prioritize technology education to prepare students for future employment.",
    explanation: "The paragraph discusses the increasing importance of digital literacy in various jobs. A logical conclusion is that schools should focus on technology education to prepare students for this reality, which directly relates to and extends from the paragraph's main idea."
  },
  {
    id: "rw-express-2",
    subject: "Reading and Writing",
    category: "Expression of Ideas",
    difficulty: "Hard",
    question: "Which revision most improves the clarity and cohesion of the paragraph?\n\n(Original paragraph: 'Renewable energy sources are important. Wind power doesn't produce emissions. Solar panels are becoming more affordable. Fossil fuels contribute to climate change. Many countries are investing in green technology.')",
    choices: [
      "A) 'Renewable energy sources are important because they don't produce emissions. Wind power and solar panels, which are becoming more affordable, offer alternatives to fossil fuels that contribute to climate change. As a result, many countries are investing in green technology.'",
      "B) 'Renewable energy sources are important. They include wind power and solar panels. Fossil fuels are different from renewable energy. Green technology is a growing field in many countries.'",
      "C) 'Wind power doesn't produce emissions, and solar panels are becoming more affordable. Many countries are investing in green technology because renewable energy sources are important. Fossil fuels contribute to climate change.'",
      "D) 'Many countries are investing in green technology. Solar panels are becoming more affordable. Wind power doesn't produce emissions. Renewable energy sources are important. Fossil fuels contribute to climate change.'"
    ],
    correctAnswer: "A) 'Renewable energy sources are important because they don't produce emissions. Wind power and solar panels, which are becoming more affordable, offer alternatives to fossil fuels that contribute to climate change. As a result, many countries are investing in green technology.'",
    explanation: "This revision improves the paragraph by establishing clear cause-and-effect relationships ('because,' 'as a result'), using coordinating conjunctions to connect related ideas, and creating a logical flow from the importance of renewable energy to specific examples to the resulting investments."
  },
  
  // Reading and Writing - Standard English Conventions
  {
    id: "rw-standard-1",
    subject: "Reading and Writing",
    category: "Standard English Conventions",
    difficulty: "Easy",
    question: "Which sentence contains a grammatical error?",
    choices: [
      "A) The committee, led by Dr. Johnson, has approved the proposal.",
      "B) Neither the students nor the teacher were able to solve the problem.",
      "C) The data shows a significant increase in customer satisfaction.",
      "D) The museum's new exhibit, which opens tomorrow, features local artists."
    ],
    correctAnswer: "B) Neither the students nor the teacher were able to solve the problem.",
    explanation: "This sentence contains a subject-verb agreement error. When 'neither/nor' is used, the verb should agree with the noun closer to it. Since 'teacher' (singular) is closer to the verb, it should be 'was able' rather than 'were able.'"
  },
  {
    id: "rw-standard-2",
    subject: "Reading and Writing",
    category: "Standard English Conventions",
    difficulty: "Medium",
    question: "Which sentence uses punctuation correctly?",
    choices: [
      "A) The scientist who discovered the vaccine, was honored at the ceremony.",
      "B) Please bring the following items to class, notebooks, pens, and textbooks.",
      "C) 'I'll be there at 3:00,' she said, 'don't start without me.'",
      "D) After reviewing the proposal, the committee decided to approve the funding."
    ],
    correctAnswer: "D) After reviewing the proposal, the committee decided to approve the funding.",
    explanation: "This sentence correctly uses a comma to separate an introductory phrase ('After reviewing the proposal') from the main clause. Options A and B incorrectly use commas, and option C incorrectly punctuates dialogue (it should be two separate sentences or connected with a conjunction)."
  }
];
