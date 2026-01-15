# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio web profesional de Sergiy Alonso para ofrecer servicios de CTO, Tech Lead, Engineering Manager y desarrollo senior.

**Estructura:**
- **Landing pública** (`/`) - Portfolio con secciones: Hero, Sobre mí, Servicios, Portfolio, Contacto
- **Dashboard admin** (`/admin`) - Gestión de leads y KPIs en tiempo real

**Este proyecto demuestra desarrollo asistido por IA** con un plugin completo de Claude Code.

## Tech Stack

- **Framework**: SvelteKit 2+ con Svelte 5 (runes)
- **Styling**: Tailwind CSS
- **Animaciones**: Svelte nativo (`transition:`, `spring`, `tweened`)
- **Backend**: Firebase (Auth, Firestore)
- **Language**: TypeScript
- **Package Manager**: Bun (ultra-fast)

## Commands

```bash
bun run dev --port 8080  # Start dev server (SIEMPRE en puerto 8080)
bun run build            # Build for production
bun run check            # Type check
bun run format           # Prettier
bun install              # Install dependencies (~4s vs ~30s npm)
```

> **IMPORTANTE**: Siempre usar puerto 8080 para desarrollo y pruebas.

---

## Comandos, Agentes y Skills

Configuracion local en `.claude/`:

```
.claude/
├── commands/
│   └── commit.md           # /commit - Commit seguro con versionado
├── agents/
│   ├── ux-ui.md            # UX/UI, animaciones, accesibilidad
│   ├── testing.md          # Vitest, Playwright, TDD
│   ├── sveltekit.md        # Routing, SSR, Firebase, Svelte 5
│   └── security-reviewer.md # Secretos, vulnerabilidades
└── skills/
    └── secure-commit/
        └── SKILL.md        # Deteccion de secretos
```

### Comando `/commit`

Ejecuta un commit seguro:
1. **Detecta secretos** - BLOQUEA si encuentra API keys, tokens, passwords
2. **Analiza cambios** - Determina si es fix/feat/docs
3. **Incrementa version** - patch (fix) o minor (feat)
4. **Genera mensaje** - Formato convencional: `feat: add feature`
5. **Ejecuta commit**

### Agentes Disponibles

| Agente | Especialidad |
|--------|--------------|
| `ux-ui` | Diseno, animaciones, accesibilidad |
| `testing` | Vitest, Playwright, TDD |
| `sveltekit` | Routing, SSR, Firebase, Svelte 5 |
| `security-reviewer` | Secretos, vulnerabilidades |

---

## Svelte 5 (IMPORTANTE)

```svelte
<script lang="ts">
  // ✅ Svelte 5
  let count = $state(0);
  let doubled = $derived(count * 2);
  let { title } = $props();

  // ❌ NO usar Svelte 4
</script>

<!-- ✅ Svelte 5 -->
<button onclick={() => count++}>
```

---

## Animaciones

```svelte
<script>
  import { fly, fade } from 'svelte/transition';
  import { spring } from 'svelte/motion';
</script>

<div in:fly={{ y: 20, duration: 300 }} out:fade>
```

---

## Firebase

```bash
# .env
PUBLIC_FIREBASE_API_KEY=AIzaSy...
PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=project-id
PUBLIC_FIREBASE_STORAGE_BUCKET=project.firebasestorage.app
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
PUBLIC_FIREBASE_APP_ID=1:123:web:abc
```

Security Rules en `firestore.rules`.

---

## Design System

```
Colors: primary-400/500/600, dark-900/950, dark-100/300/400
Components: .btn-primary, .card, .card-hover, .input, .heading-1/2/3
```

---

## Seguridad del Commit

`/commit` **BLOQUEA** si detecta:
- `-----BEGIN PRIVATE KEY-----`
- `AKIA...` (AWS)
- `ghp_...`, `github_pat_...` (GitHub)
- `sk_live_...` (Stripe)
- `eyJ...` (JWT tokens)
- Archivos `.env`, `credentials.json`

**Solución:** Mover a `.env` (gitignored) y usar `import.meta.env.PUBLIC_*`
