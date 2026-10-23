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
  subtitle: 'Production GenAI work, each with a live demo you can try.',
  items: [
    {
      title: 'AlgoCreator',
      subtitle: 'RAG-Powered Presentation Generator',
      body: 'Auto-builds branded PPTX decks from a 1,000+ slide corpus through an OpenAI GPT RAG pipeline on LangChain and ChromaDB, with re-engineered chunking, embedding and multi-query search.',
      tags: ['GenAI', 'RAG', 'LangChain'],
      metrics: [
        { value: '70%', label: 'Manual effort reduced' },
        { value: '+35%', label: 'Retrieval accuracy' },
      ],
      art: 'deck',
      demo: { href: '/demo/algocreator', label: 'Try live demo' },
    },
    {
      title: 'Surveillance Suite Chatbot',
      subtitle: 'Multi-Agent Operations Assistant',
      body: 'A supervisor router picks one of 12 specialised LangGraph agents to answer operator questions about cameras, alerts and reports in English, Hindi, Marathi and Japanese, served from a single AWS Lambda deployment over read-only edge operations.',
      tags: ['LangGraph', 'Multi-agent', 'AWS Lambda'],
      metrics: [
        { value: '12', label: 'Specialised agents' },
        { value: '4', label: 'Languages' },
      ],
      art: 'surveillance',
      demo: { href: '/demo/surveillance-chatbot', label: 'Try live demo' },
    },
    {
      title: 'AI Recruiting Platform',
      subtitle: 'Intelligent Hiring Automation',
      body: 'JD-to-candidate matching, AI-avatar interviews and automated scorecards, built on Azure OpenAI and Azure AI Search for enterprise clients.',
      tags: ['Azure OpenAI', 'AI Search', 'LLM'],
      metrics: [
        { value: '60%', label: 'Screening time reduced' },
        { value: '24/7', label: 'AI avatar interviews' },
      ],
      art: 'agent',
      demo: { href: '/demo/ai-recruiting', label: 'Try live demo' },
    },
    {
      title: 'Enterprise Document Intelligence',
      subtitle: 'RAG-based Chatbot for Enterprises',
      body: 'Production RAG document-intelligence chatbots with ingestion, validation and transformation pipelines over multi-source structured and unstructured data on AWS and Azure AI.',
      tags: ['AWS Bedrock', 'Azure AI', 'RAG'],
      metrics: [
        { value: '90%+', label: 'Answer accuracy' },
        { value: '5', label: 'Enterprise clients' },
      ],
      art: 'search',
      demo: { href: '/demo/enterprise-rag', label: 'Try live demo' },
    },
    {
      title: 'Japanese Document Extraction',
      subtitle: 'OCR + LLM Processing',
      body: 'A PaddleOCR + LangChain + OpenAI GPT pipeline that extracts structured data from Japanese .docx/.xlsx files, deployed as a containerized FastAPI microservice on AWS App Runner.',
      tags: ['PaddleOCR', 'LangChain', 'FastAPI'],
      metrics: [
        { value: '500+', label: 'Documents per batch' },
        { value: '15–20 hrs', label: 'Manual review saved' },
      ],
      art: 'ocr',
      demo: { href: '/demo/japanese-docs', label: 'Try live demo' },
    },
    {
      title: 'Plant Live',
      subtitle: 'Unified Operations Dashboard',
      body: 'An interactive prototype that pulls 10 AI and analytics systems into one live view for a 3-plant manufacturer, centred on a Three.js 3D digital twin, with an LLM "Ask about today" assistant grounded in live plant data.',
      tags: ['Three.js', 'React', 'LLM'],
      metrics: [
        { value: '10', label: 'AI systems unified' },
        { value: '3', label: 'Plants' },
      ],
      art: 'plant',
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
    { name: 'Multi-Agent Orchestration', group: 'GenAI' },
    { name: 'Evaluation Harnesses', group: 'GenAI' },
    { name: 'XGBoost', group: 'ML' },
    { name: 'Scikit-learn', group: 'ML' },
    { name: 'PyTorch', group: 'ML' },
    { name: 'TensorFlow Lite', group: 'ML' },
    { name: 'Pandas', group: 'ML' },
    { name: 'NumPy', group: 'ML' },
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
    { name: 'AWS Lambda', group: 'Cloud' },
    { name: 'DynamoDB', group: 'Cloud' },
    { name: 'ChromaDB', group: 'Data' },
    { name: 'Pinecone', group: 'Data' },
    { name: 'FAISS', group: 'Data' },
    { name: 'Snowflake', group: 'Data' },
    { name: 'PostgreSQL', group: 'Data' },
    { name: 'MySQL', group: 'Data' },
    { name: 'MongoDB', group: 'Data' },
    { name: 'Redis', group: 'Data' },
    { name: 'Kafka', group: 'Data' },
    { name: 'Tableau', group: 'Data' },
    { name: 'Power BI', group: 'Data' },
    { name: 'Python', group: 'Tools' },
    { name: 'SQL', group: 'Tools' },
    { name: 'FastAPI', group: 'Tools' },
    { name: 'Docker', group: 'Tools' },
    { name: 'Streamlit', group: 'Tools' },
    { name: 'React', group: 'Tools' },
    { name: 'TypeScript', group: 'Tools' },
    { name: 'Three.js', group: 'Tools' },
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
        'Built the Surveillance Suite support chatbot: a multi-agent LangGraph assistant (12 specialised agents, 4 languages) on a single AWS Lambda deployment with read-only edge operations over IoT Core MQTT.',
        'Built Plant Live, a Three.js digital-twin dashboard that unifies 10 AI and analytics systems for a 3-plant manufacturer.',
        'Architected AlgoCreator, an end-to-end GenAI product generating branded decks from a 1,000+ slide corpus, cutting manual effort ~70% (about 45 analyst hours a month) and lifting retrieval accuracy 35% on a 100-query evaluation set.',
        'Cut recruiter screening time 60% with an Azure OpenAI and AI Search hiring platform, and delivered RAG chatbots for 5 enterprise clients at 90%+ answer accuracy.',
        'Standardised GenAI quality gates with custom evaluation harnesses and per-turn logging; mentored 4-5 interns across 6+ production ML use cases.',
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
    { name: 'Career Essentials in Generative AI', issuer: 'Microsoft & LinkedIn' },
    { name: 'Foundations: Data, Data, Everywhere', issuer: 'Google' },
    { name: 'AWS Academy Graduate – Machine Learning Foundations', issuer: 'AWS Academy' },
  ],
  cta: 'View All Certifications',
}

