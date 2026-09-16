/**
 * Single source of truth for every piece of copy on the page.
 * Wording follows `docs/complete-layout.png`; facts, links and
 * contact details carry over from the previous site.
 */

export const profile = {
  name: 'Abhishek Tripathi',
  initials: 'AT',
  role: 'GenAI Engineer | Data Scientist',
  headline: 'GenAI Engineer & Data Scientist',
  greeting: "HELLO, I'M",
  intro:
    'I build intelligent AI systems with LLMs, RAG, and AI Agents to turn complex data into real-world solutions.',
  location: 'Pune, Maharashtra, IN',
  email: 'abhishek0akt@gmail.com',
  phone: '+91-7668617782',
  linkedin: 'https://www.linkedin.com/in/abhishekab9873',
  github: 'https://github.com/Abhishek10100',
  resume: '/resume.pdf',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Demos', href: '#demos' },
]

export const heroStats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 5, suffix: '+', label: 'AI Products' },
  { value: 70, suffix: '%', label: 'Manual Effort Reduced' },
  { value: 1000, suffix: '+', label: 'Docs Processed' },
]

export const trustedTech = [
  'OpenAI',
  'Azure',
  'AWS',
  'Google Cloud',
  'LangChain',
  'LangGraph',
  'Docker',
  'Snowflake',
  'Tableau',
]

export const trustedQuote =
  'Turning ideas, data and documents into intelligent solutions.'

export const about = {
  eyebrow: 'ABOUT ME',
  title: ['Building with AI.', 'Solving for People.'],
  body: 'Associate Data Scientist with 2+ years of experience in GenAI, machine learning, and AI solution development. I enjoy building products that are useful, intuitive and scalable — from RAG and AI agents to computer vision and predictive analytics.',
  quote: 'A blend of analytical thinking and creative problem solving.',
  note: 'Continuous Learning Always!',
  cta: 'More About Me',
}

export const whatIDo = {
  eyebrow: 'WHAT I DO',
  title: 'From Data to Intelligence',
  subtitle: 'End-to-end GenAI solutions — from ideation to deployment.',
  items: [
    {
      icon: 'sparkles',
      title: 'Generative AI',
      body: 'LLM apps, RAG pipelines, AI agents, prompt engineering.',
      tone: 'brand',
    },
    {
      icon: 'search',
      title: 'RAG & Search',
      body: 'Enterprise search, document intelligence, knowledge systems.',
      tone: 'violet',
    },
    {
      icon: 'agent',
      title: 'AI Agents',
      body: 'Agentic workflows with LangChain & LangGraph.',
      tone: 'sky',
    },
    {
      icon: 'chart',
      title: 'Applied ML',
      body: 'Predictive models, recommendation systems and analytics.',
      tone: 'amber',
    },
    {
      icon: 'eye',
      title: 'Computer Vision',
      body: 'Deep learning for real-world visual intelligence.',
      tone: 'indigo',
    },
    {
      icon: 'bars',
      title: 'Data Analytics',
      body: 'EDA, statistical modeling and interactive visualizations.',
      tone: 'teal',
    },
  ],
}

export const projects = {
  eyebrow: 'FEATURED PROJECTS',
  title: 'Real GenAI Projects. Real Impact.',
  subtitle: 'A few highlights from my professional journey.',
  items: [
    {
      title: 'AlgoCreator',
      subtitle: 'RAG-Powered Presentation Generator',
      body: 'Auto-builds branded PPTX decks from a 1,000+ slide corpus using GPT-4o, LangChain and ChromaDB. Led a team of 6–8 to delivery.',
      tags: ['GenAI', 'RAG', 'GPT-4o'],
      metrics: [
        { value: '70%', label: 'Manual effort reduced' },
        { value: '1000+', label: 'Slide repositories' },
      ],
      art: 'deck',
    },
    {
      title: 'AI Recruiting Platform',
      subtitle: 'Intelligent Hiring Automation',
      body: 'JD-to-candidate matching, 24/7 AI-avatar interviews and automated scorecards, built on Azure OpenAI + AI Search for NTT DATA and Indigo Paints.',
      tags: ['Azure OpenAI', 'AI Search', 'LLM'],
      metrics: [
        { value: '60%', label: 'Screening time reduced' },
        { value: '24/7', label: 'AI avatar interviews' },
      ],
      art: 'agent',
    },
    {
      title: 'Enterprise Document Intelligence',
      subtitle: 'RAG-based Chatbot for Enterprises',
      body: 'Semantic search and question answering across thousands of enterprise documents, with multi-query retrieval and cited, grounded answers.',
      tags: ['AWS Bedrock', 'Azure AI', 'RAG'],
      metrics: [
        { value: 'Multi-source', label: 'document support' },
        { value: 'Enterprise', label: 'ready' },
      ],
      art: 'search',
    },
    {
      title: 'Japanese Document Extraction',
      subtitle: 'OCR + LLM Processing',
      body: 'Japanese .docx/.xlsx extraction pipeline with PaddleOCR and GPT-4o, deployed as a FastAPI microservice on AWS App Runner.',
      tags: ['PaddleOCR', 'LangChain', 'GPT-4o'],
      metrics: [
        { value: '500+', label: 'Documents per batch' },
        { value: 'High accuracy', label: 'structured output' },
      ],
      art: 'ocr',
    },
  ],
}

