<script lang="ts">
  import { getTranslations } from '$lib/i18n/index.svelte';
  import LanguageSwitcher from '$components/ui/LanguageSwitcher.svelte';
  import ChatBot from '$components/sections/ChatBot.svelte';
  import FreeDevContractModal from '$components/ui/FreeDevContractModal.svelte';

  // Get translations reactively
  let i18n = $derived(getTranslations());

  // Modal state
  let isContractModalOpen = $state(false);

  // Client types for targeting
  const clientTypeIds = ['startup', 'scale', 'enterprise'] as const;
  const clientTypeIcons: Record<string, string> = {
    startup: 'rocket_launch',
    scale: 'trending_up',
    enterprise: 'business'
  };

  let activeClient = $state<'startup' | 'scale' | 'enterprise'>('startup');
  let progressKey = $state(Date.now());

  // Featured services config (non-translatable parts)
  const featuredConfig = [
    {
      id: 'multiplatform' as const,
      icon: 'devices',
      gradient: 'from-blue-600 via-indigo-600 to-violet-700',
      tags: ['Flutter', 'KMP', 'Compose Multiplatform'],
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
    },
    {
      id: 'ai' as const,
      icon: 'auto_awesome',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      tags: ['Claude', 'GPT-4', 'Gemini', 'On-device ML'],
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
      pulse: true
    }
  ];

  // Services config (non-translatable parts)
  const servicesConfig = [
    { id: 'android' as const, icon: 'android', color: 'emerald', forClient: ['scale', 'enterprise'] },
    { id: 'flutter' as const, icon: 'flutter_dash', color: 'sky', forClient: ['startup'] },
    { id: 'migrations' as const, icon: 'sync_alt', color: 'orange', forClient: ['scale', 'enterprise'] },
    { id: 'leadership' as const, icon: 'groups', color: 'violet', forClient: ['startup', 'scale', 'enterprise'] },
    { id: 'audits' as const, icon: 'policy', color: 'rose', forClient: ['scale', 'enterprise'] },
    { id: 'performance' as const, icon: 'speed', color: 'amber', forClient: ['scale', 'enterprise'] },
    { id: 'mvp' as const, icon: 'rocket_launch', color: 'cyan', forClient: ['startup'] },
    { id: 'web' as const, icon: 'language', color: 'indigo', forClient: ['startup', 'scale'] },
    { id: 'automation' as const, icon: 'terminal', color: 'lime', forClient: ['scale', 'enterprise'] }
  ];

  const colorClasses: Record<string, { bg: string; text: string; hoverBorder: string; hoverShadow: string; hoverText: string }> = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/50', hoverShadow: 'hover:shadow-emerald-500/20', hoverText: 'group-hover:text-emerald-400' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', hoverBorder: 'hover:border-orange-500/50', hoverShadow: 'hover:shadow-orange-500/20', hoverText: 'group-hover:text-orange-400' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', hoverBorder: 'hover:border-violet-500/50', hoverShadow: 'hover:shadow-violet-500/20', hoverText: 'group-hover:text-violet-400' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', hoverBorder: 'hover:border-rose-500/50', hoverShadow: 'hover:shadow-rose-500/20', hoverText: 'group-hover:text-rose-400' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', hoverBorder: 'hover:border-amber-500/50', hoverShadow: 'hover:shadow-amber-500/20', hoverText: 'group-hover:text-amber-400' },
    sky: { bg: 'bg-sky-500/10', text: 'text-sky-400', hoverBorder: 'hover:border-sky-500/50', hoverShadow: 'hover:shadow-sky-500/20', hoverText: 'group-hover:text-sky-400' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', hoverBorder: 'hover:border-cyan-500/50', hoverShadow: 'hover:shadow-cyan-500/20', hoverText: 'group-hover:text-cyan-400' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', hoverBorder: 'hover:border-indigo-500/50', hoverShadow: 'hover:shadow-indigo-500/20', hoverText: 'group-hover:text-indigo-400' },
    lime: { bg: 'bg-lime-500/10', text: 'text-lime-400', hoverBorder: 'hover:border-lime-500/50', hoverShadow: 'hover:shadow-lime-500/20', hoverText: 'group-hover:text-lime-400' }
  };

  $effect(() => {
    // Auto-rotate client types
    const interval = setInterval(() => {
      const types = ['startup', 'scale', 'enterprise'] as const;
      const currentIndex = types.indexOf(activeClient);
      activeClient = types[(currentIndex + 1) % types.length];
      progressKey = Date.now();
    }, 5000);

    return () => clearInterval(interval);
  });

</script>

