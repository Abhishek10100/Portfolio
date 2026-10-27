/**
 * Portfolio guide engine. Everything it says is assembled from src/data/site.js,
 * so answers cannot drift from the page. Retrieval reuses the demos' BM25.
 * There is no LLM: unknown questions get an honest "not on this site" reply.
 */
import {
  profile, about, heroStats, whatIDo, projects, process, techStack,
  experience, research, education, demoLab, beyond,
} from '../data/site'
import { buildIndex, search, tokenize } from '../demos/lib/search'

const list = (items) => items.join(', ')

/* ------------------------------------------------------------ guided tour */

export const TOUR = [
  {
    target: 'home',
    title: 'Welcome',
    text: `Hi, I'm Abhishek's portfolio guide. He is a ${profile.headline}: ${profile.intro} The numbers here summarise the work: ${list(heroStats.map((s) => `${s.value}${s.suffix} ${s.label.toLowerCase()}`))}.`,
  },
  {
    target: 'about',
    title: 'About and what he does',
    text: `${about.body} The cards on the right show the six areas he works in: ${list(whatIDo.items.map((i) => i.title))}.`,
  },
  {
    target: 'projects',
    title: 'Featured projects',
    text: `${projects.items.length} production GenAI projects, each with its impact: ${list(projects.items.map((p) => p.title))}. Five of them have a live demo you can try in your browser.`,
  },
  {
    target: 'process',
    title: 'How he builds',
    text: `His process runs ${list(process.steps.map((s) => `${s.title} ${s.sub}`.trim()))}. Next to it is the tech stack, filterable by category.`,
  },
  {
    target: 'experience',
    title: 'Experience',
    text: `Current role: ${experience.roles[0].title} at ${experience.roles[0].org.split(',')[0]} since ${experience.roles[0].period.split(' – ')[0]}. Use "View Full Experience" to expand the details of every role.`,
  },
  {
    target: 'research',
    title: 'Published research',
    text: `He is a published researcher: "${research.paper}" (${research.cite}), reporting ${list(research.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`))}.`,
  },
  {
    target: 'education',
    title: 'Education and certifications',
    text: `${list(education.degrees.map((d) => `${d.title}, ${d.org}`))}. Certifications: ${list(education.certifications.map((c) => c.name))}.`,
  },
  {
    target: 'demos',
    title: 'Live demos',
    text: `${demoLab.subtitle} Try them: ${list(demoLab.items.map((d) => d.name))}.`,
    actions: demoLab.items.slice(0, 3).map((d) => ({ label: d.name, href: d.href })),
  },
  {
    target: 'beyond',
    title: 'Beyond the code',
    text: `${beyond.subtitle} ${list(beyond.items.map((i) => i.title))}: the personality behind the work.`,
  },
  {
    target: 'contact',
    title: "Let's talk",
    text: `That's the tour. If something fits what you are building, email ${profile.email} or connect on LinkedIn. You can also download the resume.`,
    actions: [
      { label: 'Email Abhishek', href: `mailto:${profile.email}` },
      { label: 'Download resume', href: profile.resume },
    ],
  },
]

/* ------------------------------------------------------- knowledge entries */

const metricLine = (ms) => ms.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(', ')

