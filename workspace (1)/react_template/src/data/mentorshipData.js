// src/data/mentorshipData.js

// Mentorship dummy data with enhanced fields for the mentorship matchmaking system
export const mentorshipData = [
  {
    id: 101,
    teamId: 1, // Reference to the team in teamsData
    role: "mentor", // mentor or mentee
    roboticsLeague: "FRC",
    specializations: ["Programming", "Mechanical Design", "Strategy"],
    preferredMenteeLeague: ["FRC", "FTC"],
    targetAgeGroup: "High School",
    yearsOfExperience: 8,
    availability: "Weekends",
    virtualOnly: false,
    location: "San Jose, CA",
    locationRadius: 50, // miles
    description: "Experienced team willing to mentor newer FRC or FTC teams. We specialize in Java programming, mechanical design, and competition strategy. Available for in-person mentoring in the Bay Area or virtual sessions."
  },
  {
    id: 102,
    teamId: 2,
    role: "mentee",
    roboticsLeague: "FRC",
    areasNeedingHelp: ["Programming", "Electronics", "Competition Strategy"],
    teamExperience: "Rookie",
    teamSize: 15,
    virtualOnly: false,
    location: "Detroit, MI",
    locationRadius: 30,
    description: "New team looking for guidance in programming autonomous routines and electronics. We're a group of 15 high school students in our second year of competition."
  },
  {
    id: 103,
    teamId: 3,
    role: "mentor",
    roboticsLeague: "FTC",
    specializations: ["Mechanical Design", "CAD", "Strategic Planning"],
    preferredMenteeLeague: ["FTC"],
    targetAgeGroup: "Middle School / High School",
    yearsOfExperience: 5,
    availability: "Weekday evenings",
    virtualOnly: true,
    location: "Boston, MA", 
    locationRadius: 100, // Virtual, but local time zone preferred
    description: "We offer mentorship in mechanical design and strategic planning for FTC teams. Our team has 5 years of experience and we're comfortable with virtual mentoring sessions."
  },
  {
    id: 104,
    teamId: 4,
    role: "mentee",
    roboticsLeague: "FTC",
    areasNeedingHelp: ["Programming", "Computer Vision", "Sensor Integration"],
    teamExperience: "Intermediate",
    teamSize: 10,
    virtualOnly: false,
    location: "Austin, TX",
    locationRadius: 25,
    description: "Intermediate FTC team looking to improve our autonomous routines and sensor integration. We have a solid foundation but need guidance to take our programming to the next level."
  },
  {
    id: 105,
    teamId: 5,
    role: "mentor",
    roboticsLeague: "VEX",
    specializations: ["Game Strategy", "Drive Systems", "Control Systems"],
    preferredMenteeLeague: ["VEX", "VEX IQ"],
    targetAgeGroup: "All ages",
    yearsOfExperience: 7,
    availability: "Flexible",
    virtualOnly: false,
    location: "Chicago, IL",
    locationRadius: 40,
    description: "VEX Robotics experts willing to mentor teams of any age. We can help with drive systems, control systems, and competition strategy. Available for in-person or virtual sessions."
  },
  {
    id: 106,
    teamId: 6,
    role: "mentee",
    roboticsLeague: "VEX",
    areasNeedingHelp: ["Programming", "Sensor Integration", "Strategy"],
    teamExperience: "Intermediate",
    teamSize: 8,
    virtualOnly: true,
    location: "Seattle, WA",
    locationRadius: 60,
    description: "VEX team looking for programming mentorship, especially with sensor integration and autonomous routines. We're comfortable with virtual mentoring sessions."
  },
  {
    id: 107,
    teamId: 7,
    role: "mentor",
    roboticsLeague: "FRC",
    specializations: ["Mechanical Systems", "Electronics", "Project Management"],
    preferredMenteeLeague: ["FRC", "FTC"],
    targetAgeGroup: "High School",
    yearsOfExperience: 10,
    availability: "Weekends and evenings",
    virtualOnly: false,
    location: "Houston, TX",
    locationRadius: 35,
    description: "Experienced FRC team offering mentorship in mechanical systems, electronics, and project management. We have a structured mentoring program and can adapt to your team's needs."
  },
  {
    id: 108,
    teamId: 8,
    role: "mentee",
    roboticsLeague: "FTC",
    areasNeedingHelp: ["Electronics", "Wiring", "Sensors"],
    teamExperience: "Beginner",
    teamSize: 12,
    virtualOnly: false,
    location: "Miami, FL",
    locationRadius: 25,
    description: "First-year FTC team seeking help with electronics and wiring. We have limited experience but are enthusiastic and eager to learn."
  },
  {
    id: 109,
    teamId: 9,
    role: "mentor",
    roboticsLeague: "FRC",
    specializations: ["CAD", "3D Printing", "Fabrication"],
    preferredMenteeLeague: ["FRC", "FTC", "VEX"],
    targetAgeGroup: "All ages",
    yearsOfExperience: 6,
    availability: "Flexible",
    virtualOnly: true,
    location: "Portland, OR",
    locationRadius: 100,
    description: "We offer mentorship in CAD design, 3D printing, and fabrication techniques. Our team can provide virtual design reviews and advice on manufacturing methods for any robotics league."
  },
  {
    id: 110,
    teamId: 10,
    role: "mentee",
    roboticsLeague: "VEX",
    areasNeedingHelp: ["Programming", "Autonomous Routines", "Game Analysis"],
    teamExperience: "Advanced",
    teamSize: 6,
    virtualOnly: true,
    location: "Atlanta, GA",
    locationRadius: 50,
    description: "Advanced VEX team looking to refine our autonomous programming and game analysis. We have strong programming skills but want to optimize our approach for competitions."
  },
  {
    id: 111,
    teamId: 11,
    role: "mentor",
    roboticsLeague: "FRC",
    specializations: ["AI/ML", "Computer Vision", "Advanced Control Systems"],
    preferredMenteeLeague: ["FRC", "FTC"],
    targetAgeGroup: "High School",
    yearsOfExperience: 9,
    availability: "Weekends",
    virtualOnly: true,
    location: "Silicon Valley, CA",
    locationRadius: 200, // Willing to mentor teams virtually anywhere
    description: "Specialized in advanced programming and machine learning applications for robotics. We can help teams implement computer vision, sensor fusion, and intelligent control systems."
  },
  {
    id: 112,
    teamId: 12,
    role: "mentor",
    roboticsLeague: "FTC",
    specializations: ["Driver Training", "Game Strategy", "Mechanical Efficiency"],
    preferredMenteeLeague: ["FTC", "VEX"],
    targetAgeGroup: "Middle School / High School",
    yearsOfExperience: 4,
    availability: "Weekday evenings",
    virtualOnly: false,
    location: "Las Vegas, NV",
    locationRadius: 30,
    description: "Our team focuses on driver training, game strategy, and mechanical efficiency. We offer hands-on mentoring sessions for local teams or can provide virtual strategy consultations."
  }
];

// League options for the form
export const leagueOptions = [
  "FRC (FIRST Robotics Competition)",
  "FTC (FIRST Tech Challenge)",
  "VEX Robotics",
  "VEX IQ",
  "BEST Robotics",
  "BotBall",
  "RoboCup",
  "MATE ROV",
  "Other"
];

// Skills/specializations options for the form
export const specializationOptions = [
  "Programming",
  "Mechanical Design",
  "Electrical Systems",
  "CAD",
  "3D Printing",
  "Strategy",
  "Driver Training",
  "Project Management",
  "Fundraising",
  "Outreach",
  "Autonomous Navigation",
  "Computer Vision",
  "Sensor Integration",
  "Pneumatics",
  "Motion Control"
];