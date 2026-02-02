<script lang="ts">
  import TechMarquee from '$components/ui/TechMarquee.svelte';
  import { getTranslations } from '$lib/i18n/index.svelte';
  import { crossfade, fly } from 'svelte/transition';
  import { cubicInOut, quintOut } from 'svelte/easing';
  import { browser } from '$app/environment';

  const i18n = $derived(getTranslations());

  // Crossfade for smooth morph transition
  const [send, receive] = crossfade({
    duration: 500,
    easing: quintOut,
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;
      return {
        duration: 500,
        easing: quintOut,
        css: (t) => `
          transform: ${transform} scale(${t});
          opacity: ${t};
        `
      };
    }
  });

  // States: 'banner' | 'button'
  let showBanner = $state(
    browser ? localStorage.getItem('legal-banner-dismissed') !== 'true' : false
  );

  let showMenu = $state(false);

  function dismissBanner() {
    if (browser) {
      localStorage.setItem('legal-banner-dismissed', 'true');
    }
    showBanner = false;
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }
</script>

<!-- Legal banner - centered at bottom -->
{#if showBanner}
  <div
    class="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
    in:fly={{ y: 30, duration: 400 }}
    out:send={{ key: 'legal' }}
  >
    <div class="bg-dark-800/95 backdrop-blur-md border border-dark-700 rounded-xl shadow-2xl p-4">
      <div class="flex items-start gap-3">
        <span class="material-icons-round text-primary-400 text-2xl mt-0.5">policy</span>
        <div class="flex-1">
          <p class="text-sm text-dark-200 mb-3">
            {i18n.footer.legalNotice}
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <a
              href="/privacidad"
              class="text-sm text-primary-400 hover:text-primary-300 underline underline-offset-2"
            >
              {i18n.footer.privacy}
            </a>
            <span class="text-dark-600">|</span>
            <a
              href="/aviso-legal"
              class="text-sm text-primary-400 hover:text-primary-300 underline underline-offset-2"
            >
              {i18n.footer.legal}
            </a>
            <button
              onclick={dismissBanner}
              class="ml-auto px-4 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {i18n.footer.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <!-- Floating button -->
  <div
    class="fixed bottom-14 left-4 z-50"
    in:receive={{ key: 'legal' }}
  >
    {#if showMenu}
      <div
        class="mb-2 bg-dark-800/95 backdrop-blur-md border border-dark-700 rounded-xl shadow-2xl p-3 space-y-2 min-w-[160px]"
        transition:fly={{ y: 10, duration: 200 }}
      >
        <a
          href="/privacidad"
          class="flex items-center gap-2 text-sm text-dark-200 hover:text-white transition-colors"
        >
          <span class="material-icons-round text-base text-primary-400">shield</span>
          {i18n.footer.privacy}
        </a>
        <a
          href="/aviso-legal"
          class="flex items-center gap-2 text-sm text-dark-200 hover:text-white transition-colors"
        >
          <span class="material-icons-round text-base text-primary-400">gavel</span>
          {i18n.footer.legal}
        </a>
      </div>
    {/if}

    <button
      onclick={toggleMenu}
      class="w-11 h-11 rounded-full bg-dark-800/95 backdrop-blur-md border border-dark-700 shadow-xl flex items-center justify-center text-primary-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"
      aria-label="Legal information"
    >
      <span class="material-icons-round text-xl">{showMenu ? 'close' : 'policy'}</span>
    </button>
  </div>
{/if}

<footer class="fixed bottom-0 left-0 right-0 z-40 bg-dark-900 border-t border-dark-800">
  <!-- Tech marquee -->
  <TechMarquee />
</footer>
