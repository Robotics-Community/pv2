// src/data/beehiveData.js
export const beehiveData = [
  {
    id: '1',
    videoUrl: 'https://example.com/videos/robot-match-1.mp4',
    thumbnailUrl: '/assets/images/robot-match-1-thumb.jpg',
    user: {
      username: 'team_robotics_4567',
      profilePicture: '/assets/images/team_profile_1.jpg',
    },
    caption: 'Our winning match at the 2023 FIRST Championship! Amazing teamwork by everyone involved 🤖🏆',
    views: '14.5K',
    likes: 2453,
    comments: [
      { username: 'robofan', text: 'Outstanding performance!' },
      { username: 'mech_engineer', text: 'That autonomous mode was incredible' },
      { username: 'future_roboticist', text: 'How did you program that turn sequence?' }
    ],
    timestamp: '2 days ago'
  },
  {
    id: '2',
    videoUrl: 'https://example.com/videos/robot-reveal-2023.mp4',
    thumbnailUrl: '/assets/images/robot-reveal-thumb.jpg',
    user: {
      username: 'vex_champions',
      profilePicture: '/assets/images/team_profile_2.jpg',
    },
    caption: 'ROBOT REVEAL 2023! 🔥 Meet "Buzzinator" - our new competition robot with 6-wheel drive and 360° rotating arm',
    views: '28.7K',
    likes: 4891,
    comments: [
      { username: 'tech_enthusiast', text: 'The design is incredible!' },
      { username: 'robotics_mentor', text: 'Very impressive work team!' },
      { username: 'stem_student', text: 'How long did this take to build?' }
    ],
    timestamp: '1 week ago'
  },
  {
    id: '3',
    videoUrl: 'https://example.com/videos/programming-tutorial.mp4',
    thumbnailUrl: '/assets/images/tutorial-thumb.jpg',
    user: {
      username: 'robotics_teacher',
      profilePicture: '/assets/images/teacher_profile.jpg',
    },
    caption: 'Quick tutorial: How to program PID controllers for smooth robot movement #RoboticsTutorial #Programming',
    views: '9.2K',
    likes: 1847,
    comments: [
      { username: 'beginner_coder', text: 'Thanks for explaining this so clearly!' },
      { username: 'robot_enthusiast', text: 'Just what I needed for my project' }
    ],
    timestamp: '3 days ago'
  },
  {
    id: '4',
    videoUrl: 'https://example.com/videos/robocup-highlights.mp4',
    thumbnailUrl: '/assets/images/robocup-thumb.jpg',
    user: {
      username: 'robocup_official',
      profilePicture: '/assets/images/robocup_profile.jpg',
    },
    caption: 'Best moments from RoboCup 2023! Humanoid robots showing incredible soccer skills',
    views: '105K',
    likes: 12482,
    comments: [
      { username: 'ai_researcher', text: 'The balance control is getting better every year' },
      { username: 'soccer_fan', text: 'Better than some professional players 😂' },
      { username: 'robotics_student', text: 'Aspiring to compete here someday!' }
    ],
    timestamp: '1 month ago'
  },
  {
    id: '5',
    videoUrl: 'https://example.com/videos/building-timelapse.mp4',
    thumbnailUrl: '/assets/images/build-thumb.jpg',
    user: {
      username: 'high_school_robotics',
      profilePicture: '/assets/images/school_team.jpg',
    },
    caption: '30 days of robot building in 30 seconds! Watch our journey from concept to competition 🛠️',
    views: '56.3K',
    likes: 7241,
    comments: [
      { username: 'mechanical_engineer', text: 'So satisfying to watch!' },
      { username: 'stem_educator', text: 'Showing this to my students tomorrow' },
      { username: 'robotics_parent', text: 'So proud of all the students involved!' }
    ],
    timestamp: '2 weeks ago'
  }
];