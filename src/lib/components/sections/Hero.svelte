<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let visible = $state(false);
  let activeService = $state<string | null>(null);

  const services = [
    {
      id: 'leadership',
      icon: '👔',
      title: 'Liderazgo',
      subtitle: 'CTO & Chapter Lead',
      description: 'Dirección técnica para startups y empresas en crecimiento',
      details: ['Arquitectura y roadmap', 'Hiring y equipos', 'Mentoring leads'],
      color: '#3b82f6'
    },
    {
      id: 'mobile',
      icon: '📱',
      title: 'Mobile',
      subtitle: 'Android · Flutter · KMP',
      description: 'Apps nativas y multiplataforma de alto rendimiento',
      details: ['Android + Kotlin', 'Flutter cross-platform', 'KMP shared logic'],
      color: '#22c55e'
    },
    {
      id: 'cloud',
      icon: '☁️',
      title: 'Cloud',
      subtitle: 'Firebase · Supabase',
      description: 'Backend serverless y bases de datos en tiempo real',
      details: ['Auth & Firestore', 'PostgreSQL & Realtime', 'Edge Functions'],
      color: '#f97316'
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'IA',
      subtitle: 'LLMs · MCP · Self-Hosted',
      description: 'Integración de IA en productos y equipos',
      details: ['Automatizaciones LLM', 'MCP Servers', 'Modelos self-hosted'],
      color: '#ec4899',
      highlight: true
    },
    {
      id: 'web',
      icon: '🖥️',
      title: 'Web & Desktop',
      subtitle: 'Flutter · Compose',
      description: 'Aplicaciones multiplataforma desde un solo codebase',
      details: ['Flutter Web/Desktop', 'Compose Multiplatform', 'PWAs'],
      color: '#a855f7'
    },
    {
      id: 'scripting',
      icon: '⚡',
      title: 'Scripting',
      subtitle: 'TypeScript · Python',
      description: 'Automatización y tooling para equipos',
      details: ['CLIs y tooling', 'CI/CD pipelines', 'Data processing'],
      color: '#eab308'
    },
    {
      id: 'mentoring',
      icon: '🎓',
      title: 'Mentoring',
      subtitle: 'Android · Flutter · KMP',
      description: 'Formación personalizada para developers',
      details: ['Sesiones 1:1', 'Workshops equipos', 'Career coaching'],
      color: '#06b6d4'
    }
  ];

  function handleHover(serviceId: string) {
    activeService = serviceId;
  }

  function handleLeave() {
    activeService = null;
  }

  onMount(() => {
    visible = true;
  });
</script>

