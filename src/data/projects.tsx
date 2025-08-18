// src/data/projects.ts
export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Crop Yield Prediction & Risk Mitigation using Deep Learning",
    description: "Turning agricultural data into actionable crop insights.",
    tags: ["python", "pandas", "scikit-learn", "random forest", "lasso regression", "neural nets", "recurrent nns", "lstm", "tensorflow", "data visualization", "feature engineering"],
    repo: "https://github.com/nickr145/ml-crop-yield-prediction"
  },
  {
    title: "Skystones (SwiftUI)",
    description: "Turn-based strategy with PVC/PVP modes, difficulty levels, score box, and audio.",
    tags: ["SwiftUI", "Game", "MVVM"],
    repo: "https://github.com/yourname/skystones" // placeholder
  },
  {
    title: "Password Generator",
    description: "Complexity-driven password generator with playful animations and history.",
    tags: ["SwiftUI"],
  },
  {
    title: "Weekly Planner (SimpleKit)",
    description: "Imperative UI planner with toolbar actions and drag-to-resize events.",
    tags: ["TypeScript", "SimpleKit", "MVC"],
  },
];
