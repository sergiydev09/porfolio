# Portfolio Profesional - Sergiy Alonso

## Documento de Requisitos Funcionales

**Versión:** 2.0
**Última actualización:** Enero 2026

---

## 1. Visión General

Portfolio web profesional para posicionar y vender servicios como:
- **Tech Lead / Programador Senior**
- **CTO (Chief Technology Officer)**
- **Engineering Manager / Chapter Lead**
- **Especialista en IA y Automatización**

**Estructura:**
- **Landing pública** (`/`) → Portfolio completo con chatbot IA y sistema de reservas
- **Panel admin** (`/admin`) → Dashboard con gestión de leads y reuniones

**URL de producción:** https://savaitech.web.app

---

## 2. Arquitectura del Sistema

### 2.1 Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Framework | **SvelteKit 2+ / Svelte 5** | SSG, SEO perfecto, runes reactivity |
| Styling | **Tailwind CSS** | Utility-first, desarrollo rápido |
| Animaciones | **Svelte nativo** | `transition:`, `spring`, `tweened` |
| Backend | **Firebase** | Firestore, Functions, Hosting, Auth |
| LLM | **OpenRouter** | Acceso a modelos gratuitos (Gemma, Llama, DeepSeek) |
| Calendar | **Google Calendar API** | Creación automática de eventos + Google Meet |
| Package Manager | **Bun** | Ultra-rápido (~4s vs ~30s npm) |
| Testing | **Vitest** | Unit tests para lógica de booking |

