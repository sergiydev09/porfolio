# Sergiy Alonso - Professional Portfolio

> AI-powered portfolio with chatbot and meeting booking system

**Live:** https://savaitech.web.app

---

## Overview

Professional portfolio website to showcase services as:
- **Tech Lead / Senior Developer**
- **CTO (Chief Technology Officer)**
- **Engineering Manager / Chapter Lead**
- **AI & Automation Specialist**

**Key Features:**
- AI Chatbot for answering questions and booking meetings
- Visual calendar with 15-minute slots
- Google Calendar integration with Meet links
- Real-time availability updates
- Multi-language support (ES/EN)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | SvelteKit 2+ / Svelte 5 (runes) |
| Styling | Tailwind CSS |
| Backend | Firebase (Firestore, Functions, Hosting) |
| LLM | OpenRouter (Gemma, Llama, DeepSeek) |
| Calendar | Google Calendar API |
| Package Manager | Bun |
| Testing | Vitest |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         SVELTEKIT                                │
│  ┌────────────────────────┐    ┌─────────────────────────────┐  │
│  │   / (Landing Page)     │    │   /admin (Dashboard)        │  │
│  │   - Hero + Profile     │    │   - Auth Guard              │  │
│  │   - Services (tabs)    │    │   - /admin/leads            │  │
│  │   - ChatBot (AI)       │    │   - /admin/meetings         │  │
│  │   - SchedulingPanel    │    │   - /admin/login            │  │
│  └────────────────────────┘    └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐     ┌───────────────────┐     ┌─────────────────┐
│   FIREBASE    │     │    OPENROUTER     │     │ GOOGLE CALENDAR │
│  - Firestore  │     │  - Gemma 3 27B    │     │  - Create events│
│  - Functions  │     │  - Llama 3.3 70B  │     │  - Meet links   │
│  - Hosting    │     │  - DeepSeek R1    │     │  - Invitations  │
└───────────────┘     └───────────────────┘     └─────────────────┘
```

---

## Features

### AI Chatbot

- Answers questions about services and experience
- Books meetings through natural conversation
- Multiple LLM models available (free tier)
- Real-time availability injection in prompts

**Booking Flow:**
1. User expresses intent to schedule
2. Bot collects: name → email → topic → date → time
3. Availability checked against Firestore
4. Calendar event created with Google Meet link
5. User receives email invitation

### Meeting Scheduler

- Interactive monthly calendar
- 15-minute time slots (8:00 - 21:00 Madrid time)
- Visual states: Available (green), Booked (red), Outside hours (gray)
- Real-time updates with Firestore `onSnapshot`
- 7-slot blocking per meeting (prevents 1-hour overlaps)

### Admin Panel

- `/admin/login` - Supabase authentication
- `/admin/leads` - Contact form submissions
- `/admin/meetings` - Meeting management

---

## Project Structure

```
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # Landing page
│   │   ├── admin/                    # Admin panel
│   │   └── api/contact/+server.ts    # Contact API
│   └── lib/
│       ├── components/
│       │   ├── sections/             # Hero, Services, ChatBot...
│       │   └── ui/                   # Button, Card, Input...
│       ├── firebase/client.ts        # Firebase client
│       └── types/database.ts         # TypeScript types
├── functions/
│   └── src/
│       ├── index.ts                  # Firebase Functions
│       ├── booking-utils.ts          # Booking utilities
│       └── booking-utils.test.ts     # Unit tests
├── static/
│   ├── images/
│   ├── sitemap.xml
│   └── robots.txt
└── firebase.json
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 20+)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- Firebase project with Firestore enabled
- OpenRouter API key (free tier available)
- Google Cloud project with Calendar API

### Installation

```bash
# Clone repository
git clone https://github.com/sergiydev09/porfolio.git
cd porfolio

# Install dependencies
bun install

# Install functions dependencies
cd functions && bun install && cd ..

# Copy environment variables
cp .env.example .env
# Edit .env with your values
```

### Environment Variables

**Frontend (`.env`):**
```bash
PUBLIC_FIREBASE_API_KEY=...
PUBLIC_FIREBASE_AUTH_DOMAIN=...
PUBLIC_FIREBASE_PROJECT_ID=...
PUBLIC_FIREBASE_STORAGE_BUCKET=...
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
PUBLIC_FIREBASE_APP_ID=...

# Supabase (for admin auth)
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
```

**Firebase Functions Config:**
```bash
firebase functions:config:set \
  openrouter.api_key="sk-or-v1-..." \
  oauth.client_id="..." \
  oauth.client_secret="..." \
  oauth.refresh_token="..."
```

### Development

```bash
# Start dev server (localhost:5173)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Deployment

```bash
# Deploy hosting only
firebase deploy --only hosting

# Deploy functions only
firebase deploy --only functions

# Deploy everything
firebase deploy
```

### Testing

```bash
cd functions
bun run test        # Run tests once
bun run test:watch  # Watch mode
```

---

## API Endpoints

### Firebase Functions

| Function | Method | Description |
|----------|--------|-------------|
| `chat` | POST | Process chatbot messages, detect bookings |
| `createCalendarEvent` | POST | Create Google Calendar event |

### Chat Request

```typescript
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "I want to schedule a meeting" }
  ],
  "model": "google/gemma-3-27b-it:free",
  "language": "en"
}
```

---

## Database Schema

### Firestore Collections

**`meets`** - Meeting bookings
```typescript
{
  guest_name: string;
  guest_email: string;
  meeting_objective: string;
  start_time: Timestamp;
  end_time: Timestamp;
  timezone: 'Europe/Madrid';
  meet_link: string | null;
  calendar_event_id: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  source: 'chatbot' | 'calendar';
  created_at: Timestamp;
}
```

**`leads`** - Contact form submissions
```typescript
{
  name: string;
  email: string;
  company: string | null;
  message: string;
  services_interested: string[];
  status: 'new' | 'contacted' | 'converted' | 'spam';
  created_at: Timestamp;
}
```

---

## Limits & Quotas

| Service | Limit | Notes |
|---------|-------|-------|
| OpenRouter (free) | 50 requests/day | Resets at 00:00 UTC |
| Firebase Firestore | 50K reads/day | Spark plan |
| Firebase Functions | 2M invocations/month | Spark plan |
| Firebase Hosting | 10GB/month | Spark plan |
| Google Calendar API | 1M queries/day | More than enough |

---

## Roadmap

### Completed
- [x] Landing page with hero, services, process
- [x] AI Chatbot with OpenRouter
- [x] Meeting booking system
- [x] Visual calendar with 15-min slots
- [x] Google Calendar + Meet integration
- [x] Real-time Firestore updates
- [x] Admin panel with auth
- [x] i18n (ES/EN)
- [x] SEO optimization
- [x] Production deployment

### Planned
- [ ] Custom analytics (page views, conversions)
- [ ] Push notifications for new leads
- [ ] Blog with mdsvex
- [ ] Detailed project portfolio
- [ ] Rate limiting for chatbot
- [ ] LLM provider fallback

---

## License

MIT

---

## Author

**Sergiy Alonso**
- Website: https://savaitech.web.app
- LinkedIn: [Sergiy Alonso Villar](https://www.linkedin.com/in/sergiy-alonso-villar-31bb14146)
- GitHub: [@sergiydev09](https://github.com/sergiydev09)
