import { ResourceItem, ExternalLink, Product, BlogPost, Agent } from './types';

export const RESOURCES: ResourceItem[] = [
  {
    id: 'product-hunt',
    name: 'Product Hunt',
    description: 'Discover new digital products daily. The place to launch and find the next big thing.',
    url: 'https://producthunt.com',
    iconName: 'target',
    category: 'Discovery'
  },
  {
    id: 'indie-hackers',
    name: 'Indie Hackers',
    description: 'Community of profitable bootstrappers and founders sharing revenue numbers.',
    url: 'https://indiehackers.com',
    iconName: 'users',
    category: 'Community'
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    description: 'Platform to sell digital downloads, courses, and memberships.',
    url: 'https://gumroad.com',
    iconName: 'shopping-bag',
    category: 'E-commerce'
  },
  {
    id: 'stripe-atlas',
    name: 'Stripe Atlas',
    description: 'Incorporate your digital business securely and easily from anywhere.',
    url: 'https://stripe.com/atlas',
    iconName: 'globe',
    category: 'Legal'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy your web projects instantly with a global edge network.',
    url: 'https://vercel.com',
    iconName: 'zap',
    category: 'DevOps'
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    description: 'Build next-gen apps with GPT-4 and Embeddings.',
    url: 'https://openai.com',
    iconName: 'cpu',
    category: 'AI Core'
  }
];

export const FEATURED_LINKS: ExternalLink[] = [
  {
    title: 'Rainbow Lamington',
    url: 'https://rainbow-lamington-d97751.netlify.app'
  },
  {
    title: 'Digutal',
    url: 'https://digutal.netlify.app'
  }
];

const STATIC_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'The Solopreneur AI Stack',
    description: 'Complete guide to automating your business with LLMs.',
    price: '$49.00',
    category: 'Ebook',
    imageGradient: 'from-gray-100 to-gray-300',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '2',
    title: 'SaaS Marketing Kit 2025',
    description: 'Email templates, social posts, and strategy decks.',
    price: '$129.00',
    category: 'Marketing',
    imageGradient: 'from-gray-200 to-gray-400',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '3',
    title: 'Next.js + AI Boilerplate',
    description: 'Production ready starter kit for AI wrappers.',
    price: '$249.00',
    category: 'Software',
    imageGradient: 'from-gray-100 to-white',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '4',
    title: '500+ Midjourney Prompts',
    description: 'High fidelity artistic prompts for creative professionals.',
    price: '$19.00',
    category: 'AI Pack',
    imageGradient: 'from-black to-gray-800',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '5',
    title: 'Ultimate Figma UI Kit',
    description: 'Over 2000+ components for rapid prototyping and design.',
    price: '$89.00',
    category: 'Template',
    imageGradient: 'from-purple-100 to-blue-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '6',
    title: 'Notion Life OS',
    description: 'The all-in-one productivity system for your second brain.',
    price: '$39.00',
    category: 'Template',
    imageGradient: 'from-stone-100 to-stone-300',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '7',
    title: 'React Native Starter',
    description: 'Build mobile apps faster with this pre-configured template.',
    price: '$149.00',
    category: 'Software',
    imageGradient: 'from-blue-50 to-indigo-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '8',
    title: 'Procreate Brushes Vol. 1',
    description: 'Hand-crafted texture brushes for digital artists.',
    price: '$29.00',
    category: 'Creative',
    imageGradient: 'from-orange-100 to-yellow-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '9',
    title: 'SEO Mastery Course',
    description: 'Rank #1 on Google with this comprehensive video guide.',
    price: '$199.00',
    category: 'Course',
    imageGradient: 'from-green-50 to-emerald-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '10',
    title: 'Email Marketing Sequences',
    description: 'Copy-paste email scripts that convert leads into customers.',
    price: '$59.00',
    category: 'Marketing',
    imageGradient: 'from-red-50 to-pink-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '11',
    title: 'Python for Finance Scripts',
    description: 'Automate stock analysis with these Python modules.',
    price: '$79.00',
    category: 'Software',
    imageGradient: 'from-slate-100 to-slate-300',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '12',
    title: '3D Blender Assets Pack',
    description: 'Low-poly models ready for your next game project.',
    price: '$45.00',
    category: 'Creative',
    imageGradient: 'from-cyan-50 to-blue-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '13',
    title: 'Lo-Fi Beats Pack',
    description: 'Royalty-free chill beats for content creators.',
    price: '$25.00',
    category: 'Creative',
    imageGradient: 'from-purple-50 to-fuchsia-100',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '14',
    title: 'Instagram Growth Guide',
    description: 'Strategies to grow from 0 to 100k followers organically.',
    price: '$35.00',
    category: 'Ebook',
    imageGradient: 'from-rose-50 to-rose-200',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '15',
    title: 'Modern Resume Templates',
    description: 'Stand out to recruiters with these clean, ATS-friendly designs.',
    price: '$15.00',
    category: 'Template',
    imageGradient: 'from-gray-50 to-gray-200',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  },
  {
    id: '16',
    title: 'Obsidian Vaults Starter',
    description: 'Pre-linked knowledge graphs for researchers and writers.',
    price: '$29.00',
    category: 'Template',
    imageGradient: 'from-violet-50 to-violet-200',
    buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
  }
];

