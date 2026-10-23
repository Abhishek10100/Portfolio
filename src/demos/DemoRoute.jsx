import { Suspense, lazy, useEffect } from 'react'
import DemoShell from './DemoShell'

const registry = {
  algocreator: {
    title: 'AlgoCreator: describe a deck, get a branded outline',
    summary:
      'Type what presentation you need. The demo expands your request into several sub-queries, searches a library of slides, fuses the rankings and assembles an outline in your chosen brand theme.',
    real: [
      'BM25 keyword ranking over every slide in the sample library.',
      'Multi-query expansion: your request is split into focused sub-queries, each searched separately.',
      'Reciprocal rank fusion merges the result lists, so slides that several sub-queries agree on rise to the top.',
    ],
    production: [
      'Dense embeddings in ChromaDB alongside keyword search, over 1,000+ real slides.',
      'An OpenAI GPT model rewrites and fits the retrieved content to the brief, then python-pptx exports a branded PPTX.',
      'A 100-query evaluation set guards retrieval quality (+35% accuracy after re-engineering chunking and search).',
    ],
    stack: ['LangChain', 'ChromaDB', 'OpenAI GPT', 'python-pptx'],
    Component: lazy(() => import('./AlgoCreatorDemo')),
  },
  'surveillance-chatbot': {
    title: 'Surveillance Suite chatbot: a supervisor that routes to the right agent',
    summary:
      'Ask an operator question in English, Hindi, Marathi or Japanese. The demo detects the language, scores every specialised agent, and shows the single structured tool call the supervisor would make.',
    real: [
      'Script-based language detection (Devanagari, Japanese kana/kanji, Latin).',
      'Multilingual keyword scoring across all twelve agents, with the winning agent and runner-ups shown.',
      'The router output is a single structured tool call, exactly like the production supervisor emits.',
    ],
    production: [
      'An LLM supervisor, forced into one structured tool call, does the routing; agents are LangGraph nodes.',
      'Answers are written by an OpenAI model from live data fetched through 14 allow-listed, read-only edge operations over AWS IoT Core MQTT.',
      'One FastAPI + LangGraph deployment on AWS Lambda with response streaming; every turn persists in DynamoDB.',
    ],
    stack: ['LangGraph', 'FastAPI', 'AWS Lambda', 'IoT Core', 'DynamoDB'],
    Component: lazy(() => import('./SurveillanceDemo')),
  },
  'ai-recruiting': {
    title: 'AI Recruiting: match, interview, score',
    summary:
      'Paste a job description, see candidates ranked with matched and missing skills, then take the AI interview yourself and receive a rubric-based scorecard.',
    real: [
      'Skill extraction from the job description against a skills vocabulary.',
      'A weighted match score: skill coverage, experience fit and BM25 relevance of each profile.',
      'Rubric scoring of your interview answers, per skill, with a recommendation.',
    ],
    production: [
      'Azure OpenAI and Azure AI Search for semantic JD-to-candidate matching over real talent pools.',
      '24/7 AI-avatar interviews with adaptive follow-up questions instead of a fixed question set.',
      'Post-interview scorecards written by the model and delivered to recruiters (60% less screening time).',
    ],
    stack: ['Azure OpenAI', 'Azure AI Search', 'AI Agents', 'FastAPI'],
    Component: lazy(() => import('./RecruitingDemo')),
  },
  'enterprise-rag': {
    title: 'Enterprise Document Intelligence: cited answers or an honest "not found"',
    summary:
      'Ask questions over a small library of company policies. Answers are assembled from the retrieved passages with citations, and the system refuses when the documents do not cover the question.',
    real: [
      'Documents are chunked and indexed in your browser; the counts shown are live.',
      'BM25 retrieval with matched terms highlighted in each source passage.',
      'Extractive answers with citations and a confidence score, plus a guardrail below a relevance threshold.',
    ],
    production: [
      'Dense embeddings and vector search on AWS Bedrock or Azure AI, over thousands of real documents.',
      'An LLM writes the final grounded answer from the retrieved context; ingestion, validation and transformation pipelines feed it.',
      'Delivered for 5 enterprise clients at 90%+ answer accuracy.',
    ],
    stack: ['AWS Bedrock', 'Azure AI', 'RAG', 'Vector search'],
    Component: lazy(() => import('./EnterpriseRagDemo')),
  },
  'japanese-docs': {
    title: 'Japanese Document AI: scan, OCR, extract, validate',
    summary:
      'Step a synthetic Japanese invoice through the pipeline: scan, OCR with bounding boxes, structured extraction, then validation checks that actually recompute the totals.',
    real: [
      'The OCR boxes are measured from the rendered document, not hand-placed.',
      'Validation is real: line items, subtotal, 10% consumption tax and the grand total are recomputed and compared.',
      'JSON output you can copy.',
    ],
    production: [
      'PaddleOCR reads real scans and .docx/.xlsx files; an OpenAI GPT model maps the text to the schema via LangChain.',
      'Shipped as a containerized FastAPI microservice (Docker) on AWS App Runner at 500+ documents per batch.',
      'Saves 15-20 hours of manual review per batch.',
    ],
    stack: ['PaddleOCR', 'LangChain', 'FastAPI', 'Docker', 'AWS App Runner'],
    Component: lazy(() => import('./JapaneseDocsDemo')),
  },
}

export default function DemoRoute() {
  const slug = window.location.pathname.split('/')[2] || ''
  const demo = registry[slug]

  useEffect(() => {
    document.title = demo
      ? `${demo.title.split(':')[0]} demo — Abhishek Tripathi`
      : 'Demo not found — Abhishek Tripathi'
    window.scrollTo(0, 0)
  }, [demo])

  if (!demo) {
    return (
      <div className="grid min-h-screen place-items-center bg-page px-6 text-center text-ink">
        <div>
          <h1 className="text-3xl font-extrabold">Demo not found</h1>
          <p className="mt-2 text-ink-2">That demo does not exist.</p>
          <a href="/#demos" className="mt-4 inline-block font-semibold text-brand-text">
            See all demos
          </a>
        </div>
      </div>
    )
  }

  const { Component } = demo
  return (
    <DemoShell meta={demo}>
      <Suspense fallback={<div className="h-72 animate-pulse rounded-3xl bg-surface-3" />}>
        <Component />
      </Suspense>
    </DemoShell>
  )
}
