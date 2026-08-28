// Central data source — swap these values for real ones later.

export const brand = {
  name: 'PORT-4',
  tagline: 'A software development team',
  email: 'hello@port-4.dev',
  phone: '+00 000 000 000',
  location: 'Remote · Distributed',
  social: [
    { label: 'GitHub', href: '#', abbr: 'GH' },
    { label: 'LinkedIn', href: '#', abbr: 'IN' },
    { label: 'X', href: '#', abbr: 'X' },
    { label: 'Dribbble', href: '#', abbr: 'DR' },
  ],
};

export const nav = [
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: '40+', label: 'Products shipped', hint: 'across web, mobile & platform' },
  { value: '12', label: 'Specialists in-team', hint: 'engineering, design, ops' },
  { value: '9', label: 'Years, combined', hint: 'senior average per lead' },
  { value: '24h', label: 'First response', hint: 'weekdays, guaranteed' },
];

export const services = [
  {
    id: 'web',
    tag: '01',
    title: 'Web Development',
    description:
      'Marketing sites, dashboards, portals and full web platforms — built on React, Next.js and a strict performance budget.',
    outcomes: ['Marketing & product sites', 'Dashboards & internal tools', 'CMS & headless commerce'],
    stack: ['React', 'Next.js', 'TypeScript', 'Node', 'Postgres'],
  },
  {
    id: 'mobile',
    tag: '02',
    title: 'Mobile Applications',
    description:
      'iOS and Android products that feel native, ship weekly, and stay observable in production.',
    outcomes: ['Cross-platform apps', 'Native modules', 'App store delivery'],
    stack: ['React Native', 'Swift', 'Kotlin', 'Expo'],
  },
  {
    id: 'backend',
    tag: '03',
    title: 'Backend & Platform',
    description:
      'APIs, services, data pipelines and the boring reliable infrastructure a real product needs.',
    outcomes: ['REST & GraphQL APIs', 'Queues & workers', 'Cloud infrastructure'],
    stack: ['Node', 'Go', 'Postgres', 'Redis', 'AWS', 'Docker'],
  },
  {
    id: 'design',
    tag: '04',
    title: 'Product Design',
    description:
      'Interface design that starts with the user and ends with an engineered design system your team can extend.',
    outcomes: ['UX research', 'UI systems', 'Prototype & test'],
    stack: ['Figma', 'Design tokens', 'Motion', 'Prototyping'],
  },
  {
    id: 'ecommerce',
    tag: '05',
    title: 'E-commerce',
    description:
      'Fast, extensible storefronts with clean checkout paths and content teams can actually operate.',
    outcomes: ['Custom storefronts', 'Shopify & headless', 'Payments & subscriptions'],
    stack: ['Shopify', 'Stripe', 'Sanity', 'Vercel'],
  },
  {
    id: 'custom',
    tag: '06',
    title: 'Custom Software',
    description:
      'Line-of-business tools and bespoke platforms built to your workflow — not shoehorned into a template.',
    outcomes: ['Internal platforms', 'Automation', 'Data tooling'],
    stack: ['Node', 'Python', 'Postgres', 'React', 'BullMQ'],
  },
  {
    id: 'integration',
    tag: '07',
    title: 'API & Integration',
    description:
      'We connect the systems you already run — CRMs, ERPs, payment rails, third-party APIs — cleanly and with tests.',
    outcomes: ['System integrations', 'Migrations', 'Webhooks & events'],
    stack: ['OpenAPI', 'gRPC', 'Kafka', 'Stripe', 'Zapier'],
  },
  {
    id: 'support',
    tag: '08',
    title: 'Maintenance & Support',
    description:
      'Long-term partnerships: monitoring, updates, roadmap sessions and an on-call channel that actually answers.',
    outcomes: ['SLA support', 'Roadmap partnership', 'Observability'],
    stack: ['Grafana', 'Sentry', 'GitHub Actions', 'Terraform'],
  },
];

