// projectStrings.tsx

// Distributed Event-Driven Order System
export const dEDOSTitle = "Distributed Event-Driven Order System - Transactional Outbox Pattern";
export const dEDOSDescription = 
`
An event-driven microservice system built with .NET, PostgreSQL, RabbitMQ, and MassTransit, implementing the Transactional Outbox Pattern to eliminate dual-write risk between database persistence and message
publishing. When an order is placed, OrderService.Api writes the order and its outbox record in a single database transaction, guaranteeing the event is never lost or published out of sync with the committed
state.
A background outbox worker polls for unpublished records and publishes OrderPlacedEvent messages to RabbitMQ, which a separate InventoryService consumes asynchronously to reserve stock. The system is fully
containerized for local development (Postgres and RabbitMQ via Docker Compose), with EF Core migrations applied automatically on startup.
`
export const dEDOSTags = [
  ".NET", "C#", "PostgreSQL", "RabbitMQ", "MassTransit", "Event-Driven Architecture", "Microservices", "Transactional Outbox Pattern", "Docker", "Entity Framework Core", "Distributed Systems"
]
export const dEDOSRepo = "https://github.com/nickr145/OrderSystem";

// Async Multiplexed gRPC Streaming Proxy
export const aMGSPTitle = "Async Multiplexed gRPC Streaming Proxy - Lock-Free C++ RPC Engine";
export const aMGSPDescription = 
`
A high-throughput, low-latency gRPC proxy server written in C++20, built around a lock-free multiplexed streaming architecture that eliminates the per-call connection setup, head-of-line blocking, and thread
contention inherent to synchronous unary RPCs. Clients open a single long-lived bidirectional gRPC stream over HTTP/2 instead of a new context per call.
Outgoing requests flow through a single-producer single-consumer lock-free ring buffer into a dedicated writer thread, decoupling caller threads from network I/O without mutex-guarded writes. Responses are
matched back to waiting callers through a zero-allocation, cache-line-aligned slot ring keyed by a 64-bit correlation ID, avoiding heap allocation and locked lookup tables entirely. The server side runs an
explicit asynchronous reactor state machine on gRPC's completion queue API. Benchmarked locally at 10,000 requests per route, the multiplexed path achieves roughly 3x lower average latency (~53us vs. ~157us)
than the synchronous unary baseline.
`
export const aMGSPTags = [
  "C++20", "gRPC", "Protobuf", "CMake", "Boost", "Lock-Free Programming", "Concurrency", "Systems Programming", "Networking", "Asynchronous I/O", "Performance Benchmarking"
]
export const aMGSPRepo = "https://github.com/nickr145/AsyncMultiplexedgRPCStreamingProxy";

// Financial Corrective RAG (CRAG) Engine
export const finCragTitle = "Financial CRAG  - Corrective RAG for FinQA";
export const finCragDescription = 
`
An implementation of Corrective RAG for financial question-answering over SEC filings, built with LangGraph and Claude. Rather than feeding retrieved context straight to the generator, the pipeline scores
retrieval quality with Claude and routes each query through one of three correction paths: refining the top internal document when retrieval looks correct, or falling back to a live SEC EDGAR full-text search
when it doesn't.
Retrieval combines BM25 and dense embedding search (all-MiniLM-L6-v2) as a weighted hybrid fusion. The workflow runs fully async through LangGraph, with concurrent question batching yielding a measured 2.56x
speedup over sequential execution. Evaluation uses a custom numeric-tolerance metric that reconciles unit suffixes and percent/fraction scale mismatches between predicted and gold answers. Shipped with a FastAPI
backend, a Streamlit demo UI, and a benchmark suite comparing CRAG against a naive RAG baseline.
`
export const finCragTags = [
  "Python", "LangGraph", "Claude API", "Retrieval-Augmented Generation", "Financial NLP", "Hybrid Retrieval", "BM25", "Sentence Transformers", "SEC EDGAR API", "FastAPI", "Streamlit", "Async", "Pytest"
]
export const finCragRepo = "https://github.com/nickr145/crag-finqa";

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