### 2.2 Arquitectura de Alto Nivel

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              SVELTEKIT                                    │
│  ┌─────────────────────────────┐    ┌──────────────────────────────────┐ │
│  │   / (Landing Page)          │    │   /admin (Dashboard)             │ │
│  │   ┌───────────────────────┐ │    │   ┌────────────────────────────┐ │ │
│  │   │ Hero + Profile        │ │    │   │ Auth Guard (Supabase)      │ │ │
│  │   │ Services (tabs)       │ │    │   │ /admin/leads               │ │ │
│  │   │ Process + Philosophy  │ │    │   │ /admin/meetings            │ │ │
│  │   │ ChatBot (IA)          │ │    │   │ /admin/login               │ │ │
│  │   │ SchedulingPanel       │ │    │   └────────────────────────────┘ │ │
│  │   │ Tech Marquee          │ │    └──────────────────────────────────┘ │
│  │   └───────────────────────┘ │                                         │
│  └─────────────────────────────┘                                         │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────────┐
│    FIREBASE      │    │   OPENROUTER     │    │   GOOGLE CALENDAR API    │
│  ┌────────────┐  │    │                  │    │                          │
│  │ Firestore  │  │    │  Gemma 3 27B     │    │  Crear eventos           │
│  │  - meets   │  │    │  Llama 3.3 70B   │    │  Google Meet links       │
│  │  - leads   │  │    │  DeepSeek R1     │    │  Invitaciones email      │
│  ├────────────┤  │    │  Nemotron        │    │                          │
│  │ Functions  │  │    └──────────────────┘    └──────────────────────────┘
│  │  - chat    │  │
│  │  - calendar│  │
│  ├────────────┤  │
│  │ Hosting    │  │
│  └────────────┘  │
└──────────────────┘
```

---

## 3. Funcionalidades Implementadas

### 3.1 Chatbot con IA ✅

**Descripción:**
Asistente virtual que responde preguntas sobre Sergiy y sus servicios, y permite agendar reuniones de forma conversacional.

**Características:**
- Integración con OpenRouter (modelos gratuitos)
- Selector de modelo: Gemma 3 27B, Llama 3.3 70B, DeepSeek R1, Nemotron
- System prompt con contexto completo de servicios
- Disponibilidad en tiempo real inyectada en el prompt
- Booking conversacional guiado paso a paso

**Modelos disponibles:**
```typescript
const ALLOWED_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'deepseek/deepseek-r1-0528:free',
  'google/gemma-3-27b-it:free',
  'nvidia/nemotron-3-nano-30b-a3b:free'
];
```

**Flujo de booking via chat:**
1. Usuario expresa intención de agendar
2. Bot pregunta: nombre → email → objetivo → fecha → hora
3. Disponibilidad verificada contra Firestore en tiempo real
4. Marcador `[BOOKING_DATA]{...}[/BOOKING_DATA]` generado por el LLM
5. Backend procesa, crea evento en Google Calendar
6. Usuario recibe invitación con link de Google Meet

### 3.2 Sistema de Reserva de Reuniones ✅

**Calendario Visual (SchedulingPanel):**
- Calendario mensual interactivo
- Slots de 15 minutos (8:00 - 21:00 hora Madrid)
- Estados visuales: Disponible (verde), Ocupado (rojo), Fuera de horario (gris)
- Actualización en tiempo real con Firestore `onSnapshot`
- Bloqueo de 7 slots por reunión (evita overlaps de 1 hora)

**Validaciones:**
- Fechas pasadas bloqueadas
- Horario laboral: 8:00 - 21:00 (última reunión a las 20:00)
- Detección de conflictos con reuniones existentes
- Conversión correcta UTC ↔ Madrid (CET/CEST)

**Datos de reunión:**
```typescript
interface Meet {
  id: string;
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

### 3.3 Integración Google Calendar ✅

**Funcionalidad:**
- Creación automática de eventos en calendario de Sergiy
- Generación de link de Google Meet
- Invitación automática al email del guest
- Reminders: email 60min antes, popup 30min antes

**Configuración OAuth:**
```bash
firebase functions:config:set \
  oauth.client_id="..." \
  oauth.client_secret="..." \
  oauth.refresh_token="..."
```

### 3.4 Landing Page ✅

**Secciones implementadas:**

| Sección | Componente | Descripción |
|---------|------------|-------------|
| Hero | `HeroSection.svelte` | Foto, nombre, rol animado, badges de empresas |
| Servicios | `ServicesPanel.svelte` | Tabs por audiencia (Startups, Scale-ups, Enterprise) |
| Proceso | `ProcessSection.svelte` | Timeline de 4 pasos con badges "GRATIS" |
| Filosofía | `PhilosophySection.svelte` | Valores: Pragmático, Comunicación, Calidad |
| Chat | `ChatBot.svelte` | Chatbot IA con selector de modelo |
| Calendario | `SchedulingPanel.svelte` | Reserva visual de reuniones |
| Footer | `TechMarquee.svelte` | Marquee infinito con logos de tecnologías |

**i18n (Multiidioma):**
- Español (ES) y English (EN)
- Toggle en la UI
- Textos centralizados por componente

### 3.5 Panel de Administración ✅

**Rutas:**
- `/admin/login` - Autenticación con Supabase
- `/admin/leads` - Gestión de leads del formulario de contacto
- `/admin/meetings` - Gestión de reuniones agendadas

**Autenticación:**
- Supabase Auth con email/password
- Protección de rutas con layout guard
- Solo email autorizado puede acceder

---

## 4. Base de Datos (Firestore)

### 4.1 Colecciones

```typescript
// Colección: meets
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
  cancelled_at: Timestamp | null;
  cancellation_reason: string | null;
  admin_notes: string | null;
  source: 'chatbot' | 'calendar';
  created_at: Timestamp;
  updated_at: Timestamp;
}

// Colección: leads
{
  name: string;
  email: string;
  company: string | null;
  message: string;
  services_interested: string[];
  source: string | null;
  status: 'new' | 'contacted' | 'converted' | 'spam';
  created_at: Timestamp;
}
```

### 4.2 Índices

```
meets: start_time ASC (para queries por rango de fecha)
leads: created_at DESC (para listar recientes)
```

---

## 5. Firebase Functions

### 5.1 Endpoints

| Función | Método | Descripción |
|---------|--------|-------------|
| `chat` | POST | Procesa mensajes del chatbot, detecta booking |
| `createCalendarEvent` | POST | Crea evento en Google Calendar |

### 5.2 Lógica de Chat

```typescript
// Flujo simplificado
1. Recibir mensajes del usuario
2. Fetch disponibilidad próximos 14 días
3. Inyectar disponibilidad en system prompt
4. Llamar a OpenRouter con modelo seleccionado
5. Detectar marcador [BOOKING_DATA]...[/BOOKING_DATA]
6. Si existe: crear reunión en Firestore + Google Calendar
7. Retornar respuesta limpia (sin marcadores)
```

### 5.3 Booking Utils

Funciones de utilidad para validación de reservas:

```typescript
generateTimeSlots()      // Genera slots 8:00-20:45 cada 15min
getMadridOffset(date)    // Retorna +1 (CET) o +2 (CEST)
checkMeetingOverlap()    // Detecta conflictos
getBlockedSlots()        // Calcula 7 slots bloqueados por reunión
getAvailableSlots()      // Retorna slots libres
isValidTimeSlot()        // Valida formato HH:MM
validateBookingTime()    // Validación completa
isValidEmail()           // Regex de email
```

**Tests:** `functions/src/booking-utils.test.ts` con Vitest

---

## 6. SEO y Performance

### 6.1 SEO Implementado

- Meta tags dinámicos con `<svelte:head>`
- Open Graph para redes sociales
- Schema.org markup (Person, LocalBusiness)
- `sitemap.xml` generado estáticamente
- `robots.txt` configurado
- Canonical URLs

### 6.2 Performance

- Static Site Generation (SSG) con `adapter-static`
- Imágenes optimizadas
- Code splitting automático
- Prerender de todas las páginas públicas
- Tailwind CSS purge en producción

---

## 7. Estructura de Carpetas

```
sergiyalonso/
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # Landing pública
│   │   ├── +layout.svelte            # Layout global
│   │   ├── admin/
│   │   │   ├── +layout.svelte        # Auth guard
│   │   │   ├── +page.svelte          # Redirect
│   │   │   ├── login/+page.svelte    # Login
│   │   │   ├── leads/+page.svelte    # Gestión leads
│   │   │   └── meetings/+page.svelte # Gestión reuniones
│   │   └── api/
│   │       └── contact/+server.ts    # Formulario contacto
│   ├── lib/
│   │   ├── components/
│   │   │   ├── sections/             # Hero, Services, ChatBot, Scheduling...
│   │   │   └── ui/                   # Button, Card, Input, TechMarquee...
│   │   ├── firebase/
│   │   │   └── client.ts             # Cliente Firebase
│   │   ├── stores/                   # Svelte stores
│   │   └── types/
│   │       └── database.ts           # Tipos TypeScript
│   └── app.css                       # Tailwind + estilos
├── functions/
│   ├── src/
│   │   ├── index.ts                  # Firebase Functions (chat, calendar)
│   │   ├── booking-utils.ts          # Utilidades de booking
│   │   └── booking-utils.test.ts     # Tests
│   ├── package.json
│   └── tsconfig.json
├── static/
│   ├── images/
│   ├── sitemap.xml
│   └── robots.txt
├── .claude/
│   ├── commands/commit.md            # /commit skill
│   ├── agents/                       # Agentes especializados
│   └── skills/                       # Skills personalizados
├── firebase.json                     # Config Firebase Hosting
├── firestore.rules                   # Reglas de seguridad
├── vite.config.ts                    # Proxy para dev
└── package.json
```

---

## 8. Comandos

```bash
# Desarrollo
bun run dev              # Servidor en localhost:5173 (proxy a Functions)
bun run build            # Build para producción
bun run preview          # Preview del build

# Firebase
firebase deploy --only hosting    # Deploy solo hosting
firebase deploy --only functions  # Deploy solo functions
firebase deploy                   # Deploy todo

# Tests
cd functions && bun run test      # Tests de booking-utils

# Calidad
bun run check            # Type check
bun run format           # Prettier
```

---

## 9. Variables de Entorno

### Frontend (`.env`)
```bash
PUBLIC_FIREBASE_API_KEY=...
PUBLIC_FIREBASE_AUTH_DOMAIN=...
PUBLIC_FIREBASE_PROJECT_ID=savaitech
PUBLIC_FIREBASE_STORAGE_BUCKET=...
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
PUBLIC_FIREBASE_APP_ID=...

# Supabase (para admin auth)
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
```

### Firebase Functions Config
```bash
firebase functions:config:set \
  openrouter.api_key="sk-or-v1-..." \
  oauth.client_id="..." \
  oauth.client_secret="..." \
  oauth.refresh_token="..."
```

---

## 10. Roadmap

### Completado ✅
- [x] Landing con hero, servicios, proceso, filosofía
- [x] Chatbot con IA (OpenRouter)
- [x] Sistema de reserva de reuniones
- [x] Calendario visual con slots de 15 min
- [x] Integración Google Calendar + Meet
- [x] Realtime updates con Firestore
- [x] Panel admin con auth
- [x] i18n (ES/EN)
- [x] SEO completo
- [x] Deploy a producción

### Pendiente 📋
- [ ] Analytics propios (page views, conversiones)
- [ ] Notificaciones push de nuevos leads
- [ ] Blog con mdsvex
- [ ] Portfolio de proyectos detallado
- [ ] Rate limiting en chatbot
- [ ] Fallback a otro proveedor LLM si OpenRouter falla

---

## 11. Límites y Consideraciones

### OpenRouter (Plan Gratuito)
- **50 requests/día** para modelos gratuitos
- Reset diario a las 00:00 UTC
- Solución: Añadir créditos ($10 = 1000 req/día) o fallback

### Google Calendar API
- Requiere OAuth refresh token
- Límite: 1M queries/día (más que suficiente)

### Firebase (Plan Spark/Blaze)
- Firestore: 50K lecturas/día gratis
- Functions: 2M invocaciones/mes gratis
- Hosting: 10GB/mes gratis

---

*Documento actualizado: Enero 2026*
*Versión del proyecto: 0.2.1*