// Product Generation Logic
const ADJECTIVES = ['Ultimate', 'Pro', 'Essential', 'Advanced', 'AI-Powered', 'Minimalist', 'Modern', 'Viral', 'Automated', 'Complete', 'Elite', 'Master', 'Dynamic', 'Smart', 'Growth', 'Strategic', 'Rapid', 'Seamless', 'Next-Gen', 'Turbo'];
const TOPICS = ['React', 'Next.js', 'Figma', 'SEO', 'Marketing', 'Python', 'Finance', '3D Blender', 'Notion', 'Obsidian', 'Copywriting', 'Email', 'SaaS', 'E-commerce', 'Crypto', 'Trading', 'Wellness', 'Fitness', 'Productivity', 'Leadership', 'Data Science', 'Machine Learning', 'UX Design', 'Branding'];
const NOUNS = [
  { name: 'Kit', type: 'Template' },
  { name: 'Stack', type: 'Software' },
  { name: 'Boilerplate', type: 'Software' },
  { name: 'Course', type: 'Course' },
  { name: 'System', type: 'Template' },
  { name: 'Bundle', type: 'Creative' },
  { name: 'Assets', type: 'Creative' },
  { name: 'Icons', type: 'Creative' },
  { name: 'Templates', type: 'Template' },
  { name: 'Guide', type: 'Ebook' },
  { name: 'Blueprint', type: 'Ebook' },
  { name: 'Framework', type: 'Marketing' },
  { name: 'Engine', type: 'Software' },
  { name: 'Dashboard', type: 'Template' },
  { name: 'Masterclass', type: 'Course' },
  { name: 'Prompts', type: 'AI Pack' },
  { name: 'Scripts', type: 'Software' }
];

const GRADIENTS = [
  'from-gray-100 to-gray-300',
  'from-gray-200 to-gray-400',
  'from-gray-100 to-white',
  'from-black to-gray-800',
  'from-purple-100 to-blue-100',
  'from-stone-100 to-stone-300',
  'from-blue-50 to-indigo-100',
  'from-orange-100 to-yellow-100',
  'from-green-50 to-emerald-100',
  'from-red-50 to-pink-100',
  'from-slate-100 to-slate-300',
  'from-cyan-50 to-blue-100',
  'from-purple-50 to-fuchsia-100',
  'from-rose-50 to-rose-200',
  'from-violet-50 to-violet-200'
];

const generateProducts = (count: number): Product[] => {
  const products: Product[] = [...STATIC_PRODUCTS];
  let idCounter = products.length + 1;

  for (let i = 0; i < count; i++) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const nounObj = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    
    // Weighted random price
    const price = Math.floor(Math.random() * 200) + 9;
    
    const title = `${adj} ${topic} ${nounObj.name}`;
    const descVariations = [
      `Boost your ${topic} workflow with this professional ${nounObj.name.toLowerCase()}.`,
      `The only ${nounObj.name.toLowerCase()} you need to master ${topic}.`,
      `High-quality resources for serious ${topic} professionals.`,
      `Accelerate your projects with this pre-built ${topic} ${nounObj.name.toLowerCase()}.`,
      `Save 100+ hours with the ${adj} ${topic} ${nounObj.name.toLowerCase()}.`
    ];
    const description = descVariations[Math.floor(Math.random() * descVariations.length)];

    products.push({
      id: idCounter.toString(),
      title: title,
      description: description,
      price: `$${price}.00`,
      category: nounObj.type as any,
      imageGradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      buyUrl: 'https://buy.stripe.com/test_4gM28r0k5dxs5JB6lq93y00'
    });
    idCounter++;
  }
  return products;
};

// Generate ~50,000 items to simulate "1/46768" pages (approx 6000 pages of 8 items)
// We will generate 48,000 items. 
// Note: In a real app this would be server-side, but for this demo array operations are fast enough for ~50k items in memory.
export const MOCK_PRODUCTS = generateProducts(48000);

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'init-1',
    title: 'The Future of Autonomous Agents in Content Strategy',
    excerpt: 'How multi-agent systems are replacing traditional editorial workflows.',
    content: 'Autonomous agents are not just tools; they are becoming coworkers. In this deep dive...',
    author: 'Nexus Strategist (AI)',
    authorType: 'AI_AGENT',
    date: 'Oct 24, 2025',
    category: 'AI Tech',
    readTime: '5 min'
  },
  {
    id: 'init-2',
    title: 'Bootstrapping to $10k MRR: A Guide',
    excerpt: 'Practical steps for developers to launch their first profitable SaaS.',
    content: 'The journey from 0 to 1 is the hardest. Here is how I structured my launch...',
    author: 'Human Editor',
    authorType: 'USER',
    date: 'Oct 23, 2025',
    category: 'Startups',
    readTime: '8 min'
  }
];

