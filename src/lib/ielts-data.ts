// IELTS Mock Data & Question Bank for Castpotro IELTS MVP

export interface SpeakingPart1Question {
  id: string;
  topic: string;
  question: string;
  expectedKeywords: string[];
}

export interface SpeakingPart2CueCard {
  id: string;
  title: string;
  prompt: string;
  bulletPoints: string[];
  followUp: string;
}

export interface SpeakingPart3Question {
  id: string;
  topic: string;
  question: string;
  followUp: string;
}

export interface ListeningQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ReadingQuestion {
  id: string;
  type: 'true-false-notgiven' | 'multiple-choice' | 'sentence-completion';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface WritingPrompt {
  id: string;
  taskType: 'Task 1' | 'Task 2';
  title: string;
  prompt: string;
  minWords: number;
  sampleOutline: string[];
}


export interface SpeakingWarmupQuestion {
  id: string;
  question: string;
  field: 'fullName' | 'preferredName' | 'origin';
}

export const speakingWarmupQuestions: SpeakingWarmupQuestion[] = [
  {
    id: 'w_name',
    question: "Good day. My name is Dr. Sarah Jenkins. Can you tell me your full name, please?",
    field: 'fullName'
  },
  {
    id: 'w_call',
    question: "Thank you. And what can I call you during this interview?",
    field: 'preferredName'
  },
  {
    id: 'w_origin',
    question: "Where do you come from?",
    field: 'origin'
  }
];

// SPEAKING MOCK TEST DATA
export const speakingPart1: SpeakingPart1Question[] = [
  {
    id: 'p1_1',
    topic: 'Hometown & Living',
    question: "Let's talk about where you live. Could you describe your hometown or the neighborhood you currently live in?",
    expectedKeywords: ['city', 'neighborhood', 'people', 'convenient', 'culture', 'quiet', 'busy']
  },
  {
    id: 'p1_2',
    topic: 'Studies & Work',
    question: "Do you work or are you a student? What do you find most interesting about what you do?",
    expectedKeywords: ['study', 'career', 'passion', 'challenge', 'learn', 'collaborate', 'skills']
  },
  {
    id: 'p1_3',
    topic: 'Communication & Speaking',
    question: "How often do you communicate with people in English or give presentations?",
    expectedKeywords: ['often', 'daily', 'practice', 'presentations', 'confidence', 'conversations']
  },
  {
    id: 'p1_4',
    topic: 'Leisure & Hobbies',
    question: "What do you enjoy doing during your free time to relax after a busy week?",
    expectedKeywords: ['relax', 'music', 'reading', 'sports', 'podcast', 'friends', 'travel']
  }
];

export const speakingPart2CueCard: SpeakingPart2CueCard = {
  id: 'p2_goal',
  title: 'An Ambitious Goal',
  prompt: 'Describe a significant goal that you achieved after putting in a lot of hard work.',
  bulletPoints: [
    'What the goal was and when you started working towards it',
    'What obstacles or difficulties you encountered along the way',
    'How you overcame those challenges',
    'And explain why achieving this goal was important to you.'
  ],
  followUp: 'Do you usually set long-term goals for your personal and professional growth?'
};

export const speakingPart3: SpeakingPart3Question[] = [
  {
    id: 'p3_1',
    topic: 'Goal Setting in Society',
    question: 'Why do you think some individuals find it harder than others to stay motivated when pursuing long-term ambitions?',
    followUp: 'Is discipline more important than initial motivation?'
  },
  {
    id: 'p3_2',
    topic: 'Technology & Productivity',
    question: 'How has modern technology influenced the way young people learn, collaborate, and manage their time?',
    followUp: 'Does social media distract people or provide new learning opportunities?'
  },
  {
    id: 'p3_3',
    topic: 'Education & Future Skills',
    question: 'What skills do you believe schools and universities should prioritize to prepare students for the global workforce?',
    followUp: 'Are soft skills like emotional intelligence as critical as academic grades?'
  }
];

// LISTENING MOCK TEST DATA
export const listeningSection = {
  title: 'Section 1: Castpotro International Network Orientation & Registration',
  audioUrl: '/audio/castpotro_listening.mp3',
  duration: '1:43',
  transcript: `Examiner: Good morning, and welcome to the Castpotro International Network orientation. How may I assist you today?
Student: Hi! I would like to learn more about the network and register for the student broadcaster program.
Examiner: Wonderful! Castpotro is a global digital radio network and personal growth community connecting youth across more than fifteen countries. To get started, may I take down your full name and field of study?
Student: Yes, my name is Liam Henderson, and I am currently studying Media and Communications.
Examiner: Great, Liam. We operate across four distinct departments: Marketing, Human Resources, Content Production, and Event Management. Which wing are you most interested in joining?
Student: I am particularly passionate about Content Production and audio podcasting.
Examiner: Excellent. Our weekly broadcast sessions and flagship podcast recordings take place every Thursday evening at 7:30 PM.
Student: That fits my schedule well. I also heard about a speaking activity called Chatter Box?
Examiner: Yes, Chatter Box is our signature speaking circle where members speak for exactly one minute on an unannounced topic to build English confidence and fluency. All new broadcasters participate weekly.
Student: That sounds fantastic! What is the registration fee for active university students?
Examiner: The student membership is completely free for all active university learners.
Student: Wonderful! Thank you so much for the information.
Examiner: You are very welcome, Liam. We look forward to seeing you in our next broadcast circle.`,
  questions: [
    {
      id: 'l1',
      type: 'multiple-choice' as const,
      question: 'What is Liam Henderson studying?',
      options: ['Business Administration', 'Media & Communications', 'Computer Science', 'Modern Literature'],
      correctAnswer: 'Media & Communications',
      explanation: 'Liam explicitly states in the dialogue: "My name is Liam Henderson, and I am studying Media & Communications."'
    },
    {
      id: 'l2',
      type: 'multiple-choice' as const,
      question: 'Which department does Liam express interest in joining?',
      options: ['Event Management', 'Human Resources', 'Content Creation & Podcast Production', 'Marketing & Sales'],
      correctAnswer: 'Content Creation & Podcast Production',
      explanation: "Liam mentions: 'I am particularly interested in Content Creation and Podcast Production.'"
    },
    {
      id: 'l3',
      type: 'multiple-choice' as const,
      question: 'When do the weekly broadcast sessions take place?',
      options: ['Monday mornings at 9:00 AM', 'Thursday evenings at 7:30 PM', 'Saturday afternoons at 3:00 PM', 'Sunday evenings at 8:00 PM'],
      correctAnswer: 'Thursday evenings at 7:30 PM',
      explanation: 'The examiner specifies: "Our weekly sessions take place on Thursday evenings at 7:30 PM."'
    },
    {
      id: 'l4',
      type: 'multiple-choice' as const,
      question: 'How much is the registration fee for active university students?',
      options: ['$15 per month', '$50 annual fee', 'Completely free', '$25 one-time registration'],
      correctAnswer: 'Completely free',
      explanation: 'The dialogue confirms the program is completely free for active students.'
    }
  ]
};

// READING MOCK TEST DATA
export const readingSection = {
  title: 'The Evolution of Global Digital Communities & Audio Broadcasting',
  readingTimeMinutes: 12,
  passage: `Paragraph A
In an increasingly digitized century, the mechanics of human connection have undergone an unprecedented transformation. Where physical proximity was once the primary prerequisite for community formation, global digital networks have dissolved geographical boundaries. Online audio channels, interactive podcasts, and decentralized voice hubs allow individuals across disparate continents to convene synchronously, fostering international dialogue and cross-cultural empathy.

Paragraph B
Research in cognitive linguistics suggests that auditory communication engages neurological pathways distinct from purely visual or text-based mediums. Hearing nuanced vocal inflection, emotional cadence, and spontaneous conversational pauses enables listeners to form deeper empathetic bonds with speakers. Platforms that emphasize spoken interaction—such as digital radio networks and circular impromptu speaking exercises—frequently report higher rates of participant confidence and language acquisition than conventional classroom settings.

Paragraph C
Furthermore, the concept of "micro-storytelling" has emerged as a potent pedagogical instrument. Rather than delivering lengthy prepared speeches, participants who practice condensed, one-minute spontaneous articulation (often termed impromptu speaking) demonstrate measurable acceleration in lexical retrieval speed and grammatical adaptability. Under moderate time constraints, the brain learns to prioritize core communicative intent over perfectionism, thereby overcoming the debilitating anxiety commonly referred to as "foreign language speaking apprehension."

Paragraph D
Despite these conspicuous advantages, modern digital networks face critical operational hurdles. Ensuring conversational safety, mitigating cultural misunderstandings, and maintaining high editorial standards require sophisticated community management frameworks. Organizations that integrate tiered leadership hierarchies—combining experienced executive coordinators with mentored student interns—exhibit superior operational resilience, successfully balancing youth dynamism with rigorous content quality.`,
  questions: [
    {
      id: 'r1',
      type: 'true-false-notgiven' as const,
      question: 'Physical proximity is still essential for the formation of modern global communities.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'FALSE',
      explanation: 'Paragraph A states that global digital networks have dissolved geographical boundaries and physical proximity is no longer the prerequisite.'
    },
    {
      id: 'r2',
      type: 'true-false-notgiven' as const,
      question: 'Auditory communication activates different neurological pathways compared to purely text-based reading.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'Paragraph B explicitly notes: "auditory communication engages neurological pathways distinct from purely visual or text-based mediums."'
    },
    {
      id: 'r3',
      type: 'true-false-notgiven' as const,
      question: 'Short, one-minute impromptu speaking drills help reduce foreign language speaking anxiety.',
      options: ['TRUE', 'FALSE', 'NOT GIVEN'],
      correctAnswer: 'TRUE',
      explanation: 'Paragraph C explains that under moderate time constraints, the brain overcomes "foreign language speaking apprehension."'
    },
    {
      id: 'r4',
      type: 'multiple-choice' as const,
      question: 'According to Paragraph D, what is a key factor in maintaining high content quality in digital networks?',
      options: [
        'Charging high subscription fees',
        'Tiered leadership combining executive coordinators and student interns',
        'Completely removing human moderation in favor of AI',
        'Restricting membership strictly to university professors'
      ],
      correctAnswer: 'Tiered leadership combining executive coordinators and student interns',
      explanation: 'Paragraph D notes that organizations integrating tiered leadership hierarchies combining experienced coordinators with mentored interns exhibit superior resilience.'
    }
  ]
};

// WRITING MOCK TEST DATA
export const writingPrompts: WritingPrompt[] = [
  {
    id: 'w_task1',
    taskType: 'Task 1',
    title: 'Academic Report (Formal Summary)',
    prompt: 'You are applying for a global leadership exchange program. Write a letter (minimum 150 words) to the program coordinator explaining your academic background, why you wish to join the program, and what unique cultural perspective you will contribute to the international team.',
    minWords: 150,
    sampleOutline: [
      'Formal greeting and statement of purpose',
      'Summary of academic or professional background',
      'Specific reasons for choosing this global program',
      'Unique cultural perspective and strengths you bring',
      'Polite concluding call to action'
    ]
  },
  {
    id: 'w_task2',
    taskType: 'Task 2',
    title: 'Opinion / Discursive Essay',
    prompt: 'Some people believe that modern digital communication (such as social media, podcasts, and online audio communities) enhances global understanding. Others argue that it creates superficial connections and increases social isolation. Discuss both views and give your own opinion. Give reasons for your answer and include relevant examples from your knowledge or experience. Write at least 250 words.',
    minWords: 250,
    sampleOutline: [
      'Introduction: Paraphrase topic and present clear thesis statement',
      'Body Paragraph 1: Arguments in favor of digital communication and global empathy',
      'Body Paragraph 2: Counter-arguments regarding superficiality and screentime isolation',
      'Personal Stance: Balanced perspective emphasizing intentional community curation',
      'Conclusion: Restate thesis with futuristic summary'
    ]
  }
];
