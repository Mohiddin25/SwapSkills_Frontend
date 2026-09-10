// Realistic Mock Data for Skill Swap (Ivy Editorial Campus Platform)

export const INITIAL_USER = {
  id: 'usr-alex-johnson',
  name: 'Alex Johnson',
  email: 'alex.johnson@campus.edu',
  department: 'Computer Science & Engineering',
  year: '2nd Year',
  bio: 'Undergraduate researcher focused on systems engineering and interactive software. Excited to exchange programming guidance for intuitive UI/UX and product design skills.',
  contributorLevel: 'Level 3 Contributor',
  credits: 8,
  sessionsCompleted: 18,
  studentsHelped: 14,
  rating: 4.9,
  avatarUrl: null,
  skillsTeach: [
    { name: 'Python', level: 'Advanced' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'C++', level: 'Intermediate' }
  ],
  skillsLearn: [
    { name: 'React', level: 'Intermediate' },
    { name: 'UI/UX Design', level: 'Intermediate' },
    { name: 'System Design', level: 'Intermediate' }
  ],
  availability: [
    { id: 'av-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
    { id: 'av-2', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
    { id: 'av-3', day: 'Saturday', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00' }
  ],
  preferences: {
    notificationsEmail: true,
    notificationsSwap: true,
    notificationsReminder: true,
    profileVisibility: 'Campus Wide',
    showAvailability: true
  }
};

export const INITIAL_STUDENTS = [
  {
    id: 'stu-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    bio: 'Interested in product design, human-computer interaction, and frontend prototyping. Looking to master Python data structures and scripting.',
    contributorLevel: 'Level 4 Contributor',
    rating: 5.0,
    skillsTeach: [
      { name: 'UI/UX Design', level: 'Advanced' },
      { name: 'Figma', level: 'Advanced' },
      { name: 'Design Systems', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'Data Analysis', level: 'Beginner' }
    ],
    availability: [
      { id: 'p-1', day: 'Saturday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'p-2', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'p-3', day: 'Tuesday', time: '3:00 PM – 5:00 PM', start: '15:00', end: '17:00' }
    ],
    locationPreference: 'Central Library · 2nd Floor Study Commons'
  },
  {
    id: 'stu-2',
    name: 'Rahul Verma',
    email: 'rahul.verma@campus.edu',
    department: 'Electronics & Communication',
    year: '3rd Year',
    bio: 'Specializing in embedded computing and signal processing. Passionate about machine learning pipelines and building clean user interfaces.',
    contributorLevel: 'Level 3 Contributor',
    rating: 4.8,
    skillsTeach: [
      { name: 'Python', level: 'Advanced' },
      { name: 'Machine Learning', level: 'Intermediate' },
      { name: 'C++', level: 'Advanced' }
    ],
    skillsLearn: [
      { name: 'UI/UX Design', level: 'Beginner' },
      { name: 'React', level: 'Intermediate' }
    ],
    availability: [
      { id: 'r-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
      { id: 'r-2', day: 'Thursday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' }
    ],
    locationPreference: 'Engineering Block A · Collaborative Lab'
  },
  {
    id: 'stu-3',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@campus.edu',
    department: 'Computer Science & Engineering',
    year: '4th Year',
    bio: 'Frontend architect and open-source enthusiast. Happy to mentor in React ecosystem and clean component architecture in exchange for backend system design.',
    contributorLevel: 'Level 5 Contributor',
    rating: 4.9,
    skillsTeach: [
      { name: 'React', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Frontend Architecture', level: 'Advanced' }
    ],
    skillsLearn: [
      { name: 'System Design', level: 'Intermediate' },
      { name: 'C++', level: 'Intermediate' }
    ],
    availability: [
      { id: 'a-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
      { id: 'a-2', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'a-3', day: 'Friday', time: '3:00 PM – 5:00 PM', start: '15:00', end: '17:00' }
    ],
    locationPreference: 'Student Innovation Hub · Room 104'
  },
  {
    id: 'stu-4',
    name: 'Arjun Rao',
    email: 'arjun.rao@campus.edu',
    department: 'Mechanical Engineering',
    year: '3rd Year',
    bio: 'Lead videographer for university symposiums. Keen on learning algorithmic programming in C++ for robotics control simulations.',
    contributorLevel: 'Level 2 Contributor',
    rating: 4.7,
    skillsTeach: [
      { name: 'Video Editing', level: 'Advanced' },
      { name: 'Motion Design', level: 'Intermediate' },
      { name: 'Graphic Design', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'C++', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' }
    ],
    availability: [
      { id: 'ar-1', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'ar-2', day: 'Saturday', time: '11:00 AM – 2:00 PM', start: '11:00', end: '14:00' }
    ],
    locationPreference: 'Academic Quad · Open Pavilion'
  },
  {
    id: 'stu-5',
    name: 'Sneha Patel',
    email: 'sneha.patel@campus.edu',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    bio: 'First-year student with a background in digital branding and visual communication. Seeking peer mentorship in Java and object-oriented paradigms.',
    contributorLevel: 'Level 2 Contributor',
    rating: 4.9,
    skillsTeach: [
      { name: 'Graphic Design', level: 'Advanced' },
      { name: 'Presentation Skills', level: 'Advanced' },
      { name: 'Figma', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'Java', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' }
    ],
    availability: [
      { id: 's-1', day: 'Monday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 's-2', day: 'Saturday', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00' }
    ],
    locationPreference: 'Central Library · 2nd Floor Study Commons'
  },
  {
    id: 'stu-6',
    name: 'Karthik Kumar',
    email: 'karthik.kumar@campus.edu',
    department: 'Electrical & Electronics',
    year: '2nd Year',
    bio: 'Data enthusiast analyzing energy grid consumption patterns. Excited to teach statistical modeling and SQL in return for advanced Python scripting.',
    contributorLevel: 'Level 3 Contributor',
    rating: 4.8,
    skillsTeach: [
      { name: 'Data Analysis', level: 'Intermediate' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Statistics', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'React', level: 'Beginner' }
    ],
    availability: [
      { id: 'k-1', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'k-2', day: 'Friday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' }
    ],
    locationPreference: 'Science Concourse · Peer Lounge'
  },
  {
    id: 'stu-7',
    name: 'Meera Nair',
    email: 'meera.nair@campus.edu',
    department: 'Civil Engineering',
    year: '3rd Year',
    bio: 'Debate society chair and academic delegate. Offering coaching in structured public speaking and technical paper writing in exchange for financial modeling.',
    contributorLevel: 'Level 4 Contributor',
    rating: 5.0,
    skillsTeach: [
      { name: 'Public Speaking', level: 'Advanced' },
      { name: 'Technical Writing', level: 'Advanced' },
      { name: 'Presentation Skills', level: 'Advanced' }
    ],
    skillsLearn: [
      { name: 'Excel', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' }
    ],
    availability: [
      { id: 'm-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
      { id: 'm-2', day: 'Thursday', time: '3:00 PM – 5:00 PM', start: '15:00', end: '17:00' }
    ],
    locationPreference: 'Academic Quad · Open Pavilion'
  },
  {
    id: 'stu-8',
    name: 'Aditya Singh',
    email: 'aditya.singh@campus.edu',
    department: 'Electronics & Communication',
    year: '2nd Year',
    bio: 'Embedded robotics developer focusing on low-latency microcontrollers. Eager to master React to build intuitive telemetry web dashboards.',
    contributorLevel: 'Level 3 Contributor',
    rating: 4.7,
    skillsTeach: [
      { name: 'C++', level: 'Advanced' },
      { name: 'Arduino & IoT', level: 'Intermediate' },
      { name: 'Python', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'React', level: 'Intermediate' },
      { name: 'UI/UX Design', level: 'Beginner' }
    ],
    availability: [
      { id: 'ad-1', day: 'Monday', time: '6:00 PM – 8:00 PM', start: '18:00', end: '20:00' },
      { id: 'ad-2', day: 'Saturday', time: '10:00 AM – 1:00 PM', start: '10:00', end: '13:00' }
    ],
    locationPreference: 'Engineering Block A · Collaborative Lab'
  },
  {
    id: 'stu-9',
    name: 'Neha Gupta',
    email: 'neha.gupta@campus.edu',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    bio: 'Backend systems enthusiast studying microservices, caching, and scalable message queues. Looking to pair on user experience design.',
    contributorLevel: 'Level 4 Contributor',
    rating: 4.9,
    skillsTeach: [
      { name: 'System Design', level: 'Intermediate' },
      { name: 'Java', level: 'Advanced' },
      { name: 'SQL', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'UI/UX Design', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' }
    ],
    availability: [
      { id: 'ng-1', day: 'Wednesday', time: '4:00 PM – 6:00 PM', start: '16:00', end: '18:00' },
      { id: 'ng-2', day: 'Saturday', time: '2:00 PM – 5:00 PM', start: '14:00', end: '17:00' }
    ],
    locationPreference: 'Student Innovation Hub · Room 104'
  },
  {
    id: 'stu-10',
    name: 'Rohan Das',
    email: 'rohan.das@campus.edu',
    department: 'Mechanical Engineering',
    year: '4th Year',
    bio: 'Senior working on finite element analysis and thermodynamic spreadsheets. Ready to mentor in advanced Excel modeling.',
    contributorLevel: 'Level 3 Contributor',
    rating: 4.6,
    skillsTeach: [
      { name: 'Excel', level: 'Advanced' },
      { name: 'Statistics', level: 'Intermediate' },
      { name: 'Technical Writing', level: 'Intermediate' }
    ],
    skillsLearn: [
      { name: 'Data Analysis', level: 'Intermediate' },
      { name: 'Python', level: 'Beginner' }
    ],
    availability: [
      { id: 'rd-1', day: 'Monday', time: '5:00 PM – 7:00 PM', start: '17:00', end: '19:00' },
      { id: 'rd-2', day: 'Wednesday', time: '3:00 PM – 5:00 PM', start: '15:00', end: '17:00' }
    ],
    locationPreference: 'Central Library · 2nd Floor Study Commons'
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req-01',
    senderId: 'stu-1',
    senderName: 'Priya Sharma',
    senderDepartment: 'Computer Science & Engineering',
    senderYear: '2nd Year',
    receiverId: 'usr-alex-johnson',
    receiverName: 'Alex Johnson',
    skillYouTeach: 'Python',
    skillTheyTeach: 'UI/UX Design',
    compatibility: 95,
    suggestedTime: 'Saturday · 4:00–5:00 PM',
    message: 'Hi Alex, I saw your advanced Python background and would love to exchange weekly sessions on UI/UX product design and Figma workflows.',
    status: 'Pending', // Pending | Accepted | Declined | Cancelled
    createdAt: '2026-09-08T10:15:00Z',
    direction: 'received'
  },
  {
    id: 'req-02',
    senderId: 'stu-4',
    senderName: 'Arjun Rao',
    senderDepartment: 'Mechanical Engineering',
    senderYear: '3rd Year',
    receiverId: 'usr-alex-johnson',
    receiverName: 'Alex Johnson',
    skillYouTeach: 'C++',
    skillTheyTeach: 'Video Editing',
    compatibility: 78,
    suggestedTime: 'Wednesday · 5:00–6:00 PM',
    message: 'Hey Alex! Working on a robotics control loop in C++ and can trade production editing tutorials in Premiere/DaVinci.',
    status: 'Pending',
    createdAt: '2026-09-09T14:30:00Z',
    direction: 'received'
  },
  {
    id: 'req-03',
    senderId: 'usr-alex-johnson',
    senderName: 'Alex Johnson',
    receiverId: 'stu-3',
    receiverName: 'Ananya Reddy',
    receiverDepartment: 'Computer Science & Engineering',
    receiverYear: '4th Year',
    skillYouTeach: 'Python',
    skillTheyTeach: 'React',
    compatibility: 92,
    suggestedTime: 'Monday · 5:30–6:30 PM',
    message: 'Hi Ananya, I am building full-stack prototypes and would value your React architectural insights in exchange for Python backend concepts.',
    status: 'Pending',
    createdAt: '2026-09-09T09:00:00Z',
    direction: 'sent'
  }
];

export const INITIAL_SESSIONS = [
  {
    id: 'sess-01',
    topic: 'Python ? UI/UX Design',
    partnerId: 'stu-1',
    partnerName: 'Priya Sharma',
    partnerDepartment: 'Computer Science & Engineering',
    partnerYear: '2nd Year',
    youTeach: 'Python',
    theyTeach: 'UI/UX Design',
    date: 'Saturday, Nov 22',
    time: '4:00–5:00 PM',
    location: 'Central Library · 2nd Floor Study Commons',
    status: 'Upcoming', // Upcoming | Completed | Cancelled
    notes: 'Covering Python dictionary comprehension & Figma auto-layout principles.'
  },
  {
    id: 'sess-02',
    topic: 'System Design ? React Architecture',
    partnerId: 'stu-3',
    partnerName: 'Ananya Reddy',
    partnerDepartment: 'Computer Science & Engineering',
    partnerYear: '4th Year',
    youTeach: 'System Design',
    theyTeach: 'React',
    date: 'Wednesday, Nov 26',
    time: '4:00–5:00 PM',
    location: 'Engineering Block A · Collaborative Lab',
    status: 'Upcoming',
    notes: 'Reviewing client-side caching strategies and API layer decoupling.'
  },
  {
    id: 'sess-03',
    topic: 'Java ? Graphic Design',
    partnerId: 'stu-5',
    partnerName: 'Sneha Patel',
    partnerDepartment: 'Computer Science & Engineering',
    partnerYear: '1st Year',
    youTeach: 'Java',
    theyTeach: 'Graphic Design',
    date: 'Monday, Nov 10',
    time: '4:00–5:00 PM',
    location: 'Science Concourse · Peer Lounge',
    status: 'Completed',
    notes: 'Introduced OOP inheritance patterns; reviewed typographic hierarchy.'
  },
  {
    id: 'sess-04',
    topic: 'C++ ? Public Speaking',
    partnerId: 'stu-7',
    partnerName: 'Meera Nair',
    partnerDepartment: 'Civil Engineering',
    partnerYear: '3rd Year',
    youTeach: 'C++',
    theyTeach: 'Public Speaking',
    date: 'Friday, Nov 02',
    time: '5:00–6:00 PM',
    location: 'Academic Quad · Open Pavilion',
    status: 'Completed',
    notes: 'Pointers & memory basics; pacing and rhetorical structuring for academic defense.'
  }
];

export const INITIAL_ACTIVITY = [
  { id: 'act-1', text: 'Swap request accepted by Priya Sharma', time: '2 hours ago', type: 'request' },
  { id: 'act-2', text: 'Session completed with Sneha Patel (+1 skill credit earned)', time: '2 days ago', type: 'credit' },
  { id: 'act-3', text: 'New high-compatibility peer detected: Ananya Reddy (92% Match)', time: '3 days ago', type: 'match' },
  { id: 'act-4', text: 'Skill credit milestone reached: Contributor Level 3', time: '5 days ago', type: 'badge' }
];

export const TRENDING_SKILLS = [
  { name: 'React', count: 24, category: 'Software Development' },
  { name: 'Python', count: 19, category: 'Software Development' },
  { name: 'UI/UX Design', count: 16, category: 'Design & Creative' },
  { name: 'Data Analysis', count: 12, category: 'Data & Analytics' },
  { name: 'System Design', count: 10, category: 'Software Development' }
];