function buildKB() {
  const kb = []
  const add = (e) => kb.push({ actions: [], ...e })

  add({
    id: 'about', title: 'About Abhishek', target: 'about',
    alias: 'who is abhishek background summary introduction yourself bio profile',
    text: `${about.body} Based in ${profile.location}.`,
  })
  add({
    id: 'stats', title: 'Key numbers', target: 'home',
    alias: 'numbers stats impact achievements years experience how long',
    text: `Key numbers: ${list(heroStats.map((s) => `${s.value}${s.suffix} ${s.label.toLowerCase()}`))}.`,
  })

  for (const p of projects.items) {
    add({
      id: `project-${p.title}`, title: p.title, target: 'projects', kind: 'project',
      alias: `${p.tags.join(' ')} project built`,
      text: `${p.title} (${p.subtitle}). ${p.body} Impact: ${metricLine(p.metrics)}.`,
      actions: p.demo ? [{ label: 'Try the live demo', href: p.demo.href }] : [],
    })
  }

  for (const r of experience.roles) {
    add({
      id: `role-${r.title}`, title: `${r.title}, ${r.org}`, target: 'experience', kind: 'role',
      alias: 'job work role career employer company position',
      text: `${r.title} at ${r.org} (${r.period}). ${r.bullets.join(' ')}`,
    })
  }

  for (const g of techStack.groups.filter((x) => x !== 'All')) {
    const items = techStack.items.filter((i) => i.group === g).map((i) => i.name)
    add({
      id: `skills-${g}`, title: `${g} skills`, target: 'process', kind: 'skill',
      alias: 'skills tools technologies stack tech languages frameworks know use',
      text: `${g}: ${list(items)}.`,
    })
  }

  add({
    id: 'research', title: 'Research', target: 'research',
    alias: 'paper publication published yolo plant disease detection journal etasr doi computer vision',
    text: `Published in ${research.cite}: "${research.paper}". Results: ${list(research.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`))}. DOI ${research.doi}.`,
    actions: [{ label: 'Read the paper', href: research.url }],
  })
  add({
    id: 'education', title: 'Education', target: 'education',
    alias: 'degree university college studied cgpa school qualification',
    text: `${education.degrees.map((d) => `${d.title}, ${d.org} (${d.period}${d.detail ? `, ${d.detail}` : ''})`).join('. ')}.`,
  })
  add({
    id: 'certs', title: 'Certifications', target: 'education',
    alias: 'certificates certified courses badges',
    text: `Certifications: ${education.certifications.map((c) => `${c.name} (${c.issuer})`).join('; ')}.`,
  })
  add({
    id: 'process', title: 'How he works', target: 'process',
    alias: 'process method approach workflow methodology how build',
    text: `His process: ${process.steps.map((s) => `${s.n} ${s.title} ${s.sub}`).join(', ')}.`,
  })
  add({
    id: 'demos', title: 'Live demos', target: 'demos',
    alias: 'demo demos try interactive playground sample',
    text: `${demoLab.subtitle} Available demos: ${list(demoLab.items.map((d) => d.name))}.`,
    actions: demoLab.items.map((d) => ({ label: d.name, href: d.href })),
  })
  add({
    id: 'contact', title: 'Contact', target: 'contact',
    alias: 'hire hiring email reach connect phone linkedin github message talk work together',
    text: `Email ${profile.email}, phone ${profile.phone}, LinkedIn or GitHub. Based in ${profile.location}; the resume says he is open to remote roles across India.`,
    actions: [
      { label: 'Email', href: `mailto:${profile.email}` },
      { label: 'LinkedIn', href: profile.linkedin },
      { label: 'GitHub', href: profile.github },
    ],
  })
  add({
    id: 'beyond', title: 'Beyond the code', target: 'beyond',
    alias: 'hobbies hobby interests personality outside work free time bike motorcycle avenger running runner trek trekking photography macro anime one piece fun',
    text: beyond.items.map((i) => `${i.title}: ${i.body}`).join('\n'),
  })
  add({
    id: 'resume', title: 'Resume', target: 'home',
    alias: 'cv resume download pdf',
    text: 'The resume is a 2-page PDF with the full experience, skills, publication and certifications.',
    actions: [{ label: 'Download resume', href: profile.resume }],
  })
  add({
    id: 'location', title: 'Location and availability', target: 'contact',
    alias: 'where located location city remote relocate available availability open roles opportunities',
    text: `Abhishek is based in ${profile.location} and, per his resume, is open to remote roles across India.`,
    actions: [{ label: 'Email Abhishek', href: `mailto:${profile.email}` }],
  })
  return kb
}

const KB = buildKB()
const INDEX = buildIndex(KB, (e) => `${e.title} ${e.alias ?? ''} ${e.text}`)

/* ------------------------------------------------------------------ intents */

const jump = (id, label) => ({ label, scrollTo: id })

const SUGGESTIONS = [
  'Give me the tour',
  'What has he built?',
  'Which demos can I try?',
  'What are his GenAI skills?',
  'How can I contact him?',
]

const INTENTS = [
  {
    re: /^(hi|hello|hey|hola|namaste|good (morning|afternoon|evening))\b/i,
    run: () => ({
      text: `Hello! I can walk you through this portfolio or answer questions about Abhishek's work. Everything I say comes from this site.`,
      chips: SUGGESTIONS,
    }),
  },
  {
    re: /\b(thanks|thank you|thx|great|awesome|perfect)\b/i,
    run: () => ({ text: `You're welcome. Anything else you'd like to know?`, chips: SUGGESTIONS }),
  },
  {
    re: /\b(tour|walk ?through|show me around|guide me|start over|overview)\b/i,
    run: () => ({ startTour: true }),
  },
  {
    re: /\b(help|what can you (do|answer)|options)\b/i,
    run: () => ({
      text: `I can give you a guided tour, then answer questions about projects, experience, skills, research, education, the live demos, or how to contact Abhishek.`,
      chips: SUGGESTIONS,
    }),
  },
  {
    re: /\b(salary|ctc|compensation|pay|expected|notice period|age|married|religion|politic\w*)\b/i,
    run: () => ({
      text: `That isn't something this portfolio shows, and I'd rather not guess. Abhishek can answer it directly.`,
      actions: [{ label: 'Email Abhishek', href: `mailto:${profile.email}` }],
    }),
  },
  {
    re: /\b(hobbi(es|y)|interests?|free time|outside (of )?work|personality|bike|motorcycle|avenger|runn(er|ing)|trek\w*|photograph\w*|anime|one piece|what is he like|fun fact)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'beyond')) }),
  },
  {
    re: /\b(langgraph|langchain|chromadb)\b/i,
    when: (q) => !/\b(project|built|experience)\b/i.test(q),
    run: (q) => skillsReply(q.replace(/tell me about|what about/i, 'does he know')),
  },
  {
    re: /\b(algoanalytics|algo analytics|current(ly)?|right now|these days|mit-?wpu)\b/i,
    when: (q) => !/\b(skills?|stack|tools?)\b/i.test(q),
    run: (q) => {
      const older = /mit-?wpu/i.test(q)
      const role = experience.roles.find((r) => (older ? r.org.includes('MIT') : r.current)) ?? experience.roles[0]
      return {
        text: `${role.title} at ${role.org} (${role.period}):\n${role.bullets.map((b) => `• ${b}`).join('\n')}`,
        actions: [jump('experience', 'Show experience')],
        chips: ['What has he built?', 'Which demos can I try?'],
      }
    },
  },
  {
    re: /\b(skills?|tech(nolog(y|ies))?|stack|tools?|languages?|frameworks?|expertise|know|knows|proficient|familiar|use|uses|works? with|experience (with|in))\b/i,
    when: (q) => !/\b(years|how long|certif)\b/i.test(q),
    run: (q) => skillsReply(q),
  },
  {
    re: /\b(education|study|studied|degree|university|college|school|qualification|cgpa|graduat\w*)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'education')) }),
  },
  {
    re: /\b(certif\w*|certificates?|courses?)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'certs')) }),
  },
  {
    re: /\b(research|paper|publication|published|journal|yolo|etasr|doi)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'research')) }),
  },
  {
    re: /\b(where|based|located|location|city|remote|relocat\w*|availab\w*|open to|looking for)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'location')) }),
  },
  {
    re: /\b(projects?|portfolio|built|build|work(ed)? on|case stud(y|ies)|what has he)\b(?!.*\bprocess\b)/i,
    when: (q) => !/\b(demo|demos|try)\b/i.test(q) && !projectNamed(q),
    run: () => ({
      text: `Featured projects:\n${projects.items.map((p) => `• ${p.title}: ${p.subtitle} (${metricLine(p.metrics)})`).join('\n')}`,
      actions: [jump('projects', 'Show projects')],
      chips: projects.items.slice(0, 3).map((p) => `Tell me about ${p.title}`),
    }),
  },
  {
    re: /\b(experience|career|employment|jobs?|roles?|worked|history)\b/i,
    when: (q) => !/\b(years of|how many years|how long)\b/i.test(q),
    run: () => ({
      text: `Career so far:\n${experience.roles.map((r) => `• ${r.title}, ${r.org} (${r.period})`).join('\n')}`,
      actions: [jump('experience', 'Show experience')],
      chips: ['What does he do at AlgoAnalytics now?', 'Tell me about the research paper'],
    }),
  },
  {
    re: /\b(how many years|how long|years of experience)\b/i,
    run: () => ({
      text: `${heroStats[0].value}${heroStats[0].suffix} years of experience, since early 2024. He started at MIT-WPU (Mar 2024) and has been at AlgoAnalytics since Jan 2025.`,
      actions: [jump('experience', 'Show experience')],
    }),
  },
  {
    re: /\b(demos?|try (it|them|out)|interactive|playground)\b/i,
    run: () => ({
      text: `Five live demos, all running in your browser on synthetic data:\n${demoLab.items.map((d) => `• ${d.name}`).join('\n')}\nThey are honest about what's real (the retrieval, scoring and validation logic) and what the production system adds.`,
      actions: [jump('demos', 'Show demos'), ...demoLab.items.slice(0, 3).map((d) => ({ label: d.name, href: d.href }))],
    }),
  },
  {
    re: /\b(resume|cv|curriculum)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'resume')) }),
  },
  {
    re: /\b(contact|hire|hiring|email|reach|linkedin|github|phone|get in touch|talk to)\b/i,
    run: () => ({ ...answerFrom(KB.find((e) => e.id === 'contact')) }),
  },
]

