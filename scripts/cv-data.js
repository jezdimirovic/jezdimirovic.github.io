// Structured CV content for Zoran Jezdimirović.
// Source of truth for the downloadable PDF (scripts/generate-cv.mjs renders it).
// PRIVACY: intentionally excludes date of birth, JMBG, home address, and phone
// number — this file is public. Contact is email + LinkedIn + GitHub only.

export const cv = {
  name: 'Zoran Jezdimirović',
  title: 'Full-Stack Software Engineer — .NET & React',
  location: 'Serbia · Remote (UK / EU)',
  contact: {
    email: 'zoran.jezdimirovic@gmail.com',
    website: 'jezdimirovic.github.io',
    linkedin: 'linkedin.com/in/zoranjezdimirovic',
    github: 'github.com/jezdimirovic',
  },
  summary:
    'Senior full-stack software engineer with 14+ years shipping production systems ' +
    'across fintech, iGaming, banking, and retail. Deep in the Microsoft stack ' +
    '(.NET / C#) with a strong React/TypeScript front-end practice and a test-driven ' +
    'approach. Currently building complex web applications remotely for Kaizen ' +
    'Ticketing (London) and, as founder of Jezda Solutions, an entire modular ERP ' +
    'platform, cross-platform POS, and e-commerce suite.',
  skills: [
    { group: 'Backend', items: 'C#, .NET / ASP.NET Core, EF Core, CQRS, Web API, REST' },
    { group: 'Frontend', items: 'React, Angular, TypeScript, JavaScript, Tailwind CSS, HTML/CSS' },
    { group: 'Data', items: 'PostgreSQL, MS SQL Server, Redis, Firebase' },
    { group: 'Practices & DevOps', items: 'TDD (NUnit/xUnit), Docker, Git, CI/CD, Agile' },
  ],
  experience: [
    {
      role: 'Software Developer',
      company: 'Kaizen Ticketing',
      place: 'London, UK · Remote',
      dates: '2023 – Present',
      bullets: [
        'Develop and maintain complex web applications with .NET Core and React.',
        'Practise test-driven development with NUnit to keep quality and coverage high.',
        'Optimise PostgreSQL queries and use Redis (in Docker) for caching and performance.',
      ],
    },
    {
      role: 'CEO / Founder',
      company: 'Jezda Solutions',
      place: 'Remote',
      dates: '2018 – Present',
      bullets: [
        'Run a software studio delivering a modular ERP platform, cross-platform POS, and e-commerce storefronts.',
        'Provide dedicated development teams and staff augmentation for international clients.',
        'Own architecture and delivery across .NET, React, Flutter, and PostgreSQL.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'Bethard',
      place: 'Belgrade · Hybrid',
      dates: '2021 – 2023',
      bullets: [
        'Built and maintained iGaming platforms with C# MVC and Web API.',
        'Refactored and optimised large stored procedures in MS SQL Server.',
        'Integrated third-party APIs and kept high-traffic applications performant.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'CPA Global',
      place: 'Belgrade · Hybrid',
      dates: '2020 – 2021',
      bullets: [
        'Designed and optimised high-performance APIs supporting complex business logic.',
        'Built and maintained a large, demanding AngularJS front end for scalability.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'GET',
      place: 'Belgrade · Office',
      dates: '2016 – 2020',
      bullets: [
        'Part of the team building banking solutions for Banca Intesa, a leading bank in the region, with C# MVC, jQuery, and MS SQL Server.',
        'Built a Xamarin mobile app and handled secure in-bank deployments.',
        'Delivered a warehouse-management project for Fiege, a German logistics company, as developer and project manager, including on-site collaboration.',
      ],
    },
    {
      role: 'Mobile Web Developer',
      company: 'Usablenet',
      place: 'Belgrade · Office',
      dates: '2012 – 2016',
      bullets: [
        'Transformed websites into optimised mobile experiences using XML, XPath, and XSLT.',
        'Built responsive interfaces with HTML, CSS, JavaScript, jQuery, and AJAX.',
      ],
    },
  ],
  projects: [
    {
      name: 'Jezda Platform',
      tech: '.NET 10 · FastEndpoints · PostgreSQL · EF Core · CQRS · Hangfire',
      desc: 'Modular-monolith ERP unifying identity, HR, tasks, commerce/retail, accounting, finance, CRM and notifications behind one Web API.',
    },
    {
      name: 'SERP',
      tech: 'React 19 · TypeScript · Vite · Tailwind · SignalR',
      desc: 'Unified React SPA front end for the platform, with shared auth, permissions and real-time notifications.',
    },
    {
      name: 'Jezda POS',
      tech: 'Flutter · Dart · ESC/POS',
      desc: 'Cross-platform (Windows + Android) point-of-sale with retail & HoReCa modes, fiscal receipts, inventory and loyalty.',
    },
    {
      name: 'Golub',
      tech: '.NET 9 · FastEndpoints · PostgreSQL · MIT',
      desc: 'Open-source smart email relay that stacks multiple providers’ free tiers with priority rotation, quota tracking and audit logging.',
    },
    {
      name: 'Jezda Common Libs',
      tech: '.NET 10 · NuGet',
      desc: 'Published reusable .NET libraries (domain, data access, integrations) underpinning the platform.',
    },
    {
      name: 'PriceRadar',
      tech: 'Node.js · Docker',
      desc: 'Retail price-intelligence scraper harvesting products, barcodes and images from 23 Serbian chains via a stealth browser.',
    },
    {
      name: 'Storefronts',
      tech: 'Next.js · React · TypeScript · Stripe',
      desc: 'E-commerce fronts on the platform’s commerce API (ASIX, Wearify, Bon Appetit) plus reusable shop templates.',
    },
    {
      name: 'Sports Almanac',
      tech: 'Python · FastAPI · PostgreSQL',
      desc: 'Personal tool that crawls bookmaker odds for prematch analysis and cross-market comparison.',
    },
  ],
  education: {
    degree: "Bachelor's Degree — Management of IT Systems",
    school: 'Belgrade Metropolitan University',
    dates: '2008 – 2013',
  },
};
