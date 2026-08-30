export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: 'operations' | 'event' | 'quality' | 'marketing' | 'content';
  departmentLabel: string;
  roleBadge: string;
  city: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  university?: string | null;
  email?: string | null;
  image: string;
  bio: string;
  quote?: string;
  skills: string[];
  socialLinks: {
    linkedin?: string | null;
    instagram?: string | null;
  };
  featured?: boolean;
}

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: "ahsan-farabi",
    name: "Ahsan Farabi",
    designation: "Founder & Visionary",
    department: "operations",
    departmentLabel: "Operations & Leadership",
    roleBadge: "FOUNDER",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "bd",
    countryFlag: "🇧🇩",
    university: "United International University (Graduated)",
    email: "fuad000219@gmail.com",
    image: "/team/Farabi.jpg",
    bio: "Pioneer and creative architect driving the foundational mission, ethos, and continuous innovation pipeline of Castpotro.",
    quote: "Igniting ideas that transform into tangible, impactful solutions for all.",
    skills: ["Foundational Strategy", "Venture Building", "System Architecture", "Creative Direction"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/md-abdul-ahad-minhaz-5891b7430",
      instagram: "https://www.instagram.com/min.haze"
    },
    featured: true
  },
  {
    id: "ibrahim-shanto",
    name: "Ibrahim Shanto",
    designation: "Chief Executive Officer (CEO)",
    department: "operations",
    departmentLabel: "Operations & Leadership",
    roleBadge: "CEO",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "bd",
    countryFlag: "🇧🇩",
    university: "United International University (Graduated)",
    email: "ishanto.per@gmail.com",
    image: "/team/Shanto.jpg",
    bio: "Strategic and visionary leader spearheading organizational vision, high-performance cross-border collaboration, and technological growth.",
    quote: "Building bridges through technology, community, and purpose-driven execution.",
    skills: ["Executive Leadership", "Strategic Vision", "Product Management", "Team Building", "Operations"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ibrahim-shanto/",
      instagram: null
    },
    featured: true
  },
  {
    id: "anastasiia-susol",
    name: "Anastasiia Susol (Mykolaivna)",
    designation: "Chief Operating Officer (COO)",
    department: "operations",
    departmentLabel: "Operations & Leadership",
    roleBadge: "COO",
    city: "Lviv",
    country: "Ukraine",
    countryCode: "ua",
    countryFlag: "🇺🇦",
    university: "Lviv Polytechnic National University",
    email: "nnastysiikk@gmail.com",
    image: "/team/Anastasia.PNG",
    bio: "Operational strategist driving smooth execution, global synchronization, team productivity, and systematic scalability.",
    quote: "Efficiency and empathy are the twin pillars of sustainable growth.",
    skills: ["Global Operations", "Process Optimization", "Cross-Functional Leadership", "Resource Management"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/anastasiia-susol-398809361",
      instagram: "https://www.instagram.com/nastysiik/"
    },
    featured: true
  },
  {
    id: "md-abdul-ahad-minhaz",
    name: "Md Abdul Ahad Minhaz",
    designation: "Operations Manager & Administrator",
    department: "operations",
    departmentLabel: "Operations & Leadership",
    roleBadge: "OPERATIONS",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "bd",
    countryFlag: "🇧🇩",
    university: "United International University",
    email: "fuad000219@gmail.com",
    image: "/team/Minhaz.jpg",
    bio: "Hands-on manager orchestrating project lifecycles, team alignment, productivity metrics, and operational synergy.",
    quote: "Consistent momentum and thoughtful collaboration drive true results.",
    skills: ["Project Management", "Team Coordination", "Strategic Planning", "Workflow Automation"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/md-abdul-ahad-minhaz-5891b7430",
      instagram: "https://www.instagram.com/min.haze"
    },
    featured: true
  },
  {
    id: "asma-ul-hosna",
    name: "Asma Ul Hosna",
    designation: "Head of Meetings & Events (M&E)",
    department: "event",
    departmentLabel: "Event Management",
    roleBadge: "HEAD OF EVENTS",
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "bd",
    countryFlag: "🇧🇩",
    university: "United International University",
    email: "asmaulhosna801@gmail.com",
    image: "/team/Asma Ul Hosna.jpg",
    bio: "Event orchestrator curating high-energy summits, international meetups, engaging townhalls, and memorable community experiences.",
    quote: "Creating spaces where ideas collide and meaningful connections flourish.",
    skills: ["Event Management", "Summit Organization", "Public Relations", "Community Engagement", "Logistics"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/asma-ul-hosna-0ab240298",
      instagram: "https://www.instagram.com/asma_hosna1_"
    }
  },
  {
    id: "batzhargal-liza",
    name: "Batzhargal Liza",
    designation: "Head of Quality Assurance & HR",
    department: "quality",
    departmentLabel: "Quality & HR",
    roleBadge: "HEAD OF QUALITY & HR",
    city: "Karaganda",
    country: "Kazakhstan",
    countryCode: "kz",
    countryFlag: "🇰🇿",
    university: "L.N. Gumilyov Eurasian National University",
    email: "batzhargal31@gmail.com",
    image: "/team/Liza.jpg",
    bio: "Dedicated people champion cultivating a thriving global culture, talent excellence, diversity, and compassionate human resources.",
    quote: "Empowering every individual to discover their greatest potential.",
    skills: ["Quality Standards", "Talent Acquisition", "People Operations", "Global Culture", "Workplace Well-being"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/liza-batzhargal-5186612bb",
      instagram: "https://www.instagram.com/_reptiiliian_"
    }
  },
  {
    id: "duru-cilingiroglu",
    name: "Duru Çilingiroğlu",
    designation: "HR & Quality Intern",
    department: "quality",
    departmentLabel: "Quality & HR",
    roleBadge: "QUALITY INTERN",
    city: "Bursa",
    country: "Türkiye",
    countryCode: "tr",
    countryFlag: "🇹🇷",
    university: "Kaşgarlı Mahmud Anatolian High School",
    email: "durucilingir2009@hotmail.com",
    image: "/team/Duru.jpg",
    bio: "Enthusiastic and agile HR intern supporting global candidate sourcing, onboarding processes, and community communication.",
    quote: "Learning relentlessly and bringing youthful energy to every challenge.",
    skills: ["Talent Sourcing", "Team Communication", "Onboarding Support", "International Relations"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/duruçilingiroğlu",
      instagram: "https://www.instagram.com/dduruclngr"
    }
  },
  {
    id: "asma-seddiqi",
    name: "Asma Seddiqi",
    designation: "Head of Marketing Department",
    department: "marketing",
    departmentLabel: "Marketing",
    roleBadge: "HEAD OF MARKETING",
    city: "Kabul",
    country: "Afghanistan",
    countryCode: "af",
    countryFlag: "🇦🇫",
    university: "Marketing & Communications Scholar",
    email: "elsaseddiqi4@gmail.com",
    image: "/team/Asma Seddique.jpg",
    bio: "Dynamic brand strategist leading global marketing initiatives, brand presence, digital reach, and compelling visual storytelling.",
    quote: "Telling stories that resonate globally and inspire positive action.",
    skills: ["Brand Strategy", "Digital Marketing", "Social Media Campaigns", "Content Creation", "Audience Growth"],
    socialLinks: {
      linkedin: null,
      instagram: "https://www.instagram.com/seddiqiasma/"
    }
  }
];

export const DEPARTMENT_CATEGORIES = [
  { id: 'all', label: 'All Members', icon: '🌐', count: 8 },
  { id: 'operations', label: 'Operations & Leadership', icon: '⚡', count: 4 },
  { id: 'event', label: 'Event Department', icon: '🎪', count: 1 },
  { id: 'quality', label: 'Quality & HR', icon: '🛡️', count: 2 },
  { id: 'marketing', label: 'Marketing Department', icon: '📢', count: 1 },
  { id: 'content', label: 'Content Department', icon: '✍️', count: 0 }
];
