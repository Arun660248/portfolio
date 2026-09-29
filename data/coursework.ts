export interface Course {
  code: string;
  name: string;
  category: "Applied AI & ML" | "Systems & Algorithms" | "Mathematics & Optimization";
  status: "completed" | "in-progress";
  relevanceToPortfolio: string;
}

export const IITG_COURSEWORK: Course[] = [
  // Applied AI & ML
  {
    code: "DA 210",
    name: "Time Series Analysis & Forecasting",
    category: "Applied AI & ML",
    status: "completed",
    relevanceToPortfolio: "Mathematical foundation for ARIMA forecasting in the Algorithmic Trading Agent.",
  },
  {
    code: "DA 261",
    name: "Machine Learning Fundamentals",
    category: "Applied AI & ML",
    status: "completed",
    relevanceToPortfolio: "Supervised & unsupervised learning models, evaluation metrics (MAPE, F1-score).",
  },
  {
    code: "DA 262",
    name: "Recommender Systems",
    category: "Applied AI & ML",
    status: "completed",
    relevanceToPortfolio: "Collaborative filtering, matrix factorization, and similarity metrics used in vector search.",
  },
  {
    code: "DA 302",
    name: "Deep Learning Essentials",
    category: "Applied AI & ML",
    status: "in-progress",
    relevanceToPortfolio: "Neural network architectures, attention mechanisms, and transformer foundation models.",
  },
  {
    code: "DA 361",
    name: "Financial Valuation & Portfolio Analytics",
    category: "Applied AI & ML",
    status: "in-progress",
    relevanceToPortfolio: "Equity valuation, cash flow modeling, and financial ratios for the AI Financial Analyst.",
  },

  // Systems & Algorithms
  {
    code: "DA 110",
    name: "Data Structures",
    category: "Systems & Algorithms",
    status: "completed",
    relevanceToPortfolio: "Trees, graphs, and hash structures fundamental to vector indexing and DAG workflow execution.",
  },
  {
    code: "DA 111",
    name: "Algorithm Design & Analysis",
    category: "Systems & Algorithms",
    status: "completed",
    relevanceToPortfolio: "Computational complexity, search algorithms, and concurrency isolation.",
  },
  {
    code: "DA 201",
    name: "Relational Database Management Systems",
    category: "Systems & Algorithms",
    status: "completed",
    relevanceToPortfolio: "SQL modeling, ACID transactions, and persistent session storage (SqliteSessionService).",
  },
  {
    code: "DA 108",
    name: "Python Programming",
    category: "Systems & Algorithms",
    status: "completed",
    relevanceToPortfolio: "Core language mastery powering all 5 production backend microservices.",
  },
  {
    code: "DA 301",
    name: "Cloud Computing",
    category: "Systems & Algorithms",
    status: "in-progress",
    relevanceToPortfolio: "Virtualization, Docker container orchestration, AWS EC2, and Cloudflare reverse proxying.",
  },

  // Mathematics & Optimization
  {
    code: "DA 105",
    name: "Linear Algebra",
    category: "Mathematics & Optimization",
    status: "completed",
    relevanceToPortfolio: "Vector spaces, dot products, and cosine similarity underlying dense embedding retrieval in RAG.",
  },
  {
    code: "DA 203",
    name: "Optimization",
    category: "Mathematics & Optimization",
    status: "completed",
    relevanceToPortfolio: "Gradient descent, loss minimization, and constraint modeling in agentic decision chains.",
  },
  {
    code: "DA 206",
    name: "Statistical Inferencing",
    category: "Mathematics & Optimization",
    status: "completed",
    relevanceToPortfolio: "Hypothesis testing, confidence intervals, and benchmark error bounds.",
  },
  {
    code: "DA 204",
    name: "Basic Econometrics",
    category: "Mathematics & Optimization",
    status: "completed",
    relevanceToPortfolio: "Regression modeling, causality testing, and macro economic trend analysis.",
  },
];