export const demoLab = {
  eyebrow: 'LIVE DEMOS',
  title: 'Try the GenAI Work Yourself',
  subtitle:
    'Interactive versions of the projects above. They run entirely in your browser on synthetic sample data, with real retrieval, scoring and validation logic. No client data and no API keys.',
  items: [
    {
      name: 'AlgoCreator',
      href: '/demo/algocreator',
      body: 'Describe a deck. Multi-query retrieval with rank fusion pulls the best slides from a sample corpus and assembles a branded outline.',
      real: 'BM25 search, multi-query expansion, rank fusion',
    },
    {
      name: 'Surveillance Suite Chatbot',
      href: '/demo/surveillance-chatbot',
      body: 'Ask about cameras and alerts in English, Hindi, Marathi or Japanese and watch the supervisor route to a specialised agent.',
      real: 'Language detection, supervisor routing, structured tool call',
    },
    {
      name: 'AI Recruiting',
      href: '/demo/ai-recruiting',
      body: 'Paste a job description, rank candidates, then take the AI interview yourself and get a scorecard.',
      real: 'Skill extraction, weighted matching, rubric scoring',
    },
    {
      name: 'Enterprise RAG',
      href: '/demo/enterprise-rag',
      body: 'Ask questions over a sample policy library and get cited answers, with a guardrail when the documents do not cover it.',
      real: 'Chunking, BM25 retrieval, extractive answers with citations',
    },
    {
      name: 'Japanese Document AI',
      href: '/demo/japanese-docs',
      body: 'Step a scanned Japanese invoice through OCR, structured extraction and validation.',
      real: 'Arithmetic and format validation on the extracted fields',
    },
  ],
  earlier: {
    label: 'Earlier experiments',
    note: 'Smaller projects from earlier in my career.',
    items: [
      {
        name: 'Resume ATS',
        href: '/demos/resume-ats.html',
        body: 'The real app UI and prompt with three pre-generated sample scenarios.',
      },
      {
        name: 'Topic Modeling',
        href: '/demos/topic-modeling.html',
        body: 'LDA, LSA and BERTopic compared across two speeches nine years apart.',
      },
      {
        name: 'Rice Grain Classification',
        href: '/demos/rice-grain-classification.html',
        body: '7 CNN backbones benchmarked; MobileNet hits 99.97% on 5 rice varieties.',
      },
    ],
  },
}

export const contact = {
  eyebrow: "LET'S CONNECT",
  title: "Let's Build Something Meaningful.",
  subtitle:
    "Have an AI, machine learning or data problem? Let's turn it into a real solution.",
  note: 'Good Ideas Create Better Tomorrows :)',
}