export const AI_AGENTS: Agent[] = [
  { id: 'a1', name: 'Alpha-1', role: 'Content Strategist', status: 'Thinking', activityLog: ['Analyzing trends...', 'Mapping keywords'] },
  { id: 'a2', name: 'Beta-X', role: 'Chief Editor', status: 'Idle', activityLog: ['Waiting for draft...'] },
  { id: 'a3', name: 'Gamma-GPT', role: 'Creative Writer', status: 'Writing', activityLog: ['Drafting section 2...', 'Generating metaphors'] },
  { id: 'a4', name: 'Delta-SEO', role: 'Growth Hacker', status: 'Optimizing', activityLog: ['Checking meta tags...', 'Link building'] },
];

export const PRODUCT_CATEGORIES = [
  {
    name: "Artificial Intelligence",
    items: [
      { name: "Jasper", desc: "AI copywriter for enterprise marketing teams." },
      { name: "Midjourney", desc: "Generative AI for hyper-realistic images." },
      { name: "Runway", desc: "AI video generation and editing tools." },
      { name: "Hugging Face", desc: "The platform for open source AI models." },
      { name: "LangChain", desc: "Framework for developing LLM applications." },
      { name: "Claude", desc: "Anthropic's helpful and harmless AI assistant." }
    ]
  },
  {
    name: "Design & Creative",
    items: [
      { name: "Figma", desc: "The collaborative interface design tool." },
      { name: "Spline", desc: "Design and collaborate in 3D." },
      { name: "Rive", desc: "Interactive animations for every platform." },
      { name: "Canva", desc: "Graphic design platform for social media." },
      { name: "Linearity", desc: "Vector design software for iPad and Mac." },
      { name: "Framer", desc: "Design and publish websites visually." }
    ]
  },
  {
    name: "Development & Infrastructure",
    items: [
      { name: "Supabase", desc: "The open source Firebase alternative." },
      { name: "Railway", desc: "Instant deployments for any application." },
      { name: "PlanetScale", desc: "The serverless MySQL platform." },
      { name: "Clerk", desc: "Authentication and user management." },
      { name: "Docker", desc: "Accelerate how you build, share, and run applications." },
      { name: "Turso", desc: "SQLite for the Edge." }
    ]
  },
  {
    name: "No-Code & Automation",
    items: [
      { name: "Webflow", desc: "Visual web development platform." },
      { name: "Zapier", desc: "Automate workflows between apps." },
      { name: "Airtable", desc: "Low-code platform for building collaborative apps." },
      { name: "Make", desc: "Visual platform for designing complex workflows." },
      { name: "Bubble", desc: "Full-stack no-code app builder." },
      { name: "Softr", desc: "Build client portals from Airtable data." }
    ]
  },
  {
    name: "Productivity & Knowledge",
    items: [
      { name: "Notion", desc: "All-in-one workspace for notes & docs." },
      { name: "Raycast", desc: "Blazingly fast, extensible launcher." },
      { name: "Cron", desc: "The next-generation calendar for pros." },
      { name: "Linear", desc: "Issue tracking built for speed." },
      { name: "Obsidian", desc: "A second brain for your private thoughts." },
      { name: "Arc", desc: "The browser that browses for you." }
    ]
  },
  {
    name: "Marketing & Analytics",
    items: [
      { name: "Beehiiv", desc: "The newsletter platform built for growth." },
      { name: "Typeform", desc: "People-friendly forms and surveys." },
      { name: "PostHog", desc: "Open source product OS." },
      { name: "Lemlist", desc: "Personalized cold outreach emails." },
      { name: "Plausible", desc: "Simple and privacy-friendly analytics." },
      { name: "June", desc: "Product analytics for B2B SaaS." }
    ]
  }
];

export const COLLECTIONS = [
  {
    title: "The Startup Starter Pack",
    description: "Essential tools to get from zero to one for under $50/mo.",
    tools: ["Linear", "Notion", "Supabase", "Vercel"]
  },
  {
    title: "Enterprise Scale",
    description: "Robust infrastructure for high-compliance environments.",
    tools: ["Auth0", "AWS", "Salesforce", "Jira"]
  },
  {
    title: "Creator Economy Toolkit",
    description: "Everything you need to monetize your audience.",
    tools: ["Gumroad", "Beehiiv", "Circle", "Canva"]
  }
];