<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { getTranslations } from '$lib/i18n/index.svelte';

  let i18n = $derived(getTranslations());

  let { isOpen = $bindable(false) } = $props();

  let activeTab = $state<'resumen' | 'contrato' | 'faq'>('resumen');

  function closeModal() {
    isOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeModal();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  function scheduleAndClose() {
    closeModal();
    // Wait for modal to close, then scroll to scheduling panel and select next available day
    setTimeout(() => {
      const schedulingPanel = document.getElementById('scheduling-panel');
      if (schedulingPanel) {
        schedulingPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Dispatch event to trigger SchedulingPanel to select next available day
      window.dispatchEvent(new CustomEvent('schedule-meeting-request'));
    }, 300);
  }

  // Get current date for contract
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="contract-modal-title"
  >
    <!-- Modal Container -->
    <div
      class="relative w-full max-w-4xl max-h-[90vh] bg-dark-900 rounded-2xl border border-dark-700 shadow-2xl overflow-hidden flex flex-col"
      transition:fly={{ y: 20, duration: 300 }}
    >
      <!-- Header -->
      <div class="sticky top-0 z-10 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 id="contract-modal-title" class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="material-icons-round text-3xl">handshake</span>
              {i18n.freeDevContract.title}
            </h2>
            <p class="text-white/80 text-sm mt-1">{i18n.freeDevContract.subtitle}</p>
          </div>
          <button
            onclick={closeModal}
            class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <span class="material-icons-round text-white">close</span>
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mt-4">
          {#each ['resumen', 'contrato', 'faq'] as tab}
            <button
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {activeTab === tab
                ? 'bg-white text-emerald-600'
                : 'bg-white/20 text-white hover:bg-white/30'}"
              onclick={() => activeTab = tab as typeof activeTab}
            >
              {#if tab === 'resumen'}
                <span class="flex items-center gap-2">
                  <span class="material-icons-round text-base">summarize</span>
                  {i18n.freeDevContract.tabs.summary}
                </span>
              {:else if tab === 'contrato'}
                <span class="flex items-center gap-2">
                  <span class="material-icons-round text-base">description</span>
                  {i18n.freeDevContract.tabs.contract}
                </span>
              {:else}
                <span class="flex items-center gap-2">
                  <span class="material-icons-round text-base">help_outline</span>
                  {i18n.freeDevContract.tabs.faq}
                </span>
              {/if}
            </button>
          {/each}
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        {#if activeTab === 'resumen'}
          <!-- Summary Tab -->
          <div class="space-y-6">
            <!-- Value Proposition -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-emerald-400 text-2xl">payments</span>
                </div>
                <h3 class="font-semibold text-white mb-2">{i18n.freeDevContract.summary.cost.title}</h3>
                <p class="text-dark-400 text-sm">{i18n.freeDevContract.summary.cost.description}</p>
              </div>

              <div class="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-blue-400 text-2xl">trending_up</span>
                </div>
                <h3 class="font-semibold text-white mb-2">{i18n.freeDevContract.summary.share.title}</h3>
                <p class="text-dark-400 text-sm">{i18n.freeDevContract.summary.share.description}</p>
              </div>

              <div class="p-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/20">
                <div class="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-violet-400 text-2xl">schedule</span>
                </div>
                <h3 class="font-semibold text-white mb-2">{i18n.freeDevContract.summary.duration.title}</h3>
                <p class="text-dark-400 text-sm">{i18n.freeDevContract.summary.duration.description}</p>
              </div>
            </div>

            <!-- Legal Framework -->
            <div class="p-5 rounded-xl bg-dark-800/50 border border-dark-700">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <span class="material-icons-round text-amber-400 text-2xl">gavel</span>
                </div>
                <div>
                  <h3 class="font-semibold text-white mb-2">{i18n.freeDevContract.summary.legal.title}</h3>
                  <p class="text-dark-400 text-sm leading-relaxed">{i18n.freeDevContract.summary.legal.description}</p>
                  <div class="flex flex-wrap gap-2 mt-3">
                    {#each i18n.freeDevContract.summary.legal.tags as tag}
                      <span class="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">{tag}</span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>

            <!-- How it works -->
            <div class="p-5 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 class="font-semibold text-white mb-4 flex items-center gap-2">
                <span class="material-icons-round text-cyan-400">route</span>
                {i18n.freeDevContract.summary.howItWorks.title}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each i18n.freeDevContract.summary.howItWorks.steps as step, i}
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 class="font-medium text-white text-sm">{step.title}</h4>
                      <p class="text-dark-400 text-xs mt-1">{step.description}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Your Rights -->
            <div class="p-5 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 class="font-semibold text-white mb-4 flex items-center gap-2">
                <span class="material-icons-round text-emerald-400">verified_user</span>
                {i18n.freeDevContract.summary.rights.title}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {#each i18n.freeDevContract.summary.rights.items as right}
                  <div class="flex items-center gap-2 text-dark-300 text-sm">
                    <span class="material-icons-round text-emerald-500 text-lg">check_circle</span>
                    {right}
                  </div>
                {/each}
              </div>
            </div>

            <!-- Business Model Requirement -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <span class="material-icons-round text-amber-400 text-2xl">lightbulb</span>
                </div>
                <div>
                  <h3 class="font-semibold text-amber-400 mb-1">{i18n.freeDevContract.summary.businessModel.title}</h3>
                  <p class="text-white font-medium">{i18n.freeDevContract.summary.businessModel.subtitle}</p>
                </div>
              </div>

              <p class="text-dark-300 text-sm mb-5">{i18n.freeDevContract.summary.businessModel.description}</p>

              <!-- Monetization models -->
              <div class="mb-5">
                <h4 class="text-dark-400 text-xs font-medium uppercase tracking-wider mb-3">
                  {i18n.freeDevContract.summary.businessModel.suggestionsTitle}
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {#each i18n.freeDevContract.summary.businessModel.suggestions as suggestion}
                    <div class="flex items-center gap-2 p-2 rounded-lg bg-dark-800/50">
                      <span class="material-icons-round text-amber-400/70 text-base">{suggestion.icon}</span>
                      <div>
                        <p class="text-white text-xs font-medium">{suggestion.name}</p>
                        <p class="text-dark-500 text-[10px] leading-tight">{suggestion.description}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <!-- Key questions -->
              <div class="mb-4">
                <h4 class="text-dark-400 text-xs font-medium uppercase tracking-wider mb-2">
                  {i18n.freeDevContract.summary.businessModel.questionsTitle}
                </h4>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {#each i18n.freeDevContract.summary.businessModel.questions as question}
                    <li class="flex items-center gap-2 text-dark-300 text-xs">
                      <span class="material-icons-round text-amber-400/50 text-sm">help_outline</span>
                      {question}
                    </li>
                  {/each}
                </ul>
              </div>

              <!-- Tip -->
              <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p class="text-emerald-400 text-xs flex items-center gap-2">
                  <span class="material-icons-round text-sm shrink-0">tips_and_updates</span>
                  <span>{i18n.freeDevContract.summary.businessModel.tip}</span>
                </p>
              </div>
            </div>

            <!-- Scope: What's included / What's not -->
            <div class="p-5 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 class="font-semibold text-white mb-4 flex items-center gap-2">
                <span class="material-icons-round text-blue-400">checklist</span>
                {i18n.freeDevContract.summary.scope.title}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- What I do -->
                <div>
                  <h4 class="text-emerald-400 font-medium text-sm mb-3 flex items-center gap-2">
                    <span class="material-icons-round text-base">thumb_up</span>
                    {i18n.freeDevContract.summary.scope.includes.title}
                  </h4>
                  <ul class="space-y-2">
                    {#each i18n.freeDevContract.summary.scope.includes.items as item}
                      <li class="flex items-center gap-2 text-dark-300 text-sm">
                        <span class="material-icons-round text-emerald-500 text-base shrink-0">check</span>
                        <span>{item}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
                <!-- What I don't do -->
                <div>
                  <h4 class="text-orange-400 font-medium text-sm mb-3 flex items-center gap-2">
                    <span class="material-icons-round text-base">info</span>
                    {i18n.freeDevContract.summary.scope.excludes.title}
                  </h4>
                  <ul class="space-y-2">
                    {#each i18n.freeDevContract.summary.scope.excludes.items as item}
                      <li class="flex items-center gap-2 text-dark-400 text-sm">
                        <span class="material-icons-round text-orange-400 text-base shrink-0">remove</span>
                        <span>{item}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>

            <!-- Real Costs Example -->
            <div class="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
              <h3 class="font-semibold text-white mb-3 text-lg">
                {i18n.freeDevContract.summary.realCosts.title}
              </h3>
              <p class="text-dark-300 text-sm mb-4">
                {i18n.freeDevContract.summary.realCosts.description}
              </p>

              <!-- Example Card -->
              <div class="bg-dark-900/60 rounded-xl p-4 mb-4">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                    <span class="material-icons-round text-white text-2xl">rocket_launch</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-dark-500 text-xs">{i18n.freeDevContract.summary.realCosts.example.title}</p>
                    <p class="text-white font-semibold">{i18n.freeDevContract.summary.realCosts.example.project}</p>
                    <p class="text-dark-400 text-sm">{i18n.freeDevContract.summary.realCosts.example.projectDesc}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-3xl font-bold text-emerald-400">{i18n.freeDevContract.summary.realCosts.example.cost}</p>
                    <p class="text-dark-500 text-xs">{i18n.freeDevContract.summary.realCosts.example.costDesc}</p>
                  </div>
                </div>
                <div class="mt-3 pt-3 border-t border-dark-700">
                  <p class="text-dark-500 text-xs flex items-center gap-2">
                    <span class="material-icons-round text-sm">receipt_long</span>
                    {i18n.freeDevContract.summary.realCosts.example.breakdown}
                  </p>
                </div>
              </div>

              <p class="text-dark-400 text-xs leading-relaxed">
                <span class="material-icons-round text-emerald-400 text-sm align-middle mr-1">lightbulb</span>
                {i18n.freeDevContract.summary.realCosts.note}
              </p>
            </div>
          </div>

        {:else if activeTab === 'contrato'}
          <!-- Full Contract Tab -->
          <div class="prose prose-invert prose-sm max-w-none">
            <div class="text-center mb-8 pb-6 border-b border-dark-700">
              <h2 class="text-xl font-bold text-white mb-2">{i18n.freeDevContract.contract.title}</h2>
              <p class="text-dark-400 text-sm">{i18n.freeDevContract.contract.subtitle}</p>
            </div>

            <!-- Parties -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">people</span>
                {i18n.freeDevContract.contract.sections.parties.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4 space-y-4">
                <div>
                  <p class="text-dark-300 text-sm"><strong class="text-white">{i18n.freeDevContract.contract.sections.parties.developer.label}:</strong></p>
                  <p class="text-dark-400 text-sm">{i18n.freeDevContract.contract.sections.parties.developer.name}</p>
                  <p class="text-dark-500 text-xs">{i18n.freeDevContract.contract.sections.parties.developer.role}</p>
                </div>
                <div>
                  <p class="text-dark-300 text-sm"><strong class="text-white">{i18n.freeDevContract.contract.sections.parties.client.label}:</strong></p>
                  <p class="text-dark-400 text-sm italic">{i18n.freeDevContract.contract.sections.parties.client.placeholder}</p>
                </div>
              </div>
            </section>

            <!-- Object -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">article</span>
                {i18n.freeDevContract.contract.sections.object.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm leading-relaxed">{i18n.freeDevContract.contract.sections.object.content}</p>
              </div>
            </section>

            <!-- Net Benefits Definition -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">calculate</span>
                {i18n.freeDevContract.contract.sections.benefits.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm mb-4">{i18n.freeDevContract.contract.sections.benefits.intro}</p>
                <ul class="space-y-2">
                  {#each i18n.freeDevContract.contract.sections.benefits.deductions as item}
                    <li class="flex items-start gap-2 text-dark-400 text-sm">
                      <span class="material-icons-round text-orange-400 text-base mt-0.5">remove</span>
                      {item}
                    </li>
                  {/each}
                </ul>
                <div class="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p class="text-emerald-400 text-sm font-medium">{i18n.freeDevContract.contract.sections.benefits.formula}</p>
                </div>
              </div>
            </section>

            <!-- Participation -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">percent</span>
                {i18n.freeDevContract.contract.sections.participation.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4 space-y-4">
                {#each i18n.freeDevContract.contract.sections.participation.clauses as clause, i}
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">{i + 1}</span>
                    <p class="text-dark-300 text-sm">{clause}</p>
                  </div>
                {/each}
              </div>
            </section>

            <!-- Information Rights -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">visibility</span>
                {i18n.freeDevContract.contract.sections.information.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm mb-3">{i18n.freeDevContract.contract.sections.information.intro}</p>
                <ul class="space-y-2">
                  {#each i18n.freeDevContract.contract.sections.information.items as item}
                    <li class="flex items-start gap-2 text-dark-400 text-sm">
                      <span class="material-icons-round text-blue-400 text-base mt-0.5">check</span>
                      {item}
                    </li>
                  {/each}
                </ul>
              </div>
            </section>

            <!-- Intellectual Property -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">copyright</span>
                {i18n.freeDevContract.contract.sections.ip.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm leading-relaxed">{i18n.freeDevContract.contract.sections.ip.content}</p>
              </div>
            </section>

            <!-- Fiscal -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">receipt_long</span>
                {i18n.freeDevContract.contract.sections.fiscal.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm leading-relaxed">{i18n.freeDevContract.contract.sections.fiscal.content}</p>
              </div>
            </section>

            <!-- Duration -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">event</span>
                {i18n.freeDevContract.contract.sections.duration.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4 space-y-4">
                {#each i18n.freeDevContract.contract.sections.duration.clauses as clause, i}
                  <div class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold shrink-0">{i + 1}</span>
                    <p class="text-dark-300 text-sm">{clause}</p>
                  </div>
                {/each}
              </div>
            </section>

            <!-- Confidentiality -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">lock</span>
                {i18n.freeDevContract.contract.sections.confidentiality.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm leading-relaxed">{i18n.freeDevContract.contract.sections.confidentiality.content}</p>
              </div>
            </section>

            <!-- Jurisdiction -->
            <section class="mb-8">
              <h3 class="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span class="material-icons-round text-xl">balance</span>
                {i18n.freeDevContract.contract.sections.jurisdiction.title}
              </h3>
              <div class="bg-dark-800/50 rounded-xl p-4">
                <p class="text-dark-300 text-sm leading-relaxed">{i18n.freeDevContract.contract.sections.jurisdiction.content}</p>
              </div>
            </section>

            <!-- Legal Notice -->
            <div class="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div class="flex items-start gap-3">
                <span class="material-icons-round text-amber-400 text-xl">info</span>
                <div>
                  <p class="text-amber-400 text-sm font-medium mb-1">{i18n.freeDevContract.contract.legalNotice.title}</p>
                  <p class="text-dark-400 text-xs">{i18n.freeDevContract.contract.legalNotice.content}</p>
                </div>
              </div>
            </div>
          </div>

        {:else}
          <!-- FAQ Tab -->
          <div class="space-y-4">
            {#each i18n.freeDevContract.faq.items as item, i}
              <details class="group rounded-xl bg-dark-800/50 border border-dark-700 overflow-hidden">
                <summary class="flex items-center justify-between p-4 cursor-pointer hover:bg-dark-800/80 transition-colors">
                  <span class="font-medium text-white text-sm pr-4">{item.question}</span>
                  <span class="material-icons-round text-dark-400 group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div class="px-4 pb-4 pt-0">
                  <p class="text-dark-400 text-sm leading-relaxed">{item.answer}</p>
                </div>
              </details>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Footer CTA -->
      <div class="sticky bottom-0 bg-dark-800 border-t border-dark-700 p-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-dark-400 text-sm text-center sm:text-left">
            {i18n.freeDevContract.footer.interested}
          </p>
          <div class="flex gap-3">
            <button
              onclick={closeModal}
              class="px-4 py-2 rounded-lg bg-dark-700 text-dark-300 hover:bg-dark-600 transition-colors text-sm"
            >
              {i18n.freeDevContract.footer.close}
            </button>
            <button
              onclick={scheduleAndClose}
              class="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              {i18n.freeDevContract.footer.schedule}
              <span class="material-icons-round text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