<div class="relative rounded-2xl overflow-hidden h-full">
  <!-- Background -->
  <div class="absolute inset-0 bg-dark-800">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-violet-500/5"></div>
    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%221%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
  </div>

  <div class="relative p-6">
    <!-- Language Switcher - Top right of panel -->
    <div class="absolute top-4 right-4 z-10">
      <LanguageSwitcher />
    </div>

    <!-- Header with value proposition -->
    <div class="mb-8">
      <!-- Client type selector -->
      <div class="flex flex-wrap gap-2 mb-6">
        {#each clientTypeIds as typeId}
          <button
            class="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden {activeClient === typeId
              ? 'bg-dark-700 text-white shadow-lg shadow-primary-500/20'
              : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-white'}"
            onclick={() => {
              activeClient = typeId;
              progressKey = Date.now();
            }}
          >
            <!-- Progress bar background -->
            {#if activeClient === typeId}
              {#key progressKey}
                <div class="progress-bar"></div>
              {/key}
            {/if}
            <span class="relative z-10 material-icons-round text-base">{clientTypeIcons[typeId]}</span>
            <span class="relative z-10">{i18n.services.clientTypes[typeId]}</span>
          </button>
        {/each}
      </div>

      <!-- Dynamic headline - CSS transition only -->
      <div class="relative h-[80px]">
        {#each clientTypeIds as typeId}
          <div
            class="absolute inset-0 transition-all duration-500 ease-out {activeClient === typeId ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {i18n.services.valueProps[typeId].headline}
            </h2>
            <p class="text-dark-400 text-base max-w-xl">
              {i18n.services.valueProps[typeId].subtext}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <!-- ==================== SECTION 1: FREE DEVELOPMENT ==================== -->
    <div class="mb-10">
      <!-- Section Header -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-600/30 flex items-center justify-center">
          <span class="material-icons-round text-emerald-400">card_giftcard</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            {i18n.services.sections?.free ?? 'Opción Gratuita'}
            <span class="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase animate-pulse">
              {i18n.services.freeOffer.badge}
            </span>
          </h3>
          <p class="text-dark-400 text-xs">{i18n.services.sections?.freeSubtitle ?? 'Desarrollo a cambio de participación en beneficios'}</p>
        </div>
      </div>

      <!-- FREE Development Card -->
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-1 shadow-lg shadow-emerald-500/30">
        <div class="relative bg-dark-900/95 rounded-lg p-6 overflow-hidden">
          <!-- Animated background pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=%2230%22 height=%2230%22 viewBox=%220 0 30 30%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M15 0L30 15L15 30L0 15z%22 fill=%22%2310b981%22 fill-opacity=%220.4%22/%3E%3C/svg%3E'); animation: slidePattern 20s linear infinite;"></div>
          </div>

          <div class="relative z-10">
            <!-- Header row: Icon + Title + Button -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div class="flex items-center gap-3">
                <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span class="material-icons-round text-white text-2xl">card_giftcard</span>
                </div>
                <div>
                  <h3 class="text-xl md:text-2xl font-bold text-white">{i18n.services.freeOffer.title}</h3>
                  <p class="text-emerald-400 font-semibold text-sm">{i18n.services.freeOffer.subtitle}</p>
                </div>
              </div>

              <!-- CTA Button -->
              <button
                onclick={() => isContractModalOpen = true}
                class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {i18n.services.freeOffer.cta}
                <span class="material-icons-round text-lg">arrow_forward</span>
              </button>
            </div>

            <!-- Main content: Description -->
            <p class="text-dark-200 text-base leading-relaxed">{i18n.services.freeOffer.description}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== DIVIDER ==================== -->
    <div class="relative flex items-center justify-center my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-dark-600"></div>
      </div>
      <div class="relative px-4 bg-dark-800 flex items-center gap-2">
        <span class="material-icons-round text-dark-500 text-sm">payments</span>
        <span class="text-dark-400 text-sm font-medium uppercase tracking-wider">{i18n.services.sections?.paid ?? 'Servicios de Pago'}</span>
        <span class="material-icons-round text-dark-500 text-sm">payments</span>
      </div>
    </div>

    <!-- ==================== SECTION 2: PAID SERVICES ==================== -->

    <!-- Featured Services -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {#each featuredConfig as config, i}
        {@const featured = i18n.services.featured[config.id]}
        <div
          class="group relative overflow-hidden rounded-xl bg-gradient-to-br {config.gradient} p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          style="background-image: {config.bgPattern};"
        >
          <!-- Decorative elements -->
          <div class="absolute -right-8 -top-8 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity">
            <span class="material-icons-round text-[128px] text-white">{config.icon}</span>
          </div>

          <!-- Glow effect on hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80">
                <span class="w-2 h-2 rounded-full bg-white/60 {config.pulse ? 'animate-pulse' : ''}"></span>
                {featured.subtitle}
              </span>
            </div>

            <h3 class="text-xl font-bold text-white mb-2">{featured.title}</h3>
            <p class="text-white/80 text-sm leading-relaxed mb-4">{featured.description}</p>

            <!-- Metric highlight -->
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-3xl font-black text-white">{featured.metric}</span>
              <span class="text-white/70 text-sm">{featured.metricLabel}</span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              {#each config.tags as tag}
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Regular services grid - all visible, relevant ones highlighted -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {#each servicesConfig as config (config.id)}
        {@const colors = colorClasses[config.color]}
        {@const isRelevant = config.forClient.includes(activeClient)}
        {@const service = i18n.services.items[config.id]}
        <div
          class="group relative p-4 rounded-xl border cursor-pointer transition-all duration-500
            {isRelevant
              ? `bg-dark-800/80 border-dark-600 ${colors.hoverBorder} hover:shadow-lg ${colors.hoverShadow}`
              : 'bg-dark-800/30 border-dark-700/50 opacity-40 hover:opacity-60'}"
        >
          <!-- Recommended badge -->
          {#if isRelevant}
            <div class="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-primary-500/30">
              {i18n.services.badges.ideal}
            </div>
          {/if}

          <div class="flex items-start gap-3">
            <div class="shrink-0 w-10 h-10 rounded-lg {colors.bg} {colors.text} flex items-center justify-center transition-transform duration-300
              {isRelevant ? 'group-hover:scale-110' : ''}">
              <span class="material-icons-round text-xl">{config.icon}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-sm mb-1 transition-colors duration-300
                {isRelevant ? `text-white ${colors.hoverText}` : 'text-dark-400'}">
                {service.title}
              </h4>
              <p class="text-xs leading-relaxed line-clamp-2 transition-colors duration-300
                {isRelevant ? 'text-dark-400' : 'text-dark-500'}">
                {service.description}
              </p>
            </div>
          </div>

          <!-- Hover arrow -->
          {#if isRelevant}
            <div class="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="material-icons-round text-dark-500 text-sm">arrow_forward</span>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- My Process Section -->
    <div class="mt-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-600/20 flex items-center justify-center">
          <span class="material-icons-round text-cyan-400">route</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">{i18n.myProcess.title}</h3>
          <p class="text-dark-400 text-xs">{i18n.myProcess.subtitle}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Step 1: First Meeting -->
        <div class="relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
          <div class="absolute top-3 left-3 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">1</div>
          <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase">
            {i18n.myProcess.steps.contact.badge}
          </div>
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center mb-4 mt-2 mx-auto group-hover:scale-110 transition-transform">
            <span class="material-icons-round text-cyan-400 text-2xl">videocam</span>
          </div>
          <h4 class="font-semibold text-white text-sm text-center mb-2">{i18n.myProcess.steps.contact.title}</h4>
          <p class="text-dark-400 text-xs text-center leading-relaxed">{i18n.myProcess.steps.contact.description}</p>
        </div>

        <!-- Step 2: Deep Dive -->
        <div class="relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group">
          <div class="absolute top-3 left-3 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">2</div>
          <div class="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
            {i18n.myProcess.steps.discovery.badge}
          </div>
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-4 mt-2 mx-auto group-hover:scale-110 transition-transform">
            <span class="material-icons-round text-emerald-400 text-2xl">psychology</span>
          </div>
          <h4 class="font-semibold text-white text-sm text-center mb-2">{i18n.myProcess.steps.discovery.title}</h4>
          <p class="text-dark-400 text-xs text-center leading-relaxed">{i18n.myProcess.steps.discovery.description}</p>
        </div>

        <!-- Step 3: Proposal -->
        <div class="relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
          <div class="absolute top-3 left-3 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">3</div>
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mb-4 mt-2 mx-auto group-hover:scale-110 transition-transform">
            <span class="material-icons-round text-blue-400 text-2xl">description</span>
          </div>
          <h4 class="font-semibold text-white text-sm text-center mb-2">{i18n.myProcess.steps.scope.title}</h4>
          <p class="text-dark-400 text-xs text-center leading-relaxed">{i18n.myProcess.steps.scope.description}</p>
        </div>

        <!-- Step 4: Implementation -->
        <div class="relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group">
          <div class="absolute top-3 left-3 flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">4</div>
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center mb-4 mt-2 mx-auto group-hover:scale-110 transition-transform">
            <span class="material-icons-round text-violet-400 text-2xl">rocket_launch</span>
          </div>
          <h4 class="font-semibold text-white text-sm text-center mb-2">{i18n.myProcess.steps.implementation.title}</h4>
          <p class="text-dark-400 text-xs text-center leading-relaxed">{i18n.myProcess.steps.implementation.description}</p>
        </div>
      </div>
    </div>

    <!-- How I Work Section -->
    <div class="mt-8">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
          <span class="material-icons-round text-violet-400">psychology</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">{i18n.howIWork.title}</h3>
          <p class="text-dark-400 text-xs">{i18n.howIWork.subtitle}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Card 1: Methodology -->
        <div class="group relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">🎯</span>
            <div>
              <h4 class="font-semibold text-white text-sm">{i18n.howIWork.cards.pragmatic.title}</h4>
              <p class="text-dark-400 text-xs mt-0.5">{i18n.howIWork.cards.pragmatic.subtitle}</p>
            </div>
          </div>
          <p class="text-dark-400 text-sm leading-relaxed flex-1">
            {i18n.howIWork.cards.pragmatic.description}
          </p>
          <div class="mt-4 pt-4 border-t border-dark-700">
            <div class="flex items-center gap-2 text-xs text-dark-500">
              <span class="material-icons-round text-sm text-emerald-500">check_circle</span>
              <span>{i18n.howIWork.cards.pragmatic.footer}</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Communication -->
        <div class="group relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">💬</span>
            <div>
              <h4 class="font-semibold text-white text-sm">{i18n.howIWork.cards.communication.title}</h4>
              <p class="text-dark-400 text-xs mt-0.5">{i18n.howIWork.cards.communication.subtitle}</p>
            </div>
          </div>
          <p class="text-dark-400 text-sm leading-relaxed flex-1">
            {i18n.howIWork.cards.communication.description}
          </p>
          <div class="mt-4 pt-4 border-t border-dark-700">
            <div class="flex items-center gap-2 text-xs text-dark-500">
              <span class="material-icons-round text-sm text-blue-500">sync</span>
              <span>{i18n.howIWork.cards.communication.footer}</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Quality -->
        <div class="group relative p-5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">⚡</span>
            <div>
              <h4 class="font-semibold text-white text-sm">{i18n.howIWork.cards.quality.title}</h4>
              <p class="text-dark-400 text-xs mt-0.5">{i18n.howIWork.cards.quality.subtitle}</p>
            </div>
          </div>
          <p class="text-dark-400 text-sm leading-relaxed flex-1">
            {i18n.howIWork.cards.quality.description}
          </p>
          <div class="mt-4 pt-4 border-t border-dark-700">
            <div class="flex items-center gap-2 text-xs text-dark-500">
              <span class="material-icons-round text-sm text-amber-500">workspace_premium</span>
              <span>{i18n.howIWork.cards.quality.footer}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Work style details -->
      <div class="mt-4 p-4 rounded-xl bg-dark-800/40 border border-dark-700/50">
        <div class="flex flex-wrap gap-6 justify-center text-xs">
          <div class="flex items-center gap-2">
            <span class="text-dark-500">{i18n.howIWork.details.ide}:</span>
            <span class="text-white font-medium">{i18n.howIWork.details.ideValue}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-dark-500">{i18n.howIWork.details.stack}:</span>
            <span class="text-white font-medium">{i18n.howIWork.details.stackValue}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-dark-500">{i18n.howIWork.details.timezone}:</span>
            <span class="text-white font-medium">{i18n.howIWork.details.timezoneValue}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-dark-500">{i18n.howIWork.details.languages}:</span>
            <span class="text-white font-medium">{i18n.howIWork.details.languagesValue}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- AI ChatBot Section -->
    <ChatBot />

    <!-- Free Development Contract Modal -->
    <FreeDevContractModal bind:isOpen={isContractModalOpen} />

    <!-- Trust indicators -->
    <div class="mt-6 flex flex-wrap items-center justify-center gap-6 text-dark-500 text-xs">
      <div class="flex items-center gap-2">
        <span class="material-icons-round text-base text-emerald-500">verified</span>
        <span>{i18n.services.trust.experience}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="material-icons-round text-base text-blue-500">workspace_premium</span>
        <span>{i18n.services.trust.quality}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="material-icons-round text-base text-amber-500">schedule</span>
        <span>{i18n.services.trust.flexible}</span>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slidePattern {
    0% { transform: translateX(0) translateY(0); }
    100% { transform: translateX(-30px) translateY(-30px); }
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #3b82f6;
    border-radius: 9999px;
    transform-origin: left center;
    animation: progressFill 5s linear forwards;
  }

  @keyframes progressFill {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