export const processSteps = [
  {
    id: '01',
    title: 'Discover',
    body: 'We start with your business — users, constraints, goals. No jargon, no theatre. We map what the product actually needs to do.',
    tokens: ['Kickoff', 'Research', 'Requirements', 'Success metrics'],
  },
  {
    id: '02',
    title: 'Plan',
    body: 'Architecture, information design, technical approach and a realistic delivery plan you can commit to.',
    tokens: ['Architecture', 'Sitemap', 'Timeline', 'Estimates'],
  },
  {
    id: '03',
    title: 'Design',
    body: 'Interface, interaction and design system — refined until every screen has a purpose and a place.',
    tokens: ['Wireframes', 'UI system', 'Prototype', 'Reviews'],
  },
  {
    id: '04',
    title: 'Build',
    body: 'Engineering in weekly increments. Continuous deploys to a staging environment you can touch from day one.',
    tokens: ['Sprints', 'CI/CD', 'Staging', 'Demos'],
  },
  {
    id: '05',
    title: 'Test',
    body: 'Automated tests, real-device QA, accessibility passes and performance budgets before anything ships.',
    tokens: ['E2E tests', 'QA', 'A11y', 'Performance'],
  },
  {
    id: '06',
    title: 'Launch',
    body: 'Deployment, monitoring, and a handover — plus optional ongoing partnership for the road after launch.',
    tokens: ['Release', 'Monitoring', 'Handover', 'Support'],
  },
];

export const team = [
  { role: 'Frontend', count: 4, note: 'React, Next.js, motion' },
  { role: 'Backend', count: 3, note: 'Node, Go, Postgres' },
  { role: 'Mobile', count: 2, note: 'React Native, native' },
  { role: 'Design', count: 2, note: 'Product & systems' },
  { role: 'Ops / QA', count: 1, note: 'Cloud, reliability' },
];

export const projects = [
  {
    id: 'northline',
    index: '01 / 06',
    name: 'Northline',
    category: 'Fintech · Web platform',
    year: '2025',
    summary:
      'Rebuilt a legacy internal ops tool into a modern web platform used by 400+ operators across four regions.',
    stack: ['React', 'Node', 'Postgres', 'AWS'],
    result: '38% faster case resolution, single sign-on across all teams.',
  },
  {
    id: 'ember',
    index: '02 / 06',
    name: 'Ember Studio',
    category: 'Consumer · iOS & Android',
    year: '2025',
    summary:
      'A cross-platform mobile app for an audio-first creator community — from research through App Store launch.',
    stack: ['React Native', 'Expo', 'Node', 'GraphQL'],
    result: '4.8 App Store rating within eight weeks of launch.',
  },
  {
    id: 'kiln',
    index: '03 / 06',
    name: 'Kiln Commerce',
    category: 'E-commerce · Headless',
    year: '2024',
    summary:
      'A headless storefront and content system for an independent design brand — content team ships without engineering.',
    stack: ['Next.js', 'Shopify', 'Sanity', 'Vercel'],
    result: '2.1× conversion, sub-1s LCP on mobile.',
  },
  {
    id: 'atlas',
    index: '04 / 06',
    name: 'Atlas Logistics',
    category: 'Enterprise · Custom software',
    year: '2024',
    summary:
      'Route planning and dispatch platform that replaced three off-the-shelf tools with one focused product.',
    stack: ['React', 'Go', 'Postgres', 'MapLibre'],
    result: '~$180K/yr saved in tooling and manual dispatch time.',
  },
];

export const partners = [
  'Northline', 'Ember', 'Kiln', 'Atlas', 'Ferro', 'Halcyon',
  'Meridian', 'Ostinato', 'Reef', 'Vault', 'Quill', 'Ridge',
];

export const journal = [
  {
    id: 'shipping-cadence',
    category: 'Engineering',
    title: 'Shipping weekly without losing the plot',
    excerpt:
      'The framework we use to keep long client engagements moving without turning every Friday into a rescue mission.',
    author: 'Ines A.',
    date: 'Aug 2026',
    read: '7 min read',
    featured: true,
  },
  {
    id: 'design-system-lite',
    category: 'Design',
    title: 'A design system light enough to actually use',
    excerpt: 'How we scope design systems for teams of four — not forty — and still keep them coherent as they grow.',
    author: 'Ravi K.',
    date: 'Aug 2026',
    read: '5 min read',
  },
  {
    id: 'boring-infra',
    category: 'Platform',
    title: 'Boring infrastructure is a feature',
    excerpt: 'The five decisions that decide whether your on-call rotation is livable — regardless of stack.',
    author: 'Mira O.',
    date: 'Jul 2026',
    read: '6 min read',
  },
  {
    id: 'estimating',
    category: 'Practice',
    title: 'Estimating in weeks, not story points',
    excerpt: 'A pragmatic estimation method for agency work that respects both engineering reality and client budgets.',
    author: 'Dan L.',
    date: 'Jul 2026',
    read: '4 min read',
  },
];

export const projectTypes = [
  'Web platform', 'Mobile app', 'Backend / API', 'E-commerce', 'Design system', 'Not sure yet',
];

export const budgets = [
  '< $10k', '$10k – $30k', '$30k – $75k', '$75k – $150k', '$150k+',
];
