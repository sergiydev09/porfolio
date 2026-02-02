import type { Translations } from './es';

export const en: Translations = {
  // ServicesPanel
  services: {
    freeOffer: {
      badge: 'NEW',
      title: 'FREE Development',
      subtitle: 'Your app for €0',
      description: 'Have an idea with a business model? I develop your Android, iOS, Web or Desktop (Windows/Mac) app completely free in exchange for 1% of future profits.',
      cta: 'Learn more',
      features: ['€0 upfront', '1% profits', 'Same quality level']
    },
    sections: {
      free: 'Free Option',
      freeSubtitle: 'Development in exchange for profit sharing',
      paid: 'Paid Services',
      paidSubtitle: 'Traditional development with fixed budget'
    },
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
    weekDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    privacy: {
      label: 'I accept the',
      link: 'privacy policy',
      required: 'You must accept the privacy policy'
    }
  },

  // Footer
  footer: {
    privacy: 'Privacy',
    legal: 'Legal Notice',
    legalNotice: 'This site uses essential technical cookies. Check our privacy policy and legal notice.',
    accept: 'Got it'
  },

  // Free Development Contract Modal
  freeDevContract: {
    title: 'Profit-Sharing Development',
    subtitle: 'A collaboration model based on mutual success',
    tabs: {
      summary: 'Summary',
      contract: 'Contract',
      faq: 'FAQ'
    },
    summary: {
      cost: {
        title: 'Initial Cost: €0',
        description: 'Complete development of your app with no upfront investment. You only pay if your project generates profits.'
      },
      share: {
        title: '1% of Net Profits',
        description: 'Participation on actual profits (after expenses). Our interests are aligned: your success is my success.'
      },
      duration: {
        title: 'Flexible Duration',
        description: 'The agreement continues until both parties decide to end it by mutual agreement.'
      },
      legal: {
        title: 'Spanish Legal Framework',
        description: 'Joint Venture Agreement regulated by articles 239 to 243 of the Spanish Commercial Code. An established legal structure with full legal validity.',
        tags: ['Commercial Code', 'Art. 239-243', 'No mandatory registration']
      },
      howItWorks: {
        title: 'How does it work?',
        steps: [
          {
            title: 'We evaluate your idea',
            description: 'Free meeting to analyze technical and business viability.'
          },
          {
            title: 'We sign the agreement',
            description: 'Profit participation contract. Simple, no complications.'
          },
          {
            title: 'Full development',
            description: 'I build your app with the same quality as any paid project.'
          },
          {
            title: 'We share the success',
            description: 'When you generate profits, you receive reports and I get my 1%.'
          }
        ]
      },
      rights: {
        title: 'Your Guaranteed Rights',
        items: [
          '100% intellectual property ownership',
          'No exclusivity commitment',
          'Source code delivered',
          'Right to audit calculations',
          'Termination by mutual agreement',
          'No hidden penalties'
        ]
      },
      businessModel: {
        title: '⚠️ Fundamental Requirement',
        subtitle: 'Defined Business Model',
        description: 'To apply for free development, you need to know how your app will generate revenue. Without a monetization plan, this agreement is not possible because it\'s based on sharing future profits.',
        suggestionsTitle: 'Common monetization models:',
        suggestions: [
          { icon: 'autorenew', name: 'Subscriptions', description: 'Monthly/annual payment for feature access' },
          { icon: 'workspace_premium', name: 'Freemium', description: 'Free with paid premium features' },
          { icon: 'ads_click', name: 'Advertising', description: 'Revenue from in-app ads' },
          { icon: 'store', name: 'Marketplace', description: 'Commissions on transactions' },
          { icon: 'download', name: 'One-time purchase', description: 'Pay per download' },
          { icon: 'shopping_bag', name: 'In-app purchases', description: 'Purchases within the app' }
        ],
        questionsTitle: 'Key questions you should answer:',
        questions: [
          'Who is your ideal customer?',
          'What problem does your app solve?',
          'Why would users pay?',
          'How much would they be willing to pay?',
          'How do you differentiate from competitors?'
        ],
        tip: 'You don\'t need to have everything perfect, but you do need a clear monetization hypothesis that we can validate together.'
      },
      scope: {
        title: "What's included and what's not?",
        includes: {
          title: 'What I do',
          items: [
            'Complete software development',
            'Architecture and technical decisions',
            'Infrastructure advisory',
            'Deployment and production setup',
            'Basic technical maintenance'
          ]
        },
        excludes: {
          title: 'What is NOT included',
          items: [
            'Server, domain and API costs (you pay these)',
            'Business model development',
            'Marketing and user acquisition',
            'Graphic design or branding',
            'Content and copywriting'
          ]
        }
      },
      realCosts: {
        title: '💡 Real Costs: Lower Than You Think',
        description: 'Many projects have ridiculously low initial costs. Expenses only scale when your project actually generates revenue.',
        example: {
          title: 'Real example:',
          project: 'laporrita.es',
          projectDesc: 'Complete functional app',
          cost: '~€11',
          costDesc: 'Total initial cost',
          breakdown: 'Domain (~€10/year) + Firebase. Current monthly cost: €0-2'
        },
        note: 'Firebase, Supabase and other platforms have generous free tiers. You only pay more when your app has thousands of active users — and by then, you\'ll already be generating revenue.'
      }
    },
    contract: {
      title: 'JOINT VENTURE AGREEMENT',
      subtitle: 'Profit participation agreement template',
      sections: {
        parties: {
          title: 'CONTRACTING PARTIES',
          developer: {
            label: 'THE PARTICIPANT (Developer)',
            name: 'Sergiy Alonso',
            role: 'Software Developer and Technology Consultant'
          },
          client: {
            label: 'THE MANAGER (Client)',
            placeholder: '[Client details to be completed in final contract]'
          }
        },
        object: {
          title: 'PURPOSE OF THE CONTRACT',
          content: 'This contract aims to establish an economic collaboration relationship under the legal structure of "Joint Venture Accounts" (articles 239 to 243 of the Spanish Commercial Code), whereby THE PARTICIPANT will provide software development services to THE MANAGER, in exchange for a share of the net profits generated by the developed project.'
        },
        benefits: {
          title: 'NET PROFITS DEFINITION',
          intro: '"Net Profits" are considered the positive result of subtracting from the project\'s gross income the following items:',
          deductions: [
            'Direct software development and maintenance costs (servers, APIs, licenses)',
            'Infrastructure and hosting costs',
            'Marketing and user acquisition costs',
            'Personnel costs directly linked to the project',
            'Taxes and legal contributions related to the project',
            'Contingency provisions (maximum 10% of gross income)',
            'Depreciation of investments in project-specific tools and equipment'
          ],
          formula: '📊 Net Profits = Gross Income - Deductible Expenses'
        },
        participation: {
          title: 'PROFIT PARTICIPATION',
          clauses: [
            'THE PARTICIPANT shall be entitled to receive 1% (one percent) of the project\'s Net Profits throughout the term of this contract.',
            'Payment will be made quarterly, within 30 days after the close of each calendar quarter.',
            'In the event that the project does not generate profits in a given period, there will be no payment obligation. Negative profits will not be carried forward to subsequent periods.',
            'THE MANAGER will issue with each payment a detailed breakdown of the net profit calculation.'
          ]
        },
        information: {
          title: 'RIGHT TO INFORMATION',
          intro: 'THE MANAGER shall provide THE PARTICIPANT with:',
          items: [
            'Detailed quarterly report of project income and expenses',
            'Itemized calculation of Net Profits',
            'Annual access to relevant project accounting records',
            'Right to conduct an independent audit (maximum once a year, at the requester\'s expense)'
          ]
        },
        ip: {
          title: 'INTELLECTUAL PROPERTY',
          content: 'The intellectual property of the developed software, including source code, design, documentation and any created material, shall be the exclusive property of THE MANAGER. THE PARTICIPANT transfers all exploitation rights to THE MANAGER from the moment of creation. THE PARTICIPANT retains only the right to mention the project in their professional portfolio in a generic manner, without revealing confidential information.'
        },
        fiscal: {
          title: 'TAX MATTERS',
          content: 'THE MANAGER shall withhold from each payment to THE PARTICIPANT 19% as income tax withholding (IRPF), in accordance with current Spanish tax legislation. THE MANAGER shall remit the withholdings to the Tax Agency within the legally established deadlines and shall provide THE PARTICIPANT with the corresponding withholding certificate annually. THE PARTICIPANT shall be responsible for declaring this income in their tax return as investment income.'
        },
        duration: {
          title: 'DURATION AND TERMINATION',
          clauses: [
            'This contract shall have an indefinite duration, remaining in force while the project generates commercial activity.',
            'Either party may request termination of the contract by written notice with a minimum advance notice of 90 days.',
            'Termination shall occur by mutual agreement between both parties, with all pending profits to be settled within a maximum period of 60 days from the effective termination date.',
            'Causes for immediate termination (without notice): serious breach of contractual obligations, declaration of insolvency or bankruptcy of either party, or definitive cessation of project activity.'
          ]
        },
        confidentiality: {
          title: 'CONFIDENTIALITY',
          content: 'Both parties undertake to maintain the strictest confidentiality regarding all commercial, technical and financial information exchanged in connection with this contract. This obligation shall remain in force for the duration of the contract and for 3 years after its termination. Disclosures required by law or by competent judicial authority are exempted from this obligation.'
        },
        jurisdiction: {
          title: 'APPLICABLE LAW AND JURISDICTION',
          content: 'This contract shall be governed and interpreted in accordance with Spanish legislation, particularly articles 239 to 243 of the Commercial Code and the provisions of the Civil Code where not provided for. For any dispute arising from this contract, the parties submit to the jurisdiction of the Courts and Tribunals of Madrid (Spain), with express waiver of any other jurisdiction that may correspond to them.'
        }
      },
      legalNotice: {
        title: 'Important Notice',
        content: 'This document is a template and does not constitute legal advice. Review by a lawyer is recommended before signing. The final contract will be adapted to the specific circumstances of each project.'
      }
    },
    faq: {
      items: [
        {
          question: 'What if my project doesn\'t generate profits?',
          answer: 'You don\'t have to pay anything. The model only works if your project succeeds. If there are no profits, there\'s no participation. It\'s a shared risk model: I invest my time and knowledge, and only get a return if the project works.'
        },
        {
          question: 'How are net profits calculated?',
          answer: 'Net profits are your total income minus all legitimate operating expenses of the project (servers, marketing, licenses, employees, taxes, etc.). I only participate in what you actually earn after covering your costs.'
        },
        {
          question: 'Do I have to show my finances?',
          answer: 'Quarterly, I will receive a profit report related to the project. I have the right to request an annual audit if I deem it necessary, but always respecting confidentiality. I don\'t need access to all your business finances, just those of the specific project.'
        },
        {
          question: 'Can I sell my company or the project?',
          answer: 'Yes, you can sell your company or the project. In that case, the contract would be transferred to the new owner or settled as we agree. The usual approach is to negotiate a buyout (purchase of my participation) at the time of sale.'
        },
        {
          question: 'Is the 1% forever?',
          answer: 'The contract is indefinite but can be terminated by mutual agreement at any time. If you decide you no longer want to continue with the agreement, we can negotiate the termination. The idea is that it\'s a mutually beneficial long-term relationship.'
        },
        {
          question: 'What level of quality can I expect?',
          answer: 'Exactly the same as in any paid project. My reputation depends on delivering quality products. Moreover, my financial incentive is aligned with your success: the better the app, the more profits it will generate and the more I will earn.'
        },
        {
          question: 'Is this model legal in Spain?',
          answer: 'Yes, completely legal. It\'s based on the "Joint Venture Accounts" structure of the Spanish Commercial Code (articles 239-243), an established and regulated form of economic collaboration. It doesn\'t require registration in any public registry.'
        },
        {
          question: 'What projects are eligible for this model?',
          answer: 'Projects with a clear business model that allows generating measurable income: apps with subscriptions, marketplaces, SaaS, e-commerce, etc. It\'s not suitable for projects without defined monetization or internal company applications.'
        },
        {
          question: 'Who pays for servers and technical costs?',
          answer: 'You assume infrastructure costs (domain, servers, APIs), but don\'t worry: they\'re usually minimal. Platforms like Firebase or Supabase have very generous free tiers. A real project like laporrita.es cost ~€11 to start (domain) and currently runs at €0-2/month. Costs only scale when your app grows — and by then you\'ll have revenue.'
        },
        {
          question: 'Do you handle marketing or business model?',
          answer: 'No, I specialize only in software development. The business model, marketing, user acquisition, graphic design and content are your responsibility. My job is to turn your vision into a functional, quality technical product.'
        }
      ]
    },
    footer: {
      interested: 'Interested in this collaboration model?',
      close: 'Close',
      schedule: 'Schedule Meeting'
    }
  }
};
