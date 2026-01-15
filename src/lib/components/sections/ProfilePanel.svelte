<script lang="ts">
  import { getTranslations } from '$lib/i18n/index.svelte';

  let i18n = $derived(getTranslations());

  const clients = [
    {
      name: 'Banco Santander',
      logo: 'https://cdn.brandfetch.io/idWPmUE5JO/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1764444135051',
      invert: true
    },
    {
      name: 'LaLiga',
      logo: 'https://cdn.brandfetch.io/idZ9P7p0cF/theme/dark/logo.svg',
      invert: true
    },
    {
      name: 'Euro6000',
      logo: 'https://cdn.brandfetch.io/idmBjwNqDO/theme/dark/logo.svg',
      filter: 'grayscale brightness-150',
      size: 'h-20'
    }
  ];

  const consultancies = [
    {
      name: 'Plexus Tech',
      logo: 'https://cdn.brandfetch.io/idMKi-Trm2/w/353/h/114/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1761013694618'
    },
    {
      name: 'Secture',
      logo: 'https://cdn.brandfetch.io/id0zjr8BzX/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1765545908633'
    },
    {
      name: 'The Cocktail',
      logo: 'https://cdn.brandfetch.io/idAeeEcp-A/w/336/h/56/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1760433370080'
    }
  ];

  // Stats config (values only, labels from i18n)
  const statsConfig = [
    { value: '10+', key: 'years' as const },
    { value: '10+', key: 'projects' as const }
  ];
</script>

<div
  class="glass-panel bg-dark-800 rounded-2xl p-6 flex flex-col shadow-lg h-full"
>
  <!-- Header -->
  <div class="flex justify-end items-center mb-6">
    <div class="flex gap-1.5">
      <div class="w-2.5 h-2.5 rounded-full bg-dark-700"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-dark-700"></div>
    </div>
  </div>

  <!-- Profile content -->
  <div class="flex flex-col items-center text-center">
    <!-- SAV Logo -->
    <div class="relative h-32 mb-4">
      <img
        alt="SAV Logo"
        class="h-full w-auto brightness-0 invert"
        src="/images/logo.svg?v=2"
      />
    </div>

    <!-- Name with profile photo -->
    <div class="flex items-center gap-3 mb-1">
      <!-- Profile photo with glow -->
      <div class="relative w-12 h-12 flex-shrink-0">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 blur-sm opacity-70"></div>
        <img
          alt="Sergiy Alonso Villar"
          class="relative w-full h-full object-cover rounded-full border-2 border-dark-700 p-0.5 bg-dark-800"
          src="/images/profile.jpg"
        />
      </div>
      <h1 class="text-2xl font-bold text-white">Sergiy Alonso Villar</h1>
    </div>
    <p class="text-dark-400 text-sm mb-4">{i18n.profile.role}</p>

    <!-- Status badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold mb-6">
      <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      {i18n.profile.status}
    </div>

    <p class="text-sm text-dark-400 mb-3 leading-relaxed">
      {@html i18n.profile.bio}
    </p>

    <!-- Location -->
    <div class="flex items-center gap-2 text-dark-400 text-sm mb-4">
      <span class="material-icons-round text-base">location_on</span>
      <span>{i18n.profile.location}</span>
    </div>

    <!-- Social links -->
    <div class="flex gap-2 mb-6">
      <a
        class="p-2 bg-dark-700 rounded-lg hover:bg-dark-600 text-dark-400 hover:text-white transition"
        href="https://www.linkedin.com/in/sergiy-alonso-villar-31bb14146"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <i class="devicon-linkedin-plain text-lg"></i>
      </a>
      <a
        class="p-2 bg-dark-700 rounded-lg hover:bg-dark-600 text-dark-400 hover:text-white transition"
        href="https://github.com/sergiydev09"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <i class="devicon-github-original text-lg"></i>
      </a>
    </div>
  </div>

  <!-- Clients section -->
  <div class="w-full border-t border-dark-700 pt-6 mb-4">
    <p class="text-xs font-bold text-dark-500 uppercase tracking-widest mb-4 text-center">
      {i18n.profile.projectsFor}
    </p>
    <div class="flex flex-col gap-5 items-center">
      {#each clients as client}
        <div class="{client.size || 'h-10'} flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300">
          <img
            src={client.logo}
            alt={client.name}
            class="h-full w-auto max-w-[160px] object-contain {client.invert ? 'brightness-0 invert' : client.filter || 'grayscale'}"
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Consultancies section -->
  <div class="w-full border-t border-dark-700 pt-6 mb-6">
    <p class="text-xs font-bold text-dark-500 uppercase tracking-widest mb-4 text-center">
      {i18n.profile.workedAt}
    </p>
    <div class="flex flex-wrap justify-center gap-6">
      {#each consultancies as consultancy}
        <div class="h-12 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
          <img
            src={consultancy.logo}
            alt={consultancy.name}
            class="h-full w-auto max-w-[120px] object-contain brightness-0 invert"
          />
        </div>
      {/each}
    </div>
  </div>

  <!-- Stats -->
  <div class="w-full border-t border-dark-700 pt-6 grid grid-cols-2 gap-4 mt-auto">
    {#each statsConfig as stat}
      <div class="text-center">
        <span class="block text-2xl font-bold text-white">{stat.value}</span>
        <span class="text-xs text-dark-500 uppercase tracking-wide">{i18n.profile.stats[stat.key]}</span>
      </div>
    {/each}
  </div>
</div>
