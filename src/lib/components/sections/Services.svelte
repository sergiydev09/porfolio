<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let visible = $state(false);
  let expandedCategory = $state<string | null>(null);

  interface Service {
    name: string;
    description?: string;
    tech?: string;
  }

  interface Category {
    id: string;
    title: string;
    icon: string;
    highlight?: boolean;
    services: Service[];
    tools?: string[];
  }

  const categories: Category[] = [
    {
      id: 'leadership',
      title: 'Liderazgo Técnico',
      icon: '👔',
      services: [
        { name: 'Chapter Lead', description: 'Liderazgo de capítulos técnicos, mentoring de desarrolladores, definición de estándares' },
        { name: 'CTO as a Service', description: 'Dirección técnica para startups, arquitectura, roadmap tecnológico, hiring' }
      ]
    },
    {
      id: 'mobile',
      title: 'Desarrollo Mobile',
      icon: '📱',
      services: [
        { name: 'Android Nativo', tech: 'Kotlin, Jetpack Compose, MVVM/MVI' },
        { name: 'Flutter', tech: 'iOS, Android, Web, Desktop desde un solo codebase' },
        { name: 'Kotlin Multiplatform (KMP)', tech: 'Lógica compartida entre plataformas, UI nativa' }
      ]
    },
    {
      id: 'web-desktop',
      title: 'Web & Desktop',
      icon: '🖥️',
      services: [
        { name: 'Flutter Web/Desktop', tech: 'Aplicaciones multiplataforma completas' },
        { name: 'KMP + Compose Multiplatform', tech: 'Apps desktop con UI compartida' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Cloud',
      icon: '☁️',
      services: [
        { name: 'Firebase', tech: 'Auth, Firestore, Cloud Functions, Storage, Analytics, Crashlytics, Remote Config' },
        { name: 'Supabase', tech: 'Auth, PostgreSQL, Realtime, Edge Functions, Storage' }
      ]
    },
    {
      id: 'scripting',
      title: 'Scripting & Automatización',
      icon: '⚡',
      services: [
        { name: 'TypeScript', tech: 'Scripts, CLIs, automatizaciones, tooling' },
        { name: 'Python', tech: 'Data processing, scripts, integraciones, ML pipelines' }
      ]
    },
    {
      id: 'ai',
      title: 'Inteligencia Artificial',
      icon: '🤖',
      highlight: true,
      services: [
        { name: 'Automatizaciones con IA', description: 'Workflows automatizados con LLMs y agentes inteligentes' },
        { name: 'Implementación IA en equipos', description: 'Integración de herramientas IA en flujos de desarrollo' },
        { name: 'Creación de MCP Servers', description: 'Desarrollo de servidores Model Context Protocol para extender LLMs' },
        { name: 'Infraestructura LLM', description: 'Diseño de racks y arquitectura para despliegue de modelos' },
        { name: 'IA Self-Hosted', description: 'Modelos open source en servidores privados: DeepSeek, Qwen3, Kimi K2, GLM-4.5' }
      ],
      tools: ['Claude Code', 'Gemini', 'GitHub Copilot', 'Cursor', 'OpenAI']
    },
    {
      id: 'mentoring',
      title: 'Mentoring & Formación',
      icon: '🎓',
      services: [
        { name: 'Android', tech: 'Kotlin, Jetpack, arquitecturas modernas, testing' },
        { name: 'Flutter', tech: 'Dart, widgets, state management, testing' },
        { name: 'KMP', tech: 'Arquitectura multiplataforma, shared logic, best practices' }
      ]
    }
  ];

  function toggleCategory(id: string) {
    expandedCategory = expandedCategory === id ? null : id;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('servicios');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section id="servicios" class="section bg-dark-900/30">
  <div class="container-wide mx-auto">
    {#if visible}
      <div class="mb-16 text-center" in:fly={{ y: 30, duration: 600 }}>
        <h2 class="heading-2 mb-4 text-white">Servicios</h2>
        <p class="mx-auto max-w-2xl text-lg text-dark-400">
          Lo que puedo hacer por ti y tu empresa
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each categories as category, i}
          <div
            class="group relative overflow-hidden rounded-2xl border transition-all duration-300
              {category.highlight
                ? 'border-primary-500/50 bg-gradient-to-br from-primary-500/10 to-dark-900/80'
                : 'border-dark-800 bg-dark-900/50 hover:border-dark-700 hover:bg-dark-900/80'}"
            in:fly={{ y: 30, duration: 500, delay: 100 + i * 80 }}
          >
            <!-- Highlight badge -->
            {#if category.highlight}
              <div class="absolute right-4 top-4">
                <span class="rounded-full bg-primary-500 px-2 py-1 text-xs font-bold text-white">
                  HOT
                </span>
              </div>
            {/if}

            <button
              class="w-full p-6 text-left"
              onclick={() => toggleCategory(category.id)}
              aria-expanded={expandedCategory === category.id}
            >
              <div class="mb-4 flex items-center gap-3">
                <span class="text-3xl">{category.icon}</span>
                <h3 class="text-xl font-semibold text-white">{category.title}</h3>
              </div>

              <div class="space-y-2">
                {#each category.services.slice(0, expandedCategory === category.id ? category.services.length : 2) as service}
                  <div class="rounded-lg bg-dark-800/50 p-3">
                    <p class="font-medium text-dark-200">{service.name}</p>
                    {#if service.tech}
                      <p class="mt-1 text-sm text-dark-400">{service.tech}</p>
                    {:else if service.description}
                      <p class="mt-1 text-sm text-dark-400">{service.description}</p>
                    {/if}
                  </div>
                {/each}

                {#if category.services.length > 2}
                  <p class="pt-2 text-center text-sm text-primary-400">
                    {expandedCategory === category.id ? 'Ver menos' : `+${category.services.length - 2} más`}
                  </p>
                {/if}
              </div>

              <!-- Tools badges for AI category -->
              {#if category.tools && expandedCategory === category.id}
                <div class="mt-4 flex flex-wrap gap-2" transition:fade={{ duration: 200 }}>
                  {#each category.tools as tool}
                    <span class="rounded-full bg-dark-700/50 px-2 py-1 text-xs text-dark-300">
                      {tool}
                    </span>
                  {/each}
                </div>
              {/if}
            </button>
          </div>
        {/each}
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center" in:fly={{ y: 30, duration: 600, delay: 800 }}>
        <p class="mb-6 text-dark-400">
          ¿No encuentras lo que buscas? Cuéntame tu proyecto
        </p>
        <a href="#contacto" class="btn-primary">
          Contactar
        </a>
      </div>
    {/if}
  </div>
</section>
