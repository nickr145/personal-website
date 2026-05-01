export type SkillCategory = {
  category: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Swift", "Objective-C", "Java", "Scala", "C++", "R", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "FastAPI", "Node.js", "Pydantic", "Jetpack Compose", "SwiftUI", "PyTorch", "TensorFlow", "Pandas", "NumPy"],
  },
  {
    category: "AI & Machine Learning",
    items: ["Anthropic Claude API", "LangGraph", "Core ML", "Create ML", "ElevenLabs STT/TTS", "Prompt Engineering", "LLMs", "Random Forest", "LSTM", "Conversational AI"],
  },
  {
    category: "Data & Storage",
    items: ["Apache Spark", "Hadoop", "SQL", "SQLite", "PostgreSQL", "ETL", "Prisma", "MapReduce", "TPC-H"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Git", "Docker", "Google Cloud", "Microsoft Azure", "CI/CD", "XCTest", "XCUITest"],
  },
  {
    category: "Mobile",
    items: ["SwiftUI", "Objective-C", "Core ML", "Create ML", "XCTest", "XCUITest", "Android (Jetpack Compose)"],
  },
  {
    category: "Tools & Platforms",
    items: ["GitHub", "Confluence", "REST APIs", "Socket.io", "JWT", "Vercel", "Prisma"],
  },
  {
    category: "Concepts",
    items: ["Software Design & Architecture", "MVVM", "Object-Oriented Design", "Distributed Systems", "Data-Intensive Computing", "Federated Data", "Financial Modelling", "Risk & Insurance", "Agile / Stakeholder Collaboration", "Business Analytics"],
  },
];