const GROUP_HINTS = [
  [/\b(gen ?ai|llm|rag|agents?|langchain|langgraph|prompt|openai|gpt)\b/i, 'GenAI'],
  [/\b(ml|machine learning|models?|xgboost|vision|yolo|nlp|pytorch)\b/i, 'ML'],
  [/\b(cloud|aws|azure|gcp|lambda|deploy\w*)\b/i, 'Cloud'],
  [/\b(data|database|sql|vector|bi|tableau)\b/i, 'Data'],
]

function skillsReply(q) {
  const lower = q.toLowerCase()
  const named = techStack.items.filter((i) => lower.includes(i.name.toLowerCase()))
  if (named.length) {
    return {
      text: named.map((i) => `Yes: ${i.name} is part of his ${i.group} toolkit.`).join(' '),
      actions: [jump('process', 'Show the tech stack')],
      chips: ['What are his GenAI skills?', 'What has he built?'],
    }
  }
  const ask = lower.match(/(?:know|use|uses|works? with|experience (?:with|in)|familiar with|proficient in)\s+([a-z0-9+.#/ -]{2,30})\??$/)
  const group = GROUP_HINTS.find(([re]) => re.test(q))?.[1]
  if (group && !ask) {
    const names = techStack.items.filter((i) => i.group === group).map((i) => i.name)
    return {
      text: `${group}: ${list(names)}.`,
      actions: [jump('process', 'Show the tech stack')],
      chips: ['What has he built?', 'Which demos can I try?'],
    }
  }
  const groups = techStack.groups.filter((g) => g !== 'All')
  return {
    text: `${ask ? `I don't see "${ask[1].trim()}" listed among his skills. ` : ''}His toolkit spans ${list(groups)}. For example: ${list(groups.map((g) => `${g} (${techStack.items.filter((i) => i.group === g).slice(0, 3).map((i) => i.name).join(', ')})`))}.`,
    actions: [jump('process', 'Show the tech stack')],
    chips: ['What are his GenAI skills?', 'What has he built?'],
  }
}

function projectNamed(q) {
  const l = q.toLowerCase()
  return projects.items.find((p) => l.includes(p.title.toLowerCase().split(' ')[0]))
}

function answerFrom(entry) {
  return {
    text: entry.text,
    actions: [...(entry.actions ?? []), ...(entry.target ? [jump(entry.target, 'Show me on the page')] : [])],
  }
}

const FALLBACK = {
  text: `I only know what is on this portfolio, and I couldn't find that. Try asking about projects, experience, skills, research, education or the demos. For anything else, Abhishek is best reached directly.`,
  actions: [{ label: 'Email Abhishek', href: `mailto:${profile.email}` }],
  chips: SUGGESTIONS,
}

/** Returns { text, actions, chips } or { startTour: true }. */
export function reply(question) {
  const q = question.trim()
  if (!q) return FALLBACK

  for (const intent of INTENTS) {
    if (intent.re.test(q) && (!intent.when || intent.when(q))) return intent.run(q)
  }

  // A named project beats generic ranking.
  const named = projectNamed(q)
  if (named) return answerFrom(KB.find((e) => e.id === `project-${named.title}`))

  const hits = search(INDEX, q, 3)
  const top = hits[0]
  // A weak keyword match is worse than admitting we don't know.
  const terms = [...new Set(tokenize(q))]
  const coverage = top && terms.length ? top.matched.length / terms.length : 0
  const strong = terms.length >= 2 ? coverage >= 0.6 && top?.score >= 2 : top?.score >= 2.5
  if (!top || !strong) return FALLBACK

  const entry = top.doc
  const out = answerFrom(entry)
  // Skills questions span several groups; merge when the top two are both skills.
  if (entry.kind === 'skill') {
    const skills = hits.filter((h) => h.doc.kind === 'skill').map((h) => h.doc.text)
    out.text = skills.join('\n')
  }
  const related = hits.slice(1).find((h) => h.doc.id !== entry.id && h.score > top.score * 0.6)
  out.chips = related ? [`Tell me about ${related.doc.title}`] : ['Give me the tour', 'How can I contact him?']
  return out
}

export const STARTERS = SUGGESTIONS