export const process = {
  eyebrow: 'MY PROCESS',
  title: 'How I Build GenAI Solutions',
  subtitle: 'A structured approach from problem to production.',
  steps: [
    { n: '01', title: 'Understand', sub: 'Problem', icon: 'target', tone: 'rose' },
    { n: '02', title: 'Explore', sub: 'Data', icon: 'chart', tone: 'sky' },
    { n: '03', title: 'Design', sub: 'Solution', icon: 'grid', tone: 'teal' },
    { n: '04', title: 'Build', sub: '& Test', icon: 'wrench', tone: 'indigo' },
    { n: '05', title: 'Deploy', sub: '& Scale', icon: 'rocket', tone: 'violet' },
    { n: '06', title: 'Measure', sub: 'Impact', icon: 'gauge', tone: 'fuchsia' },
  ],
}

export const techStack = {
  eyebrow: 'TECH STACK',
  title: 'Tools I Work With',
  groups: ['All', 'GenAI', 'ML', 'Cloud', 'Data', 'Tools'],
  items: [
    { name: 'OpenAI', group: 'GenAI' },
    { name: 'Azure OpenAI', group: 'GenAI' },
    { name: 'LangChain', group: 'GenAI' },
    { name: 'LangGraph', group: 'GenAI' },
    { name: 'Gemini', group: 'GenAI' },
    { name: 'Prompt Engineering', group: 'GenAI' },
    { name: 'RAG', group: 'GenAI' },
    { name: 'AI Agents', group: 'GenAI' },
    { name: 'XGBoost', group: 'ML' },
    { name: 'Scikit-learn', group: 'ML' },
    { name: 'YOLOv8 / v9', group: 'ML' },
    { name: 'Neural Networks', group: 'ML' },
    { name: 'NLP', group: 'ML' },
    { name: 'Forecasting', group: 'ML' },
    { name: 'Recommenders', group: 'ML' },
    { name: 'AWS', group: 'Cloud' },
    { name: 'Azure', group: 'Cloud' },
    { name: 'GCP / Vertex AI', group: 'Cloud' },
    { name: 'AWS Bedrock', group: 'Cloud' },
    { name: 'App Runner', group: 'Cloud' },
    { name: 'ChromaDB', group: 'Data' },
    { name: 'Pinecone', group: 'Data' },
    { name: 'FAISS', group: 'Data' },
    { name: 'Snowflake', group: 'Data' },
    { name: 'PostgreSQL', group: 'Data' },
    { name: 'MySQL', group: 'Data' },
    { name: 'Tableau', group: 'Data' },
    { name: 'Power BI', group: 'Data' },
    { name: 'Python', group: 'Tools' },
    { name: 'SQL', group: 'Tools' },
    { name: 'FastAPI', group: 'Tools' },
    { name: 'Docker', group: 'Tools' },
    { name: 'Streamlit', group: 'Tools' },
    { name: 'PaddleOCR', group: 'Tools' },
    { name: 'python-pptx', group: 'Tools' },
    { name: 'Git', group: 'Tools' },
  ],
}

export const experience = {
  eyebrow: 'PROFESSIONAL EXPERIENCE',
  title: 'My Journey So Far',
  cta: 'View Full Experience',
  roles: [
    {
      period: 'Jun 2025 – Present',
      title: 'Associate Data Scientist',
      org: 'AlgoAnalytics Pvt Ltd, Pune',
      current: true,
      bullets: [
        'Architected AlgoCreator, an end-to-end GenAI product generating branded decks from a 1,000+ slide corpus — cutting manual effort ~70%.',
        'Built multi-modal extraction into ChromaDB with LangChain orchestration; EDA lifted retrieval accuracy 35%.',
        'Led 6–8 interns and Associate Data Scientists across GenAI and ML delivery.',
      ],
    },
    {
      period: 'Jan 2025 – May 2025',
      title: 'Data Science Consultant',
      org: 'AlgoAnalytics Pvt Ltd, Pune',
      bullets: [
        'Built a Japanese .docx/.xlsx extraction pipeline (PaddleOCR + LangChain + GPT-4o) for NTT DATA, shipped on AWS App Runner at 500+ documents per batch.',
        'Developed multi-query semantic slide retrieval, cutting search time from hours to seconds.',
      ],
    },
    {
      period: 'Mar 2024 – Jul 2024',
      title: 'Assistant Data Scientist',
      org: 'MIT-WPU, Pune',
      bullets: [
        'Trained and benchmarked YOLOv8n and YOLOv9c for real-time plant-disease detection in hydroponics.',
        'Converted YOLOv8 to TensorFlow Lite for Android deployment in live research trials.',
      ],
    },
  ],
}

