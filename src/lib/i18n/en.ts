import type { Translations } from './es';

export const en: Translations = {
  // ServicesPanel
  services: {
    clientTypes: {
      startup: 'Startups & MVPs',
      scale: 'Scale-ups',
      enterprise: 'Enterprise'
    },
    valueProps: {
      startup: {
        headline: 'Launch Your MVP Fast',
        subtext: 'From idea to App Store. Lean development with flexibility to pivot.'
      },
      scale: {
        headline: 'Scale Without Breaking',
        subtext: 'Modernize your stack and optimize performance for 10x growth.'
      },
      enterprise: {
        headline: 'Enterprise Solutions',
        subtext: 'Robust architectures with security-first approach and integration.'
      }
    },
    featured: {
      multiplatform: {
        title: 'Multiplatform Apps',
        subtitle: 'One Codebase, All Platforms',
        description: 'Ship to Android, iOS, Web, and Desktop from a single codebase. Reduce development time by 60% without sacrificing native performance.',
        metric: '60%',
        metricLabel: 'faster time-to-market'
      },
      ai: {
        title: 'AI-Powered Features',
        subtitle: 'Next-Gen Intelligence',
        description: 'Integrate cutting-edge AI into your apps. From smart assistants to predictive analytics, make your product stand out.',
        metric: '10x',
        metricLabel: 'user engagement boost'
      }
    },
    items: {
      android: {
        title: 'Native Android',
        description: 'Kotlin-first development with Jetpack Compose. Performance-optimized for any device.'
      },
      flutter: {
        title: 'Flutter Apps',
        description: 'Beautiful cross-platform apps from a single codebase. Ship to iOS & Android fast.'
      },
      migrations: {
        title: 'Tech Migrations',
        description: 'Seamlessly migrate from React Native, Ionic, or legacy code to modern architectures.'
      },
      leadership: {
        title: 'Tech Leadership',
        description: 'Fractional CTO, Tech Lead, or hands-on architect. Scale your team with senior guidance.'
      },
      audits: {
        title: 'Code Audits',
        description: 'Deep technical review with actionable insights. Identify bottlenecks before they hurt.'
      },
      performance: {
        title: 'Performance Tuning',
        description: 'Optimize load times, reduce crashes, and improve app store ratings.'
      },
      mvp: {
        title: 'MVP Development',
        description: 'Validate your idea fast. Ship a production-ready MVP in 4-8 weeks.'
      },
      web: {
        title: 'Web Apps',
        description: 'Modern landing pages and web apps with SvelteKit, React or Next.js. SEO optimized.'
      },
      automation: {
        title: 'Python Automation',
        description: 'Custom scripts for data processing, API integrations, and workflow automation.'
      }
    },
    badges: {
      ideal: 'Ideal'
    },
    cta: {
      title: 'Ready to build something great?',
      subtitle: "Let's discuss your project. No commitment, just conversation.",
      button: 'Book a Call'
    },
    trust: {
      experience: '10+ Years Experience',
      quality: 'Senior-Level Quality',
      flexible: 'Flexible Engagement'
    }
  },

  // My Process Section
  myProcess: {
    title: 'My Process',
    subtitle: 'What you can expect when working with me',
    steps: {
      contact: {
        title: 'First Meeting',
        description: '30-60 min video call. You tell me about your idea, I understand the context and we see if I can help.',
        icon: 'videocam',
        badge: 'Free'
      },
      discovery: {
        title: 'Deep Dive',
        description: 'Second session where we dig deeper into the problem and explore possible technical solutions.',
        icon: 'psychology',
        badge: 'Free'
      },
      scope: {
        title: 'Proposal',
        description: 'I present a document with scope, deliverables, timeline and budget. Everything clear before we start.',
        icon: 'description'
      },
      implementation: {
        title: 'Implementation',
        description: 'Iterative development with frequent demos. Constant communication until delivery.',
        icon: 'rocket_launch'
      }
    }
  },

  // How I Work Section
  howIWork: {
    title: 'How I Work',
    subtitle: 'Philosophy and methodology',
    cards: {
      pragmatic: {
        title: 'Pragmatic',
        subtitle: 'Results > Theory',
        description: "Solutions that work today, not perfect architectures for tomorrow. MVP first, iterate later.",
        footer: 'Ship fast, learn faster'
      },
      communication: {
        title: 'Clear Communication',
        subtitle: 'No unnecessary jargon',
        description: 'I explain the technical "why" in business terms. Weekly updates, frequent demos, zero surprises.',
        footer: 'Slack/Meet available'
      },
      quality: {
        title: 'Senior Quality',
        subtitle: '10+ years of craft',
        description: 'Clean code, automated tests, CI/CD from day 1. Technical debt controlled, not avoided.',
        footer: 'Always production-ready'
      }
    },
    details: {
      ide: 'IDE',
      ideValue: 'IntelliJ + Antigravity',
      stack: 'Favorite stack',
      stackValue: 'Kotlin + Firebase + Claude',
      timezone: 'Timezone',
      timezoneValue: 'CET (Madrid)',
      languages: 'Languages',
      languagesValue: 'ES 🇪🇸 / EN 🇬🇧'
    }
  },

  // ProfilePanel
  profile: {
    role: 'Tech Lead',
    status: 'OPEN FOR ROLES',
    bio: '10+ years experience.<br/>Specializing in mobile, multiplatform, and AI.',
    location: 'Madrid, Spain',
    projectsFor: 'Projects for',
    workedAt: 'Worked At',
    stats: {
      years: 'Years',
      projects: 'Projects'
    }
  },

  // SchedulingPanel
  scheduling: {
    title: 'Book a meeting',
    selectDay: 'Select a day to see available times',
    available: 'Available',
    busy: 'Busy',
    tooSoon: 'Too soon',
    outsideHours: 'Outside hours',
    duration: 'Duration: 1 hour',
    schedule: 'Hours: 8:00 - 22:00 (Madrid)',
    form: {
      back: 'Back',
      fullName: 'Full name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      objective: 'Meeting objective',
      objectivePlaceholder: 'Briefly describe what you would like to discuss...',
      submit: 'Confirm booking',
      submitting: 'Booking...'
    },
    success: {
      title: 'Booking confirmed!',
      message: "We've sent you an email with the meeting details."
    },
    errors: {
      fillAll: 'Please fill in all fields',
      invalidEmail: 'Please enter a valid email',
      connection: 'Connection error. Please try again later.',
      generic: 'Error creating booking. Please try again.'
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  }
};
