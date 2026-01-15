<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let visible = $state(false);
  let sectionRef: HTMLElement;

  // Placeholder projects - these would come from Firestore in production
  const projects = [
    {
      title: 'Fintech Startup',
      role: 'CTO',
      period: '2022 - 2024',
      description:
        'Lideré el equipo técnico de 12 personas, diseñé la arquitectura cloud-native y escalamos de 0 a 100k usuarios.',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes'],
      results: [
        { metric: 'Usuarios', value: '100K+' },
        { metric: 'Uptime', value: '99.9%' },
        { metric: 'Equipo', value: '12 devs' }
      ],
      featured: true
    },
    {
      title: 'E-commerce Scale-up',
      role: 'Engineering Manager',
      period: '2020 - 2022',
      description:
        'Gestioné 3 squads de desarrollo, implementé OKRs técnicos y redujimos el time-to-market en un 40%.',
      technologies: ['React', 'Python', 'MongoDB', 'GCP', 'Terraform'],
      results: [
        { metric: 'Time to market', value: '-40%' },
        { metric: 'Squads', value: '3' },
        { metric: 'Deploys/día', value: '15+' }
      ],
      featured: true
    },
    {
      title: 'SaaS B2B Platform',
      role: 'Tech Lead',
      period: '2018 - 2020',
      description:
        'Diseñé e implementé la plataforma desde cero. Arquitectura multi-tenant con alta disponibilidad.',
      technologies: ['Vue.js', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
      results: [
        { metric: 'Clientes', value: '200+' },
        { metric: 'Tenants', value: 'Multi' },
        { metric: 'API calls/día', value: '1M+' }
      ],
      featured: true
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<section bind:this={sectionRef} id="portfolio" class="section bg-dark-900/30">
  <div class="container-wide">
    {#if visible}
      <div in:fly={{ y: 30, duration: 600 }} class="mb-16 text-center">
        <h2 class="heading-2 mb-4 text-white">Portfolio</h2>
        <p class="mx-auto max-w-2xl text-dark-400">
          Proyectos seleccionados donde he aportado valor
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each projects as project, i}
          <article
            in:fly={{ y: 30, duration: 600, delay: i * 100 }}
            class="card-hover group"
          >
            <div class="mb-4 flex items-center justify-between">
              <span class="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
                {project.role}
              </span>
              <span class="text-sm text-dark-500">{project.period}</span>
            </div>

            <h3 class="heading-3 mb-3 text-white group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>

            <p class="mb-6 text-dark-400">{project.description}</p>

            <div class="mb-6 flex flex-wrap gap-2">
              {#each project.technologies as tech}
                <span class="rounded bg-dark-800 px-2 py-1 text-xs text-dark-300">
                  {tech}
                </span>
              {/each}
            </div>

            <div class="grid grid-cols-3 gap-4 border-t border-dark-800 pt-4">
              {#each project.results as result}
                <div class="text-center">
                  <div class="text-lg font-bold text-white">{result.value}</div>
                  <div class="text-xs text-dark-500">{result.metric}</div>
                </div>
              {/each}
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>