export const research = {
  eyebrow: 'RESEARCH',
  title: 'Teaching Machines to See',
  paper:
    'Comparative Analysis of YOLOv8 and YOLOv9 Models for Real-Time Plant Disease Detection in Hydroponics',
  cite: 'ETASR, Vol. 14, No. 5, 2024',
  doi: '10.48084/etasr.8301',
  url: 'https://doi.org/10.48084/etasr.8301',
  metrics: [
    { value: '95.93%', label: 'Precision' },
    { value: '88.38%', label: 'mAP50-95' },
  ],
  cta: 'Read Publication',
}

export const education = {
  eyebrow: 'EDUCATION & CERTIFICATIONS',
  title: 'Learning. Growing. Always.',
  degrees: [
    {
      title: 'PG Diploma in AI & ML',
      org: 'MIT-WPU, Pune',
      detail: 'CGPA: 9.0 / 10',
      period: 'Aug 2023 – Jun 2024',
    },
    {
      title: 'B.Sc. Mathematics',
      org: 'CSJMU, Kanpur',
      detail: 'Probability, statistics & modeling',
      period: '2020 – 2023',
    },
  ],
  certifications: [
    { name: 'Introduction to AI & ML', issuer: 'Google Cloud' },
    { name: 'Introduction to Generative AI', issuer: 'Google Cloud' },
    { name: 'Data Analytics Essentials', issuer: 'Cisco' },
    { name: 'Python & SQL', issuer: 'HackerRank' },
    { name: 'Foundations: Data, Data, Everywhere', issuer: 'Coursera' },
  ],
  cta: 'View All Certifications',
}

export const demoLab = {
  eyebrow: 'DEMO LAB',
  title: 'Things You Can Actually Run',
  subtitle:
    'Smaller ML and EDA projects. Six run for real in your browser — real trained models, real datasets, real SQL. The rest are pre-rendered from executed notebooks.',
  items: [
    {
      name: 'Student Performance',
      href: '/demos/student-performance.html',
      body: "Predicts a student's math score from the actual pickled LinearRegression model.",
      live: true,
    },
    {
      name: 'Breast Cancer SVM',
      href: '/demos/breast-cancer-svm.html',
      body: 'Classify a tumor with a real KNN vote and RBF-SVM decision function.',
      live: true,
    },
    {
      name: 'Diwali Sales',
      href: '/demos/diwali-sales.html',
      body: 'Slice a real 11,251-transaction dataset by gender, state and occupation.',
      live: true,
    },
    {
      name: 'IPL Score Prediction',
      href: '/demos/ipl-score-prediction.html',
      body: 'Pick two teams and a match state — a trained Ridge model predicts the score.',
      live: true,
    },
    {
      name: 'Weed vs Crop',
      href: '/demos/weed-crop-classification.html',
      body: "Pick a real test image and see each model's per-class accuracy on it.",
      live: true,
    },
    {
      name: 'Product Data SQL',
      href: '/demos/product-data-sql.html',
      body: 'Run 20 real queries against an in-browser SQLite database.',
      live: true,
    },
    {
      name: 'Rice Grain Classification',
      href: '/demos/rice-grain-classification.html',
      body: '7 CNN backbones benchmarked; MobileNet hits 99.97% on 5 rice varieties.',
      live: false,
    },
    {
      name: 'Topic Modeling',
      href: '/demos/topic-modeling.html',
      body: 'LDA, LSA and BERTopic compared across two speeches nine years apart.',
      live: false,
    },
    {
      name: 'Retirement Age',
      href: '/demos/retirement-age.html',
      body: 'Effective retirement age across 53 countries and six decades, by gender.',
      live: false,
    },
    {
      name: 'Resume ATS',
      href: '/demos/resume-ats.html',
      body: 'The real app UI and prompt with three pre-generated sample scenarios.',
      live: false,
    },
  ],
}

export const contact = {
  eyebrow: "LET'S CONNECT",
  title: "Let's Build Something Meaningful.",
  subtitle:
    "Have an AI, machine learning or data problem? Let's turn it into a real solution.",
  note: 'Good Ideas Create Better Tomorrows :)',
}
