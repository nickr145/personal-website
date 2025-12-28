export type Experience = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
};

export const experiences: Experience[] = [
  {
    role: "Mobile iOS LiveLabs Developer",
    company: "CIBC",
    startDate: "Sept 2024",
    endDate: "Dec 2024",
    description: 
    "- Built a proof-of-concept credit card statement tracking app, integrating modern SwiftUI practices with legacy Objective-C code\n- Applied software design principles and architectural patterns such as MVVM to ensure modularity, scalability, and seamless system integration\n- Applied Agile/DevOps practices through code reviews, testing, and automation to support smooth migration and deployment of systems\n- Conducted research and built financial forecast models, applying financial modelling and strategic/risk analysis to identify revenue growth opportunities and present recommendations to CIBC leadership",
    skills: ["Swift", "Objective-C", "Xcode", "MVVM", "Core ML", "Leadership", "Strategic Thinking"],
  },
  {
    role: "Mobile iOS LiveLabs Developer",
    company: "CIBC",
    startDate: "Jan 2024",
    endDate: "Apr 2024",
    description:
      "- Engineered a recommendation system by building and deploying API workers to fetch user data, then applying machine learning techniques with Core ML and CreateML to deliver tailored, reliable suggestions that enhanced user experience. \n- Collaborated with cross-functional teams to design and implement new app features, ensuring alignment with business goals and user needs.",
    skills: ["Swift", "Core ML", "CreateML", "APIs", "Machine Learning", "Collaboration", "UI/UX"],
  },
  {
    role: "Software Application Developer",
    company: "CIBC",
    startDate: "January 2023",
    endDate: "Apr 2023",
    description:
      "- Migrated a large Confluence database to a new space, reorganizing content with usability and design principles in mind to create a more intuitive and user-friendly structure.\n- Researched SwiftUI's strengths and limitations, and developed small prototype projects to demonstrate its capabilities, helping the iOS team evaluate adoption for future development.",
    skills: ["Swift", "SwiftUI", "Xcode", "Problem Solving", "Innovation", "Communication", "Adaptability"],
  },
  {
    role: "Teaching Assistant",
    company: "Lisgar Kumon",
    startDate: "2019",
    endDate: "2021",
    description:
      "- Assisted students to understand challenging concepts/questions and used graphs, drawings, and analogies to illustrate the application of concepts or to simplify questions. Significantly improved student scores. \n- Managed and monitored homework assignments for 20+ students per section and assessed student proficiency in Math and English concepts. Used time management strategies to encourage students to meet deadlines and stay on task with their work.",
    skills: ["Problem Solving", "Communication", "Mentoring", "Adaptability", "Leadership", "Cross-Functional Teamwork"],
  },
];
