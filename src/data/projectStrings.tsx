// projectStrings.tsx

// Efficient Tokenizer
export const efficientTokenizerTitle = "Efficient Tokenizer - Significance-Aware BPE";
export const efficientTokenizerDescription =
`
Designed a significance-aware Byte-Pair Encoding tokenizer using entropy-weighted merge selection rather than raw frequency, improving compression by 7% over standard BPE. Integrated the tokenizer with a transformer model and benchmarked it against character-level encoding, achieving a 6% perplexity improvement and 68% reduction in sequence length.
Built a comprehensive benchmarking suite and token importance analysis pipeline using attention-based and gradient-based methods to interpret how the tokenizer interacts with downstream model behaviour.
`;
export const efficientTokenizerTags = [
  "Python",
  "PyTorch",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "NLP",
  "Tokenization",
  "Information Theory",
  "Transformers",
  "Benchmarking",
];

// NewsEdge
export const newsEdgeTitle = "NewsEdge - Real-Time Market Sentiment Intelligence";
export const newsEdgeDescription =
`
NewsEdge is a real-time stock news sentiment platform that combines live market news ingestion, financial NLP, machine learning predictions, and risk analytics into an interactive React dashboard. The platform streams stock-related news through Alpaca News WebSocket, supports historical backfill through REST and web scraping, and filters articles by ticker relevance to reduce noisy cross-market results.
The backend uses Redis Streams and Celery workers for asynchronous ingestion, scoring, persistence, and model workflows, with PostgreSQL or SQLite for storing articles, sentiment scores, predictions, and price labels. NewsEdge applies FinBERT for financial-domain sentiment analysis, with VADER as a fallback, and uses an XGBoost prediction model powered by sentiment features and technical indicators such as RSI, momentum, Bollinger Band position, and volume ratio. The dashboard visualizes live news, sentiment trends, price overlays, prediction signals, SHAP explanations, watchlists, and risk metrics including volatility, beta, drawdown, and cumulative return.
`;
export const newsEdgeTags = [
  "AI", 
  "FinTech", 
  "Stock Market", 
  "Sentiment Analysis", 
  "Financial NLP", 
  "React", 
  "Vite", 
  "FastAPI", 
  "Python", 
  "Alpaca API", 
  "WebSockets", 
  "Redis Streams", 
  "Celery", 
  "PostgreSQL", 
  "SQLite", 
  "FinBERT", 
  "VADER", 
  "XGBoost", 
  "SHAP", 
  "Risk Analytics", 
  "Machine Learning", 
  "Docker", 
  "Alembic", 
  "Pytest"
];
export const newsEdgeRepo = "https://github.com/nickr145/news-edge";

// CityMind
export const cityMindTitle = "CityMind - Municipal Data Intelligence for Smarter Cities";
export const cityMindDescription = 
`
CityMind, developed during the FCI x LangChain: Building the Future Cities Hackathon, is a 
municipal data intelligence web app designed to make city data easier to access, understand, 
and use across departments. The app enables plain-language querying across real municipal datasets, 
including building permits, water mains, and transit data, helping users extract insights without needing 
to manually navigate complex data sources. Built with React, FastAPI, SQLite, LangGraph, and Claude Sonnet, 
CityMind combines conversational AI with structured municipal data access. 
The project also includes privacy-aware access controls and data labelling to balance usability with 
responsible governance, ensuring that sensitive information can be handled appropriately while still 
supporting faster, more informed decision-making.
`
export const cityMindTags = [
  "AI", 
  "Municipal Data", 
  "Civic Tech", 
  "Smart Cities", 
  "React", 
  "FastAPI", 
  "Python", 
  "SQLite", 
  "LangGraph", 
  "Claude Sonnet", 
  "Conversational AI", 
  "Data Governance", 
  "Privacy-Aware AI", 
  "Natural Language Querying", 
  "Hackathon"
];
export const cityMindRepo = "https://github.com/nickr145/city-mind"

// OpenLine
export const openLineTitle = "OpenLine - AI Voice Practice for Real-World Calls";
export const openLineDescription = 
`
OpenLine, developed during a 5-hour Waterloo AI & Data Science for Good Hackathon, is an AI-powered voice-practice web app 
designed to help newcomers build confidence in everyday phone conversations. The app simulates six real-world call scenarios, 
including doctor appointments, landlord requests, transit support, school inquiries, pharmacy calls, and utility services.
I engineered a FastAPI backend with session-based conversation management and five core call lifecycle endpoints, integrating 
Claude with ElevenLabs speech-to-text and text-to-speech for end-to-end voice interaction. OpenLine supports live transcription, 
contextual hints, optional bilingual responses, and automated post-call transcript and debrief generation to help users review 
and improve their communication skills.
`
export const openLineTags = [
  "AI", 
  "Voice AI", 
  "FastAPI", 
  "Python", 
  "Claude API", 
  "ElevenLabs", 
  "Speech-to-Text", 
  "Text-to-Speech", 
  "React", "Web App", 
  "Conversational AI", 
  "Hackathon", 
  "Accessibility", 
  "Newcomer Support"
];
export const openLineRepo = "https://github.com/nickr145/open-line";

