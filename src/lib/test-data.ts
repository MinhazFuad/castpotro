export interface Question {
  id: string;
  domain: 'Numerical' | 'Verbal' | 'Logical' | 'Spatial' | 'Personality' | 'Emotional Intelligence';
  text: string;
  options: string[];
  optionImages?: string[];
  correctAnswer?: number;
  traitMapping?: string[];
  imageUrl?: string;
}

export const questions: Question[] = [
  // NUMERICAL (3)
  {
    id: 'n1',
    domain: 'Numerical',
    text: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    options: ['$0.05', '$0.10', '$0.15', '$1.00'],
    correctAnswer: 0,
  },
  {
    id: 'n2',
    domain: 'Numerical',
    text: 'Your team has $3,000 remaining for an event. You can spend $2,000 on promotion to bring 40 participants, or $1,500 on promotion to bring 25 participants. Which option gives better cost efficiency per participant?',
    options: [
      '$2,000 for 40 participants',
      '$1,500 for 25 participants',
      'Both have the same cost efficiency',
      'Not enough information to calculate'
    ],
    correctAnswer: 0,
  },
  {
    id: 'n3',
    domain: 'Numerical',
    text: 'A project has a total budget of $20,000. 35% is allocated for marketing and 25% for logistics. How much remains for all other activities?',
    options: ['$6,000', '$8,000', '$10,000', '$12,000'],
    correctAnswer: 1,
  },

  // VERBAL (3)
  {
    id: 'v1',
    domain: 'Verbal',
    text: 'The team leader says: "The report must be submitted by Thursday evening. Members who cannot complete their assigned section should inform the coordinator before Wednesday." Which statement is definitely true?',
    options: [
      'Everyone must finish their section by Wednesday.',
      'Members facing difficulty should communicate before Wednesday.',
      'The coordinator will complete unfinished sections.',
      'The report can be submitted after Thursday.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v2',
    domain: 'Verbal',
    text: 'Read the following instruction: "Do not launch the campaign unless the design team has provided final approval, even if the client asks for it early." What should you do if the client demands an early launch but the design team is still reviewing?',
    options: [
      'Launch the campaign to keep the client happy.',
      'Wait for the design team\'s final approval before launching.',
      'Launch only a portion of the campaign.',
      'Ask the client to talk to the design team.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'v3',
    domain: 'Verbal',
    text: 'Identify the contradiction in this statement: "Our new software is entirely bug-free, but we have a dedicated 24/7 support team ready to fix any system crashes you might experience."',
    options: [
      'Having a 24/7 support team implies the software is too complex.',
      'A system crash is technically not a bug.',
      'Software cannot be entirely bug-free if it experiences crashes requiring fixes.',
      'There is no contradiction; all software has support teams.'
    ],
    correctAnswer: 2,
  },

  // LOGICAL (3)
  {
    id: 'l1',
    domain: 'Logical',
    text: 'A, B, C, and D are assigned to four different tasks (1, 2, 3, 4). A cannot work on Task 1. B must work before C. D must work on Task 4. Which of the following assignments is possible?',
    options: [
      'A=1, B=2, C=3, D=4',
      'A=2, B=3, C=1, D=4',
      'A=3, B=1, C=2, D=4',
      'A=2, B=1, D=3, C=4'
    ],
    correctAnswer: 2,
  },
  {
    id: 'l2',
    domain: 'Logical',
    text: 'If you choose Supplier X, delivery takes 5 days but costs 10% less. If you choose Supplier Y, delivery takes 2 days at full price. The project deadline is in 3 days. Which is the logical choice to ensure success?',
    options: [
      'Supplier X, because cost efficiency is always the priority.',
      'Supplier Y, because meeting the constraint of the 3-day deadline is required.',
      'A mix of both suppliers to balance cost and time.',
      'Delay the project to use Supplier X.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'l3',
    domain: 'Logical',
    text: 'All marketing team members use laptops. Sarah uses a laptop. Therefore, Sarah is on the marketing team. Is this deduction logically sound?',
    options: [
      'Yes, because she uses a laptop.',
      'No, because people outside of marketing can also use laptops.',
      'Yes, assuming only marketing members are allowed laptops.',
      'No, because Sarah might use a desktop instead.'
    ],
    correctAnswer: 1,
  },

  // SPATIAL (3)
  {
    id: 's1',
    domain: 'Spatial',
    text: 'Which image comes next in the sequence (counting the circles)?',
    imageUrl: '/pattern_series.svg',
    options: ['A', 'B', 'C', 'D'],
    optionImages: ['/opt_s1_a.svg', '/opt_s1_b.svg', '/opt_s1_c.svg', '/opt_s1_d.svg'],
    correctAnswer: 2,
  },
  {
    id: 's2',
    domain: 'Spatial',
    text: 'How many triangles are there in the image above?',
    imageUrl: '/triangle_count.svg',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2, // 3
  },
  {
    id: 's3',
    domain: 'Spatial',
    text: 'Which of the following is the correct mirror image of the word "WHITE"?',
    options: ['ETIHW', 'ƎTIHW', 'WHITE', 'ƎTHIW'],
    correctAnswer: 1,
  },

  // PERSONALITY (4)
  {
    id: 'p1',
    domain: 'Personality',
    text: 'Responsibility: When you receive an important task, which sounds most like you?',
    options: [
      'I start immediately and figure things out along the way.',
      'I first clarify expectations and create a plan.',
      'I wait until I have all the information before starting.',
      'I prefer someone else to guide me through it.'
    ],
    traitMapping: ['Action-Oriented', 'Organizer', 'Methodical', 'Collaborator']
  },
  {
    id: 'p2',
    domain: 'Personality',
    text: 'Initiative: Your team has a problem that nobody has been assigned to solve. What are you most likely to do?',
    options: [
      'Wait until someone assigns it to me.',
      'Point it out and suggest someone should handle it.',
      'Investigate the issue and propose a solution.',
      'Ignore it because it isn\'t my responsibility.'
    ],
    traitMapping: ['Follower', 'Communicator', 'Leader/Problem Solver', 'Passive']
  },
  {
    id: 'p3',
    domain: 'Personality',
    text: 'Adaptability: Your original plan fails one day before an event. What is your natural response?',
    options: [
      'Become frustrated and wait for instructions.',
      'Look for alternatives and adjust the plan immediately.',
      'Try to continue the original plan anyway.',
      'Focus on documenting and explaining why the plan failed.'
    ],
    traitMapping: ['Passive', 'Adaptable', 'Rigid', 'Analytical']
  },
  {
    id: 'p4',
    domain: 'Personality',
    text: 'Team Orientation: Which situation would frustrate you the most?',
    options: [
      'Having to work with someone who disagrees with me.',
      'Having unclear instructions and goals.',
      'Having to take responsibility for someone else\'s mistake.',
      'Having my ideas rejected.'
    ],
    traitMapping: ['Independent', 'Organizer', 'Individualist', 'Creative']
  },

  // EQ -> Emotional Intelligence (4)
  {
    id: 'eq1',
    domain: 'Emotional Intelligence',
    text: 'Team Conflict: You are working on a project. Two members strongly disagree about how to proceed, and their argument is delaying the project. What would you do first?',
    options: [
      'Support the person whose idea you think is better.',
      'Ask both members to explain their reasoning and identify the actual disagreement.',
      'Tell the team leader to decide.',
      'Suggest ignoring the disagreement and continuing.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'eq2',
    domain: 'Emotional Intelligence',
    text: 'Underperformance: A teammate has repeatedly missed deadlines. You discover they are dealing with a personal difficulty, but their work is affecting the whole team. What would you do?',
    options: [
      'Report them immediately to management.',
      'Ignore the missed deadlines because they are struggling.',
      'Speak privately with them, understand the situation, and discuss a realistic way to get the work back on track.',
      'Tell the rest of the team about their situation so everyone understands.'
    ],
    correctAnswer: 2,
  },
  {
    id: 'eq3',
    domain: 'Emotional Intelligence',
    text: 'Receiving Criticism: Your team leader tells you that your work is below expectations. You believe the criticism is partly unfair. What do you do?',
    options: [
      'Defend yourself immediately and point out their flaws.',
      'Ask for specific examples and understand what could be improved.',
      'Accept the criticism but become less involved in the project.',
      'Discuss with other members whether the leader was wrong.'
    ],
    correctAnswer: 1,
  },
  {
    id: 'eq4',
    domain: 'Emotional Intelligence',
    text: 'Accountability: You accidentally make a mistake that causes your team to miss an internal deadline. Nobody has noticed yet. What do you do?',
    options: [
      'Fix it quietly and avoid mentioning the mistake.',
      'Wait to see whether anyone notices.',
      'Inform the relevant person, explain what happened, and propose how you will fix it.',
      'Explain that you made the mistake because someone else gave you incomplete information.'
    ],
    correctAnswer: 2,
  }
];
