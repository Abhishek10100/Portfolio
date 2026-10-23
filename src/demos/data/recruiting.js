/** Synthetic hiring data for the AI Recruiting demo. All candidates are invented. */

export const SKILLS = [
  { name: 'RAG', aliases: ['rag', 'retrieval augmented', 'retrieval-augmented', 'retrieval'] },
  { name: 'LangChain', aliases: ['langchain'] },
  { name: 'LangGraph', aliases: ['langgraph'] },
  { name: 'Azure OpenAI', aliases: ['azure openai'] },
  { name: 'OpenAI', aliases: ['openai', 'gpt'] },
  { name: 'Python', aliases: ['python'] },
  { name: 'FastAPI', aliases: ['fastapi'] },
  { name: 'Vector databases', aliases: ['vector database', 'vector databases', 'vector db', 'vector store', 'chroma', 'chromadb', 'pinecone', 'faiss'] },
  { name: 'Prompt engineering', aliases: ['prompt engineering', 'prompting', 'prompts'] },
  { name: 'Evaluation', aliases: ['evaluation', 'evals', 'eval harness', 'golden set', 'regression suite'] },
  { name: 'Agents', aliases: ['agent', 'agents', 'multi-agent', 'tool calling', 'function calling'] },
  { name: 'Docker', aliases: ['docker', 'containers'] },
  { name: 'AWS', aliases: ['aws', 'lambda', 'bedrock'] },
  { name: 'Azure', aliases: ['azure'] },
  { name: 'SQL', aliases: ['sql', 'postgres', 'postgresql'] },
  { name: 'Kubernetes', aliases: ['kubernetes', 'k8s'] },
  { name: 'MLOps', aliases: ['mlops', 'ci/cd', 'model monitoring'] },
  { name: 'NLP', aliases: ['nlp', 'natural language'] },
  { name: 'PyTorch', aliases: ['pytorch'] },
  { name: 'Spark', aliases: ['spark', 'pyspark'] },
  { name: 'React', aliases: ['react'] },
  { name: 'TypeScript', aliases: ['typescript'] },
]

export const SAMPLE_JD = `Senior GenAI Engineer

We are looking for an engineer with 4+ years of experience to build retrieval-augmented generation (RAG) products for enterprise customers.

You will design pipelines with LangChain and Azure OpenAI, work with vector databases, build evaluation harnesses to keep answer quality high, and ship services in Python with FastAPI and Docker.`

export const CANDIDATES = [
  { id: 'c1', name: 'Priya Nair', title: 'GenAI Engineer', years: 5,
    skills: ['Python', 'RAG', 'LangChain', 'Azure OpenAI', 'Vector databases', 'FastAPI', 'Evaluation', 'Docker', 'Prompt engineering'],
    summary: 'Builds retrieval pipelines and evaluation harnesses for enterprise document assistants on Azure.' },
  { id: 'c2', name: 'Rahul Verma', title: 'Data Scientist', years: 3,
    skills: ['Python', 'SQL', 'NLP', 'PyTorch', 'Prompt engineering', 'AWS'],
    summary: 'Classification and text analytics models, recently experimenting with LLM prompting for ticket triage.' },
  { id: 'c3', name: 'Ananya Iyer', title: 'ML Engineer', years: 6,
    skills: ['Python', 'PyTorch', 'MLOps', 'Kubernetes', 'Docker', 'AWS', 'FastAPI', 'Spark'],
    summary: 'Productionises ML models with monitoring, CI/CD and container orchestration at scale.' },
  { id: 'c4', name: 'Karan Mehta', title: 'Backend Engineer', years: 4,
    skills: ['Python', 'FastAPI', 'Docker', 'AWS', 'SQL', 'Kubernetes', 'TypeScript'],
    summary: 'Designs APIs and cloud services; limited exposure to LLM applications.' },
  { id: 'c5', name: 'Sara Khan', title: 'AI Engineer', years: 4,
    skills: ['Python', 'LangChain', 'LangGraph', 'Agents', 'OpenAI', 'RAG', 'Vector databases', 'Evaluation'],
    summary: 'Builds multi-agent assistants and retrieval pipelines with tool calling and regression suites.' },
  { id: 'c6', name: 'Dev Patel', title: 'Full-stack Engineer', years: 3,
    skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQL', 'OpenAI'],
    summary: 'Ships web products end to end and has integrated OpenAI APIs into customer-facing features.' },
  { id: 'c7', name: 'Meera Joshi', title: 'Research Scientist', years: 7,
    skills: ['Python', 'PyTorch', 'NLP', 'Evaluation', 'Spark'],
    summary: 'Researches language models and rigorous evaluation methodology, less production deployment.' },
  { id: 'c8', name: 'Arjun Rao', title: 'Junior Data Analyst', years: 1,
    skills: ['SQL', 'Python', 'Prompt engineering'],
    summary: 'Early-career analyst building dashboards and trying out prompt-based automation.' },
]

