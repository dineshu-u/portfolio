export const profile = {
  name: 'Dinesh B',
  location: 'Chennai, Tamil Nadu',
  email: 'mailboxofdineshu@gmail.com',
  phone: '+91 90946 43879',
  portfolio: 'https://dineshu-u.github.io/portfolio/',
  linkedIn: 'https://linkedin.com/in/dinesh-b-20242032a',
  resume: '/Dinesh-Resume.pdf',
  role: 'Aspiring Software Engineer',
  objective:
    'Aspiring Software Engineer with a strong foundation in full-stack development, real-time systems, and mobile application development. Seeking an opportunity to apply technical skills, problem-solving abilities, and project experience to build impactful software solutions while continuously learning and advancing as a technology professional.',
  education: {
    degree: 'Bachelor of Technology — Information Technology',
    institution: 'R.M.K. Engineering College, Chennai',
    period: '2024 – 2028 (Expected)',
    cgpa: '8.44 / 10'
  },
  languagesSpoken: ['English (Professional)', 'Tamil (Native)']
};

export const skillGroups = [
  {
    title: 'Languages & Frameworks',
    accent: 'cyan',
    description: 'Frontend, backend, mobile and database technologies used to ship complete products.',
    skills: [
      'Java',
      'React',
      'Python',
      'JavaScript',
      'TypeScript',
      'Dart',
      'SQL',
      'HTML',
      'CSS',
      'React Native',
      'FastAPI',
      'Node.js',
      'PostgreSQL'
    ]
  },
  {
    title: 'Tools & Platforms',
    accent: 'violet',
    description: 'Development, deployment, collaboration and integration tools from the resume.',
    skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'REST APIs', 'WebSockets', 'SQLite', 'AWS', 'Claude Code']
  },
  {
    title: 'Core Concepts',
    accent: 'amber',
    description: 'Engineering strengths built through realtime, low-memory and secure application work.',
    skills: ['Real-time systems', 'WebSocket protocols', 'Memory profiling', 'DES decryption', 'Async I/O']
  }
];

export const projects = [
  {
    slug: 'fetchmate',
    title: 'FetchMate',
    type: 'React Native App',
    date: '20/05/26 – 20/06/26',
    tagline: 'Peer-to-peer campus delivery platform for hostelers and day scholars.',
    summary:
      'A cross-platform delivery app that connects college hostelers who need items with day scholars who can bring them, backed by secure auth, realtime feeds, image storage, escrow-style wallet flows and instant push notifications.',
    longSummary:
      'FetchMate is a mobile-first marketplace designed for a college campus use case: hostel students can request items, day scholars can accept and deliver, and both sides can track the order lifecycle in realtime. The architecture focuses on safety, speed and trust using Supabase PostgreSQL, Row-Level Security policies, server-side RPC functions for wallet escrows, secure image storage, and Firebase Cloud Messaging through Expo Push Notifications.',
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Zustand', 'PostgreSQL', 'Firebase Cloud Messaging'],
    highlights: [
      'Cross-platform mobile app built with React Native, Expo and TypeScript.',
      'Realtime request feeds and interactive order status tracking.',
      'Supabase authentication with PostgreSQL-backed app data.',
      'Complex Row-Level Security policies for safer access control.',
      'Server-side RPC functions designed for wallet escrow workflows.',
      'Secure image storage for item and delivery-related uploads.',
      'Expo Push Notifications integrated with Firebase Cloud Messaging for live chat, order status changes and timeout cancellations.'
    ],
    metrics: [
      { label: 'Platform', value: 'Android / iOS-ready' },
      { label: 'Data Layer', value: 'Supabase RLS' },
      { label: 'Realtime', value: 'Feeds + Push' }
    ],
    apk: 'https://expo.dev/artifacts/eas/B83Beq383IjIqfcIsFigLGd2lM0ZFii7h9rJ1W1rOyQ.apk',
    primaryCta: 'Download APK',
    icon: '📦',
    gradient: 'from-cyan'
  },
  {
    slug: 'telegram-music-bot',
    title: 'Telegram Group Music Bot',
    type: 'Telegram Web App + Bot',
    date: '01/06/26 – 07/06/26',
    tagline: 'Synchronized group music rooms with a zero-bandwidth streaming architecture.',
    summary:
      'A Telegram group music bot built with Python, FastAPI, WebSockets, SQLite and vanilla JavaScript. It reduces idle memory, syncs playback across clients and streams audio directly from CDN URLs instead of proxying media through the server.',
    longSummary:
      'The Telegram Group Music Bot is an ultra-light music room system for Telegram. It avoids heavyweight bot frameworks by calling Telegram Bot API directly through asynchronous httpx, uses FastAPI routes for search, lyrics, queue and controls, and runs a WebSocket hub that keeps all clients synchronized with an authoritative server-side playback clock. Media URLs are resolved directly from CDNs, so clients stream audio without consuming the server\'s bandwidth.',
    tech: ['Python', 'FastAPI', 'WebSockets', 'SQLite', 'Vanilla JavaScript', 'httpx', 'Telegram Bot API'],
    highlights: [
      'Reduced idle memory by 62%, from 154MB to 58MB, by replacing aiogram with direct asynchronous HTTP calls through httpx.',
      'Implemented DES-ECB decryption for encrypted media URLs.',
      'Designed a zero-bandwidth architecture where clients stream directly from CDN-resolved media URLs.',
      'Built FastAPI endpoints for search, lyrics, queue operations, room state and player controls.',
      'Created a WebSocket room hub for realtime playback, queue and presence updates.',
      'Implemented authoritative server-side playback clock with drift correction for sub-second synchronization.',
      'Added Telegram initData validation and access-control logic for secure mini-app usage.'
    ],
    metrics: [
      { label: 'Memory Drop', value: '62%' },
      { label: 'Idle RAM', value: '58MB' },
      { label: 'Streaming', value: 'Direct CDN' }
    ],
    bot: 'https://t.me/DrizzyGrahamBot',
    primaryCta: 'Open Telegram Bot',
    icon: '🎧',
    gradient: 'from-violet'
  }
];

export const companyFeatures = [
  'Works smoothly on mobile and desktop',
  'Simple React file structure',
  'Firebase hosting setup included',
  'Search-friendly page metadata',
  'Readable, accessible sections',
  'Daily LeetCode progress refresh',
  'Detailed project pages with useful links',
  'Fast Vite production build'
];