// RRPS
export const rrpsTitle = "RRPS - Repeated Rock Paper Scissors AI Agent";
export const rrpsDescription = 
`
Developed an AI agent to play Repeated Rock Paper Scissors (RRPS) using Python. The agent employs a combination of 
pattern recognition and statistical analysis to predict opponent moves and adapt its strategy accordingly. 
By analyzing historical game data, the agent identifies trends and adjusts its playstyle to maximize winning chances 
over multiple rounds. This project showcases the application of machine learning techniques in game theory and strategic decision-making.
`
export const rrpsTags = [
  "python",
  "machine learning",
  "reinforcement learning",
  "game theory",
  "statistical analysis",
  "pattern recognition",
  "strategic AI",
];
export const rrpsRepo = "https://github.com/nickr145/Repeated-Rock-Paper-Scissors-Agent";

// Fit4Me
export const fit4MeTitle = "Fit4Me - Personalized Fitness Tracking App";
export const fit4MeDescription =
`
Fit4Me is an Android fitness app built with Jetpack Compose, Kotlin, 
and a Node.js + PostgreSQL backend. It offers personalized workouts, 
real-time chat, session tracking, and smart partner matching through 
RESTful APIs and WebSockets. Designed for scalability and seamless UX, 
it combines sleek design with strong backend performance.
`
export const fit4MeTags = [
  "android",
  "jetpack compose",
  "kotlin",
  "node.js",
  "express.js",
  "typescript",
  "postgresql",
  "prisma",
  "socket.io",
  "jwt auth",
];
export const fit4MeRepo = "https://github.com/grace-ful/cs446-team-project";

// Crop Yield
export const cropTitle = "Crop Yield Prediction & Risk Mitigation using Deep Learning";
export const cropDescription =
`
Developed a machine learning framework that predicts crop yields and 
assesses agricultural risk using real-world data. The project combined Random Forest, 
Lasso Regression, and LSTM models for accurate, interpretable predictions and created 
a dynamic risk scoring system to support sustainable farming decisions. 
This group effort showcased the power of predictive analytics in agriculture.
`
export const cropTags = [
  "python",
  "pandas",
  "scikit-learn",
  "random forest",
  "lasso regression",
  "neural nets",
  "recurrent nns",
  "lstm",
  "tensorflow",
  "data visualization",
  "feature engineering",
];
export const cropRepo = "https://github.com/nickr145/ml-crop-yield-prediction";

// Skystones
export const skystonesTitle = "Skystones (SwiftUI)";
export const skystonesDescription = 
`
A turn-based strategy game inspired by SkyStones, featuring both 
Player vs Computer (PVC) and Player vs Player (PVP) modes. 
It includes multiple difficulty levels to challenge players of all skill levels, 
a score box for tracking progress and performance, and immersive audio effects to 
enhance gameplay. The game combines tactical decision-making with strategic planning, 
offering an engaging and competitive experience.
`
export const skystonesTags = ["SwiftUI", "iOS", "Game Development", "MVVM", "Game AI"];
export const skystonesRepo = "https://github.com/yourname/skystones";

// Password Generator
export const pwgenTitle = "Password Generator";
export const pwgenDescription = 
`
Built with SwiftUI, this app lets users generate strong, customizable passwords 
with multiple complexity levels. It features an engaging, animated interface that 
makes creating passwords fun and intuitive. All generated passwords are securely 
saved and can be accessed later through Face ID authentication, ensuring privacy and 
security. Users can easily review their password history and have the option to clear 
it with a confirmation prompt, providing full control over their data.
`
export const pwgenTags = ["SwiftUI", "iOS", "Security", "Biometric Auth", "Local Storage"];
export const pwgenRepo = "https://github.com/nickr145/PasswordGenerator";

// Expense Tracker
export const expTrackerTitle = "Expense Tracker";
export const expTrackerDescription = 
`
An intuitive iOS app developed using SwiftUI that helps users track their expenses 
and manage budgets effectively. The app features a clean and user-friendly interface, 
allowing users to easily log expenses, categorize them, and view detailed reports. 
With built-in budget management tools, users can set spending limits and receive 
notifications when they approach their budget thresholds. The app also supports 
data visualization through charts and graphs, providing insights into spending habits.
`
export const expTrackerTags = ["SwiftUI", "iOS", "Finance", "Data Visualization", "Local Storage", "Notifications"];
export const expTrackerRepo = "https://github.com/nickr145/ExpenseTracker";

// Chess Engine
export const chessTitle = "Chess Engine";
export const chessDescription = 
`
Developed a fully functional chess engine in C++ emphasizing modular, object-oriented design principles. 
The project demonstrates clean architecture through well-defined classes and interfaces for game logic, 
piece behavior, move validation, and board state management. Each component—from piece types to move generators 
to board representation—was designed as an independent, reusable module. This project showcases best practices 
in OOP modularization, including separation of concerns, encapsulation, and maintainable code organization.
`
export const chessTags = ["C++", "OOP", "Game Logic", "Modular Design", "Clean Architecture", "Software Engineering"];
export const chessRepo = "https://github.com/nickr145/modular-chess-engine";