const generic = (skill) => ({
  q: `Tell me about a project where you used ${skill}. What was the problem, what did you do, and what was the result?`,
  rubric: [
    ['States a concrete problem', ['problem', 'challenge', 'needed', 'goal', 'issue']],
    ['Explains their own approach', ['built', 'designed', 'implemented', 'created', 'used', 'chose']],
    ['Mentions trade-offs or alternatives', ['trade-off', 'tradeoff', 'instead', 'alternative', 'because', 'versus']],
    ['Quantifies the outcome', ['%', 'percent', 'reduced', 'improved', 'faster', 'saved', 'accuracy', 'latency']],
  ],
})

export const QUESTION_BANK = {
  RAG: {
    q: 'How would you design a RAG system so answers stay accurate and grounded in company documents?',
    rubric: [
      ['Chunking and indexing strategy', ['chunk', 'split', 'index', 'overlap', 'parse']],
      ['Retrieval approach', ['embedding', 'vector', 'semantic', 'hybrid', 'bm25', 'rerank', 'retriev']],
      ['Grounding and citations', ['cite', 'citation', 'source', 'grounded', 'hallucinat', 'context']],
      ['Evaluation of quality', ['evaluat', 'metric', 'test set', 'golden', 'accuracy', 'recall']],
    ],
  },
  LangChain: generic('LangChain'),
  'Azure OpenAI': {
    q: 'What do you consider when deploying an Azure OpenAI based feature to production?',
    rubric: [
      ['Cost and rate limits', ['cost', 'token', 'rate limit', 'quota', 'throttl']],
      ['Security and data handling', ['security', 'private', 'pii', 'compliance', 'network', 'key']],
      ['Reliability', ['retry', 'fallback', 'timeout', 'monitor', 'latency', 'cache']],
      ['Quality control', ['evaluat', 'prompt', 'guardrail', 'test', 'content filter']],
    ],
  },
  'Vector databases': {
    q: 'How do you choose and tune a vector database for a retrieval use case?',
    rubric: [
      ['Compares options', ['chroma', 'pinecone', 'faiss', 'pgvector', 'compare', 'managed']],
      ['Index and similarity choices', ['hnsw', 'cosine', 'dimension', 'index', 'ann', 'similarity']],
      ['Metadata filtering and scale', ['metadata', 'filter', 'scale', 'shard', 'million']],
      ['Measures retrieval quality', ['recall', 'precision', 'evaluat', 'latency', 'benchmark']],
    ],
  },
  Evaluation: {
    q: 'How do you evaluate an LLM application and stop quality regressing between releases?',
    rubric: [
      ['Builds a test set', ['test set', 'golden', 'dataset', 'questions', 'benchmark']],
      ['Defines metrics', ['metric', 'accuracy', 'recall', 'faithful', 'relevance', 'score']],
      ['Automates in a release gate', ['ci', 'regression', 'automated', 'gate', 'pipeline']],
      ['Uses logs for traceability', ['log', 'trace', 'reproduc', 'observab', 'monitor']],
    ],
  },
  Agents: {
    q: 'How would you route a user request to the right specialised agent reliably?',
    rubric: [
      ['Supervisor or router design', ['supervisor', 'router', 'route', 'classif', 'dispatch']],
      ['Structured tool or function calling', ['tool call', 'function call', 'structured', 'schema', 'json']],
      ['Fallbacks and guardrails', ['fallback', 'default', 'guardrail', 'confidence', 'clarif']],
      ['Testing routing quality', ['test', 'evaluat', 'golden', 'accuracy', 'suite']],
    ],
  },
  'Prompt engineering': generic('prompt engineering'),
  Python: generic('Python'),
  FastAPI: generic('FastAPI'),
  Docker: generic('Docker'),
  AWS: generic('AWS'),
  SQL: generic('SQL'),
}

export const questionFor = (skill) => QUESTION_BANK[skill] ?? generic(skill)
