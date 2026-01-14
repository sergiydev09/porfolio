# Portfolio Profesional - Sergiy Alonso

## Documento de Requisitos Funcionales

---

## 1. Visión General

Portfolio web profesional para posicionar y vender servicios como:
- **Programador Senior/Staff**
- **CTO (Chief Technology Officer)**
- **CCO (Chief Commercial Officer)**
- **Chapter Lead / Engineering Manager**

**Estructura simplificada:**
- **1 página pública** (`/`) → Landing completa con scroll (servicios, portfolio, contacto)
- **1 página privada** (`/admin`) → Dashboard admin con KPIs y gestión de leads

---

## 2. Arquitectura del Sistema

### 2.1 Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Framework | **SvelteKit** | SSR/SSG, SEO perfecto, animaciones nativas |
| Styling | **Tailwind CSS** | Utility-first, rápido desarrollo |
| Animaciones | **Svelte nativo** | `transition:`, `animate:`, `spring`, `tweened` |
| Animaciones 3D | **Threlte** (Three.js para Svelte) | Opcional para hero |
| Backend/Auth | **Supabase** | Auth, PostgreSQL, Realtime subscriptions |
| Hosting | **Vercel / Netlify** | Edge functions, deploy automático |
| Analytics | **Supabase + Custom** | KPIs propios sin dependencia de terceros |

### 2.2 Arquitectura de Alto Nivel

```
┌──────────────────────────────────────────────────────────────────┐
│                         SVELTEKIT                                 │
│  ┌────────────────────────┐    ┌──────────────────────────────┐  │
│  │   / (Landing Page)     │    │   /admin (Dashboard)         │  │
│  │   ┌──────────────────┐ │    │   ┌────────────────────────┐ │  │
│  │   │ Hero             │ │    │   │ Auth Guard             │ │  │
│  │   │ Sobre mí         │ │    │   │ KPIs tiempo real       │ │  │
│  │   │ Servicios        │ │    │   │ Lista de leads         │ │  │
│  │   │ Portfolio        │ │    │   │ Gestión de estados     │ │  │
│  │   │ Contacto         │ │    │   │ Analytics              │ │  │
│  │   └──────────────────┘ │    │   └────────────────────────┘ │  │
│  └────────────────────────┘    └──────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                          SUPABASE                                 │
│  ┌──────────┐  ┌───────────┐  ┌───────────┐  ┌────────────────┐  │
│  │   Auth   │  │  Database │  │  Realtime │  │    Storage     │  │
│  │  (Admin) │  │ PostgreSQL│  │   Subs    │  │    (Media)     │  │
│  └──────────┘  └───────────┘  └───────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Zona Pública (Landing Page)

### 3.1 Hero Section

**Contenido:**
- Nombre y título profesional con animación de typing o morphing
- Tagline impactante
- CTA principal: "Hablemos" / "Ver servicios"
- Elemento visual diferenciador (partículas 3D, gradient mesh animado, o avatar 3D)

**Animaciones:**
- Entrada escalonada de elementos (stagger)
- Parallax en scroll
- Rotación de roles (CTO, Tech Lead, Engineering Manager...)

### 3.2 Sobre Mí

**Contenido:**
- Historia profesional resumida
- Valores y forma de trabajo
- Foto profesional con efecto hover
- Stats animados (años experiencia, proyectos, empresas)

**Animaciones:**
- Reveal on scroll (IntersectionObserver)
- Counter animation para stats con `tweened()`
- Timeline interactivo de carrera

### 3.3 Servicios

**Estructura de cada servicio:**
```typescript
interface Service {
  id: string;
  title: string;           // "CTO as a Service"
  subtitle: string;        // "Liderazgo técnico para tu startup"
  description: string;
  icon: string;
  benefits: string[];
  targetAudience: string;  // "Startups en fase seed/series A"
  deliverables: string[];
  pricing?: {
    type: 'hourly' | 'monthly' | 'project';
    range?: string;        // "Desde 150€/h"
  };
}
```

**Servicios a mostrar:**
1. **CTO as a Service** - Liderazgo técnico externo
2. **Consultoría Técnica** - Auditorías, arquitectura, code reviews
3. **Chapter Lead / Engineering Manager** - Gestión de equipos
4. **Desarrollo Senior** - Implementación de proyectos complejos
5. **Mentoría Técnica** - 1:1 para developers

**Animaciones:**
- Cards con hover 3D (tilt effect)
- Stagger reveal al hacer scroll
- Iconos animados

### 3.4 Portfolio / Casos de Éxito

**Estructura:**
```typescript
interface Project {
  id: string;
  title: string;
  company: string;
  role: string;
  period: string;
  thumbnail: string;
  technologies: string[];
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    avatar?: string;
  };
  isPublic: boolean;
  featured: boolean;
}
```

**Animaciones:**
- Grid con animación de entrada escalonada
- Hover effects en cards
- Resultados con métricas destacadas

### 3.5 Contacto

**Formulario:**
```typescript
interface ContactForm {
  name: string;
  email: string;
  company?: string;
  serviceInterest: ServiceType[];
  budget?: BudgetRange;
  timeline?: string;
  message: string;
  howDidYouFind?: string;
}

