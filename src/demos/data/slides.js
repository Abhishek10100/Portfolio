/** Synthetic slide library for the AlgoCreator demo. `kind` drives deck ordering. */
export const KIND_ORDER = ['agenda', 'context', 'analysis', 'metrics', 'plan', 'summary']

export const slides = [
  { id: 's01', deck: 'Q3 Sales Review', kind: 'agenda', title: 'Q3 Sales Review: Agenda',
    bullets: ['Revenue and pipeline performance', 'Regional and product-line breakdown', 'Wins, losses and next-quarter priorities'] },
  { id: 's02', deck: 'Q3 Sales Review', kind: 'metrics', title: 'Revenue Performance at a Glance',
    bullets: ['Revenue up 14% quarter over quarter', 'Enterprise accounts drove 62% of new bookings', 'Average deal size grew to $48K'] },
  { id: 's03', deck: 'Q3 Sales Review', kind: 'analysis', title: 'Pipeline Health and Forecast',
    bullets: ['Qualified pipeline covers 3.1x of next-quarter target', 'Win rate improved after the discovery-call rework', 'Churn risk is concentrated in two mid-market segments'] },

  { id: 's04', deck: 'Product Roadmap 2026', kind: 'agenda', title: 'Product Roadmap 2026: Agenda',
    bullets: ['Strategic themes for the year', 'Quarterly release milestones', 'Dependencies and risks'] },
  { id: 's05', deck: 'Product Roadmap 2026', kind: 'context', title: 'Strategic Themes: Platform, Intelligence, Trust',
    bullets: ['Platform: open APIs and self-serve integrations', 'Intelligence: assistants embedded in core workflows', 'Trust: auditability and role-based access everywhere'] },
  { id: 's06', deck: 'Product Roadmap 2026', kind: 'plan', title: 'Quarterly Release Milestones',
    bullets: ['Q1: public API and webhook general availability', 'Q2: workflow assistant beta with usage analytics', 'Q3: enterprise audit log and SSO expansion'] },

  { id: 's07', deck: 'Customer Onboarding Playbook', kind: 'agenda', title: 'Customer Onboarding Playbook: Agenda',
    bullets: ['The first thirty days', 'Roles and responsibilities', 'How we measure success'] },
  { id: 's08', deck: 'Customer Onboarding Playbook', kind: 'plan', title: 'The First 30 Days',
    bullets: ['Week 1: kickoff, data access and success criteria', 'Week 2: configuration and pilot users', 'Weeks 3-4: training, feedback and go-live review'] },
  { id: 's09', deck: 'Customer Onboarding Playbook', kind: 'metrics', title: 'Onboarding Success Metrics',
    bullets: ['Time to first value cut from 21 to 9 days', 'Pilot adoption above 70% by week three', 'Support tickets per new account down 35%'] },

  { id: 's10', deck: 'Security and Compliance Overview', kind: 'agenda', title: 'Security and Compliance: Agenda',
    bullets: ['Data protection controls', 'Certifications and audit readiness', 'Incident response'] },
  { id: 's11', deck: 'Security and Compliance Overview', kind: 'context', title: 'Data Protection Controls',
    bullets: ['Encryption in transit and at rest for all customer data', 'Role-based access with quarterly access reviews', 'Regional data residency options for regulated clients'] },
  { id: 's12', deck: 'Security and Compliance Overview', kind: 'analysis', title: 'Certifications and Audit Readiness',
    bullets: ['SOC 2 Type II report renewed every year', 'ISO 27001 scope covers production and support', 'Continuous control monitoring with automated evidence collection'] },

  { id: 's13', deck: 'AI Strategy Briefing', kind: 'agenda', title: 'AI Strategy Briefing: Agenda',
    bullets: ['Where generative AI creates value', 'Guardrails and governance', 'Pilot roadmap'] },
  { id: 's14', deck: 'AI Strategy Briefing', kind: 'analysis', title: 'Where Generative AI Creates Value',
    bullets: ['Knowledge retrieval across internal documents', 'Drafting and summarisation for sales and support', 'Process automation with human review'] },
  { id: 's15', deck: 'AI Strategy Briefing', kind: 'plan', title: 'Responsible AI Guardrails',
    bullets: ['Grounded answers with citations to approved sources', 'Evaluation harnesses gate every release', 'Human approval for high-impact actions'] },

  { id: 's16', deck: 'Cost Optimization Programme', kind: 'agenda', title: 'Cost Optimization Programme: Agenda',
    bullets: ['Where the spend goes', 'Savings plan and timeline', 'Governance'] },
  { id: 's17', deck: 'Cost Optimization Programme', kind: 'analysis', title: 'Where the Spend Goes',
    bullets: ['Cloud compute and storage make up 46% of run costs', 'Idle environments account for 18% of waste', 'Licence overlap across three tools'] },
  { id: 's18', deck: 'Cost Optimization Programme', kind: 'metrics', title: 'Savings Plan and Timeline',
    bullets: ['Target of a 22% annual run-cost reduction', 'Rightsizing delivers the first 9% within a quarter', 'Payback in under seven months'] },

  { id: 's19', deck: 'Market Landscape Analysis', kind: 'agenda', title: 'Market Landscape: Agenda',
    bullets: ['Market size and growth', 'Competitive positioning', 'Implications for strategy'] },
  { id: 's20', deck: 'Market Landscape Analysis', kind: 'analysis', title: 'Competitive Positioning',
    bullets: ['Three incumbents lead on breadth, none on ease of use', 'Specialist entrants win on vertical depth', 'Price pressure is strongest in the mid-market'] },
  { id: 's21', deck: 'Market Landscape Analysis', kind: 'metrics', title: 'Market Size and Growth',
    bullets: ['Addressable market of $8.4B growing 11% a year', 'Fastest growth in regulated industries', 'Adoption of AI assistants doubling year on year'] },

  { id: 's22', deck: 'Team and Org Introduction', kind: 'agenda', title: 'Meet the Team: Agenda',
    bullets: ['How we are organised', 'Who we are hiring', 'Ways of working'] },
  { id: 's23', deck: 'Team and Org Introduction', kind: 'context', title: 'How We Are Organised',
    bullets: ['Product squads own outcomes end to end', 'A platform group provides shared services and tooling', 'Customer success sits inside each squad'] },
  { id: 's24', deck: 'Team and Org Introduction', kind: 'summary', title: 'What We Are Hiring For',
    bullets: ['Senior engineers for the intelligence platform', 'Data scientists focused on evaluation and quality', 'Solutions architects for enterprise rollouts'] },
]

export const examples = [
  'Quarterly sales review with revenue, pipeline and win rate',
  'AI strategy briefing, guardrails and a rollout plan',
  'Security overview covering data protection and certifications',
  'Cost savings plan with where the spend goes',
]
