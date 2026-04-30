export type EducationEntry = {
  institution: string;
  degree: string;
  period: string;
  courses: string[];
};

export const educationEntries: EducationEntry[] = [
  {
    institution: "University of Waterloo",
    degree: "Bachelor of Computer Science with Specialization in Software Engineering",
    period: "2021 - 2026",
    courses: [
      "Algebra", "Calculus", "Linear Algebra", "Optimization",
      "Combinatorics", "Probability", "Statistics",
      "Functional Programming", "Algorithm Design and Data Abstraction",
      "Object Oriented Programming", "Data Structures", "Algorithms",
      "Logic and Computation", "Computer Organization and Design",
      "Sequential Programming", "Introduction to Database Management",
      "Operating Systems", "User Interfaces", "Computational Vision",
      "Information Systems Management", "Software Design and Architectures",
      "Information Systems Management", "Distributed Systems", "Computer Networks",
      "The Social Implications of Computing", "Software Requirements Specification and Analysis",
      "Introduction to Artificial Intelligence", "Software Testing and Quality Assurance",
      "Data-Intensive Distributed Computing",
    ],
  },
  {
    institution: "Wilfrid Laurier University",
    degree: "Bachelor of Business Administration with Finance Concentration",
    period: "2021 - 2026",
    courses: [
      "Functional Areas of an Organization", "Business Environment",
      "Introductory Microeconomics", "Introductory Macroeconomics",
      "Financial Accounting", "Business Law", "Managerial Accounting",
      "Organizational Behaviour", "Human Resources Management",
      "Marketing Management", "Operations Management", "Intermediate Microeconomics", 
      "Business Analytics", "Strategic Management", "Advanced Corporate Finance",
      "Risk Management & Insurance", "Options, Futures and Swaps", "Investment Management",
      "Personal Financial Planning and Management",
    ],
  },
];