type BudgetRange =
  | 'under_5k'
  | '5k_15k'
  | '15k_50k'
  | 'over_50k'
  | 'ongoing_retainer';
```

**Funcionalidad:**
- Validación en tiempo real
- Guardado en Supabase
- Email de confirmación automático
- Notificación push/email al admin
- Protección anti-spam (honeypot + rate limiting)

**Animaciones:**
- Input focus animations
- Success state con check animado
- Shake en errores

---

## 4. Zona Privada (Admin Dashboard)

### 4.1 Autenticación

- Login solo para ti (email único autorizado)
- Supabase Auth con Magic Link o OAuth (Google/GitHub)
- Middleware de protección de rutas
- Session management

### 4.2 Dashboard Principal

**KPIs en tiempo real:**
```typescript
interface DashboardKPIs {
  // Tráfico
  visitorsToday: number;
  visitorsThisWeek: number;
  visitorsThisMonth: number;
  uniqueVisitors: number;

  // Engagement
  avgTimeOnSite: number;
  bounceRate: number;
  mostViewedPages: PageView[];

  // Conversión
  contactRequests: number;
  conversionRate: number;
  leadsByService: Record<ServiceType, number>;

  // Tendencias
  visitorsTrend: TrendData[];
  leadsTrend: TrendData[];
}
```

**Visualización:**
- Cards con números grandes y tendencias (↑↓)
- Gráficos de línea para evolución temporal
- Gráficos de barras para comparativas

### 4.3 Gestión de Leads/Contactos

**Lista de contactos:**
```typescript
interface Lead {
  id: string;
  createdAt: Date;

  // Datos del formulario
  name: string;
  email: string;
  company?: string;
  servicesInterested: ServiceType[];
  budget?: BudgetRange;
  message: string;

  // Tracking
  source?: string;          // UTM source
  landingPage: string;
  device: string;
  country?: string;

  // Gestión
  status: LeadStatus;
  notes: string;
  followUpDate?: Date;
  assignedValue?: number;   // Valor estimado del deal
}

type LeadStatus =
  | 'new'           // Nuevo, sin revisar
  | 'contacted'     // Ya contactado
  | 'in_progress'   // En negociación
  | 'won'           // Convertido a cliente
  | 'lost'          // No convertido
  | 'spam';         // Spam/no válido
```

**Funcionalidades:**
- Tabla con filtros y búsqueda
- Cambio de estado con dropdown
- Vista detalle de cada lead
- Añadir notas internas
- Marcar follow-up con reminder
- Exportar a CSV

**Realtime:**
- Notificación instantánea de nuevo lead
- Badge de "nuevos sin leer"

---

## 5. Base de Datos (Supabase)

### 5.1 Esquema de Tablas

```sql
-- Leads/Contactos
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  services_interested TEXT[],
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  how_found TEXT,

  -- Tracking
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  landing_page TEXT,
  user_agent TEXT,
  ip_country TEXT,

  -- Gestión
  status TEXT DEFAULT 'new',
  notes TEXT,
  follow_up_date DATE,
  estimated_value DECIMAL,

  -- Soft delete
  archived BOOLEAN DEFAULT FALSE
);

-- Analytics de páginas
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  page_path TEXT NOT NULL,
  session_id TEXT,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  screen_size TEXT,
  country TEXT,
  duration_seconds INTEGER
);

-- Proyectos del portfolio
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT,
  role TEXT,
  period TEXT,
  thumbnail_url TEXT,
  technologies TEXT[],
  challenge TEXT,
  solution TEXT,
  results JSONB,
  testimonial JSONB,

  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0
);

-- Servicios
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  benefits TEXT[],
  target_audience TEXT,
  deliverables TEXT[],
  pricing_type TEXT,
  pricing_range TEXT,

  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);
```

### 5.2 Row Level Security (RLS)

```sql
-- Leads: insert público, todo lo demás solo admin
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for anyone" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all for admin" ON leads
  FOR ALL USING (auth.jwt() ->> 'email' = 'tu-email@dominio.com');
```

### 5.3 Realtime Subscriptions

```svelte
<!-- En +page.svelte del admin -->
<script>
  import { supabase } from '$lib/supabase';
  import { onMount, onDestroy } from 'svelte';
  import { leads } from '$lib/stores/leads';

  let channel;

  onMount(() => {
    channel = supabase
      .channel('leads')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          leads.add(payload.new);
          showNotification('Nuevo lead!', payload.new.name);
        }
      )
      .subscribe();
  });

  onDestroy(() => channel?.unsubscribe());
