const currentYear = new Date().getFullYear()
const currentPersianYear = new Intl.NumberFormat('fa-IR', {
  useGrouping: false,
}).format(currentYear)

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/shenskho', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/amirhossein-gholampour-b6024533b/',
    icon: 'linkedin',
  },
]

const technicalStack = [
  'React',
  'JavaScript',
  'Redux',
  'Redux-Thunk',
  'HTML5',
  'CSS3',
  'REST API',
  'Axios / Fetch',
  'React Hook',
  'Reactstrap',
  'Git',
  'Next.js',
  'TypeScript',
  'App Router',
  'Provider',
  'State Management',
  'Modular Design',
  'Clean Code',
  'Responsive Design',
]

const codeSamples = [
  {
    id: 1,
    url: 'https://github.com/shenskho/rebuild-samane-modiriat-bank-markazi/',
  },
  {
    id: 2,
    url: 'https://github.com/shenskho/samane-sabte-nam-bank-markazi',
  },
]

export const portfolioContent = {
  en: {
    meta: {
      title: 'AmirHossein GholamPour — Frontend Developer',
      description:
        'Frontend developer with 2.5+ years of experience building scalable React applications and government digital services.',
    },
    site: {
      name: 'AmirHossein GholamPour',
      logoName: 'AmirHossein',
      codeName: 'AmirHossein GholamPour',
      title: 'Frontend Developer',
      tagline: 'Building scalable digital experiences with React',
      email: 'amir.pampay@gmail.com',
      phone: '+98 938 638 6407',
      phoneHref: '+989386386407',
      location: 'Marzdaran, Tehran, Iran',
      availability: 'Open to new opportunities',
      resumeUrl: '/resume.pdf',
      avatarInitials: 'AG',
    },
    navLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
      { label: 'Education', href: '#education' },
      { label: 'Contact', href: '#contact' },
    ],
    ui: {
      skipToContent: 'Skip to main content',
      primaryNavigation: 'Primary navigation',
      resume: 'Resume',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      switchLanguage: 'Switch to Persian',
      languageShort: 'فا',
      location: 'Location',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      featured: 'Featured',
      professionalProject: 'Professional project',
      codeSamples: 'Code samples',
      viewRepository: 'View repository',
      scrollDown: 'Scroll to the about section',
    },
    hero: {
      greeting: "Hi, I'm",
      roles: [
        'Frontend Developer',
        'React Developer',
        'Redux Specialist',
        'UI Engineer',
      ],
      description:
        'Frontend developer with 2.5+ years of experience building scalable web applications with React, JavaScript, and Redux, including national employment and government digital-service platforms.',
      ctaPrimary: { label: 'View My Work', href: '#projects' },
      ctaSecondary: { label: 'Get In Touch', href: '#contact' },
      stats: [
        { value: '2.5+', label: 'Years Experience' },
        { value: '3', label: 'Major Projects' },
        { value: '2', label: 'Companies' },
      ],
    },
    about: {
      title: 'About Me',
      subtitle: 'Who I am',
      paragraphs: [
        'I am a flexible, challenge-driven developer who values strong professional connections, knowledge sharing, and growing alongside skilled teammates.',
        'I build responsive single-page applications with modular React architecture, predictable state management, and reliable REST API integration. My professional work includes national employment systems and the e-namad electronic trust platform.',
      ],
      highlights: [
        {
          icon: '🏛️',
          title: 'Government Systems',
          desc: 'National exam platforms and digital trust services',
        },
        {
          icon: '🧩',
          title: 'Modular Architecture',
          desc: 'Reusable components guided by clean-code principles',
        },
        {
          icon: '🔄',
          title: 'State Management',
          desc: 'Redux, Redux-Thunk, Provider, and async data flows',
        },
        {
          icon: '🔗',
          title: 'API Integration',
          desc: 'REST APIs implemented with Axios and Fetch',
        },
      ],
    },
    skills: {
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
            { name: 'Next.js(in learning)', level: 50 },
            { name: 'TypeScript(in learning)', level: 40 },
          ],
        },
      ],
      techStack: technicalStack,
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Selected professional work',
      projects: [
        {
          id: 1,
          year: '2025',
          title: 'National Employment Exam System',
          description:
            'A government-grade platform for managing nationwide employment-exam registration and workflows, built with reusable React components, Redux, and REST APIs.',
          tags: ['React', 'Redux', 'REST API', 'Redux-Thunk'],
          featured: true,
          gradient: 'from-cyan-to-purple',
        },
        {
          id: 2,
          year: '2025',
          title: 'Central Bank Employment Exam System',
          description:
            'An employment-exam management system for the Central Bank, developed with modular frontend architecture and maintainable clean-code practices.',
          tags: ['React', 'Modular Design', 'Redux', 'Clean Code'],
          featured: true,
          gradient: 'from-purple-to-pink',
        },
        {
          id: 3,
          year: '2023',
          title: 'e-namad — Electronic Trust Platform',
          description:
            'Frontend development for Iran’s national e-commerce trust platform, with responsive interfaces and reliable integration with government REST services.',
          tags: ['React', 'REST API', 'Responsive Design', 'JavaScript'],
          featured: false,
          gradient: 'from-green-to-cyan',
        },
      ],
      samples: codeSamples.map((sample) => ({
        ...sample,
        label: `GitHub sample ${String(sample.id).padStart(2, '0')}`,
      })),
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey',
      items: [
        {
          role: 'React Developer',
          company: 'Faradis Computer Researchers Cooperative Co.',
          location: 'Karaj, Iran',
          period: 'May 2025 — Present',
          description:
            'Develop and maintain React SPAs with Redux and Redux-Thunk. Contributed to national and Central Bank employment-exam systems, built reusable modules, and integrated REST APIs with asynchronous data flows.',
          tags: ['React', 'Redux', 'Redux-Thunk', 'REST API'],
        },
        {
          role: 'Software Development Specialist — Frontend Developer',
          company: 'Iran IT Development Center (MAGFA)',
          location: 'Tehran, Iran',
          period: 'December 2023 — February 2025',
          description:
            'Developed responsive interfaces for government digital services, including the e-namad electronic trust platform, using React and modern JavaScript in an Agile team.',
          tags: ['React', 'JavaScript', 'Responsive Design', 'Agile'],
        },
      ],
    },
    education: {
      title: 'Education & Learning',
      subtitle: 'Background and continued growth',
      items: [
        {
          type: 'Academic',
          title: 'Bachelor’s Degree in Accounting',
          institution: 'Islamic Azad University, Shahriar',
          period: '2015 — 2019',
          description:
            'Undergraduate studies in accounting at the Shahriar branch of Islamic Azad University.',
        },
        {
          type: 'Training',
          title: 'Frontend Development Bootcamp',
          institution: 'Starcoach',
          period: '2024 · 2 months',
          description:
            'Focused frontend training covering modern web development and component-based interfaces.',
        },
        {
          type: 'Language',
          title: 'English',
          institution: 'Intermediate proficiency',
          period: 'Ongoing',
          description:
            'Working proficiency for technical documentation, tooling, and team communication.',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let’s work together',
      description:
        'Looking for a frontend developer experienced in scalable React applications and government-grade systems? I would be glad to discuss your project or opportunity.',
      formFields: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        namePlaceholder: 'John Doe',
        emailPlaceholder: 'john@example.com',
        messagePlaceholder: 'Tell me about your project or opportunity…',
        submit: 'Compose Email',
        opening: 'Opening your email app…',
      },
      emailSubject: 'Portfolio enquiry from',
    },
    footer: {
      copyright: `© ${currentYear} AmirHossein GholamPour. Built with React & Vite.`,
      backToTop: 'Back to top',
    },
  },
  fa: {
    meta: {
      title: 'امیرحسین غلام‌پور — توسعه‌دهنده فرانت‌اند',
      description:
        'توسعه‌دهنده فرانت‌اند با بیش از ۲٫۵ سال تجربه در ساخت اپلیکیشن‌های مقیاس‌پذیر React و سامانه‌های خدمات دولتی.',
    },
    site: {
      name: 'امیرحسین غلام‌پور',
      logoName: 'AmirHossein',
      codeName: 'AmirHossein GholamPour',
      title: 'Frontend Developer',
      tagline: 'ساخت تجربه‌های دیجیتال مقیاس‌پذیر با React',
      email: 'amir.pampay@gmail.com',
      phone: '۰۹۳۸ ۶۳۸ ۶۴۰۷',
      phoneHref: '+989386386407',
      location: 'مرزداران، تهران، ایران',
      availability: 'آمادهٔ همکاری و فرصت‌های جدید',
      resumeUrl: '/resume-fa.pdf',
      avatarInitials: 'AG',
    },
    navLinks: [
      { label: 'خانه', href: '#home' },
      { label: 'درباره من', href: '#about' },
      { label: 'مهارت‌ها', href: '#skills' },
      { label: 'پروژه‌ها', href: '#projects' },
      { label: 'سوابق کاری', href: '#experience' },
      { label: 'تحصیلات', href: '#education' },
      { label: 'تماس', href: '#contact' },
    ],
    ui: {
      skipToContent: 'رفتن به محتوای اصلی',
      primaryNavigation: 'منوی اصلی',
      resume: 'رزومه',
      openMenu: 'باز کردن منوی ناوبری',
      closeMenu: 'بستن منوی ناوبری',
      switchLanguage: 'تغییر زبان به انگلیسی',
      languageShort: 'EN',
      location: 'محل سکونت',
      email: 'ایمیل',
      phone: 'موبایل',
      status: 'وضعیت همکاری',
      featured: 'برگزیده',
      professionalProject: 'پروژهٔ حرفه‌ای',
      codeSamples: 'نمونه‌کدها',
      viewRepository: 'مشاهده مخزن',
      scrollDown: 'رفتن به بخش درباره من',
    },
    hero: {
      greeting: 'سلام، من',
      roles: [
        'توسعه‌دهنده فرانت‌اند',
        'برنامه‌نویس React',
        'متخصص Redux',
        'توسعه‌دهنده رابط کاربری',
      ],
      description:
        'توسعه‌دهنده فرانت‌اند با بیش از ۲٫۵ سال تجربه در ساخت اپلیکیشن‌های مقیاس‌پذیر با React، JavaScript و Redux؛ با سابقهٔ حضور در سامانه‌های ملی استخدامی و خدمات دیجیتال دولتی.',
      ctaPrimary: { label: 'مشاهده پروژه‌ها', href: '#projects' },
      ctaSecondary: { label: 'ارتباط با من', href: '#contact' },
      stats: [
        { value: '۲٫۵', label: 'سال تجربه' },
        { value: '۳', label: 'پروژهٔ اصلی' },
        { value: '۲', label: 'سابقهٔ سازمانی' },
      ],
    },
    about: {
      title: 'درباره من',
      subtitle: 'کمی بیشتر از من',
      paragraphs: [
        'آدمی چالش‌پذیر و منعطف هستم و اولویت اصلی‌ام گسترش ارتباط با افراد متخصص و باسواد است تا با اشتراک دانش، در چارچوب کار تیمی کنار یکدیگر رشد کنیم.',
        'در توسعهٔ اپلیکیشن‌های تک‌صفحه‌ای واکنش‌گرا، معماری ماژولار React، مدیریت قابل‌پیش‌بینی وضعیت و اتصال مطمئن به REST API تجربه دارم. بخشی از مسیر حرفه‌ای من به سامانه‌های ملی استخدامی و سکوی نماد اعتماد الکترونیکی اختصاص داشته است.',
      ],
      highlights: [
        {
          icon: '🏛️',
          title: 'سامانه‌های دولتی',
          desc: 'سامانه‌های ملی آزمون و خدمات اعتماد دیجیتال',
        },
        {
          icon: '🧩',
          title: 'معماری ماژولار',
          desc: 'کامپوننت‌های بازاستفاده‌پذیر با اصول Clean Code',
        },
        {
          icon: '🔄',
          title: 'مدیریت وضعیت',
          desc: 'Redux، Redux-Thunk، Provider و جریان‌های غیرهمگام',
        },
        {
          icon: '🔗',
          title: 'اتصال به API',
          desc: 'پیاده‌سازی REST API با Axios و Fetch',
        },
      ],
    },
    skills: {
      title: 'مهارت‌ها و ابزارها',
      subtitle: 'فناوری‌هایی که با آن‌ها کار می‌کنم',
      categories: [
        {
          name: 'مهارت‌های اصلی فرانت‌اند',
          skills: [
            { name: 'React', level: 95 },
            { name: 'JavaScript (ES6+)', level: 90 },
            { name: 'HTML5 & CSS3', level: 92 },
            { name: 'Redux / Redux-Thunk', level: 88 },
          ],
        },
        {
          name: 'ابزارها و مسیر رشد',
          skills: [
            { name: 'REST API / Axios', level: 90 },
            { name: 'Git & GitHub', level: 88 },
            { name: 'Next.js', level: 60 },
            { name: 'TypeScript', level: 55 },
          ],
        },
      ],
      techStack: technicalStack,
    },
    projects: {
      title: 'پروژه‌های منتخب',
      subtitle: 'بخشی از تجربه‌های حرفه‌ای من',
      projects: [
        {
          id: 1,
          year: '۱۴۰۴',
          title: 'سامانه آزمون استخدامی دستگاه‌های اجرایی کشور',
          description:
            'سامانه‌ای در مقیاس ملی برای مدیریت ثبت‌نام و فرایندهای آزمون استخدامی؛ توسعه‌یافته با کامپوننت‌های بازاستفاده‌پذیر React، مدیریت وضعیت Redux و اتصال به REST API.',
          tags: ['React', 'Redux', 'REST API', 'Redux-Thunk'],
          featured: true,
          gradient: 'from-cyan-to-purple',
        },
        {
          id: 2,
          year: '۱۴۰۴',
          title: 'سامانه مدیریت آزمون استخدامی بانک مرکزی',
          description:
            'سامانهٔ مدیریت آزمون استخدامی بانک مرکزی با معماری ماژولار فرانت‌اند و تمرکز بر نگهداشت‌پذیری، بازاستفاده از کامپوننت‌ها و اصول Clean Code.',
          tags: ['React', 'Modular Design', 'Redux', 'Clean Code'],
          featured: true,
          gradient: 'from-purple-to-pink',
        },
        {
          id: 3,
          year: '۱۴۰۲',
          title: 'سامانه اینماد — نماد اعتماد الکترونیکی',
          description:
            'توسعهٔ رابط کاربری سکوی ملی اعتماد تجارت الکترونیکی با طراحی واکنش‌گرا و اتصال پایدار به سرویس‌های دولتی REST.',
          tags: ['React', 'REST API', 'Responsive Design', 'JavaScript'],
          featured: false,
          gradient: 'from-green-to-cyan',
        },
      ],
      samples: codeSamples.map((sample) => ({
        ...sample,
        label: `نمونه‌کد ${new Intl.NumberFormat('fa-IR', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }).format(sample.id)}`,
      })),
    },
    experience: {
      title: 'سوابق کاری',
      subtitle: 'مسیر حرفه‌ای من',
      items: [
        {
          role: 'برنامه‌نویس React',
          company: 'شرکت تعاونی پژوهشگران رایانگان فردیس',
          location: 'کرج، ایران',
          period: 'اردیبهشت ۱۴۰۴ — اکنون',
          description:
            'توسعه و نگهداشت اپلیکیشن‌های تک‌صفحه‌ای با React، Redux و Redux-Thunk؛ مشارکت در سامانه‌های آزمون استخدامی دستگاه‌های اجرایی و بانک مرکزی، ساخت ماژول‌های بازاستفاده‌پذیر و اتصال REST API با جریان دادهٔ غیرهمگام.',
          tags: ['React', 'Redux', 'Redux-Thunk', 'REST API'],
        },
        {
          role: 'کارشناس توسعه نرم‌افزار — برنامه‌نویس فرانت‌اند',
          company: 'مرکز گسترش فناوری اطلاعات ایران (مگفا)',
          location: 'تهران، ایران',
          period: 'آذر ۱۴۰۲ — بهمن ۱۴۰۳',
          description:
            'توسعهٔ رابط‌های واکنش‌گرای خدمات دیجیتال دولتی، از جمله سامانه نماد اعتماد الکترونیکی، با React و JavaScript در چارچوب همکاری تیمی Agile.',
          tags: ['React', 'JavaScript', 'Responsive Design', 'Agile'],
        },
      ],
    },
    education: {
      title: 'تحصیلات و آموزش',
      subtitle: 'پیشینه و مسیر یادگیری',
      items: [
        {
          type: 'تحصیلات دانشگاهی',
          title: 'کارشناسی حسابداری',
          institution: 'دانشگاه آزاد اسلامی واحد شهریار',
          period: '۱۳۹۴ — ۱۳۹۷',
          description:
            'دورهٔ کارشناسی حسابداری در دانشگاه آزاد اسلامی واحد شهریار.',
        },
        {
          type: 'دورهٔ تخصصی',
          title: 'بوت‌کمپ توسعه فرانت‌اند',
          institution: 'استارکوچ',
          period: '۱۴۰۳ · دورهٔ ۲ ماهه',
          description:
            'آموزش متمرکز توسعه وب مدرن و پیاده‌سازی رابط‌های کاربری کامپوننت‌محور.',
        },
        {
          type: 'زبان خارجی',
          title: 'زبان انگلیسی',
          institution: 'سطح متوسط',
          period: 'در حال پیشرفت',
          description:
            'توانایی استفاده از مستندات فنی، ابزارهای توسعه و ارتباطات کاری.',
        },
      ],
    },
    contact: {
      title: 'ارتباط با من',
      subtitle: 'برای همکاری گفت‌وگو کنیم',
      description:
        'اگر برای توسعهٔ یک اپلیکیشن React مقیاس‌پذیر یا یک فرصت همکاری فرانت‌اند به دنبال نیروی باتجربه هستید، خوشحال می‌شوم دربارهٔ جزئیات آن گفت‌وگو کنیم.',
      formFields: {
        name: 'نام شما',
        email: 'ایمیل شما',
        message: 'پیام شما',
        namePlaceholder: 'نام و نام خانوادگی',
        emailPlaceholder: 'name@example.com',
        messagePlaceholder: 'کمی دربارهٔ پروژه یا فرصت همکاری بنویسید…',
        submit: 'نوشتن ایمیل',
        opening: 'در حال باز کردن برنامه ایمیل…',
      },
      emailSubject: 'پیام از وب‌سایت —',
    },
    footer: {
      copyright: `© ${currentPersianYear} امیرحسین غلام‌پور. توسعه‌یافته با React و Vite.`,
      backToTop: 'بازگشت به بالا',
    },
  },
}



