<section id="hero" class="relative min-h-screen overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"></div>
  <div class="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-500/10 blur-3xl"></div>
  <div class="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-600/10 blur-3xl animation-delay-1000"></div>

  <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-12">
    {#if visible}
      <div class="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        <!-- Left: Profile -->
        <div
          class="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
          in:fly={{ x: -40, duration: 800 }}
        >
          <div class="relative mb-6">
            <div class="absolute -inset-1 animate-gradient rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 opacity-75 blur-sm"></div>
            <div class="absolute -inset-1 animate-gradient rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"></div>
            <div class="relative h-28 w-28 overflow-hidden rounded-full border-4 border-dark-900 md:h-36 md:w-36">
              <img src="/images/profile.jpg" alt="Sergiy Alonso" class="h-full w-full object-cover" />
            </div>
          </div>

          <span class="mb-3 inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400">
            Disponible para proyectos
          </span>

          <h1 class="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Sergiy Alonso
          </h1>

          <p class="mb-4 text-lg text-primary-400 md:text-xl">
            Tech Lead & Mobile Specialist
          </p>

          <p class="mb-6 max-w-md text-sm text-dark-300 md:text-base">
            Ayudo a empresas y startups a construir productos tecnológicos escalables
            y acelerar su transformación digital con IA.
          </p>

          <div class="flex gap-3">
            <a href="#contacto" class="btn-primary text-sm">Hablemos</a>
            <a href="#sobre-mi" class="btn-secondary text-sm">Más sobre mí</a>
          </div>
        </div>

        <!-- Right: Vertical Comic-style Services List -->
        <div
          class="comic-list"
          in:fly={{ x: 40, duration: 800, delay: 200 }}
          role="region"
          aria-label="Servicios"
          onmouseleave={handleLeave}
        >
          {#each services as service, i}
            {@const isActive = activeService === service.id}
            <div
              class="comic-item"
              class:is-active={isActive}
              class:highlight={service.highlight}
              style="--item-color: {service.color};"
              onmouseenter={() => handleHover(service.id)}
              onfocus={() => handleHover(service.id)}
              role="button"
              tabindex="0"
              onkeydown={(e) => e.key === 'Enter' && handleHover(service.id)}
              in:fly={{ x: 30, duration: 400, delay: 300 + i * 60, easing: quintOut }}
            >
              <!-- Header: always visible -->
              <div class="item-header">
                <span class="item-icon">{service.icon}</span>
                <div class="item-titles">
                  <span class="item-title">
                    {service.title}
                    {#if service.highlight}
                      <span class="item-badge">HOT</span>
                    {/if}
                  </span>
                  <span class="item-subtitle">{service.subtitle}</span>
                </div>
              </div>

              <!-- Expandable content -->
              <div class="item-content">
                <div class="item-content-inner">
                  <p class="item-description">{service.description}</p>
                  <ul class="item-details">
                    {#each service.details as detail}
                      <li>→ {detail}</li>
                    {/each}
                  </ul>
                  <a href="#contacto" class="item-cta">Contactar</a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }

  @keyframes gradient-rotate {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-rotate 3s ease infinite;
  }

  /* Comic List Container - Vertical */
  .comic-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    position: relative;
  }

  @media (min-width: 1024px) {
    .comic-list {
      margin: 0;
      max-width: 500px;
    }
  }

  /* Comic Item - Each service row */
  .comic-item {
    position: relative;
    padding: 16px 24px;
    cursor: pointer;
    background: transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: visible;
  }

  /* Diagonal background - skewed pseudo element */
  .comic-item::before {
    content: '';
    position: absolute;
    inset: 2px 0;
    background: rgba(15, 23, 42, 0.5);
    transform: skewY(-1.5deg);
    transform-origin: left;
    z-index: -1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Diagonal separator line */
  .comic-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.2) 20%, rgba(148, 163, 184, 0.2) 80%, transparent);
    transform: skewY(-2deg);
    transform-origin: center;
  }

  .comic-item:last-child::after {
    display: none;
  }

  /* Hover & Active state */
  .comic-item:hover::before,
  .comic-item.is-active::before {
    background: rgba(30, 41, 59, 0.85);
    transform: skewY(-2deg);
    box-shadow:
      0 4px 30px color-mix(in srgb, var(--item-color) 15%, transparent),
      inset 0 0 30px color-mix(in srgb, var(--item-color) 8%, transparent);
  }

  .comic-item.highlight::before {
    background: rgba(25, 35, 52, 0.6);
  }

  .comic-item.highlight:hover::before,
  .comic-item.highlight.is-active::before {
    background: rgba(45, 55, 75, 0.9);
  }

  /* Item header - always visible */
  .item-header {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .item-titles {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .item-subtitle {
    font-size: 0.8rem;
    color: rgb(148, 163, 184);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .comic-item.is-active .item-subtitle {
    opacity: 1;
    max-height: 24px;
  }

  /* Expandable content - hidden by default */
  .item-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .item-content-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
  }

  .comic-item.is-active .item-content {
    grid-template-rows: 1fr;
  }

  .comic-item.is-active .item-content-inner {
    opacity: 1;
  }

  .item-description {
    font-size: 0.85rem;
    color: rgb(203, 213, 225);
    line-height: 1.4;
    padding-left: 44px;
    margin-bottom: 8px;
  }

  .item-details {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-left: 44px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
  }

  .item-details li {
    font-size: 0.8rem;
    color: rgb(148, 163, 184);
  }

  .item-cta {
    display: inline-block;
    width: fit-content;
    margin-left: 44px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--item-color);
    text-decoration: none;
    padding: 6px 14px;
    border: 1px solid var(--item-color);
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .item-cta:hover {
    background: color-mix(in srgb, var(--item-color) 15%, transparent);
  }

  /* Item content */
  .item-icon {
    font-size: 1.75rem;
    transition: transform 0.3s ease;
    flex-shrink: 0;
    width: 30px;
    text-align: center;
  }

  .comic-item:hover .item-icon,
  .comic-item.is-active .item-icon {
    transform: scale(1.15) rotate(-3deg);
  }

  .item-title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-badge {
    background: linear-gradient(135deg, rgb(239, 68, 68), rgb(248, 113, 113));
    color: white;
    font-size: 0.55rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    animation: pulse-badge 2s ease-in-out infinite;
  }

  @keyframes pulse-badge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .comic-list {
      max-width: 420px;
    }
    .item-icon { font-size: 1.5rem; }
    .item-title { font-size: 0.95rem; }
    .item-description { font-size: 0.8rem; }
    .item-details li { font-size: 0.75rem; }
  }

  @media (max-width: 768px) {
    .comic-list {
      max-width: 100%;
    }

    .comic-item {
      padding: 14px 18px;
    }

    .item-icon { font-size: 1.4rem; width: 26px; }
    .item-title { font-size: 0.9rem; }
    .item-badge { font-size: 0.5rem; padding: 2px 5px; }
    .item-description { padding-left: 40px; }
    .item-details { padding-left: 40px; }
    .item-cta { margin-left: 40px; }
  }

  @media (max-width: 640px) {
    .comic-item {
      padding: 12px 14px;
    }

    .item-icon { font-size: 1.25rem; width: 24px; }
    .item-title { font-size: 0.85rem; }
    .item-subtitle { font-size: 0.7rem; }
    .item-description { font-size: 0.75rem; padding-left: 38px; }
    .item-details li { font-size: 0.7rem; }
    .item-details { padding-left: 38px; }
    .item-cta { margin-left: 38px; font-size: 0.7rem; }
  }
</style>
