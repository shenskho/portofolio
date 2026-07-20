/**
 * ═══════════════════════════════════════════════════════════════
 *  PORTFOLIO CONFIG — همه چیز را از اینجا سفارشی کنید
 * ═══════════════════════════════════════════════════════════════
 */

export const siteConfig = {
  name: 'AmirHossein GholamPour',
  title: 'Frontend Developer',
  tagline: 'Building scalable, government-grade web applications with React',
  email: 'amir.pampay@gmail.com',
  phone: '+98 938 638 6407',
  location: 'Karaj, Alborz, Iran',
  availability: 'Open to opportunities',
  resumeUrl: '/resume.pdf',
  avatarInitials: 'AG',
}

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/shenskho', icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const heroConfig = {
  greeting: "Hi, I'm",
  roles: ['Frontend Developer', 'React Specialist', 'Redux Expert', 'UI Engineer'],
  description:
    'Frontend Developer with 2.5+ years of experience building scalable web applications using React, JavaScript, and Redux. Proven track record delivering government-grade systems including national employment exam platforms.',
  ctaPrimary: { label: 'View My Work', href: '#projects' },
  ctaSecondary: { label: 'Get In Touch', href: '#contact' },
  stats: [
    { value: '2.5+', label: 'Years Experience' },
    { value: '3', label: 'Major Projects' },
    { value: '2', label: 'Companies' },
  ],
}

export const aboutConfig = {
  title: 'About Me',
  subtitle: 'Who I am',
  paragraphs: [
    'Frontend Developer with a strong command of modular component architecture, state management patterns, and REST API integration. I specialize in building responsive, scalable single-page applications using React, Redux, and modern JavaScript.',
    'My experience includes delivering government-grade digital services — from national employment exam systems to the e-namad electronic trust badge platform. I\'m committed to clean code principles and continuous learning, currently advancing my TypeScript and Next.js skills.',
  ],
  highlights: [
    { icon: '🏛️', title: 'Government Systems', desc: 'National exam platforms & e-trust badge systems' },
    { icon: '🧩', title: 'Modular Architecture', desc: 'Reusable component libraries with Clean Code' },
    { icon: '🔄', title: 'State Management', desc: 'Redux, Redux-Thunk & async data flow patterns' },
    { icon: '🔗', title: 'API Integration', desc: 'REST APIs with Axios/Fetch & React Query' },
  ],
}

export const skillsConfig = {
  title: 'Skills & Tools',
  subtitle: 'What I work with',
  categories: [
    {
      name: 'Frontend Core',
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'HTML5 & CSS3', level: 92 },
        { name: 'Redux / Redux-Thunk', level: 88 },
      ],
    },
    {
      name: 'Tools & Growing',
      skills: [
        { name: 'REST API / Axios', level: 90 },
        { name: 'Git & GitHub', level: 88 },
        { name: 'Next.js', level: 70 },
        { name: 'TypeScript', level: 55 },
      ],
    },
  ],
  techStack: [
    'React', 'JavaScript', 'Redux', 'Redux-Thunk', 'HTML5', 'CSS3',
    'REST API', 'Axios', 'React Hook Form', 'Reactstrap', 'Git',
    'Next.js', 'React Query', 'TypeScript', 'Tailwind CSS', 'Jest',
    'Zustand', 'Clean Code', 'Responsive Design',
  ],
}

export const projectsConfig = {
  title: 'Featured Projects',
  subtitle: 'Selected work',
  projects: [
    {
      id: 1,
      title: 'National Employment Exam System',
      description: 'Government-grade exam management platform for national employment agencies. Built with React, Redux, and REST API integration for managing large-scale exam workflows.',
      tags: ['React', 'Redux', 'REST API', 'Redux-Thunk'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      gradient: 'from-cyan to-purple',
    },
    {
      id: 2,
      title: 'Central Bank Employment Exam System',
      description: 'Employment exam management system developed for the Central Bank. Features modular component architecture and clean code principles for maintainability.',
      tags: ['React', 'Modular Design', 'Redux', 'Clean Code'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      gradient: 'from-purple to-pink',
    },
    {
      id: 3,
      title: 'e-namad — E-Trust Badge Platform',
      description: 'National e-commerce trust badge system (Electronic Trust Badge) for government digital services. UI development with React and REST API integration.',
      tags: ['React', 'REST API', 'Responsive Design', 'JavaScript'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      gradient: 'from-green to-cyan',
    },
  ],
}

export const experienceConfig = {
  title: 'Experience',
  subtitle: 'My journey',
  items: [
    {
      role: 'React Developer',
      company: 'Faradis Computer Researchers Cooperative Co.',
      period: 'May 2025 — Present',
      description: 'Developed and maintained SPAs using React, Redux, and Redux-Thunk. Built National and Central Bank Employment Exam Management Systems. Designed reusable modular component libraries and integrated REST APIs with async data flow.',
      tags: ['React', 'Redux', 'Redux-Thunk', 'REST API'],
    },
    {
      role: 'Software Development Engineer — Frontend',
      company: 'Iran IT Development Center (MAGFA)',
      period: 'Dec 2023 — Feb 2025',
      description: 'Developed UI for government digital services using React and JavaScript. Implemented the e-namad (Electronic Trust Badge) platform — a national e-commerce trust system. Applied responsive design and maintained code quality through Agile sprints.',
      tags: ['React', 'JavaScript', 'Responsive Design', 'Agile'],
    },
  ],
}

export const contactConfig = {
  title: 'Get In Touch',
  subtitle: 'Let\'s work together',
  description: 'Looking for a frontend developer with experience in scalable React applications and government-grade systems? I\'d love to hear about your project or opportunity.',
  formFields: {
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    submit: 'Send Message',
  },
}

export const footerConfig = {
  copyright: `© ${new Date().getFullYear()} AmirHossein GholamPour. Built with React & Vite.`,
  backToTop: 'Back to top',
}