</script>
```

---

## 6. Animaciones Detalladas (Svelte Nativo)

### 6.1 Micro-interacciones

| Elemento | Animación | Implementación |
|----------|-----------|----------------|
| Botones | Scale + color en hover | `transition:scale` + CSS |
| Links | Underline animated | CSS |
| Cards | Tilt 3D en hover | `use:tilt` action |
| Inputs | Border glow en focus | CSS + `transition:` |
| Switches | Spring physics | `spring()` store |
| Tooltips | Fade + scale | `transition:fade\|scale` |

```svelte
<!-- Ejemplo: Botón con spring -->
<script>
  import { spring } from 'svelte/motion';
  const scale = spring(1, { stiffness: 0.3, damping: 0.6 });
</script>

<button
  on:mouseenter={() => scale.set(1.05)}
  on:mouseleave={() => scale.set(1)}
  style="transform: scale({$scale})"
>
  Hover me
</button>
```

### 6.2 Scroll Animations

| Sección | Efecto |
|---------|--------|
| Hero | Parallax layers, fade out on scroll |
| Stats | Counter animation al entrar en viewport |
| Servicios | Stagger reveal de cards |
| Portfolio | Grid con entrada escalonada |
| Testimonios | Slide carousel |

### 6.3 Page Transitions

```svelte
<!-- +layout.svelte -->
<script>
  import { fly } from 'svelte/transition';
  import { page } from '$app/stores';
</script>

{#key $page.url.pathname}
  <main in:fly={{ y: 20, duration: 300 }} out:fly={{ y: -20, duration: 200 }}>
    <slot />
  </main>
{/key}
```

### 6.4 Efectos Especiales (Hero)

**Opción A: Gradient Mesh Animado**
- Fondo con gradientes que se mueven suavemente
- CSS puro + `tweened()` stores
- Bajo consumo de recursos

**Opción B: Partículas Interactivas**
- Partículas que reaccionan al cursor
- **Threlte** (Three.js para Svelte) o svelte-particles

**Opción C: Blob Morphing**
- Formas orgánicas que mutan
- SVG animado con `tweened()` + d3-interpolate

---

## 7. SEO y Performance

### 7.1 SEO

```svelte
<!-- +page.svelte -->
<svelte:head>
  <title>Sergiy Alonso | CTO & Tech Leader</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:image" content="..." />
  <link rel="canonical" href="https://sergiyalonso.com" />
</svelte:head>
```

- Meta tags dinámicos con `<svelte:head>`
- Open Graph para redes sociales
- Schema.org markup (Person, Service, Organization)
- Sitemap.xml
- robots.txt en `/static/`

### 7.2 Performance

- Imágenes optimizadas con `@sveltejs/enhanced-img` o vite-imagetools
- Font optimization con `@fontsource` o preload
- Code splitting automático (SvelteKit lo hace por defecto)
- Prerender de página principal: `export const prerender = true`
- Core Web Vitals excelentes (Svelte compila a JS mínimo)

---

## 8. Fases de Desarrollo

### Fase 1: MVP (Core) ✅ COMPLETADO
- [x] Setup proyecto SvelteKit + Tailwind + Supabase
- [x] Landing con hero animado
- [x] Sección servicios
- [x] Formulario de contacto funcional
- [x] Base de datos y leads (migrations)
- [x] Admin: dashboard con KPIs y lista de leads

### Fase 2: Portfolio & Polish
- [ ] Conectar Supabase (crear proyecto, ejecutar migrations, añadir .env)
- [ ] Sección portfolio con proyectos reales
- [ ] Animaciones avanzadas (scroll, stagger, springs)
- [ ] Dashboard KPIs completo con gráficos
- [ ] Analytics propios
- [ ] Realtime notifications

### Fase 3: Extras
- [ ] Auth para admin con Supabase
- [ ] Blog con mdsvex (MDX para Svelte)
- [ ] Notificaciones push
- [ ] Multi-idioma (ES/EN)

---

## 9. Estructura de Carpetas

```
sergiyalonso/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Landing pública
│   │   ├── +layout.svelte        # Layout global
│   │   ├── admin/+page.svelte    # Dashboard admin
│   │   └── api/contact/+server.ts
│   ├── lib/
│   │   ├── components/
│   │   │   ├── sections/         # Hero, About, Services, Portfolio, Contact, Footer
│   │   │   ├── ui/               # Nav, Button, Card, Input...
│   │   │   └── admin/            # KPICard, LeadsTable...
│   │   ├── supabase.ts           # Cliente Supabase
│   │   ├── stores/               # Svelte stores
│   │   ├── types/database.ts     # Tipos TypeScript para DB
│   │   └── utils/
│   └── app.css                   # Tailwind + estilos globales
├── static/
│   └── images/
├── supabase/
│   └── migrations/               # SQL para crear tablas
├── svelte.config.js
├── tailwind.config.js
└── package.json
```

---

## 10. Comandos

```bash
# Desarrollo
npm run dev          # Servidor en localhost:5173

# Build
npm run build        # Compilar para producción
npm run preview      # Previsualizar build

# Calidad
npm run check        # Type check
npm run lint         # ESLint
npm run format       # Prettier
```

---

*Documento creado: Enero 2026*
*Última actualización: Enero 2026*
