/** Synthetic company policy library for the Enterprise RAG demo. Paragraphs are separated by blank lines. */
export const DOCS = [
  {
    code: 'HR-001',
    title: 'Leave Policy',
    text: `Full-time employees receive 24 days of paid annual leave per calendar year. Leave accrues monthly at two days per month, and up to 10 unused days can be carried forward into the next year.

Sick leave is separate from annual leave. Employees receive 12 days of paid sick leave per year, and a medical certificate is required for absences longer than 3 consecutive days.

Parental leave provides 26 weeks of paid leave for the primary caregiver and 4 weeks for the secondary caregiver. It can be taken within 12 months of the birth or adoption.

Leave requests must be submitted through the HR portal at least 14 days in advance for periods longer than 5 days. Managers respond within 2 working days.`,
  },
  {
    code: 'FIN-014',
    title: 'Travel and Expense Policy',
    text: `Employees may claim travel, accommodation and client entertainment expenses. Receipts are mandatory for every claim above $25, and claims must be submitted within 30 days of the expense.

Domestic flights must be booked in economy class at least 7 days in advance. International flights over 6 hours may be booked in premium economy with director approval.

The daily meal allowance during travel is $60 for domestic trips and $85 for international trips. Alcohol is not reimbursable.

Expenses above $2,000 require approval from the department head before purchase. Reimbursements are paid in the next payroll cycle after approval.`,
  },
  {
    code: 'SEC-007',
    title: 'IT Security Policy',
    text: `All company laptops must use full-disk encryption and an automatic screen lock after 5 minutes of inactivity. Personal devices may not store customer data.

Passwords must be at least 14 characters and are rotated only when a compromise is suspected. Multi-factor authentication is mandatory for email, the VPN and the cloud console.

Laptops are replaced on a 36-month cycle. Lost or stolen devices must be reported to the security desk within 2 hours so that a remote wipe can be started.

Security incidents are classified as low, medium or high severity. High severity incidents are escalated to the on-call security lead within 15 minutes, and customers are notified within 72 hours where required.`,
  },
  {
    code: 'HR-022',
    title: 'Remote Work Guidelines',
    text: `Employees may work remotely up to 3 days per week after completing their 90-day probation. Team anchor days are Tuesday and Wednesday.

A one-time home office allowance of $400 is available after probation, plus a monthly connectivity stipend of $30.

Working from another country for more than 14 days per year requires approval from HR and Legal because of tax and visa implications.`,
  },
  {
    code: 'PRC-031',
    title: 'Vendor Service Level Standard',
    text: `Critical vendors must commit to 99.9% monthly availability. Service credits of 10% of the monthly fee apply when availability falls below the commitment, and 25% when it falls below 99.0%.

Vendor support must acknowledge priority-1 incidents within 30 minutes and provide a workaround within 4 hours. Priority-2 incidents are acknowledged within 4 hours.

New vendors undergo a security review and sign a data-processing agreement before any customer data is shared. Reviews are renewed every 12 months.`,
  },
  {
    code: 'HR-005',
    title: 'New Joiner Onboarding Guide',
    text: `New joiners receive a laptop and access credentials on day one. The first week includes a security briefing, a product overview and a buddy assignment.

Probation lasts 90 days with check-ins at 30, 60 and 90 days. A learning budget of $1,000 per year becomes available after probation.

Equipment issues during onboarding are handled by the IT service desk, available on weekdays from 8:00 to 18:00.`,
  },
]

export const QUESTIONS = [
  'How many days of annual leave do I get?',
  'What is the daily meal allowance for international travel?',
  'How often are laptops replaced?',
  'How quickly must a vendor acknowledge a priority-1 incident?',
  'Can I work from another country?',
  "What is the CEO's favourite colour?",
]
