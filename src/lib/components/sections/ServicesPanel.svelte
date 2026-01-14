<script lang="ts">
  import { fly } from 'svelte/transition';

  const featuredServices = [
    {
      id: 'multiplatform',
      title: 'Multiplatform Ecosystems',
      subtitle: 'Cross-Platform',
      description: 'Unified codebases delivering native-quality apps for Android, iOS, Mac, Windows, and Web using Flutter or Kotlin Multiplatform (KMP).',
      icon: 'devices',
      gradient: 'from-indigo-600 to-blue-700',
      tags: ['Flutter', 'KMP', 'Compose']
    },
    {
      id: 'ai',
      title: 'AI Integration & Automations',
      subtitle: 'Next-Gen Tech',
      description: 'Custom implementations with Gemini, GPT-4, or private server models to automate workflows and enhance application intelligence.',
      icon: 'psychology',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      tags: ['Gemini', 'OpenAI', 'LLMs'],
      pulse: true
    }
  ];

  const regularServices = [
    {
      id: 'android',
      title: 'Native Android',
      description: 'High-performance, scalable native applications built from scratch using modern Android architectures and Kotlin.',
      icon: 'android',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-500',
      hoverBorder: 'hover:border-green-500/50'
    },
    {
      id: 'migrations',
      title: 'Migrations',
      description: 'Expertise in migrating legacy or hybrid apps (Ionic, React Native) to modern Flutter/Native architectures.',
      icon: 'transform',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      hoverBorder: 'hover:border-orange-500/50'
    },
    {
      id: 'audits',
      title: 'Code Audits',
      description: 'Deep dive into codebase health, architecture review, and refactoring strategies.',
      icon: 'code',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      hoverBorder: 'hover:border-purple-500/50'
    },
    {
      id: 'performance',
      title: 'Performance Tuning',
      description: 'Optimizing app responsiveness, memory usage, and battery consumption.',
      icon: 'speed',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-500',
      hoverBorder: 'hover:border-pink-500/50'
    }
  ];
</script>

<div
  class="glass-panel bg-dark-800 rounded-2xl p-6 shadow-lg h-full"
  in:fly={{ y: 30, duration: 500, delay: 200 }}
>
  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-bold text-white flex items-center gap-2">
      <span class="material-icons-round text-primary-500">grid_view</span>
      Core Competencies & Services
    </h2>
    <span class="text-xs font-mono text-dark-500 bg-dark-800 px-2 py-1 rounded">V2.0 STACK</span>
  </div>

  <!-- Services grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Featured: Multiplatform -->
    {#each featuredServices as service, i}
      <div
        class="md:col-span-2 group service-card-featured bg-gradient-to-br {service.gradient}"
        in:fly={{ y: 20, duration: 400, delay: 300 + i * 100 }}
      >
        <div class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
          <span class="material-icons-round text-6xl text-white">{service.icon}</span>
        </div>
        <div class="service-card-featured-inner">
          <div>
            <div class="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-300 {service.pulse ? 'animate-pulse' : ''}"></span>
              {service.subtitle}
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{service.title}</h3>
            <p class="text-blue-100 text-sm leading-relaxed max-w-lg">{service.description}</p>
          </div>
          <div class="mt-6 flex gap-3">
            {#each service.tags as tag}
              <span class="tech-tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>

      {#if i === 0}
        <!-- Regular services row after first featured -->
        {#each regularServices.slice(0, 2) as svc, j}
          <div
            class="md:col-span-1 p-5 rounded-xl bg-dark-800/80 border border-dark-700 {svc.hoverBorder} transition flex flex-col"
            in:fly={{ y: 20, duration: 400, delay: 500 + j * 100 }}
          >
            <div class="icon-container {svc.iconBg} {svc.iconColor} mb-4">
              <span class="material-icons-round">{svc.icon}</span>
            </div>
            <h4 class="font-bold text-white mb-2">{svc.title}</h4>
            <p class="text-xs text-dark-400 leading-relaxed">{svc.description}</p>
          </div>
        {/each}
      {/if}
    {/each}

    <!-- Technical Leadership card -->
    <div
      class="md:col-span-2 p-5 rounded-xl bg-dark-800/50 border border-dashed border-dark-600 hover:border-primary-500/50 transition flex items-center gap-4 cursor-pointer"
      in:fly={{ y: 20, duration: 400, delay: 700 }}
    >
      <div class="w-12 h-12 shrink-0 rounded-lg bg-dark-700 flex items-center justify-center text-dark-300">
        <span class="material-icons-round">groups</span>
      </div>
      <div>
        <h4 class="font-bold text-white">Technical Leadership</h4>
        <p class="text-xs text-dark-400">
          Tech Lead or Chapter Lead services for small, medium, or large development teams.
        </p>
      </div>
      <div class="ml-auto">
        <span class="material-icons-round text-dark-400">arrow_forward</span>
      </div>
    </div>

    <!-- Last two regular services -->
    {#each regularServices.slice(2) as svc, j}
      <div
        class="md:col-span-1 p-5 rounded-xl bg-dark-800/80 border border-dark-700 {svc.hoverBorder} transition flex flex-col"
        in:fly={{ y: 20, duration: 400, delay: 800 + j * 100 }}
      >
        <div class="icon-container {svc.iconBg} {svc.iconColor} mb-4">
          <span class="material-icons-round">{svc.icon}</span>
        </div>
        <h4 class="font-bold text-white mb-2">{svc.title}</h4>
        <p class="text-xs text-dark-400 leading-relaxed">{svc.description}</p>
      </div>
    {/each}
  </div>
</div>
